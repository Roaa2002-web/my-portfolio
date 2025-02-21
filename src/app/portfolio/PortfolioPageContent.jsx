"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaFilm, FaLaptopCode } from "react-icons/fa";
import AnimationWebCard from "../../components/AnimationWebCard";
import { motion } from "framer-motion"; // استيراد motion من framer-motion

const PortfolioPage = () => {
  const { t } = useTranslation();
  const [translatedTexts, setTranslatedTexts] = useState({
    portfolio: "",
    animationTitle: "",
    animationDescription: "",
    webPagesTitle: "",
    webPagesDescription: "",
  });

  const [circleStyles, setCircleStyles] = useState([]);

  useEffect(() => {
    setTranslatedTexts({
      portfolio: t("portfolio"),
      animationTitle: t("animationTitle"),
      animationDescription: t("animationDescription"),
      webPagesTitle: t("webPagesTitle"),
      webPagesDescription: t("webPagesDescription"),
    });

    // توليد القيم العشوائية فقط عند تحميل الصفحة
    const generateCircles = Array.from({ length: 10 }).map(() => ({
      width: `${40 + Math.random() * 80}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
    setCircleStyles(generateCircles);
  }, [t]);

  return (
    <div className="relative bg-gradient-to-b from-[#4a90e2] via-[#66b2ff] to-[#99ccff] dark:from-[#1e3a5f] dark:via-[#162d4a] dark:to-[#0f1f35] min-h-screen p-4 flex flex-col items-center">
      {/* دوائر بيضاء ثابتة */}
      <div className="absolute inset-0 overflow-hidden">
        {circleStyles.map((style, index) => (
          <div
            key={index}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              ...style,
              aspectRatio: "1/1", // يضمن بقاء الدوائر غير مشوهة
              transform: "translate(-50%, -50%)", // يضمن تموضع الدوائر بشكل مثالي
            }}
          ></div>
        ))}
      </div>

      {/* عنوان الصفحة مع حركة دخول */}
      <motion.h1
        className="text-3xl sm:text-4xl font-bold mt-20 text-gray-200 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }} // مدة الحركة
      >
        {translatedTexts.portfolio || "Loading..."}
      </motion.h1>

      {/* البطاقات مع حركة دخول */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 relative "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }} // مدة الحركة
      >
        <AnimationWebCard
          title={translatedTexts.animationTitle || "Loading..."}
          description={translatedTexts.animationDescription || "Loading..."}
          icon={<FaFilm />}
          link="/portfolio/animation"
        />
        <AnimationWebCard
          title={translatedTexts.webPagesTitle || "Loading..."}
          description={translatedTexts.webPagesDescription || "Loading..."}
          icon={<FaLaptopCode />}
          link="/portfolio/webpages"
        />
      </motion.div>
    </div>
  );
};

export default PortfolioPage;
