import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Router from "./Routers/Router";
function App() {
  return (
    <>
      <Toaster position="top-right" />
     <Router/>
      
    </>
  );
}

export default App;
