import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { LoginApi } from "@/services/api.service"
import { ITokens } from "@/types/api"
import { IUser } from "@/types/models"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useCookies } from 'react-cookie'
import { ArrowLeft } from "lucide-react"

const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token', 'user'])

    const handleLogin = async () => {
        setLoading(true);
        try {
            const res = await LoginApi({ username, password });
            const user: IUser = res?.data?.data?.user;
            const tokens: ITokens = res?.data.data?.tokens
            const accessTokenExpiresAt = new Date(Date.now() + tokens.accessTokenExpiresIn * 1000);
            const refreshTokenExpiresAt = new Date(Date.now() + tokens.refreshTokenExpiresIn * 1000);
            // setCookie('access_token', tokens?.accessToken, { path: '/', expires: accessTokenExpiresAt });
            // setCookie('refresh_token', tokens?.refreshToken, { path: '/', expires: refreshTokenExpiresAt });
            // setCookie('user', user, { path: '/', expires: refreshTokenExpiresAt });
            localStorage.setItem("access_token", tokens?.accessToken);
            localStorage.setItem("refresh_token", tokens?.refreshToken);
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/");
        } catch (error: any) {
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    // const handleLoginGoogle = async (response: any) => {
    //     console.log(response);
    //     const apiResponse = await LoginGoogleApi(response.credential);
    //     console.log(apiResponse);
    // };
    // const handleLoginGoogleFailed = async () => {
    //     console.log('w');
    // };
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md p-6 space-y-4 shadow-md border">
                <CardHeader className="space-y-2 text-center">
                    <Link to="/"><ArrowLeft /></Link>
                    <CardTitle className="text-2xl font-bold">Log In</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                        By continuing, you agree to our User Agreement and acknowledge that you understand the Privacy Policy.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    {error && (
                        <div className="text-red-500 bg-red-100 text-sm text-center border p-2 rounded-md">
                            {error}
                        </div>
                    )}
                    <div className="space-y-3">
                        <Input placeholder="Username" className="w-full" value={username} onChange={(e) => { setUsername(e.target.value); setError(null); }} />
                        <Input type="password" placeholder="Password" className="w-full" value={password} onChange={(e) => { setPassword(e.target.value); setError(null); }} />
                        <Button className="w-full" onClick={handleLogin} disabled={loading || !username || !password}>
                            {loading ? "Logging in..." : "Log In"}
                        </Button>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <Link to="/forgotpassword"><span className="text-[14px] text-blue-500 cursor-pointer">Forgot password ?</span></Link>
                        <span className="text-[14px]">
                            New to this forum ?
                            <Link to="/register">
                                <span className="text-[14px] text-blue-500 cursor-pointer">
                                    {" "}Register
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
                    {/* <GoogleLogin
                        onSuccess={handleLoginGoogle}
                        onError={handleLoginGoogleFailed}
                    /> */}
                </CardContent>
            </Card>
        </div>
    )
}

export default Login