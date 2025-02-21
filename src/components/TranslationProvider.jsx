"use client"; // لجعل هذا المكون Client Component
import { useTranslation } from 'react-i18next';
import { dir } from 'i18next'; // لتحديد اتجاه النص بناءً على اللغة
import { useEffect } from 'react';

const TranslationProvider = ({ children }) => {
  const { i18n } = useTranslation(); // استخدام الترجمة لتحديد اللغة

  useEffect(() => {
    // ضبط اتجاه الصفحة بناءً على اللغة
    document.dir = dir(i18n.language);
  }, [i18n.language]);

  return (
    <html lang={i18n.language}>
      {children}
    </html>
  );
};

export default TranslationProvider;
