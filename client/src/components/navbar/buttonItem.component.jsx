import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ButtonItem = ({ item, route }) => {
  const navigate = useNavigate();
  const currentItem = useSelector((store) => store.navitem.currentItem);
  return (
    <>
      {currentItem === item ? (
        <>
          <Button
            sx={{ color: "#fff", backgroundColor: "teal", "&:hover": {backgroundColor: "teal" } }}
            onClick={() => navigate(route)}
          >
            {item}
          </Button>
        </>
      ) : (
        <>
          <Button sx={{ color: "#fff" }} onClick={() => navigate(route)}>
            {item}
          </Button>
        </>
      )}
    </>
  );
};

export default ButtonItem;
