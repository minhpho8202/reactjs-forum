import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, Dot, DotIcon, MessageCircle, ShareIcon } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Link } from "react-router-dom"
import { IPost } from "@/types/models"
import { formatDistanceToNow } from 'date-fns';

const PostCard = ({ post, images }: { post: IPost; images: string[] }) => {
    console.log(post)
    return (
        <Card className="flex flex-col rounded-lg shadow-md overflow-hidden mb-3">
            <div className="flex flex-col p-4">
                {/* Header */}
                <div className="flex items-center gap-x-2 mb-2 text-xs text-muted-foreground">
                    <Link className="font-semibold text-sm text-primary" to={`/r/${post?.communityId}`}>
                        r/{post?.community?.name}
                    </Link>
                    <div className="flex items-center">
                        <p>
                            Posted by: <span className="hover:text-primary cursor-pointer">{post?.user?.username}</span>
                        </p>
                        <DotIcon />
                        <p>{post?.createdAt && formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
                    </div>
                </div>

                {/* Title */}
                <div className="mb-1">
                    <Link to="/r/name/1">
                        <h1 className="font-semibold text-lg hover:underline">{post?.title}</h1>
                    </Link>
                </div>

                {/* Content */}
                <div className="mb-3 text-sm text-muted-foreground">
                    <p className="line-clamp-3" dangerouslySetInnerHTML={{ __html: post?.content }} />
                </div>

                {/* Image */}
                {images.length > 0 && (
                    <div className="relative overflow-hidden rounded-lg mb-3">
                        <Carousel>
                            <CarouselContent>
                                {images.map((image, index) => (
                                    <CarouselItem key={index}>
                                        <div className="relative">
                                            <img
                                                src={image}
                                                alt={`Image ${index + 1}`}
                                                width={500}
                                                height={300}
                                                className="object-contain w-full h-[540px] bg-black"
                                            />
                                            {images.length > 1 && (
                                                <div className="absolute top-2 right-2 bg-gray-50 bg-opacity-50 text-white text-xs rounded-lg px-2 py-1">
                                                    {`${index + 1} / ${images.length}`}
                                                </div>
                                            )}
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            {images.length > 1 && (<>
                                <CarouselPrevious className="absolute top-1/2 left-2" />
                                <CarouselNext className="absolute top-1/2 right-2" />
                            </>
                            )}
                        </Carousel>
                    </div>
                )}

                {/* Footer */}
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <div className="flex items-center gap-x-4">
                        <div className="flex items-center gap-x-1">
                            <form action="" className="flex items-center">
                                <Button variant="outline" size="sm" className="h-6 w-6 p-1 rounded-lg">
                                    <ArrowUp className="h-4 w-4" />
                                </Button>
                            </form>
                            <p className="mx-1">0</p>
                            <form action="" className="flex items-center">
                                <Button variant="outline" size="sm" className="h-6 w-6 p-1 rounded-lg">
                                    <ArrowDown className="h-4 w-4" />
                                </Button>
                            </form>
                        </div>

                        <div className="flex items-center gap-x-1">
                            <MessageCircle className="h-4 w-4 text-muted-foreground" />
                            <p className="text-muted-foreground font-medium text-xs">
                                0 Comments
                            </p>
                        </div>

                        <div className="flex items-center gap-x-1">
                            <ShareIcon className="h-4 w-4 text-muted-foreground" />
                            <p className="text-muted-foreground font-medium text-xs">
                                Share
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

    )
}

export default PostCard