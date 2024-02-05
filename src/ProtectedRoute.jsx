import React from "react";
import { Navigate,Outlet } from "react-router-dom";


export const ProtectedRoute = ({ isLoggedIn, redirectPath = '/' }) => {

 if (!isLoggedIn) {
  return <Navigate to={redirectPath} replace />
 }
 return <Outlet></Outlet>
};



export const ProtectedRouteLogin = ({isLoggedIn, redirectPath = "/Home/:id" }) => {


 if (isLoggedIn) {
  return <Navigate to={redirectPath} replace />
 }
 
 return <Outlet></Outlet>
};


