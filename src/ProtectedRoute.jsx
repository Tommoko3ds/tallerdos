import React from "react";
import { Navigate,Outlet } from "react-router-dom";

// let isLoggedIn = false;
// export function cambiarStatusLogin(acceso){
//   console.log("Acceso ----> antes: " + acceso);
//   if(acceso===1){
//     isLoggedIn = true;
//   }
//   else{isLoggedIn = false;}
//   console.log("Acceso ----> despues : " + acceso);
// }
export const ProtectedRoute = ({ isLoggedIn, redirectPath = '/' }) => {

 if (!isLoggedIn) {
  return <Navigate to={redirectPath} replace />
 }
 return <Outlet></Outlet>
};



export const ProtectedRouteLogin = ({ isLoggedIn,redirectPath = "/Home/:id" }) => {


 if (isLoggedIn) {
  return <Navigate to={redirectPath} replace />
 }
 
 
 return <Outlet></Outlet>
};


export const ProtectedAdmin = ({ rol,redirectPath = "/Home/:id" }) => {


    if (!rol) {
     return <Navigate to={redirectPath} replace />
    }
    
    
    return <Outlet></Outlet>
   };