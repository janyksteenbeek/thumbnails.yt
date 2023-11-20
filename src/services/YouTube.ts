import {type youtube_v3} from "googleapis";

type YouTubeLinkType = 'video' | 'channel_id' | 'channel_username' | 'channel_handle' | null;
type YouTubeLinkInfo = {
    type: YouTubeLinkType;
    id?: string;
};

const cacheSetup = {
    next: {
        revalidate: 3600,
    },
};

const API_KEY = process.env.YT_KEY;

export async function getChannelIdByUsername(username: string): Promise<string | null> {
    if (username.startsWith("@")) username = username.slice(1);
    const url = `https://www.googleapis.com/youtube/v3/channels?part=id&forUsername=${username}&key=${API_KEY}`;

    try {
        const response = await fetch(url, cacheSetup);
        const data = await response.json() as youtube_v3.Schema$ChannelListResponse;

        if (!data.items || data.items.length === 0 || !data.items[0]?.id) {
            console.log('No channel found for this username.');
            return null;
        }
        return data.items[0]?.id
    } catch (error) {
        console.error('Error fetching channel ID:', error);
        return null;
    }
}

export async function getChannel(channelId: string): Promise<youtube_v3.Schema$Channel | null> {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${API_KEY}`;

    try {
        const response = await fetch(url, cacheSetup);
        const data = await response.json() as youtube_v3.Schema$ChannelListResponse;
        if (!data.items || data.items.length === 0 || !data.items[0]) {
            console.log('No channel found for this ID.');
            return null;
        }
        return data.items[0];
    } catch (error) {
        console.error('Error fetching channel:', error);
        return null;
    }
}


export async function getPublicUploadVideoIds(channelId: string): Promise<youtube_v3.Schema$PlaylistItem[]> {
    const playlistId = 'UULF' + channelId.substring(2);

    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=15&key=${API_KEY}`;

    try {
        const response = await fetch(url, cacheSetup);
        const data = await response.json() as youtube_v3.Schema$PlaylistItemListResponse;
        return data.items ?? [];
    } catch (error) {
        console.error('Error fetching video IDs:', error);
        return [];
    }
}


export async function getVideo(videoId: string): Promise<youtube_v3.Schema$Video | undefined> {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`;

    try {
        const response = await fetch(url, cacheSetup);
        const data = await response.json() as youtube_v3.Schema$VideoListResponse;
        return data.items && data.items.length > 0 ? data.items[0] : undefined;
    } catch (error) {
        console.error('Error fetching video:', error);
        return;
    }
}


export function parseYouTubeUrl(url: string): YouTubeLinkInfo {
    // Regular expressions for the various YouTube URL formats
    const videoRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const channelRegex = /(?:youtube\.com\/(channel\/|c\/|user\/)([^"&?\/\s]+))/i;
    const atChannelRegex = /(?:youtube\.com\/@|@)([^"&?\/\s]+)/i;

    // Check for video URL and extract the ID
    const videoMatch = url.match(videoRegex);
    if (videoMatch) {
        return {type: 'video', id: videoMatch[1]};
    }

    const handleMatch = url.match(atChannelRegex);
    if (handleMatch) {
        return {type: 'channel_handle', id: handleMatch[1]};
    }

    // Check for channel URL and extract the ID or name
    const channelMatch = url.match(channelRegex);
    const isId = channelMatch && channelMatch[1] === 'channel/';
    if (channelMatch) {
        return {type: isId ? 'channel_id' : 'channel_username', id: channelMatch[2]};
    }

    // If no match, return unknown type
    return {type: null};
}

export async function getChannelIdFromHandle(handle: string): Promise<string | null> {
    const html = await (await fetch('https://www.youtube.com/@' + handle, cacheSetup)).text()
    if (!html) return null;

    const regex = /vnd\.youtube:\/\/www\.youtube\.com\/channel\/(UC[A-Za-z0-9_-]{22})/;
    const match = html.match(regex);
    if (!match) return null;

    return match[1] ?? null;
}

export async function getThumbnailsAndLabels(videoId: string): Promise<{ imageUrls: string[], labels: string[] }> {
    const thumbnailUrls = [
        "https://i.ytimg.com/vi/" + videoId + "/maxresdefault_custom_1.jpg",
        "https://i.ytimg.com/vi/" + videoId + "/maxresdefault_custom_2.jpg",
        "https://i.ytimg.com/vi/" + videoId + "/maxresdefault_custom_3.jpg",
    ];

    let imageUrls: string[] = [];
    let labels: string[] = [];
    const thumbnailTitles = [
        "A", "B", "C"
    ];

    const fetchPromises = thumbnailUrls.map((url, index) =>
        fetch(url, {...cacheSetup, method: 'HEAD'}).then(response => {
            if (response.status === 200) {
                imageUrls.push(url);
            }
        })
    );

    await Promise.all(fetchPromises);
    labels = thumbnailTitles.slice(0, imageUrls.length)

    if (imageUrls.length === 0 || imageUrls.length === 1) {
        console.log("No custom thumbnails found for video " + videoId + ", using default thumbnail")
        labels = [];
        imageUrls = ["https://i.ytimg.com/vi/" + videoId + "/maxresdefault.jpg"];
    }

    return {imageUrls, labels};
}