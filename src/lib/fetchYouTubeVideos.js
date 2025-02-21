// src\lib\fetchYouTubeVideos.js

export const fetchVideosFromPlaylist = async (playlistId) => {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${playlistId}&key=${apiKey}`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch videos from playlist');
    }

    const data = await response.json();
    return data.items;
};

// دالة لجلب جميع الفيديوهات من القناة
// src\lib\fetchYouTubeVideos.js

export const fetchAllChannelVideos = async () => {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    const channelId = 'UCCHH8nuqqe3hodi6pKS_YLQ'; // معرف قناتك

    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&order=date&key=${apiKey}`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch all channel videos');
    }

    const data = await response.json();
    // تأكد من تضمين الفيديوهات فقط
    return data.items.filter(item => item.id.kind === 'youtube#video').map(video => ({
        id: video.id,
        snippet: video.snippet
    }));
};
