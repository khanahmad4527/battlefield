import React from "react";
import { Route, Routes } from "react-router-dom";
import Game from "./Game";
import PageNotFound from "./PageNotFound";
import Home from "./HomePage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AllRoutes;
