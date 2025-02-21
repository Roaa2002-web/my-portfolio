"use client";
import React, { useState, useEffect, useRef } from "react";
import { fetchVercelProjects } from "../../../lib/fetchVercelProjects";
import { ArrowRight, Globe } from "lucide-react";

const WebProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const scrollRef = useRef(null);
    let isDragging = false;
    let startX, scrollLeft;

    useEffect(() => {
        const loadProjects = async () => {
            setLoading(true);
            try {
                const fetchedProjects = await fetchVercelProjects();
                setProjects(fetchedProjects);
            } catch (error) {
                setError("فشل في جلب المشاريع.");
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    // دوال السحب
    const startDragging = (e) => {
        isDragging = true;
        startX = e.pageX || e.touches[0].pageX;
        scrollLeft = scrollRef.current.scrollLeft;
    };

    const stopDragging = () => {
        isDragging = false;
    };

    const onDrag = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX || e.touches[0].pageX;
        const walk = (x - startX) * 2;
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div className="bg-cover bg-center min-h-screen p-6 flex flex-col items-center" style={{ backgroundImage: "url('/images/snehal.jpg')" }}>
            <h1 className="text-3xl font-bold text-center text-gray-100 mt-16 mb-6">
              
            </h1>

            {/* عرض خطأ إن وجد */}
            {error && <p className="text-red-500 text-lg">{error}</p>}

            {/* عرض رسالة "جاري التحميل" */}
            {loading && <p className="text-lg text-gray-700 dark:text-gray-300">جاري التحميل...</p>}

            {/* شريط تمرير المشاريع بالسحب */}
            <div
                ref={scrollRef}
                className="w-full max-w-6xl overflow-x-auto whitespace-nowrap flex space-x-4 p-4 cursor-grab active:cursor-grabbing custom-scrollbar-hide"
                onMouseDown={startDragging}
                onMouseLeave={stopDragging}
                onMouseUp={stopDragging}
                onMouseMove={onDrag}
                onTouchStart={startDragging}
                onTouchEnd={stopDragging}
                onTouchMove={onDrag}
            >
                {projects.map((project, index) => (
                    <div 
                        key={project.id || index} 
                        className="inline-block w-72 p-4 bg-gray-800 shadow-lg rounded-2xl border border-gray-700 transition-transform transform hover:scale-105"
                    >
                        {/* أيقونة العنوان */}
                        <div className="flex items-center space-x-2 mb-3">
                            <Globe className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                            <h3 className="text-lg font-semibold text-gray-100 truncate w-60">{project.name}</h3>
                        </div>

                        {/* وصف المشروع */}
                        <p className="text-sm text-gray-300 truncate w-60">
                            {project.framework || "No framework"}
                        </p>
                       {/* زر زيارة الموقع مع التحقق من الرابط الصحيح */}
                      <a 
                          href={`https://${project.domains?.[0] || project.alias?.[0] || project.latestDeployment?.url || `${project.name}.vercel.app`}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition shadow-md"
                      >
                          زيارة الموقع <ArrowRight className="ml-2 w-5 h-5" />
                      </a>

                    </div>
                ))}
            </div>

            {/* CSS لإخفاء شريط التمرير */}
            <style jsx>{`
                .custom-scrollbar-hide {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                .custom-scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default WebProjectsPage;
