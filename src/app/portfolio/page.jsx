"use client";
import dynamic from "next/dynamic";

const PortfolioPageContent = dynamic(() => import("./PortfolioPageContent"), {
  ssr: false, // تعطيل Server-Side Rendering لمنع المشاكل أثناء build
});

export default function PortfolioPage() {
  return <PortfolioPageContent />;
}
