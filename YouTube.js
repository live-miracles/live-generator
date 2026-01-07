/**
 * Create (insert) a YouTube Live Broadcast
 *
 * @param {Object} data
 * @return {Object} YouTube LiveBroadcast resource
 */
function insertBroadcast(data) {
    // Build RFC3339 timestamp with IST offset (+05:30)
    const start = `${data.Year}-${data.Month}-${data.Day}` + `T${data.Hour}:${data.Minute}:00+0530`;

    const resource = {
        snippet: {
            title: data.Title,
            description: '',
            scheduledStartTime: start,
            scheduledEndTime: start,
        },
        status: {
            privacyStatus: data.Visibility, // public | unlisted | private
        },
        contentDetails: {
            enableDvr: data['DVR'],
            enableAutoStart: data['Auto Start'],
            enableAutoStop: data['Auto Stop'],
            latencyPreference: data['Latency'], // normal | low | ultraLow
        },
    };

    const res = YouTube.LiveBroadcasts.insert('snippet,contentDetails,status', resource);

    console.log(res);
    return res;
}

/**
 * Create (insert) a new YouTube Live Stream
 *
 * @param {Object} data
 * @param {string} data.Title - Stream title
 * @return {Object} YouTube LiveStream resource
 */
function insertStream(data) {
    const resource = {
        snippet: {
            title: data.Title,
        },
        cdn: {
            ingestionType: 'rtmp',
            frameRate: '60fps',
            resolution: '1080p',
        },
    };

    const res = YouTube.LiveStreams.insert('snippet,cdn', resource);

    console.log(res);
    return res;
}

/**
 * Bind a live broadcast to a live stream (stream key)
 *
 * @param {string} broadcastId - LiveBroadcast ID
 * @param {string} streamId - LiveStream ID (NOT the stream key)
 */
function bindBroadcast(broadcastId, streamId) {
    const response = YouTube.LiveBroadcasts.bind(broadcastId, 'id,contentDetails', {
        streamId: streamId,
    });

    console.log(response);
    return response;
}

function getStreamKeys() {
    const res = YouTube.LiveStreams.list('id,snippet,cdn,status', { mine: true, maxResults: 50 });

    if (!res.items || res.items.length === 0) {
        Logger.log('No live streams found');
        return;
    }

    const streams = res.items.map((item) => ({
        id: item.id,
        title: item.snippet.title,
        key: item.cdn.ingestionInfo.streamName,
        channelId: item.snippet.channelId,
    }));

    console.log('getStreams()', streams);
    return streams;
}

function getMyChannel() {
    const response = YouTube.Channels.list('id,snippet,statistics,contentDetails', { mine: true });

    if (!response.items || response.items.length === 0) {
        Logger.log('No channel found');
        return;
    }

    const channel = response.items[0];

    console.log(channel);
    return {
        id: channel.id,
        title: channel.snippet.title,
    };
}
