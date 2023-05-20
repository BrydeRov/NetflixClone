import React from 'react'
import ReactDOM from 'react-dom/client'

import './assets/css/mains.css'

// Pages
import AppLayout from './Pages/Layouts/AppLayout'
import MoviesHome from './Pages/Movies/Index'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
  },
  {
    path: "/Home",
    element: <MoviesHome />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
