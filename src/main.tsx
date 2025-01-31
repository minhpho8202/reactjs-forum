import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Subreddit from './pages/Subreddit.tsx'
import Login from './pages/Login.tsx'
import { ThemeProvider } from './components/ThemeToggle.tsx'
import Register from './pages/Register.tsx'
import ForgotPassword from './pages/ForgotPassword.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Home from './pages/Home.tsx'
import CreateSubreddit from './pages/CreateSubreddit.tsx'
import CreatePost from './pages/CreatePost.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "r/:communityId",
        element: <Subreddit />,
      },
      {
        path: "r/:communityId/createpost",
        element: <CreatePost />,
      },
      {
        path: "r/create",
        element: <CreateSubreddit />
      },
    ],
  },
  {
    path: "/login",
    element: <Login />
    // element: <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}><Login /></GoogleOAuthProvider>
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
