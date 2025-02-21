// src/lib/fetchVideoDetails.js

export const fetchVideoDetails = async (videoId) => {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${apiKey}`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch video details');
    }

    const data = await response.json();
    return data.items[0]; // إرجاع تفاصيل الفيديو
};
