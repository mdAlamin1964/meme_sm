import React from "react"
import ReactDOM from 'react-dom/client'
import App from "./src/App"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
    {
        path: '/meme_sm',
        element: <App/>,
    }
])


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)