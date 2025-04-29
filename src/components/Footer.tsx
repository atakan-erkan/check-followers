import React, { useState } from 'react'
import { useApp } from '../context/AppContext';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const Footer = () => {
    const { theme, language, translations } = useApp();
    const [feedback, setFeedback] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const { width, height } = useWindowSize();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!feedback.trim()) {
            alert('Lütfen geri bildiriminizi yazın');
            return;
        }

        setShowConfetti(true);
        setIsSubmitted(true);
        setFeedback('');

        setTimeout(() => {
            setShowConfetti(false);
            setIsSubmitted(false);
        }, 3000);
    };

    return (
        <footer className={`py-8 ${theme === 'dark' ? 'bg-gray-800 text-yellow-400' : 'bg-black text-yellow-400'}`}>
            {showConfetti && (
                <div className="fixed inset-0 z-50 pointer-events-none">
                    <ReactConfetti
                        width={width}
                        height={height}
                        recycle={false}
                        numberOfPieces={500}
                    />
                </div>
            )}
            {isSubmitted && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className={`p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} text-center`}>
                        <h3 className="text-xl font-bold mb-2">Teşekkürler!</h3>
                        <p>Geri bildiriminiz başarıyla gönderildi.</p>
                    </div>
                </div>
            )}
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Logo ve Açıklama */}
                    <div className="flex flex-col items-center md:items-start">
                        <div className="text-2xl font-bold mb-4">Check Followers</div>
                        <p className="text-sm text-center md:text-left">
                            Instagram takipçi analiz aracı ile hesaplarınızı daha iyi yönetin.
                        </p>
                    </div>

                    {/* Geri Bildirim Formu */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-lg font-semibold mb-4">Geri Bildirim</h3>
                        <form
                            action="https://formspree.io/f/atakan4898@gmail.com"
                            method="POST"
                            onSubmit={handleSubmit}
                            className="w-full max-w-md"
                        >
                            <textarea
                                name="message"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                className="w-full p-2 rounded bg-gray-700 text-white mb-2"
                                placeholder="Görüşlerinizi bizimle paylaşın..."
                                rows={3}
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-yellow-400 text-black py-2 px-4 rounded hover:bg-yellow-300 transition-colors"
                            >
                                Gönder
                            </button>
                        </form>
                    </div>

                    {/* İletişim ve Sosyal Medya */}
                    <div className="flex flex-col items-center md:items-end">
                        <h3 className="text-lg font-semibold mb-4">İletişim</h3>
                        <div className="flex space-x-4">
                            <a
                                href="https://www.linkedin.com/in/atakan-erkan/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-yellow-300 transition-colors text-2xl"
                                title="LinkedIn"
                            >
                                <FaLinkedin />
                            </a>
                            <a
                                href="https://github.com/atakan-erkan"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-yellow-300 transition-colors text-2xl"
                                title="GitHub"
                            >
                                <FaGithub />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Alt Bilgi */}
                <div className="mt-8 pt-4 border-t border-gray-700 text-center text-sm space-y-2">
                    <div>© {new Date().getFullYear()} Check Followers. Tüm hakları saklıdır.</div>
                    <div>
                        <span>{translations.developer[language]}: </span>
                        <a
                            href="https://www.linkedin.com/in/atakan-erkan/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-yellow-300 transition-colors font-semibold"
                        >
                            Atakan Erkan
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer