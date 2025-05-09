import { useState } from "react";
import UserCard from "../components/UserCard";
import { useApp } from "../context/AppContext";
import Modal from "../components/Modal";
import Head from "next/head";

export default function Home() {
  const { theme, language, translations } = useApp();
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [notFollowingBack, setNotFollowingBack] = useState<string[]>([]);
  const [notFollowing, setNotFollowing] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"alphabetical" | "recent">("alphabetical");
  const [currentPage, setCurrentPage] = useState(1);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showNotFollowingBack, setShowNotFollowingBack] = useState(true);
  const [showNotFollowing, setShowNotFollowing] = useState(false);
  const itemsPerPage = 12;

  // Filtrelenmiş ve sıralanmış sonuçlar
  const filteredResults = (showNotFollowingBack ? notFollowingBack : notFollowing)
    .filter(username => username.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "alphabetical") return a.localeCompare(b);
      return 0;
    });

  // Sayfalama için hesaplamalar
  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  const paginatedResults = filteredResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSubmit = async () => {
    if (!zipFile) {
      setModalMessage("Lütfen Instagram'dan indirdiğiniz zip dosyasını yükleyin.");
      setShowModal(true);
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("zip", zipFile);

    try {
      const res = await fetch("/api/compare", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setNotFollowingBack(data.notFollowingBack || []);
      setNotFollowing(data.notFollowing || []);
      setCurrentPage(1);
    } catch (error) {
      console.error("Bir hata oluştu:", error);
      setModalMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + notFollowingBack.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "takip_etmeyenler.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const handleSaveNote = (username: string, note: string) => {
    setNotes(prev => ({ ...prev, [username]: note }));
  };

  return (
    <>
      <Head>
        <title>Check Followers - Instagram Takipçi Kontrolü</title>
        <meta name="description" content="Instagram takipçi kontrolü yapabileceğiniz, kimlerin sizi takip ettiğini ve takip etmediğini görebileceğiniz ücretsiz araç." />
        <meta name="keywords" content="instagram takipçi kontrol, instagram unfollow, instagram takipçi takip, instagram analiz" />
        <meta property="og:title" content="Check Followers - Instagram Takipçi Kontrolü" />
        <meta property="og:description" content="Instagram takipçi kontrolü yapabileceğiniz, kimlerin sizi takip ettiğini ve takip etmediğini görebileceğiniz ücretsiz araç." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://check-followers.vercel.app" />
        <meta property="og:image" content="/images/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Check Followers - Instagram Takipçi Kontrolü" />
        <meta name="twitter:description" content="Instagram takipçi kontrolü yapabileceğiniz, kimlerin sizi takip ettiğini ve takip etmediğini görebileceğiniz ücretsiz araç." />
        <meta name="twitter:image" content="/images/og-image.png" />
      </Head>
      <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900' : 'bg-yellow-50'
        }`}>
        {/* Main content */}
        <main className={`flex-1 py-8 px-4 max-w-3xl mx-auto w-full ${theme === 'dark' ? 'text-white' : 'text-gray-800'
          }`}>
          <div className={`rounded-xl shadow-lg p-6 space-y-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
            <h2 className={`text-xl sm:text-2xl font-bold text-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
              {translations.instagramFollowerCheck[language]}
            </h2>

            {/* Zip Dosyası Yükleme Alanı */}
            <div>
              <label className={`block text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-800'} mb-2`}>
                Instagram Veri Dosyası
              </label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-yellow-400 bg-yellow-100 rounded-lg cursor-pointer transition hover:bg-yellow-200 text-gray-700 relative">
                <svg className="w-8 h-8 mb-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm px-3">
                  {zipFile ? zipFile.name : "Instagram'dan indirdiğiniz zip dosyasını seçin veya sürükleyin"}
                </p>
                <input
                  type="file"
                  accept=".zip"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={e => e.target.files && setZipFile(e.target.files[0])}
                />
              </label>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-black mr-2" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10"
                      stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                  </svg>
                  Karşılaştırılıyor...
                </div>
              ) : "Karşılaştır"}
            </button>
          </div>

          {notFollowingBack.length > 0 && (
            <div className={`mt-8 p-6 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setShowNotFollowingBack(true);
                      setShowNotFollowing(false);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-md font-semibold cursor-pointer transition ${showNotFollowingBack
                      ? theme === 'dark'
                        ? 'bg-yellow-500 text-black'
                        : 'bg-yellow-500 text-black'
                      : theme === 'dark'
                        ? 'bg-gray-700 text-white'
                        : 'bg-gray-200 text-gray-800'
                      }`}
                  >
                    {translations.notFollowingBack[language]} ({notFollowingBack.length})
                  </button>
                  <button
                    onClick={() => {
                      setShowNotFollowingBack(false);
                      setShowNotFollowing(true);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-md font-semibold cursor-pointer transition ${showNotFollowing
                      ? theme === 'dark'
                        ? 'bg-yellow-500 text-black'
                        : 'bg-yellow-500 text-black'
                      : theme === 'dark'
                        ? 'bg-gray-700 text-white'
                        : 'bg-gray-200 text-gray-800'
                      }`}
                  >
                    {translations.notFollowing[language]} ({notFollowing.length})
                  </button>
                </div>
                <button
                  onClick={downloadCSV}
                  className={`px-4 py-2 rounded-md font-semibold transition ${theme === 'dark'
                    ? 'bg-yellow-500 text-black hover:bg-yellow-600'
                    : 'bg-yellow-500 text-black hover:bg-yellow-600'
                    }`}
                >
                  {translations.downloadCSV[language]}
                </button>
              </div>

              {(showNotFollowingBack || showNotFollowing) && (
                <>
                  {/* Arama ve Sıralama */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <input
                      type="text"
                      placeholder={translations.search[language]}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`flex-1 p-2 rounded border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                    />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as "alphabetical" | "recent")}
                      className={`p-2 rounded cursor-pointer border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                    >
                      <option value="alphabetical">{translations.sortAlphabetical[language]}</option>
                      <option value="recent">{translations.sortRecent[language]}</option>
                    </select>
                  </div>

                  {/* Sonuçlar */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                    {paginatedResults.map(username => (
                      <UserCard
                        key={username}
                        username={username}
                        note={notes[username]}
                        onSaveNote={handleSaveNote}
                      />
                    ))}
                  </div>

                  {/* Sayfalama */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-6 gap-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 cursor-pointer rounded-md ${theme === 'dark'
                          ? 'bg-yellow-500 text-black disabled:opacity-50'
                          : 'bg-yellow-500 text-black disabled:opacity-50'
                          }`}
                      >
                        {translations.previous[language]}
                      </button>
                      <span className="px-4 py-2">
                        {translations.page[language]} {currentPage} / {totalPages}
                      </span>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 cursor-pointer rounded-md ${theme === 'dark'
                          ? 'bg-yellow-500 text-black disabled:opacity-50'
                          : 'bg-yellow-500 text-black disabled:opacity-50'
                          }`}
                      >
                        {translations.next[language]}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </main>

        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Uyarı"
        >
          <p>{modalMessage}</p>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setShowModal(false)}
              className={`px-4 py-2 cursor-pointer rounded-md font-semibold ${theme === 'dark'
                ? 'bg-yellow-500 text-black hover:bg-yellow-600'
                : 'bg-yellow-500 text-black hover:bg-yellow-600'
                }`}
            >
              Tamam
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
}
