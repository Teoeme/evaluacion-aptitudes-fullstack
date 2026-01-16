import type { PyrionLayoutProps } from "prometeo-design-system/PyrionLayout";
import Home from "prometeo-design-system/Icons/Home";

export const links:PyrionLayoutProps<any, any>['links'] = [
    {
        title: "Inicio",
         path: "/home",
        icon: Home,
    },
]