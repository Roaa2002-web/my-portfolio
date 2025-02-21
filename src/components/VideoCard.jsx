"use client";
import React from "react";
import Link from "next/link";
import { PlayCircle } from "lucide-react"; // أيقونة التشغيل

const VideoCard = ({ video }) => {
  const videoId = video?.id?.videoId || video?.id; // استخراج معرف الفيديو
  const thumbnail = video?.snippet?.thumbnails?.high?.url; // استخراج الصورة المصغرة
  const title = video?.snippet?.title || "No Title"; // استخراج العنوان الافتراضي

  return (
    <Link href={`/videos/${videoId}`} className="block">
      <div className="relative bg-white text-black dark:bg-gray-900 dark:text-white rounded-xl overflow-hidden shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl cursor-pointer">
        {/* صورة الفيديو مع أيقونة التشغيل */}
        <div className="relative">
          {thumbnail && (
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-48 sm:h-64 object-cover"
            />
          )}
          {/* أيقونة التشغيل */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-50 transition-all">
            <PlayCircle className="text-white w-12 h-12 opacity-90 hover:opacity-100" />
          </div>
        </div>

        {/* معلومات الفيديو */}
        <div className="p-4">
          <h3 className="text-lg font-semibold truncate">{title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
