import React from "react";  
import "./style.css";
import { ToastContainer } from "react-toastify";

const MainContainer = ({ children, px, py, fullWidth }) => (
    <>
        <ToastContainer 
            enableMultiContainer
            closeOnClick
            position="bottom-right"
            autoClose={5000} 
        />
        <div className={`container ${py ? `py-${py}` : ""} ${px ? `px-${px}` : ""} ${fullWidth ? "full-width" : ""}`}>
            { children }
        </div>
    </>
);


export default MainContainer;