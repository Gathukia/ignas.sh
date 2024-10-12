import axios from 'axios';

export const runtime = 'edge';

export async function POST(req, env, ctx) {
    // Access environment variables from the env object
    const SPOTIFY_CLIENT_ID = env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const SPOTIFY_CLIENT_SECRET = env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
    const SPOTIFY_REFRESH_TOKEN = env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN;

    // Log the values for debugging
    console.log('Spotify Client ID:', SPOTIFY_CLIENT_ID); // Debugging log
    console.log('Spotify Refresh Token:', SPOTIFY_REFRESH_TOKEN); // Debugging log

    // Check if required environment variables are missing
    if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
        console.error('Missing Spotify API credentials');
        return new Response(JSON.stringify({ error: 'Missing Spotify API credentials' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Encode the client ID and client secret for the Authorization header
    const authString = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');

    try {
        // Step 1: Get access token using the refresh token
        const body = new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: SPOTIFY_REFRESH_TOKEN,
        });

        const tokenResponse = await axios.post(
            'https://accounts.spotify.com/api/token',
            body.toString(),
            {
                headers: {
                    Authorization: `Basic ${authString}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        const accessToken = tokenResponse.data.access_token;
        console.log('Access Token:', accessToken); // Log the access token for debugging

        // Step 2: Fetch now playing track
        const nowPlayingResponse = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        // If no track is playing, Spotify returns a 204 status
        const nowPlayingData = nowPlayingResponse.status === 204 ? null : nowPlayingResponse.data;
        console.log('Now Playing Response:', nowPlayingResponse.status, nowPlayingData); // Log for debugging

        // Step 3: Fetch top tracks
        const topTracksResponse = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                limit: 10, // Limit of tracks fetched (you can adjust this)
            },
        });

        const topTracksData = topTracksResponse.data.items;
        console.log('Top Tracks Response:', topTracksData); // Log for debugging

        // Step 4: Return the combined data (now playing + top tracks)
        return new Response(
            JSON.stringify({
                nowPlaying: nowPlayingData,
                topTracks: topTracksData,
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );

    } catch (error) {
        // Log detailed error information for easier debugging
        console.error('Error fetching Spotify API:', error.response?.data || error.message);

        // Return the error message from Spotify if available
        return new Response(
            JSON.stringify({
                error: error.response?.data?.error || 'Internal Server Error',
                message: error.message,
                status: error.response?.status || 500,
            }),
            {
                status: error.response?.status || 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}
