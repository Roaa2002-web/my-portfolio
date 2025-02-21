"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaLaptopCode, FaPalette, FaBullseye, FaTimes } from "react-icons/fa";
import { FaRegSmile } from "react-icons/fa";
import Image from "next/image";

const ServicesPage = () => {
  const { t } = useTranslation();
  const [translatedTexts, setTranslatedTexts] = useState({
    servicesTitle: "",
    servicesDescription: "",
    animationServiceTitle: "",
    animationServiceDescription: "",
    webDevelopmentServiceTitle: "",
    webDevelopmentServiceDescription: "",
    designServiceTitle: "",
    designServiceDescription: "",
    learnMore: "",
  });

  useEffect(() => {
    setTranslatedTexts({
      servicesTitle: t("servicesTitle"),
      servicesDescription: t("servicesDescription"),
      animationServiceTitle: t("animationServiceTitle"),
      animationServiceDescription: t("animationServiceDescription"),
      webDevelopmentServiceTitle: t("webDevelopmentServiceTitle"),
      webDevelopmentServiceDescription: t("webDevelopmentServiceDescription"),
      designServiceTitle: t("designServiceTitle"),
      designServiceDescription: t("designServiceDescription"),
      learnMore: t("learnMore"),
    });
  }, [t]);

  return (
<section className="flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-16 bg-gradient-to-b from-blue-300 to-blue-50 dark:from-gray-800 dark:to-gray-900 min-h-screen w-full flex-grow">
<div className="relative w-full md:w-1/2 flex justify-center mt-8">
        <div className="relative rounded-3xl overflow-hidden shadow-lg">
          <Image
            src="/images/Hi.jpg"
            alt="Services Background"
            width={500}
            height={500}
            className="rounded-3xl"
          />
        </div>
      </div>

      <div className="md:w-1/2 mt-10 md:mt-0 md:pl-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex justify-center items-center">
          <FaBullseye className="text-blue-500 mr-2" /> {translatedTexts.servicesTitle}
        </h2>
        <p className="mt-4 flex justify-center items-center  text-gray-600 dark:text-gray-300">{translatedTexts.servicesDescription}</p>

        <section className="mt-12 text-center">
          <div className="flex justify-center items-center space-x-4">
            <FaRegSmile className="text-blue-500 text-4xl" />
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              {translatedTexts.animationServiceTitle}
            </h3>
          </div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{translatedTexts.animationServiceDescription}</p>
        </section>

        <section className="mt-12 text-center">
          <div className="flex justify-center items-center space-x-4">
            <FaLaptopCode className="text-green-500 text-4xl" />
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              {translatedTexts.webDevelopmentServiceTitle}
            </h3>
          </div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{translatedTexts.webDevelopmentServiceDescription}</p>
        </section>

        <section className="mt-12 text-center">
          <div className="flex justify-center items-center space-x-4">
            <FaPalette className="text-pink-500 text-4xl" />
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
              {translatedTexts.designServiceTitle}
            </h3>
          </div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">{translatedTexts.designServiceDescription}</p>
        </section>

        
      </div>
    </section>
  );
};

export default ServicesPage;
