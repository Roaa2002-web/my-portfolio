"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchVideoDetails } from "../../../lib/fetchVideoDetails";
import { useTranslation } from "react-i18next";
import { FaDownload, FaCog, FaTimes } from "react-icons/fa";

const VideoDetails = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const [quality, setQuality] = useState("hd720");
  const [disableCaptions, setDisableCaptions] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    if (id) {
      const fetchDetails = async () => {
        const video = await fetchVideoDetails(id);
        setVideo(video);
        setIsLoading(false);
      };
      fetchDetails();
    }
  }, [id]);

  const handleDownload = () => {
    const downloadUrl = `https://www.y2mate.com/youtube/${id}`;
    window.open(downloadUrl, "_blank");
  };

  if (isLoading) return <div className="text-center py-10 text-xl">Loading...</div>;
  if (!video) return <div className="text-center py-10 text-xl">Video not found</div>;

  const { title, description } = video.snippet;

  return (
    <div className="bg-gradient-to-b from-blue-300 to-blue-50 dark:from-gray-800 dark:to-gray-900 min-h-screen flex items-center justify-center p-4 md:p-6">
      <div className="w-full max-w-screen-xl bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* إعدادات الفيديو */}
        <div className="md:col-span-3 flex flex-col space-y-4 items-center md:items-start">
          <button
            onClick={handleDownload}
            className="w-full bg-blue-600 text-white py-3 px-5 rounded-lg flex items-center justify-center text-lg hover:bg-blue-500 transition"
          >
            <FaDownload className="mr-2" /> {i18n.t("Download")}
          </button>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="w-full bg-gray-600 text-white py-3 px-5 rounded-lg flex items-center justify-center text-lg hover:bg-gray-500 transition"
          >
            <FaCog className="mr-2" /> {i18n.t("Settings")}
          </button>
        </div>

        {/* فيديو */}
        <div className="md:col-span-6">
          <div className="w-full aspect-video rounded-lg overflow-hidden">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${id}?autoplay=${autoplay ? 1 : 0}&vq=${quality}&cc_load_policy=${disableCaptions ? 0 : 1}`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* العنوان والوصف */}
        <div className="md:col-span-3 text-center md:text-left">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">{title}</h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg">{description}</p>
        </div>
      </div>

      {/* نافذة الإعدادات */}
      {isSettingsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">الإعدادات</h2>
              <button onClick={() => setIsSettingsOpen(false)} className="text-gray-600 dark:text-gray-300">
                <FaTimes size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {/* تشغيل تلقائي */}
              <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={autoplay}
                  onChange={() => setAutoplay(!autoplay)}
                  className="w-5 h-5"
                />
                <span>تشغيل تلقائي</span>
              </label>

              {/* جودة الفيديو */}
              <label className="block text-gray-700 dark:text-gray-300">
                جودة الفيديو:
                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="w-full mt-2 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="hd1080">1080p</option>
                  <option value="hd720">720p</option>
                  <option value="large">480p</option>
                  <option value="medium">360p</option>
                </select>
              </label>

              {/* تعطيل الترجمة */}
              <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={disableCaptions}
                  onChange={() => setDisableCaptions(!disableCaptions)}
                  className="w-5 h-5"
                />
                <span>تعطيل الترجمة</span>
              </label>

              {/* زر الإغلاق */}
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDetails;
