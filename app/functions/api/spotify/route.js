import axios from 'axios';

export const runtime = 'edge';

export async function POST(req) {
 
    // Access environment variables from the env object
    const SPOTIFY_CLIENT_ID = env.SPOTIFY_CLIENT_ID;
    const SPOTIFY_CLIENT_SECRET = env.SPOTIFY_CLIENT_SECRET;
    const SPOTIFY_REFRESH_TOKEN = env.SPOTIFY_REFRESH_TOKEN;

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

    // Step 2: Fetch now playing track
    const nowPlayingResponse = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const nowPlayingData = nowPlayingResponse.status === 204 ? null : nowPlayingResponse.data;

    // Step 3: Fetch top tracks
    const topTracksResponse = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        limit: 10, // You can adjust the limit as needed
      },
    });

    const topTracksData = topTracksResponse.data.items;

    // Step 4: Return the combined data
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
    console.error('Error fetching Spotify API:', error);
    return new Response(
      JSON.stringify({ error: error.response?.data?.error || 'Internal Server Error' }),
      {
        status: error.response?.status || 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}