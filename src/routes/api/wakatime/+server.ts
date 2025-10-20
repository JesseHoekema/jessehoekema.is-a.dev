import type { RequestHandler } from '@sveltejs/kit';
import axios from 'axios';
import { WAKATIME_API_KEY } from '$env/static/private';

export const GET: RequestHandler = async () => {
	const apiKey = WAKATIME_API_KEY

	if (!apiKey) {
		return new Response(
			JSON.stringify({ error: 'API Key is missing from environment variables' }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			}
		);
	}

	try {
		const response = await axios.get(
			`https://wakatime.com/api/v1/users/jessiflessi/status_bar/today?api_key=${apiKey}`,
			{
				headers: {
					Authorization: `Bearer ${apiKey}`
				}
			}
		);

		const { hours, minutes } = response.data.data.grand_total;

		return new Response(JSON.stringify({ hours, minutes }), {
			status: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ error: 'Failed to fetch Wakatime stats' }), {
			status: 500,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json'
			}
		});
	}
};
