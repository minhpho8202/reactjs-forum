import PostCard from "@/components/PostCard";
import { getCommunityByIdApi, getPostsByCommunityId } from "@/services/api.service";
import { ICommunity, IPost } from "@/types/models";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useParams } from "react-router-dom";
import Banner from "/banner.webp";
import Avatar from "/defaultAvatar.png";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription } from "@/components/ui/card";

const Subreddit = () => {
    const [posts, setPosts] = useState<IPost[]>([])
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [community, setCommunity] = useState<ICommunity>();

    const rules = [
        "Be kind and respectful.",
        "No spamming or self-promotion.",
        "Follow the community guidelines.",
    ];


    const { communityId } = useParams();

    const id = communityId ? parseInt(communityId, 10) : undefined;

    const fetchPosts = async (page: number) => {
        if (loading) return;
        setLoading(true);

        try {
            const res = await getPostsByCommunityId(page, id);
            const data = res.data.data;
            const newPosts: IPost[] = data.posts;

            if (newPosts.length === 0) {
                setHasMore(false);
            }

            setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        } catch (error: any) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCommunity = async (id: number | undefined) => {
        try {
            const res = await getCommunityByIdApi(id);
            const data = res.data.data
            setCommunity(data);
            console.log(data);
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchCommunity(id);
    }, []);

    useEffect(() => {
        fetchPosts(page);
    }, [page]);
    return (
        <div className="max-w-[60%] mx-auto flex flex-col items-center gap-x-10 mt-20">
            <div className="w-full">
                <img src={Banner} alt="banner" className="rounded-md" />
                <div className="flex items-center justify-between px-5 relative bottom-4">
                    <div className="flex items-end space-x-2">
                        <img src={Avatar} alt="avatar" className="w-[80px] h-[80px] rounded-full" />
                        <p className="font-bold text-3xl">r/{community?.name}</p>
                    </div>
                    <div className="flex items-end space-x-2 h-[80px]">
                        <Button variant="outline"><Link to="createpost">Create Post</Link></Button>
                        <Button>Join</Button>
                    </div>
                </div>
            </div>
            <Separator />
            <div className="flex mt-5 gap-x-3">
                <div className="w-[65%] flex flex-col gap-y-5">
                    <InfiniteScroll
                        dataLength={posts.length}
                        next={() => setPage((prevPage) => prevPage + 1)}
                        hasMore={hasMore}
                        loader={<p className="text-center">Loading...</p>}
                        endMessage={<p className="text-center">You have seen all posts!</p>}
                    >
                        {posts.map((post) => {
                            const images = post.imageUrl ? post.imageUrl.split(",") : [];
                            return <PostCard key={post.id} post={post} images={images} />;
                        })}
                    </InfiniteScroll>
                </div>
                <div className="w-[35%]">
                    <Card className="py-2 shadow-md rounded-md">
                        <CardContent className="space-y-3">
                            {/* Description */}
                            <p className="text-base leading-relaxed">
                                {community?.description || "No description provided."}
                            </p>

                            <Separator />

                            <CardDescription className="text-sm">
                                <p>
                                    Created by{" "}
                                    <span className="font-semibold">
                                        {community?.user.username || "Unknown"}
                                    </span>
                                </p>
                            </CardDescription>

                            <Separator />

                            <CardDescription className="text-sm flex items-center gap-2">
                                <span className="text-lg font-semibold">
                                    {community?.subscriptionCount || 0}
                                </span>
                                <p>Members</p>
                            </CardDescription>
                            <Separator />
                            <div className="space-y-2">
                                <h3 className="font-bold text-lg">Rules</h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    {rules.map((rule, index) => (
                                        <li key={index} className="text-sm">
                                            {rule}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Subreddit