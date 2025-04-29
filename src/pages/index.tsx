import { useState } from "react";
import UserCard from "../components/UserCard";

export default function Home() {
  const [followersFile, setFollowersFile] = useState<File | null>(null);
  const [followingFile, setFollowingFile] = useState<File | null>(null);
  const [notFollowingBack, setNotFollowingBack] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!followersFile || !followingFile) return alert("Lütfen her iki dosyayı da yükleyin.");

    setLoading(true);
    const formData = new FormData();
    formData.append("followers", followersFile);
    formData.append("following", followingFile);

    const res = await fetch("/api/compare", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setNotFollowingBack(data.notFollowingBack || []);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Instagram Takipçi Kontrolü</h1>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Takipçiler Dosyası</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-4 border-dashed border-gray-300 hover:border-blue-500 rounded-lg cursor-pointer transition-colors duration-200">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                      {followersFile ? followersFile.name : "Dosya seçin veya sürükleyin"}
                    </p>
                  </div>
                  <input
                    type="file"
                    accept=".html"
                    className="opacity-0 absolute"
                    onChange={e => e.target.files && setFollowersFile(e.target.files[0])}
                  />
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Takip Edilenler Dosyası</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-4 border-dashed border-gray-300 hover:border-blue-500 rounded-lg cursor-pointer transition-colors duration-200">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                      {followingFile ? followingFile.name : "Dosya seçin veya sürükleyin"}
                    </p>
                  </div>
                  <input
                    type="file"
                    accept=".html"
                    className="opacity-0 absolute"
                    onChange={e => e.target.files && setFollowingFile(e.target.files[0])}
                  />
                </label>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Karşılaştırılıyor...
                </div>
              ) : (
                "Karşılaştır"
              )}
            </button>
          </div>
        </div>

        {notFollowingBack.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sizi Takip Etmeyenler</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {notFollowingBack.map(username => (
                <UserCard key={username} username={username} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
