import PostCard from "@/components/PostCard"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Link } from "react-router-dom"
import Banner from "/banner.webp";
import Hello from "/hello.png";
import { useEffect, useState } from "react"
import { getPostsApi } from "@/services/api.service"
import { IPost } from "@/types/models"
import InfiniteScroll from 'react-infinite-scroll-component';
import CreateSubreddit from "./CreateSubreddit"

const Home = () => {
    const [posts, setPosts] = useState<IPost[]>([])
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const fetchData = async (page: number) => {
        if (loading) return;
        setLoading(true);

        try {
            const res = await getPostsApi(page);
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

    useEffect(() => {
        fetchData(page);
    }, [page]);
    return (
        <div className="max-w-[60%] mx-auto flex gap-x-3 mt-20">
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
                <Card>
                    <img
                        src={Banner}
                        alt="banner"
                        className="rounded-t-md"
                    />
                    <div className="p-2">
                        <div className="flex items-center">
                            <img src={Hello}
                                alt="hello"
                                className="w-20 h-20 -mt-6"
                            />
                            <h1 className="font-medium pl-3">Home</h1>
                        </div>
                        <p className="text-sm text-muted-foreground pt-2">
                            Your home page. Come here to check in with your favorite communities
                        </p>
                        <Separator className="my-5" />
                        <div className="flex flex-col gap-y-3">
                            <Button><CreateSubreddit /></Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Home