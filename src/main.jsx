import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router";
import { router } from './router/router.jsx';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './Context/AuthProvider/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
    <RouterProvider router={router} />
    <ToastContainer position="top-right" />
   </AuthProvider>
  </StrictMode>,
)
