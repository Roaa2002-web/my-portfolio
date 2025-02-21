import { i18n } from './next-i18next.config.mjs'; // استخدام استيراد ESM بدلاً من require

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n, // إضافة إعدادات i18n
};

export default nextConfig;
