import React from 'react'
import ReactDOM from 'react-dom/client'

import './assets/css/mains.css'

// Pages
import AppLayout from './Pages/Layouts/AppLayout'
import MoviesHome from './Pages/Movies/Index'
import TVHome from './Pages/TV/Index'

import { Box } from '@chakra-ui/react'

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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
