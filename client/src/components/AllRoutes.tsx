import React from "react";
import { Route, Routes } from "react-router-dom";
import Game from "./Game";
import PageNotFound from "./PageNotFound";
import Home from "./HomePage";
import Help from "./Help";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
      <Route path="/help" element={<Help/>} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AllRoutes;
