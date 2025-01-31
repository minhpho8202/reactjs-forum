import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { CreateCommunityDTO } from "@/types/api";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { createCommunityApi } from "@/services/api.service";
import { UserContext } from "@/App";

const CreateSubreddit = () => {
    const { currentUser } = useContext(UserContext);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<CreateCommunityDTO>({
        shouldFocusError: false,
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

    const handleCreate = async (data: CreateCommunityDTO) => {
        if (!currentUser) {
            navigate("/login");
        }
        try {
            const res = await createCommunityApi(data);
            console.log(res.data);
            if (res.data.message === "success") {
                setIsDialogOpen(false);
                setIsAlertDialogOpen(true);
            }
        } catch (error: any) {
            console.log(error)
            if (error.response && error.response.data.message) {
                const errorMessage = error.response.data.message;
                setError("root", {
                    type: "manual",
                    message: `${errorMessage}\n`,
                });
            } else {
                setError("root", {
                    type: "manual",
                    message: "Something went wrong",
                });
            }
        }
    }
    return (
        <div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger className="w-full">Create a Community</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tell us about your community</DialogTitle>
                        <DialogDescription>
                            A name and description help people understand what your community is all about.
                        </DialogDescription>
                    </DialogHeader>
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
                    <form className="space-y-3" onSubmit={handleSubmit(handleCreate)}>
                        <Input
                            {...register("name", {
                                minLength: {
                                    value: 5,
                                    message: "Name must be at least 5 characters long",
                                },
                                maxLength: {
                                    value: 8,
                                    message: "Name must be no more than 8 characters long",
                                },
                                validate: (value) => {
                                    if (/\s/.test(value)) {
                                        return "Name cannot contain spaces";
                                    }
                                    return true;
                                },
                            })}
                            placeholder="Name"
                        />
                        <Textarea className="min-h-[150px]"
                            {...register('description', {
                                minLength: {
                                    value: 5,
                                    message: 'Description must be at least 5 characters long',
                                },
                                maxLength: {
                                    value: 8,
                                    message: 'Description must be no more than 8 characters long',
                                },
                            })}
                            placeholder="Description"
                        />

                        <Button className="w-full" type="submit" disabled={isSubmitting || !watch("name") || !watch("description")}>
                            Create
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
            <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Notification</AlertDialogTitle>
                        <AlertDialogDescription>
                            Your community is created
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => { setIsDialogOpen(false) }}>
                            OK
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default CreateSubreddit