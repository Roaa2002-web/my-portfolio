export const fetchPlaylistVideos = async (playlistId) => {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=10&key=${apiKey}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch playlist videos");
    }

    const data = await response.json();
    return data.items;
};
