import React, { useContext } from "react";
import "./style.css";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { STORAGE_VARS } from "../../common/env";
import { UserContext } from "../../context/AppContext";
import LogoutIcon from "@mui/icons-material/Logout";
import UniLogo from "../../assets/images/logo-500.webp";
import UniTextLogo from "../../assets/images/2021-Greenwich-Black-Eng.webp";

import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";

import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const itemsList2 = [];

const ColorButton = styled(Button)(() => ({
  fontFamily: "Poppins",
  fontSize: "13px",
  textTransform: "none",
  color: "#000",
  margin: "10px 0",
  padding: "10px",
  display: "flex",
  gap: 10,
}));

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

  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  left: `calc(${theme.spacing(7)} + 1px)`,
  width: "97%",

  transition: theme.transitions.create(["width", "margin", "left"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin", "left"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    left: `none`,
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 10px 0px",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebar(props) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const { state, setState } = useContext(UserContext);

  const UserMenu = [
    {
      text: "Logout",
      icon: <LogoutIcon fontSize="small" />,
      onClick: () => onLogout(),
    },
  ];
  const itemsList = [
    {
      text: "Home",
      icon: <HomeIcon />,
      onClick: () => navigate("/"),
    },
    {
      text: "User Management",
      icon: <AssignmentIndIcon />,
      onClick: () => navigate("/user-management"),
    },
  ];

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const onLogout = () => {
    localStorage.clear();
    setState({ ...state, isLogin: false, loading: false });
  };

  const handleDrawerCick = () => {
    setOpen((pre) => !pre);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        open={open}
        color="inherit"
        style={{
          backgroundColor: "#F8F9FE",
          boxShadow: "none",
          borderBottom: "1px #333",
        }}
      >
        <CssBaseline />

        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box>
            <img className="header_logo" src={UniLogo} alt="" />
          </Box>

          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 5,
              }}
            >
              <ColorButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Nghia" src="/static/images/avatar/2.jpg" />

                <Stack spacing={0.5}>
                  <Typography
                    fontWeight={500}
                    fontSize={14}
                    fontFamily="Poppins"
                  >
                    Nghia Vu
                    <ExpandMoreIcon
                      sx={{ width: "20px", height: "20px", paddingTop: "8px" }}
                    />
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize={12}
                    fontFamily="Nunito"
                  >
                    Admin
                  </Typography>
                </Stack>
              </ColorButton>
            </Box>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {UserMenu.map((item, index) => {
                const { text, icon, onClick } = item;
                return (
                  <ListItemButton
                    sx={{
                      justifyContent: "center",
                      px: 2.5,
                    }}
                    button
                    key={text}
                    onClick={onClick}
                  >
                    <ListItemText
                      disableTypography
                      primary={text}
                      sx={{
                        fontFamily: "Nunito, sans-serif",
                        fontSize: "14px",
                        fontWeight: 600,
                        mr: 3,
                      }}
                    />
                    {icon && icon}
                  </ListItemButton>
                );
              })}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          style={{
            justifyContent: open ? "space-between" : "flex-end",
          }}
          sx={{ mb: 5 }}
        >
          {open && <img className="drawer_logo" src={UniTextLogo} alt="" />}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerCick}
            edge="start"
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {itemsList.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                button
                key={text}
                onClick={onClick}
              >
                {icon && (
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                )}
                <ListItemText
                  disableTypography
                  primary={text}
                  sx={{
                    fontFamily: "Nunito, sans-serif",
                    fontSize: "16px",

                    fontWeight: "600",
                    opacity: open ? 1 : 0,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
        <Divider />
        <List>
          {itemsList2.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                button
                key={text}
                onClick={onClick}
              >
                {icon && (
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                )}
                <ListItemText
                  disableTypography
                  primary={text}
                  sx={{
                    fontFamily: "Nunito, sans-serif",
                    fontSize: "16px",
                    fontWeight: "600",
                    opacity: open ? 1 : 0,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#F8F9FE",
          fontFamily: "Poppins ",
        }}
      >
        <DrawerHeader />
        {props.children}
      </Box>
    </Box>
  );
}
