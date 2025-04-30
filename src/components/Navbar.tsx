import Link from 'next/link';
import { useApp } from '../context/AppContext';
import React from 'react'
import Logo from '../pages/icons/Logo';

function Navbar() {
    const { theme, language, toggleTheme, translations } = useApp();

    return (
        <nav className={`py-4 shadow-md ${theme === 'dark' ? 'bg-gray-800 text-[#FFD700]' : 'bg-black text-[#FFD700]'
            }`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="flex items-center">
                    <Logo className="w-50 h-auto" />
                </Link>
                <div className="flex items-center gap-4">
                    <Link href="/how-it-work" className="p-2 rounded font-bold hover:bg-gray-700 cursor-pointer">{translations.howItWork[language]}</Link>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-700 cursor-pointer"
                    >
                        {theme === 'dark' ? '🌞' : '🌙'}
                    </button>
                    {/* <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as 'tr' | 'en')}
                        className={`p-2 rounded cursor-pointer ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'
                            }`}
                    >
                        <option value="tr">🇹🇷 Türkçe</option>
                        <option value="en">🇬🇧 English</option>
                    </select> */}
                </div>
            </div>
        </nav>
    )
}

export default Navbar