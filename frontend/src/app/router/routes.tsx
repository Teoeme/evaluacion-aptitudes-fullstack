import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import GenereciLayout from "../../shared/layout/GenereciLayout";
import { lazy } from "react";
import Onboarding from "../../pages/Onboarding/Onboarding";
const Users = lazy(() => import('../../pages/Users/Users'));

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
       
                {
                    // path: '/:_id',
                    // element: <UserId />,
                    // loader: async () => {
                    //const user = await fetcher.get(`/users/${params._id}`);
                    // return user;
                    // }
                },
            ]
        },
        {
            path: '/users',
            Component:GenereciLayout,
            children:[
                {
                    index: true,
                    Component: Users,
                }
            ]
        },
        {
            path:'/onboarding',
            Component:Onboarding
        }


    ]);
    return (
        <RouterProvider router={router} />
    )
}



