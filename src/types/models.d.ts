export interface IUser {
    id: number | null;
    username: string | null;
    email: string;
    role: string;
    bio: string | null;
    profilePicture: string | null;
}

export interface IPost {
    id: number;
    title: string;
    content: string;
    url: string | null;
    userId: number;
    imageUrl: string | null;
    createdAt: string;
    updatedAt: string;
    upvotes: number;
    downvotes: number;
    communityId: number;
    user: IUser;
    community: {
        name: string;
    }
}

export interface ICommunity {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    subscriptionCount: number;
    user: {
        username: string;
    }
}