import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from './App.jsx'
import Thanks from "./thanks.jsx";
import Pending from './pending.jsx';
import Error from './error.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/thanks",
        element: <Thanks />,
    },
    {
        path: "/pending",
        element: <Pending />,
    },
    {
        path: "/error",
        element: <Error />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);