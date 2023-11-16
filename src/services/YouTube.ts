import {google, youtube_v3} from "googleapis";
import Schema$PlaylistItem = youtube_v3.Schema$PlaylistItem;
import Schema$Channel = youtube_v3.Schema$Channel;
import Schema$Video = youtube_v3.Schema$Video;

type YouTubeLinkType = 'video' | 'channel_id' | 'channel_username' | null;
type YouTubeLinkInfo = {
    type: YouTubeLinkType;
    id?: string;
};

const youtube = google.youtube('v3');
const API_KEY = process.env.YT_KEY;

export async function getChannelIdByUsername(username: string): Promise<string | null> {
    try {
        if (username.startsWith("@")) username = username.slice(1);

        const response = await youtube.channels.list({
            part: ['id'],
            forUsername: username,
            key: API_KEY,
        });

        const channels = response.data.items
        if (!channels || channels.length === 0) {
            console.log('No channel found for this username.');
            return null;
        }

        return channels[0]?.id ?? null;
    } catch (error) {
        console.error('Error fetching channel ID:', error);
        return null;
    }
}

export async function getChannel(channelId: string): Promise<Schema$Channel | null> {
    try {
        const response = await youtube.channels.list({
            part: ['contentDetails', 'snippet'],
            id: [channelId],
            key: API_KEY,
        });

        const channels = response.data.items;
        if (!channels || channels.length === 0) {
            console.log('No channel found for this channel ID.');
            return null;
        }

        return channels[0] ?? null;
    } catch (error) {
        console.error('Error fetching uploads playlist ID:', error);
        return null;
    }
}


export async function getPublicUploadVideoIds(playlistId: string): Promise<Schema$PlaylistItem[]> {
    try {
        const response = await youtube.playlistItems.list({
            part: ['snippet', 'contentDetails'],
            playlistId: playlistId,
            maxResults: 15,
            key: API_KEY,
        });

        if (!response.data.items) {
            return [];
        }

        return response.data.items
    } catch (error) {
        console.error('Error fetching video IDs:', error);
        return [];
    }
}

export async function getVideo(videoId: string): Promise<Schema$Video | undefined> {
    try {
        const response = await youtube.videos.list({
            part: ['snippet', 'statistics'],
            id: [videoId],
            key: API_KEY,
        });

        if (!response.data.items || response.data.items.length === 0) {
            console.warn('No video found for the given ID');
            return;
        }

        return response.data.items[0];
    } catch (error) {
        console.error('Error fetching video details:', error);
        return;
    }
}

export function parseYouTubeUrl(url: string): YouTubeLinkInfo {
    // Regular expressions for the various YouTube URL formats
    const videoRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const channelRegex = /(?:youtube\.com\/(channel\/|c\/|user\/|@)([^"&?\/\s]+))/i;

    // Check for video URL and extract the ID
    const videoMatch = url.match(videoRegex);
    if (videoMatch) {
        return {type: 'video', id: videoMatch[1]};
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

    let count = 0;

    for (const url of thumbnailUrls) {
        const index = thumbnailUrls.indexOf(url);
        const response = await fetch(url, {method: 'HEAD'});
        if (response.status === 200) {
            count++;
            imageUrls.push(url);
            labels.push(thumbnailTitles[index] + "");
        }
    }

    if (count === 0 || count === 1) {
        console.log("No custom thumbnails found for video " + videoId + ", using default thumbnail")
        labels = [];
        imageUrls = ["https://i.ytimg.com/vi/" + videoId + "/maxresdefault.jpg"];
    }

    return {imageUrls, labels};
}
