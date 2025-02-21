import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend'; // استيراد الـ Backend

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: typeof window !== 'undefined' && localStorage.getItem('preferredLanguage') || 'en', // استعادة اللغة المخزنة
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    interpolation: {
      escapeValue: false,
    },
    keySeparator: false, // لا تستخدم فواصل للمفاتيح
    returnObjects: true, // السماح بإرجاع كائنات
    compatibilityJSON: 'v3',
    lng: 'en',
    initImmediate: false,
    parse: (key) => key.toLowerCase(),
  });

export default i18n;
