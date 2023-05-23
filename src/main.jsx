import React from 'react'
import ReactDOM from 'react-dom/client'

import './assets/css/mains.css'

// Pages
import AppLayout from './Pages/Layouts/AppLayout'
import MoviesHome from './Pages/Movies/Index'
import TVHome from './Pages/TV/Index'
import MiLista from './Pages/MiLista'

import 'bootstrap-icons/font/bootstrap-icons.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const theme = {
  semanticTokens: {
    colors: {
      "background.pressed.base": { default: "blue.800", _dark: "blue.300" },
      "background.pressed.subtle": { default: "blue.300", _dark: "blue.700" },
    },
  },
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
  },
  {
    path: "/Movies",
    element: <MoviesHome />
  },
  {
    path: '/TV',
    element: <TVHome />
  },
  {
    path: '/MiLista',
    element: <MiLista />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode className="bg-dark">
    <RouterProvider router={router} />
  </React.StrictMode>,
)
