import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import Users from "../Users/Users";
import Teams from "../Teams/Teams";
import Challenges from "../Challenges/Challenges";
import Settings from "../Settings/Settings";
import DashboardPanel from "./DashboardPanel";
import Submission from "../Submission/Submission";
import Notification from "../Notification/Notification";
import "./Dashboard.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import AddChallenge from "../../Admin/Challenges/Add-challenge/AddChallenge";
import EditChallenges from "../../Admin/Challenges/Edit-challenges/EditChallenges";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function Dashboard({setIsDashboard}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("DashboardPanel");
  const [editChallengeId, setEditChallengeId] = useState(null);
  useEffect(() => {
    setIsDashboard(true)
  });
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleEditChallenge = (id) => {
    setEditChallengeId(id);
    setSelectedComponent("EditChallenges");
  };

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "DashboardPanel":
        return <DashboardPanel />;
      case "Users":
        return <Users />;
      case "Teams":
        return <Teams />;
      case "Add Challenge":
        return <AddChallenge />;
      case "Challenges":
        return <Challenges onEditChallenge={handleEditChallenge} />;
      case "Notification":
        return <Notification />;
      case "Settings":
        return <Settings />;
      case "Submission":
        return <Submission />;
      case "EditChallenges":
        return (
          <EditChallenges
            id={editChallengeId}
            onSuccess={() => setSelectedComponent("Challenges")}
          />
        );
      default:
        return (
          <Typography paragraph>Select an option from the menu</Typography>
        );
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            HACK HUNTER
          </Typography>
          <NavLink to="/" style={{ color: "inherit", textDecoration: "none" }} onClick={() => setIsDashboard(false)}>
            <i className="bi bi-house" style={{ fontSize: "1.5rem" }}></i>
          </NavLink>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            { text: "DashboardPanel", icon: "bi bi-speedometer2" },
            { text: "Users", icon: "bi bi-person-circle" },
            { text: "Teams", icon: "bi bi-people" },
            { text: "Add Challenge", icon: "bi bi bi-joystick" },
            { text: "Challenges", icon: "bi bi-controller" },
            { text: "Notification", icon: "bi bi-bell" },
            { text: "Settings", icon: "bi bi-gear" },
            { text: "Submission", icon: "bi bi-substack" },
          ].map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => setSelectedComponent(item.text)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <i className={item.icon}></i>
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {renderSelectedComponent()}
      </Box>
    </Box>
  );
}

export default Dashboard;
