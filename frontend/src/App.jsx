import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { useEffect } from "react";
import Router from "./Routers/Router";

function App() {

  useEffect(() => {
  console.log("App mounted ✅");
}, []);

  return (
    <>
   
      <Toaster position="top-right" />
     <Router/>
    </>
  );
}

export default App;
