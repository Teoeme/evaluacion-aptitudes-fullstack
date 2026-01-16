import  {type  INavLink, Icons, type INavAction } from "prometeo-design-system"
// import { Icons } from "prometeo-design-system"
export const links: INavLink[] = [
    {
        path:"/home",
        title:"Home",
        icon:()=>Icons.Home({size:24,className:''}),
        viewAccess:()=>true,
        isView:true,
    },
    {
        path:"/users",
        title:"Usuarios",
        icon:()=>Icons.UserPerson({size:24,className:''}),
        viewAccess:()=>true,
        isView:true,
        
    },

]

export const linkActions:INavAction[] = [    
    {
    title:"Agregar Usuario",
    viewAccess:()=>true,
    action:'agregar-usuario',
    icon:()=>Icons.UserPerson({size:24,className:''}),
    },
]