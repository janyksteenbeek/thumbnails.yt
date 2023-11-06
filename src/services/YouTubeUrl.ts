type YouTubeLinkType = 'video' | 'channel' | 'unknown';
type YouTubeLinkInfo = {
    type: YouTubeLinkType;
    id?: string;
};

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
    if (channelMatch) {
        return {type: 'channel', id: channelMatch[2]};
    }

    // If no match, return unknown type
    return {type: 'unknown'};
}
