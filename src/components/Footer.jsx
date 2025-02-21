"use client";
import { FaInstagram, FaFacebook, FaTelegram, FaYoutube, FaTiktok, FaBehance, FaLinkedin, FaCode, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
<footer className="w-full mt-auto bg-gradient-to-b from-[#4a90e2] via-[#66b2ff] to-[#99ccff] dark:from-[#1e3a5f] dark:via-[#162d4a] dark:to-[#0f1f35] p-6 flex flex-col items-center text-center text-gray-900 dark:text-white shadow-xl border-t border-gray-300 dark:border-gray-700">
<div className="flex items-center text-white dark:text-gray-300 mb-4 animate-fadeIn">
        <FaCode className="text-3xl mr-2" />
        <p className="font-bold text-xl tracking-wide">Designed & Built by Roaa</p>
      </div>

      <p className="text-gray-800 dark:text-gray-300 text-sm max-w-md leading-relaxed">
        A portfolio showcasing my web development and animation projects. Built with Next.js.
      </p>

      <div className="border-t border-gray-300 dark:border-gray-700 w-3/4 my-4"></div>

      {/* أيقونات مواقع التواصل الاجتماعي */}
      <div className="flex gap-5 mt-2">
        {[
          { icon: FaInstagram, link: "https://www.instagram.com/roro_animation2002?igsh=MzNlNGNkZWQ4Mg==" },
          { icon: FaFacebook, link: "https://www.facebook.com/share/15BhD6s78S/" },
          { icon: FaTelegram, link: "https://t.me/roaa_animarion" },
          { icon: FaYoutube, link: "https://youtube.com/@roaaanimeation?si=NPIMf9lJhCIDd2L5" },
          { icon: FaTiktok, link: "https://www.tiktok.com/@roaaanimation?_t=8riMbXJDsLy&_r=1" },
          { icon: FaBehance, link: "https://www.behance.net/roaaabdulfattah" },
          { icon: FaLinkedin, link: "https://www.linkedin.com/in/roa-a-abdulfattah-b25181325/" },
          { icon: FaGithub, link: "https://github.com/Roaa2002-web" } // إضافة رابط GitHub
        ].map(({ icon: Icon, link }, index) => (
          <a 
            key={index} 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="transition-transform transform hover:scale-110 text-gray-800 dark:text-gray-300 hover:text-white dark:hover:text-blue-400"
          >
            <Icon className="text-3xl" />
          </a>
        ))}
      </div>
    </footer>
  );
}
