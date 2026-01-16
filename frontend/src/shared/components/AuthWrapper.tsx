import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../../app/providers/auth/authActions";
import { type AppDispatch, type RootState } from "../../app/store/store";
import { useTokenRevalidation } from "../hooks/useTokenRevalidation";
interface AuthWrapperProps {
  children: React.ReactNode;
  fallbackComponent?: React.ReactNode;
  fallbackFunction?: () => void;
}

export default function AuthWrapper({
  children,
  fallbackComponent,
  fallbackFunction,
}: AuthWrapperProps) {
 
  const {isAuthenticated,loading} = useSelector((state: RootState)=>state.auth)

  const dispatcher = useDispatch<AppDispatch>();

  useTokenRevalidation() //Inicializar revalidacion automatica


  useEffect(() => { //Validar al montar la aplicacion
      dispatcher(authActions.verifyToken());
      dispatcher(authActions.whoAmI());
  }, [dispatcher]);
  
  useEffect(()=>{
    if (!isAuthenticated && !loading && fallbackFunction) {
      fallbackFunction();
    }
  },[isAuthenticated, loading, fallbackFunction])
  
  if (!isAuthenticated && fallbackComponent) {  
    return <>{fallbackComponent}</>;
  }

  return isAuthenticated ? <>{children}</> : null;

}
