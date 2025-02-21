"use client";
import React, { useEffect, useState } from "react";
import {
  FaHome, FaWrench, FaBriefcase, FaRegNewspaper, FaUsers,
  FaEnvelope, FaGlobe, FaMoon, FaSun, FaPaperPlane, FaBars
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import i18n from "../lib/translationConfig";
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsClient(true);
      const storedLang = localStorage.getItem("preferredLanguage") || i18n.language;
      i18n.changeLanguage(storedLang);
      document.dir = storedLang === "ar" ? "rtl" : "ltr";
    
      const storedDarkMode = localStorage.getItem("darkMode") === "true";
      setDarkMode(storedDarkMode);
      document.documentElement.classList.toggle('dark', storedDarkMode);
    }, 0); // تأخير التحديث

    return () => clearTimeout(timeoutId); // تنظيف الوقت عند إزالة المكون
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("preferredLanguage", newLang);
    document.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    document.body.style.overflow = sidebarOpen ? 'auto' : 'hidden';
  };

  if (!isClient) {
    return null;
  }

  return (
    <nav className="absolute top-0 left-0 w-full bg-transparent flex justify-between items-center p-4 z-10">
      <div className="flex items-center">
        <Link href="/">
          <Image src="/images/color logo.svg" alt="Logo" width={100} height={40} className="mr-6 lg:mr-8" />
        </Link>
        <button onClick={toggleSidebar} className="text-white lg:hidden">
          <FaBars />
        </button>
        <div className="hidden lg:flex space-x-8 lg:space-x-12">
        <a href="/" className="text-white flex items-center">
            <FaHome className="mr-2 lg:mr-4 ml-2" /> {t("home")}
          </a>
          <a href="/services" className="text-white flex items-center">
            <FaWrench className="mr-2 lg:mr-4 ml-2" /> {t("services")}
          </a>
          <a href="/portfolio" className="text-white flex items-center">
            <FaBriefcase className="mr-2 lg:mr-4 ml-2" /> {t("portfolio")}
          </a>
          <a href="/about" className="text-white flex items-center">
            <FaUsers className="mr-2 lg:mr-4 ml-2" /> {t("about")}
          </a>
          <a href="/contact" className="text-white flex items-center">
            <FaEnvelope className="mr-2 lg:mr-4 ml-2" /> {t("contact")}
          </a>

        </div>
      </div>

      <div className="flex items-center space-x-4 lg:space-x-8">
      <button onClick={toggleLanguage} className="text-white flex items-center">
        <FaGlobe className="mr-2 lg:mr-4 ml-2" /> {i18n.language === "ar" ? "English" : "العربية"}
      </button>
      <button onClick={toggleDarkMode} className="text-white flex items-center">
        {darkMode ? <FaSun className="mr-2 lg:mr-4 ml-2" /> : <FaMoon className="mr-2 lg:mr-4 ml-2" />}
      </button>
      <a href="mailto:roaa.abdulfattah.alwesabi@gmail.com" className="text-white flex items-center">
        <FaPaperPlane className="mr-2 lg:mr-4 ml-2" /> {t("cta")}
      </a>

    </div>


      <div className={`fixed top-0 right-0 h-full w-64 bg-white text-black dark:bg-gray-800 dark:text-white transition-transform transform ${sidebarOpen ? "translate-x-0" : "translate-x-full"} lg:hidden`}>
        <div className="p-4">
          <button onClick={toggleSidebar} className="text-white">X</button>
        </div>
        <div className="flex flex-col space-y-4 p-4">
          <a href="/" className="text-black dark:text-white">{t("home")}</a> 
          <a href="/services" className="text-black dark:text-white">{t("services")}</a>
          <a href="/portfolio" className="text-black dark:text-white">{t("portfolio")}</a>
          <a href="/about" className="text-black dark:text-white">{t("about")}</a>
          <a href="/contact" className="text-black dark:text-white">{t("contact")}</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
