"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaInstagram, FaFacebook, FaTelegram, FaYoutube, FaTiktok, FaBehance, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ContactPage = () => {
  const { t } = useTranslation();
  const [translatedTexts, setTranslatedTexts] = useState({
    contactTitle: "",
    contactDescription: "",
    contactText: "",
    contactEmail: "",
  });

  // تحديث النصوص بعد تحميل الترجمة
  useEffect(() => {
    setTranslatedTexts({
      contactTitle: t("contactTitle"),
      contactDescription: t("contactDescription"),
      contactText: t("contactText"),
      contactEmail: t("contactEmail"),
    });
  }, [t]);

  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-20 py-16 bg-gradient-to-b from-blue-300 to-blue-50 dark:from-gray-800 dark:to-gray-900 min-h-screen w-full flex-grow gap-12 md:gap-16">
      {/* صورة جانبية */}
      <div className="relative w-4/5 md:w-1/2 flex justify-center">
        <div className="relative rounded-3xl overflow-hidden shadow-lg">
          <Image
            src="/images/me.jpg"
            alt="Contact Background"
            width={500}
            height={500}
            className="rounded-3xl"
          />
        </div>
      </div>

      {/* محتوى النص وروابط التواصل */}
      <div className="w-full md:w-1/2 mt-10 md:mt-0 md:pl-16 text-center md:text-left">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{translatedTexts.contactTitle}</h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300">{translatedTexts.contactDescription}</p>

        {/* أيقونات وسائل التواصل */}
        <div className="mt-12 text-center md:text-left">
          <p className="text-lg text-gray-600 dark:text-gray-300">{translatedTexts.contactText}:</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6">
            {/* روابط وسائل التواصل */}
            <a href="https://www.instagram.com/roro_animation2002" target="_blank" rel="noopener noreferrer" className="text-4xl text-gray-900 dark:text-white hover:text-pink-500">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/share/15BhD6s78S/" target="_blank" rel="noopener noreferrer" className="text-4xl text-gray-900 dark:text-white hover:text-blue-700">
              <FaFacebook />
            </a>
            <a href="https://t.me/roaa_animarion" target="_blank" rel="noopener noreferrer" className="text-4xl text-gray-900 dark:text-white hover:text-blue-400">
              <FaTelegram />
            </a>
            <a href="https://youtube.com/@roaaanimeation" target="_blank" rel="noopener noreferrer" className="text-4xl text-gray-900 dark:text-white hover:text-red-600">
              <FaYoutube />
            </a>
            <a href="https://www.tiktok.com/@roaaanimation" target="_blank" rel="noopener noreferrer" className="text-4xl text-gray-900 dark:text-white hover:text-black">
              <FaTiktok />
            </a>
            <a href="https://www.behance.net/roaaabdulfattah" target="_blank" rel="noopener noreferrer" className="text-4xl text-gray-900 dark:text-white hover:text-blue-500">
              <FaBehance />
            </a>
            <a href="https://www.linkedin.com/in/roa-a-abdulfattah-b25181325/" target="_blank" rel="noopener noreferrer" className="text-4xl text-gray-900 dark:text-white hover:text-blue-700">
              <FaLinkedin />
            </a>
            <a href="https://github.com/Roaa2002-web" target="_blank" rel="noopener noreferrer" className="text-4xl text-gray-900 dark:text-white hover:text-black">
              <FaGithub />
            </a>
          </div>
        </div>

        {/* البريد الإلكتروني */}
        <div className="mt-6 text-center md:text-left">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            <span className="block text-xl font-semibold">{translatedTexts.contactEmail}</span>
            <span className="block text-sm mt-2">
              <FaEnvelope className="text-blue-500 inline" />
              <a href="mailto:roaa.abdulfattah.alwesabi@gmail.com" className="text-blue-500 hover:underline">
                roaa.abdulfattah.alwesabi@gmail.com
              </a>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
