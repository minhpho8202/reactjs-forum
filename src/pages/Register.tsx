import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form";
import { RegisterDTO } from "@/types/api"
import { registerApi } from "@/services/api.service"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<RegisterDTO>({
        shouldFocusError: false,
    });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (data: RegisterDTO) => {
        try {
            if (data.password !== data.confirmPassword) {
                setError("password", {
                    type: "manual",
                    message: "Password and confirm password do not match.",
                });
            }
            const res = await registerApi(data);
            if (res.data.message === "success") {
                setIsDialogOpen(true);
            }
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
    }
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md p-6 space-y-4 shadow-md border">
                <CardHeader className="space-y-2 text-center">
                    <Link to="/login"><ArrowLeft /></Link>
                    <CardTitle className="text-2xl font-bold">Register</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                        By continuing, you agree to our User Agreement and acknowledge that you understand the Privacy Policy.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="space-y-3">
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
                        <form className="space-y-3" onSubmit={handleSubmit(handleRegister)}>
                            <Input
                                {...register("username", {
                                    minLength: {
                                        value: 2,
                                        message: "Username must be at least 2 characters long",
                                    },
                                    maxLength: {
                                        value: 8,
                                        message: "Username must be no more than 8 characters long",
                                    },
                                })}
                                placeholder="Username"
                            />
                            <Input
                                {...register('password', {
                                    minLength: {
                                        value: 2,
                                        message: 'Password must be at least 2 characters long',
                                    },
                                    maxLength: {
                                        value: 8,
                                        message: 'Password must be no more than 8 characters long',
                                    },
                                })}
                                type="password"
                                placeholder="Password"
                            />
                            <Input
                                {...register('confirmPassword', {
                                    minLength: {
                                        value: 2,
                                        message: 'Confirm password must be at least 2 characters long',
                                    },
                                    maxLength: {
                                        value: 8,
                                        message: 'Confirm password must be no more than 8 characters long',
                                    },
                                })}
                                type="password"
                                placeholder="Confirm Password"
                            />
                            <Input {...register('email', { required: true })}
                                type="email"
                                placeholder="Email"
                                autoComplete="email" />
                            <Button className="w-full" type="submit" disabled={isSubmitting || !watch("username") || !watch("password") || !watch("confirmPassword") || !watch("email")}>
                                Register
                            </Button>
                        </form>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <span className="text-[14px]">
                            Already a redditor ?
                            <Link to="/login">
                                <span className="text-[14px] text-blue-500 cursor-pointer">
                                    {" "}Log In
                                </span>
                            </Link>
                        </span>
                    </div>
                    <div className="flex items-center">
                        <hr className="flex-grow border-t border-gray-600" />
                        <span className="mx-4 text-sm text-gray-400">OR</span>
                        <hr className="flex-grow border-t border-gray-600" />
                    </div>
                    <Button variant="secondary" className="w-full">
                        <img
                            src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                            alt="Google Logo"
                            className="w-5 h-5"
                        />
                        Log in with Google
                    </Button>
                </CardContent>
            </Card>
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Check Your Email</AlertDialogTitle>
                        <AlertDialogDescription>
                            A confirmation email has been sent to your inbox. Please confirm your email to complete the registration process.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => { setIsDialogOpen(false); navigate("/login") }}>
                            OK
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default Register