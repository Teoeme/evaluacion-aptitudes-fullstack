import { useSelector } from "react-redux"
import { useCallback, useMemo } from "react"
import { Roles, RolUsuario, type TipoRol } from "../../../entities/roles/Role"
import type { RootState } from "../../../app/store/store"

export const useUser = () => {

    const {usuario,loading} = useSelector((state: RootState) => state.auth)

    const rolUsuario=useMemo(()=>new RolUsuario(usuario?.rol || Roles.CONDUCTOR),[usuario])

    const esAlMenos=useCallback((role:TipoRol)=>{
        if(!usuario) return false
        return rolUsuario.isAtLeast(role)
    },[usuario])
    
    return {
        usuario,
        esAlMenos,
        loading
    }
}