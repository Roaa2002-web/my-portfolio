"use client";
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next"; // استيراد مكتبة الترجمة
import Link from 'next/link'; // استيراد Link من next/link
import { motion } from 'framer-motion'; // استيراد motion من framer-motion

const Main = () => {
  const { t, i18n } = useTranslation(); // استخدام hook الترجمة
  const [isI18nReady, setIsI18nReady] = useState(false); // حالة لتتبع جاهزية i18n

  useEffect(() => {
    if (i18n && i18n.language) { // تأكد من أن i18n جاهز
      const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
      i18n.changeLanguage(savedLanguage).then(() => {
        setIsI18nReady(true); // تحديث الحالة عند انتهاء تغيير اللغة
      });
    }
  }, [i18n]);

  if (!isI18nReady) {
    // عرض شاشة تحميل أو أي محتوى آخر أثناء تهيئة i18n
    return <div>Loading translations...</div>;
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center text-white">
      {/* الفيديو الخلفي للوضع النهاري */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
        src="/background/1.mp4"
      />
      
      {/* الفيديو الخلفي للوضع الليلي */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover hidden dark:block"
        src="/background/1n.mp4" // يمكنك تغيير مسار الفيديو الخاص بالوضع الليلي هنا إذا أردت فيديو مختلف
      />

      {/* التعتيم فوق الفيديو حسب الحاجة */}
      <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-60"></div>
      
      <div className="relative text-center z-10 px-4">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {t('animationTitle')}
        </motion.h1>

        <motion.p
          className="mt-4 text-base sm:text-lg md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {t('animationDescription')}
        </motion.p>

        <motion.p
          className="mt-4 text-base sm:text-lg md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {t('animationCreativeJourney')}
        </motion.p>

        <Link href="#portfolio" className="mt-8 inline-block bg-white text-blue-600 py-2 px-4 rounded">
          {t('explore')}
        </Link>
      </div>
    </main>
  );
};

export default Main;
