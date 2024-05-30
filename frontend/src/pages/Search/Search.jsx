import React, { useState } from "react";
import Topbar from "../../components/Topbar/Topbar";
import ImportImage from "../../components/ImportImage/ImportImage";
export default function Search() {
    return(
        <div className="wrapper">
        <Topbar/>
        <ImportImage/>
        </div>
    );
}