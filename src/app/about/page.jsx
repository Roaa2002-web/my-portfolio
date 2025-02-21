"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaCode, FaBullseye, FaTimes } from "react-icons/fa";
import Image from "next/image";

const AboutPage = () => {
  const { t } = useTranslation();
  const [translatedTexts, setTranslatedTexts] = useState({
    aboutTitle: "",
    aboutDescription: "",
    aboutMission: "",
    aboutMissionDescription: "",
    learnMore: "",
  });

  // تحديث النصوص بعد تحميل الترجمة
  useEffect(() => {
    setTranslatedTexts({
      aboutTitle: t("aboutTitle"),
      aboutDescription: t("aboutDescription"),
      aboutMission: t("aboutMission"),
      aboutMissionDescription: t("aboutMissionDescription"),
      learnMore: t("learnMore"),
    });
  }, [t]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-16 bg-gradient-to-b from-blue-300 to-blue-50 dark:from-gray-800 dark:to-gray-900 min-h-screen w-full flex-grow">
      {/* ✅ صورة تعبيرية */}
      <div className="relative w-full md:w-1/2 flex justify-center mt-8">
        <div className="relative rounded-3xl overflow-hidden shadow-lg">
          <Image
            src="/images/playing.jpg"
            alt="Coding and Design"
            width={500}
            height={500}
            className="rounded-3xl"
          />
        </div>
      </div>

      {/* ✅ نص الوصف */}
      <div className="md:w-1/2 mt-10 md:mt-0 md:pl-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex justify-center items-center">
          <FaCode className="text-blue-500 mr-2" /> {translatedTexts.aboutTitle}
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300">{translatedTexts.aboutDescription}</p>

        {/* ✅ زر للمزيد من المعلومات */}
        <div className="mt-6">
          <button
            className="px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-full font-semibold shadow-md transition duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            {translatedTexts.learnMore}
          </button>
        </div>
      </div>

      {/* ✅ نافذة منبثقة */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl w-80 flex flex-col items-center shadow-lg animate-pop-up">
            {/* زر الإغلاق */}
            <button
              className="absolute top-4 right-4 text-gray-700 dark:text-white hover:text-red-500"
              onClick={() => setIsModalOpen(false)}
            >
              <FaTimes size={20} />
            </button>

            {/* محتوى النافذة */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-4">{translatedTexts.aboutMission}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center mt-2 px-4">
              {translatedTexts.aboutMissionDescription}
            </p>
          </div>
        </div>
      )}

      {/* ✅ أنيميشن النبثاق */}
      <style jsx>{`
        @keyframes pop-up {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-pop-up {
          animation: pop-up 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default AboutPage;
