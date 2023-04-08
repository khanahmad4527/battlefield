import React from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      HomePage
      <Button onClick={() => navigate("/game")}>Game Page</Button>
    </div>
  );
};

export default HomePage;
