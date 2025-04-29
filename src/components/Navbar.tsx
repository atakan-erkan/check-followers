import Link from 'next/link';
import { useApp } from '../context/AppContext';
import React from 'react'

function Navbar() {
    const { theme, language, toggleTheme, setLanguage, translations } = useApp();

    return (
        <nav className={`py-4 shadow-md ${theme === 'dark' ? 'bg-gray-800 text-yellow-400' : 'bg-black text-yellow-400'
            }`}>
            <div className="max-w-3xl mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">CheckFollowers</Link>
                <div className="flex items-center gap-4">
                    <Link href="/how-it-work" className="p-2 rounded hover:bg-gray-700 cursor-pointer">{translations.howItWork[language]}</Link>
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