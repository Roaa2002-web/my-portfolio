"use client";
import React, { useState, useEffect, useRef } from "react";
import { fetchYouTubePlaylists } from "../../../lib/fetchYouTubePlaylists";
import { fetchVideosFromPlaylist, fetchAllChannelVideos } from "../../../lib/fetchYouTubeVideos";
import VideoCard from "../../../components/VideoCard";
import PlaylistFilter from "../../../components/PlaylistFilter";
import { useTranslation } from "react-i18next";  // استيراد الترجمة

const VideosPage = () => {
    const { t } = useTranslation();  // استخدام الترجمة
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState("all");
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const scrollRef = useRef(null);
    let isDragging = false;
    let startX, scrollLeft;

    useEffect(() => {
        const loadPlaylists = async () => {
            setLoading(true);
            try {
                const fetchedPlaylists = await fetchYouTubePlaylists();
                setPlaylists(fetchedPlaylists);
            } catch (error) {
                setError(t("fetchPlaylistsError"));  // استخدام الترجمة في الخطأ
            } finally {
                setLoading(false);
            }
        };

        loadPlaylists();
    }, []);

    useEffect(() => {
        const loadVideos = async () => {
            setLoading(true);
            try {
                let fetchedVideos = [];
                if (selectedPlaylist === "all") {
                    fetchedVideos = await fetchAllChannelVideos();
                } else {
                    fetchedVideos = await fetchVideosFromPlaylist(selectedPlaylist);
                }
                setVideos(fetchedVideos);
            } catch (error) {
                setError(t("fetchVideosError"));  // استخدام الترجمة في الخطأ
            } finally {
                setLoading(false);
            }
        };

        loadVideos();
    }, [selectedPlaylist]);

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
        <div className="bg-cover bg-center min-h-screen p-6 flex flex-col items-center" style={{ backgroundImage: "url('/images/c.jpg')" }}>
            <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mt-16 mb-6">
                {t("animationVideosTitle")}  {/* استخدام الترجمة لعنوان الفيديوهات */}
            </h1>

            <div className="w-full max-w-3xl mb-8">
                <PlaylistFilter playlists={playlists} selectedPlaylist={selectedPlaylist} setSelectedPlaylist={setSelectedPlaylist} />
            </div>

            {error && <p className="text-red-500 text-lg">{error}</p>}  {/* عرض الخطأ إذا كان هناك */}
            {loading && <p className="text-lg text-gray-700 dark:text-gray-300">{t("loadingText")}</p>}  {/* عرض النص عند التحميل */}

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

export default VideosPage;
