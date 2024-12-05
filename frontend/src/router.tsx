import { createBrowserRouter } from "react-router-dom";
import Login, { loginAction } from "./features/identity/components/login";
import Register, { registerAction } from "./features/identity/components/register";
import IdentityLayout from "./layouts/identity-layout";
import MainLayout from "./layouts/main-layout";
import NoteDetail from "./pages/note-detail"; // وارد کردن کامپوننت NoteDetail

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
  },
  {
    element: <IdentityLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
        action: loginAction,
        errorElement: <Login />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
        errorElement: <Register />,
      },
    ],
  },
  {
    path: "/notes/:id", // افزودن مسیر برای جزئیات نوت
    element: <NoteDetail />, // کامپوننت مربوط به نمایش جزئیات نوت
  },
]);

export default router;
