import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import GenereciLayout from "../../shared/layout/GenereciLayout";

export default function RoutesWrapper() {

    const router = createBrowserRouter([
        {
            path: "/",
            Component: Login,
        },
        {
            path: '/home',
            Component: GenereciLayout,
            children: [
                {
                    index: true,
                    Component: Home,
                },
            ]
        }
    ]);
    return (
        <RouterProvider router={router} />
    )
}



