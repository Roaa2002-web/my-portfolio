"use client";
import React, { useState, useEffect, useRef } from "react";
import { fetchYouTubePlaylists } from "../../../lib/fetchYouTubePlaylists";
import { fetchVideosFromPlaylist, fetchAllChannelVideos } from "../../../lib/fetchYouTubeVideos";
import VideoCard from "../../../components/VideoCard";
import PlaylistFilter from "../../../components/PlaylistFilter";

const VideosPage = () => {
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState("all");
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);  // حالة جديدة للتحميل

    // مرجع لشريط الفيديوهات لتفعيل السحب
    const scrollRef = useRef(null);
    let isDragging = false;
    let startX, scrollLeft;

    useEffect(() => {
        const loadPlaylists = async () => {
            setLoading(true);  // تفعيل حالة التحميل عند البدء
            try {
                const fetchedPlaylists = await fetchYouTubePlaylists();
                setPlaylists(fetchedPlaylists);
            } catch (error) {
                setError("فشل في جلب القوائم.");
            } finally {
                setLoading(false);  // إيقاف حالة التحميل بعد الانتهاء
            }
        };

        loadPlaylists();
    }, []);

    useEffect(() => {
        const loadVideos = async () => {
            setLoading(true);  // تفعيل حالة التحميل عند البدء
            try {
                let fetchedVideos = [];
                if (selectedPlaylist === "all") {
                    fetchedVideos = await fetchAllChannelVideos();
                } else {
                    fetchedVideos = await fetchVideosFromPlaylist(selectedPlaylist);
                }
                setVideos(fetchedVideos);
            } catch (error) {
                setError("فشل في جلب الفيديوهات.");
            } finally {
                setLoading(false);  // إيقاف حالة التحميل بعد الانتهاء
            }
        };

        loadVideos();
    }, [selectedPlaylist]);

    // دوال السحب بالماوس واللمس
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
        const walk = (x - startX) * 2; // تحكم بسرعة السحب
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div className="bg-cover bg-center min-h-screen p-6 flex flex-col items-center" style={{ backgroundImage: "url('/images/c.jpg')" }}>
            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mt-16 mb-6">
                فيديوهات الرسوم المتحركة
            </h1>

            {/* فلتر القوائم */}
            <div className="w-full max-w-3xl mb-8">
                <PlaylistFilter playlists={playlists} selectedPlaylist={selectedPlaylist} setSelectedPlaylist={setSelectedPlaylist} />
            </div>

            {/* عرض خطأ إن وجد */}
            {error && <p className="text-red-500 text-lg">{error}</p>}

            {/* عرض رسالة "جاري التحميل" */}
            {loading && <p className="text-lg text-gray-700 dark:text-gray-300">جاري التحميل...</p>}

            {/* شريط تمرير الفيديوهات بالسحب مع إخفاء شريط التمرير تمامًا */}
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
                {videos.map((video, index) => (
                    <div key={video.id?.videoId || video.etag || index} className="inline-block w-72">
                        <VideoCard video={video} />
                    </div>
                ))}
            </div>

            {/* CSS لإخفاء شريط التمرير */}
            <style jsx>{`
                .custom-scrollbar-hide {
                    scrollbar-width: none; /* Firefox */
                    -ms-overflow-style: none; /* IE and Edge */
                }
                .custom-scrollbar-hide::-webkit-scrollbar {
                    display: none; /* Chrome, Safari, Opera */
                }
            `}</style>
        </div>
    );
};

export default VideosPage;
