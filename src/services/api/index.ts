import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.zweep.co/',
    timeout: 5000,
});

const postShort = async (redirectTo: string) => {
    try {
        const response = await axiosInstance.post('/short', {
            redirectTo
        })


        if (!response.data) return null;

        return `https://zweep.co/${response.data.url}`;
    } catch (error) {
        throw new Error('Could not get data');
    }
}

const getLongUrl = async (key: string) => {
    return await axiosInstance
        .get(`/short/${key}`)
        .then((result) => {
            const { redirectTo } = result.data;
            if (!redirectTo) {
                Promise.reject('No short found');
            }
            return redirectTo;
        })
        .catch(() => {
            return {};
        });
}

export {
    postShort,
    getLongUrl
}
