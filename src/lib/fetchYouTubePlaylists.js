export const fetchYouTubePlaylists = async () => {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    const channelId = 'UCCHH8nuqqe3hodi6pKS_YLQ'; // معرف قناتك

    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channelId}&maxResults=10&key=${apiKey}`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch playlists');
    }

    const data = await response.json();
    return data.items;
};
