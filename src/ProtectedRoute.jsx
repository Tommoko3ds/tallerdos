import React from "react";
import { Navigate,Outlet } from "react-router-dom";
let isLoggedIn = false;
export function cambiarStatusLogin(acceso){
  console.log("Acceso ----> " + acceso);
  if(acceso==1){
    isLoggedIn = true;
  }
}

export const ProtectedRoute = ({ redirectPath = '/' }) => {

  console.log("-----> " + isLoggedIn);
 if (!isLoggedIn) {
  return <Navigate to={redirectPath} replace />
 }
 
 return <Outlet></Outlet>
};



export const ProtectedRouteLogin = ({ redirectPath = "/Home/:id" }) => {


 if (isLoggedIn) {
  return <Navigate to={redirectPath} replace />
 }
 
 return <Outlet></Outlet>
};


