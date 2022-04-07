import React from "react";


const toastModal = ({ message }) => (
    <>
        <div className="white-space:nowrap"><span className="material-icons"> warning </span>  <span> {message} </span></div>  
    </>
);


export default toastModal;