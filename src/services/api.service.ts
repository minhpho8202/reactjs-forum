import { CreateCommunityDTO, CreatePostDTO, LoginDTO, RegisterDTO } from "@/types/api";
import axios from './axios.customize';

const LoginApi = (data: LoginDTO) => {
    const url = "/auth/login";
    return axios.post(url, data);
}

// const LoginGoogleApi = () => {
//     const url = "/auth/google/redirect";
//     return axios.get(url);
// }

const getPostsApi = (page: number) => {
    const url = `/posts?page=${page}`;
    return axios.get(url);
}

const getPostsByCommunityId = (page: number, communityId: number | undefined) => {
    const url = `/communities/${communityId}/posts?page=${page}`;
    return axios.get(url)
}

const registerApi = (dto: RegisterDTO) => {
    const url = "/auth/register"
    return axios.post(url, dto);
}

const createCommunityApi = (dto: CreateCommunityDTO) => {
    const url = "/communities"
    return axios.post(url, dto);
}

const getCommunityByIdApi = (id: number | undefined) => {
    const url = `/communities/${id}`;
    return axios.get(url);
}

const getFollowingCommunitiesApi = () => {
    const url = `/users/following-comunnities`
    return axios.get(url);
}

// const createPostApi = (communityId: string | undefined, dto: CreatePostDTO) => {
//     const url = `/communities/${communityId}/posts`;
//     return axios.post(url, dto);
// }

const createPostApi = (communityId: string | undefined, dto: CreatePostDTO, images: File[]) => {
    const url = `/communities/${communityId}/posts`;
    const formData = new FormData();

    Object.entries(dto).forEach(([key, value]) => {
        formData.append(key, value as string);
    });

    images.forEach((file) => {
        formData.append("images", file);
    });

    return axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};


export {
    LoginApi,
    getPostsApi,
    registerApi,
    createCommunityApi,
    getPostsByCommunityId,
    getCommunityByIdApi,
    getFollowingCommunitiesApi,
    createPostApi
}