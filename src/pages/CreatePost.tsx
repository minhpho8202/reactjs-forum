import { UserContext } from "@/App";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import hero from "/hero.png"
import { ImageIcon, Text } from "lucide-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from "react-hook-form";
import { CreatePostDTO } from "@/types/api";
import { createPostApi } from "@/services/api.service";

const CreatePost = () => {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const { currentUser } = useContext(UserContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        setError,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<CreatePostDTO>({
        shouldFocusError: false,
    });
    const { communityId } = useParams()

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser, navigate]);

    const rules = [
        "Rule 1: Title must not exceed 50 characters.",
        "Rule 2: Content must not exceed 1000 characters.",
        "Rule 3: Be respectful to others.",
        "Rule 4: No spam or self-promotion.",
        "Rule 5: Follow the subreddit theme.",
        "Rule 6: Use appropriate language.",
        "Rule 7: Report rule violations to mods."
    ];

    const onSubmit = async (data: CreatePostDTO) => {
        console.log(data);
        try {
            const res = await createPostApi(communityId, data, selectedImages);
            console.log(res);
            navigate(`/r/${communityId}`)
        } catch (error: any) {
            console.log(error)
            if (error.response && error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError("root", {
                    type: "manual",
                    message: errorMessage,
                });
            } else {
                setError("root", {
                    type: "manual",
                    message: "Something went wrong",
                });
            }
        }
    };

    return (
        <div className="max-w-[60%] mx-auto flex gap-x-10 mt-20 items-start">
            <div className="w-[65%] flex flex-col gap-y-5">
                <Card className="p-4 space-y-2">
                    <Tabs defaultValue="post" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="post"><Text className="h-4 w-4 mr-2" />Post</TabsTrigger>
                            <TabsTrigger value="image"><ImageIcon className="h-4 w-4 mr-2" />Image</TabsTrigger>
                        </TabsList>
                        <TabsContent value="post">
                            <Card>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {Object.entries(errors).map(([field, error]) => {
                                        if (error.message) {
                                            return (
                                                <div key={field} className="text-red-500 bg-red-100 text-sm text-center border p-2 rounded-md">
                                                    {error.message}
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                    <CardHeader>
                                        <Label>Title</Label>
                                        <Input
                                            {...register("title", {
                                                required: "Title is required",
                                                maxLength: { value: 50, message: "Title must be no more than 50 characters long" },
                                                minLength: { value: 5, message: "Title must be at least 5 characters long" }
                                            })}
                                        />
                                        <Label>Content</Label>
                                        <ReactQuill
                                            theme="snow"
                                            value={watch("content")}
                                            onChange={(value) => {
                                                setValue("content", value);
                                            }}
                                            defaultValue="Content"
                                        />
                                    </CardHeader>
                                    <CardFooter>
                                        <Button type="submit" disabled={isSubmitting || !watch("title") || !watch("content")}>Create Post</Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </TabsContent>
                        <TabsContent value="image">
                            <Card>
                                <CardHeader>
                                    <div
                                        className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors relative"
                                    >
                                        <Input
                                            type="file"
                                            accept="image/jpeg,image/png,image/gif"
                                            multiple
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            onChange={(e) => {
                                                const files = Array.from((e.target as HTMLInputElement).files || []);
                                                setSelectedImages(files);
                                                console.log("Selected files:", files);
                                            }}
                                        />
                                        <p className="text-gray-600 pointer-events-none">
                                            Drag and drop an image here, or{" "}
                                            <span className="text-blue-500 underline">click to select one</span>
                                        </p>
                                    </div>
                                </CardHeader>
                                <div className="p-4">
                                    <p className="text-sm text-gray-500">
                                        Supported formats: JPG, PNG, GIF. Max size: 2MB.
                                    </p>
                                </div>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </Card>
            </div>
            <div className="w-[35%]">
                <Card className="flex flex-col p-4">
                    <div className="flex items-center gap-x-2">
                        <img
                            src={hero}
                            alt="hero"
                            className="w-10 h-10"
                        />
                        <h1 className="font-medium">Posting rules</h1>
                    </div>
                    <Separator className="mt-2" />

                    <div className="flex flex-col gap-y-5 mt-5">
                        {rules.map((rule, index) => (
                            <div key={index}>
                                <p className="text-sm font-medium">{`${rule}`}</p>
                                <Separator className="mt-2" />
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default CreatePost