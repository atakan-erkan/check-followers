import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, Fields, Files } from "formidable";
import { JSDOM } from "jsdom";
import AdmZip from "adm-zip";

export const config = {
    api: {
        bodyParser: false,
    },
};

function extractUsernamesFromHTML(html: string): string[] {
    const dom = new JSDOM(html);
    const links = dom.window.document.querySelectorAll("a[href^='https://www.instagram.com/']");
    const usernames = Array.from(links).map(link => {
        const href = link.getAttribute("href");
        if (!href) return null;
        const match = href.match(/instagram\.com\/([^\/\?\s]+)/);
        return match ? match[1] : null;
    }).filter(Boolean) as string[];
    return usernames;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") return res.status(405).send("Sadece POST istekleri desteklenir.");

    const form = new IncomingForm({ keepExtensions: true });

    form.parse(req, async (err: Error | null, fields: Fields, files: Files) => {
        if (err) return res.status(500).json({ error: "Dosya çözümleme hatası" });

        try {
            const zipFile = files.zip?.[0];
            if (!zipFile) {
                return res.status(400).json({ error: "Zip dosyası yüklenmedi" });
            }

            const zip = new AdmZip(zipFile.filepath);
            const zipEntries = zip.getEntries();

            let followingHTML = "";
            let followersHTML = "";

            for (const entry of zipEntries) {
                if (entry.entryName.includes("connections/followers_and_following/following.html")) {
                    followingHTML = zip.readAsText(entry);
                } else if (entry.entryName.includes("connections/followers_and_following/followers_1.html")) {
                    followersHTML = zip.readAsText(entry);
                }
            }

            if (!followingHTML || !followersHTML) {
                return res.status(400).json({ error: "Followers veya following dosyaları bulunamadı" });
            }

            const following = extractUsernamesFromHTML(followingHTML);
            const followers = extractUsernamesFromHTML(followersHTML);

            // Sizi takip etmeyenler (sizin takip ettiğiniz ama sizi takip etmeyenler)
            const notFollowingBack = following.filter(username => !followers.includes(username));

            // Sizin takip etmediğiniz kişiler (sizi takip eden ama sizin takip etmediğiniz kişiler)
            const notFollowing = followers.filter(username => !following.includes(username));

            res.status(200).json({ notFollowingBack, notFollowing });
        } catch (e) {
            const error = e as Error;
            res.status(500).json({ error: "İşleme hatası: " + error.message });
        }
    });
}
