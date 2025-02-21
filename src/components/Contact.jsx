"use client";
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next"; // استيراد مكتبة الترجمة
import { motion } from 'framer-motion'; // استيراد motion من framer-motion

const Contact = () => {
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
    <section className="relative bg-cover bg-center min-h-screen flex items-center justify-center text-white py-20">
      {/* الفيديو للوضع النهاري */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/background/3.mp4"
      ></video>

      {/* الفيديو للوضع الليلي */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover hidden dark:block"
        src="/background/3n.mp4"
      ></video>

      {/* تراكب للخلفية الداكنة لجعل النص بارزاً */}
      <div className="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-60"></div>
      
      <div className="relative text-center z-10 px-4">
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }} // جعل الحركة أبطأ
        >
          {t('contactTitle')}
        </motion.h2>

        <motion.h3
          className="mt-4 text-2xl sm:text-3xl md:text-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }} // إضافة تأخير قليل
        >
          {t('contactSubtitle')}
        </motion.h3>

        <motion.p
          className="mt-4 text-base sm:text-lg md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.4 }} // إضافة تأخير أكثر
        >
          {t('contactDescription')}
        </motion.p>
      </div>
    </section>
  );
};

export default Contact;
