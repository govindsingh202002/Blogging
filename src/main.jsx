import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import {store} from './store/store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import Login from './components/Login.jsx';
import Protect from './components/Container/Protect.jsx';
import AddPost from "./Pages/AddPost.jsx";
import Signup from './Pages/signup.jsx'
import EditPost from "./Pages/EditPost";
import Post from "./Pages/Post";
import AllPosts from "./Pages/AllPost.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <Protect authentication={false}>
                    <Login />
                </Protect>
            ),
        },
        {
            path: "/signup",
            element: (
                <Protect authentication={false}>
                    <Signup />
                </Protect>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <Protect authentication>
                    {" "}
                    <AllPosts />
                </Protect>
            ),
        },
        {
            path: "/add-post",
            element: (
                <Protect authentication>
                    {" "}
                    <AddPost />
                </Protect>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <Protect authentication>
                    {" "}
                    <EditPost />
                </Protect>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(


  <React.StrictMode>
    <Provider store={store}>
     <RouterProvider router={router} />
     </Provider>
  </React.StrictMode>,
)
