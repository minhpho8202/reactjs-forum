export interface LoginDTO {
    username: string;
    password: string;
}

export interface ITokens {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn: number;
}

export interface RegisterDTO {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
}

export interface CreateCommunityDTO {
    name: string;
    description: string;
}

export interface CreatePostDTO {
    title: string;
    content: string;
}