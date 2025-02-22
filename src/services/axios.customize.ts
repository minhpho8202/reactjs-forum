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
                const refreshToken = localStorage.getItem("refresh_token");
                console.log(refreshToken, "xxrt");
                if (!refreshToken) throw new Error("No refresh token");

                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/refresh-token`, { refreshToken });

                const { accessToken, refreshToken: newRefreshToken } = response.data.data;

                localStorage.setItem("access_token", accessToken);
                localStorage.setItem("refresh_token", newRefreshToken);

                originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
                return axios(originalRequest);
            } catch (err) {
                console.error("Refresh token expired or invalid, logging out...");
                localStorage.removeItem("user");
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                window.location.href = "/login";
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