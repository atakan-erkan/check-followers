import React from 'react'
import Image from 'next/image'
import { useApp } from '../context/AppContext';

const HowItWork = () => {
    const { theme } = useApp();

    const steps = [
        {
            id: 1,
            title: "Instagram Hesabınıza Giriş Yapın",
            description: "Instagram hesabınıza giriş yaparak başlayın. Güvenli bir şekilde hesabınıza erişim sağlayacağız.",
            image: "/images/step-one.png"
        },
        {
            id: 2,
            title: "Hareketlerinizi Görüntüleyin",
            description: "Ayarlar bölümünden hareketlerin bölümüne girin.",
            image: "/images/step-two.png"
        },
        {
            id: 3,
            title: "Bilgilerini İndirin",
            description: "Bilgilerini indire tıklayın.",
            image: "/images/step-three.png"
        },
        {
            id: 4,
            title: "Bilgilerini İndirin",
            description: "Bilgileri indir veya aktar tıklayın.",
            image: "/images/step-four.png"
        },
        {
            id: 5,
            title: "Hesabınızı Seçin",
            description: "Hesabınızı seçin ve bilgilerinizi aktarın.",
            image: "/images/step-five.png"
        },
        {
            id: 6,
            title: "Bilgilerini İndirin",
            description: "Bilgilerin bazılarını bölümüne girin.",
            image: "/images/step-six.png"
        },
        {
            id: 7,
            title: "Bilgilerini İndirin",
            description: "Bağlantılar bölümünden Takipçiler ve takip edilenleri seçin.",
            image: "/images/step-seven.png"
        },
        {
            id: 8,
            title: "Cihaza Aktarın",
            description: "Cihaza aktarın.",
            image: "/images/step-eight.png"
        },
        {
            id: 9,
            title: "Cihaza Aktarın",
            description: "Cihaza aktarmadan önce istediğiniz tarih aralığını seçebilirsiniz.",
            image: "/images/step-nine.png"
        },
        {
            id: 10,
            title: "Bilgilerini İndirin",
            description: "Talep edilen bilgiler belli bir süre sonra bilgileri indir bölümüne gönderilir. Buradan indirin.",
            image: "/images/step-ten.png"
        },
        {
            id: 11,
            title: "Son",
            description: "Dosyayı sitemize yükleyin ve sonuçları görüntüleyin.",
            image: "/images/step-eleven.png"
        }
    ]

    // Adımları 2'li gruplar halinde düzenle, son adımı tek başına bırak
    const groupedSteps = [];
    for (let i = 0; i < steps.length - 1; i += 2) {
        groupedSteps.push(steps.slice(i, i + 2));
    }
    // Son adımı tek başına ekle
    groupedSteps.push([steps[steps.length - 1]]);

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-yellow-50'}`}>
            <div className="max-w-7xl mx-auto px-4 py-12">
                <h1 className={`text-4xl font-bold text-center mb-12 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                    Nasıl Çalışır?
                </h1>

                <div className="space-y-8">
                    {groupedSteps.map((group, groupIndex) => (
                        <div key={groupIndex} className={`grid ${group.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-6`}>
                            {group.map((step) => (
                                <div key={step.id} className={`flex flex-col p-4 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${theme === 'dark' ? 'bg-yellow-500' : 'bg-yellow-500'} text-black text-lg font-bold`}>
                                            {step.id}
                                        </div>
                                        <h2 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{step.title}</h2>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="relative h-64 w-full md:w-1/2">
                                            <Image
                                                src={step.image}
                                                alt={step.title}
                                                fill
                                                className="object-contain rounded-lg"
                                            />
                                        </div>
                                        <p className={`text-base md:w-1/2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HowItWork;