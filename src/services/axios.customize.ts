import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL
})

instance.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem("access_token")

    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const rt = localStorage.getItem("refresh_token");
                const response = await axios.post('/auth/refresh-token', { rt });
                const { accessToken, refreshToken } = response.data.data;

                localStorage.setItem("access_token", accessToken);
                localStorage.setItem("refresh_token", refreshToken);

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axios(originalRequest);
            } catch (error) {
            }
        }

        return Promise.reject(error);
    }
);

// instance.interceptors.response.use(function (response) {
//     return response;
// }, function (error) {
//     return Promise.reject(error);
// });


// const authAxios = axios.create({
//     baseURL: import.meta.env.VITE_BACKEND_URL,
//     headers: {
//         "Content-Type": "application/json",
//     }
// });

// authAxios.interceptors.request.use(
//     (config) => {
//         const token = cookies.access_token;
//         if (token) {
//             config.headers["Authorization"] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

export default instance;
// export { authAxios };