export const config = {
    api: {
        bodyParser: false,
    },
};

import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, Fields, Files } from "formidable";
import fs from "fs";
import { JSDOM } from "jsdom";

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
            const followingFile = files.following?.[0];
            const followersFile = files.followers?.[0];

            if (!followingFile || !followersFile) {
                return res.status(400).json({ error: "Gerekli dosyalar eksik" });
            }

            const followingHTML = fs.readFileSync(followingFile.filepath, "utf-8");
            const followersHTML = fs.readFileSync(followersFile.filepath, "utf-8");

            const following = extractUsernamesFromHTML(followingHTML);
            const followers = extractUsernamesFromHTML(followersHTML);

            const notFollowingBack = following.filter(username => !followers.includes(username));

            res.status(200).json({ notFollowingBack });
        } catch (e) {
            const error = e as Error;
            res.status(500).json({ error: "İşleme hatası: " + error.message });
        }
    });
}
