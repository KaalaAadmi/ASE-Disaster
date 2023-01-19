import React from "react";
import {
  Box,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { LocationOn } from "@mui/icons-material";
// import {Bed} from '@mui/icons-material'
import { Newspaper } from "@mui/icons-material";
import News from "./News";
import Maps from "./Map";

export default function BottomNav(props) {
  const [value, setValue] = React.useState(0);
  return (
    <Box>
      {
        {
          0: <News />,
          1: <Maps
          // latitude={props.location.latitude}
          // longitude={props.location.longitude}
          // onChange={props.onChange}
        />,
        }[value]
      }
      <Paper
        elevation={3}
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 20 }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
        >
          <BottomNavigationAction label="News" icon={<Newspaper />} />
          <BottomNavigationAction label="Map" icon={<LocationOn />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
