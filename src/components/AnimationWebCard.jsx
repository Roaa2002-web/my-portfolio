"use client";
import React from "react";
import Link from "next/link";

const AnimationWebCard = ({ title, description, icon, link }) => {
  return (
    <div className="max-w-sm mx-auto bg-white text-gray-900 shadow-lg rounded-2xl p-6 text-center transition-transform transform hover:scale-105">
      {/* أيقونة القسم */}
      <div className="text-5xl text-blue-500 mb-4">{icon}</div>

      {/* العنوان والوصف */}
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-4 text-gray-600">{description}</p>

      {/* زر الانتقال */}
      <Link href={link}>
        <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          استكشاف
        </button>
      </Link>
    </div>
  );
};

export default AnimationWebCard;
