import axios from 'axios';

const options = {
    method: 'GET',
    url: 'https://youtube-v2.p.rapidapi.com/audio/videos/continuation',
    headers: {
        'x-rapidapi-key': '3bf8bf1c6bmshdfd9cc52ddc72e6p1b74a6jsn59dca89b54c6',
        'x-rapidapi-host': 'youtube-v2.p.rapidapi.com'
    },
    params: {
        audio_id: '8gVbCk4SPwoLeXo4TlN2bUFhRHcSC3l6OE5Tdm1BYUR3Ggt4bl9ob1RQS0pzUSIKEggIOxDA_4zNAyoKEggIOxDA_4zNAxoLeG5faG9UUEtKc1EogZKBocKFmYSVAQ%3D%3D',
        continuation_token: '4qmFsgL5AhIRRkVzZnZfYXVkaW9fcGl2b3QaxAJDQkI2a0FGRFFtTlJRa0p3UlhWbldrSkRhamhMUXpOc05rOUZOVlJrYlRGQ1dWVlNNMFZuZERWbGFtaFBWVE5hZEZGWFJrVmtlRzlNWlVjMVptRkhPVlZWUlhSTFl6RkZhVU5vU1VsRFJITlJkMUF0VFhwUlRYRkRhRWxKUTBSelVYZFFMVTE2VVUxcFJWRnZVRTVFYjNoT2VrVjVUbFJOTTAxRVdYcE9SRkY0UzJjd1MwTjZWbXRaTTFwTFZWVldkazF0UmxieUJWc0tUaElfQ2d0NWVqaE9VM1p0UVdGRWR4SUxlWG80VGxOMmJVRmhSSGNhQzNodVgyaHZWRkJMU25OUklnb1NDQWc3RU1EX2pNMERLZ29TQ0FnN0VNRF9qTTBER2d0NGJsOW9iMVJRUzBwelVTaUJrb0dod29XWmhKVUKaAhxicm93c2UtZmVlZEZFc2Z2X2F1ZGlvX3Bpdm90'
    }
};

export const fetchDataFromApi = async () => {
    try {
        const response = await axios.request(options);
        const data = response.data;
        console.log('API Response Data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
