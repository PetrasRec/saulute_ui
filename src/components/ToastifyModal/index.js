import React from "react";


const toastModal = ({ message }) => (
    <>
        <div className="white-space:nowrap"><img src="/img/happy.png" width="50px" height="50px" /> | <span> {message} </span></div>
        
    </>
);


export default toastModal;