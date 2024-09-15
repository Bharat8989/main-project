import axios from 'axios';

export const fetchDataFromApi = async (url) => {
    const options = {
        headers: {
            'x-rapidapi-key': import.meta.env.REACT_APP_YOUTUBE_API_KEY, // Corrected environment variable name
            'x-rapidapi-host': 'youtube138.p.rapidapi.com',
        },
    };

    try {
        const { data } = await axios.get(url, options);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

// const req = http.request(options, function (res) {
// 	const chunks = [];

// 	res.on('data', function (chunk) {
// 		chunks.push(chunk);
// 	});

// 	res.on('end', function () {
// 		const body = Buffer.concat(chunks);
// 		console.log(body.toString());
// 	});
// });

// req.end();