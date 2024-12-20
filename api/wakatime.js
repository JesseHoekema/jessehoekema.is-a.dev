const axios = require('axios');

// This function is executed when the endpoint is called
module.exports = async (req, res) => {
    const apiKey = process.env.WAKATIME_API_KEY;

    try {
        // Make the request to Wakatime API
        const response = await axios.get(`https://wakatime.com/api/v1/users/jessiflessi/status_bar/today?api_key=${apiKey}`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        // Return the API response to the client
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch Wakatime stats' });
    }
};
