import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ListItemComponent = ({ item, route }) => {
  const navigate = useNavigate();
  const currentItem = useSelector((store) => store.navitem.currentItem);
  return (
    <>
      {currentItem === item ? (
        <>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => navigate(route)}
              sx={{ backgroundColor: "teal","&:hover": {backgroundColor: "teal" }}}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        </>
      ) : (
        <>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate(route)}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        </>
      )}
    </>
  );
};

export default ListItemComponent;
