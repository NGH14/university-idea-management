import "./style.css";

import { AutoStories } from "@mui/icons-material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";

import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import Stack from "@mui/material/Stack";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

import UniTextLogo from "../../assets/images/2021-Greenwich-Black-Eng.webp";
import { ROLES, URL_PATHS } from "../../common/env";
import { UserContext } from "../../context/AppContext";

import { Drawer, AppBar, DrawerHeader, ColorButton } from "./SidebarStyled";

export default function Sidebar(props) {
  const { state, setState } = useContext(UserContext);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [selectedPage, setSelectedPage] = React.useState("Homepage");
  const [managementPage, setManagementPage] = React.useState(true);

  const handleClickManagement = () => {
    setManagementPage(!open);
  };

  const { pathname } = useLocation();

  useEffect(() => {
    const pageText = setSelected(pathname);
    setSelectedPage(pageText);
  }, [pathname]);



  const UserMenu = [
    {
      text: "Profile",
      icon: <LogoutIcon fontSize="small" />,
      onClick: () => navigate(URL_PATHS.PROFILE),
    },
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
      selectedText: "Homepage",

      onClick: () => {
        navigate(URL_PATHS.HOME);
      },
    },
  ];
  const setSelected = (path) => {
    switch (path) {
      case URL_PATHS.MANAGE_USER:
        return 1;
      case URL_PATHS.MANAGE_DEP:
        return 2;
      case URL_PATHS.MANAGE_TAG:
        return 3;
      case URL_PATHS.MANAGE_SUB:
        return 4;
      default:
        return 0;
    }
  };
  const itemsManagementList = [
    {
      roles: [ROLES.ADMIN],
      text: "User",
      selectedText: "User Management",
      icon: <AssignmentIndIcon />,
      onClick: () => {
        navigate(URL_PATHS.MANAGE_USER);
      },
    },
    {
      roles: [ROLES.ADMIN],
      text: "Department",
      selectedText: "Department Management",
        icon: <CorporateFareIcon />,
        onClick: () => {
            navigate(URL_PATHS.MANAGE_DEP);
        },
    },
    {
      roles: [ROLES.ADMIN, ROLES.MANAGER],
        text: "Tag",
        selectedText: "Tag Management",

        icon: <AutoStories />,
        onClick: () => {
            navigate(URL_PATHS.MANAGE_TAG);
        }
    },
      {
          roles: [ROLES.ADMIN, ROLES.MANAGER],
          text: "Submission",
          selectedText: "Submission Management",
          icon: <AutoStories />,
          onClick: () => {
              navigate(URL_PATHS.MANAGE_SUB);
          }
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
    setState({ ...state, isLogin: false, loading: false, dataUser: {} });
    navigate(URL_PATHS.LOGIN);
  };

  const handleDrawerCick = () => {
    setOpen((pre) => !pre);
  };

  const nagivateHomepage = () => {
    navigate(URL_PATHS.HOME);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        className="app_header"
        position="fixed"
        open={open}
        color="inherit"
        style={{
          boxShadow: "none",
        }}
      >
        <CssBaseline />

        <Toolbar
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "0.1px solid #e2e0e0",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerCick}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <img
              onClick={() => nagivateHomepage()}
              className="drawer_logo"
              src={UniTextLogo}
              alt=""
            />
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 5,
              }}
            >
              <ColorButton
                onClose={handleCloseUserMenu}
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                <Avatar
                  alt={state.dataUser.full_name ?? "Username"}
                  src="/static/images/avatar/2.jpg"
                />

                <Stack className="avatar_text" spacing={0.5}>
                  <Typography
                    fontWeight={500}
                    fontSize={14}
                    fontFamily="Poppins"
                  >
                    {state.dataUser.full_name ?? "Username"}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize={12}
                    fontFamily="Nunito"
                    sx={{
                      textAlign: "left",
                    }}
                  >
                    {state.dataUser.role || "Admin"}
                  </Typography>
                </Stack>
              </ColorButton>
            </Box>

            <Menu
              sx={{ mt: "50px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              onClick={handleCloseUserMenu}
            >
              {UserMenu.map((item, _) => {
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
                    {icon && icon}
                    <ListItemText
                      disableTypography
                      primary={text}
                      sx={{
                        fontFamily: "Nunito, sans-serif",
                        fontSize: "16px",
                        fontWeight: 700,
                        ml: 1.7,
                      }}
                    />
                  </ListItemButton>
                );
              })}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    <Drawer variant="permanent" open={open} className="drawer_sidebar">
      <DrawerHeader></DrawerHeader>
      <List className="sidebar_customize">
        {itemsList.map((item, index) => {
          const { selectedText, text, icon, onClick } = item;
          return (
            <>
              <ListItemButton
                selected={selectedText === selectedPage}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                button
                key={text}
                onClick={() => onClick(index)}
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
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: "700",
                    opacity: open ? 1 : 0,
                  }}
                />
              </ListItemButton>
            </>
          );
        })}

        {itemsManagementList.map((item, index) => {
          const { selectedText, roles, text, icon, onClick } = item;
          return (
            <>
              {(roles.length === 0 ||
                roles.includes(state?.dataUser.role)) && (
                  <ListItemButton
                    selected={selectedText === selectedPage}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                    button
                    key={text}
                    onClick={() => onClick(index)}
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
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "14px",
                        fontWeight: "700",
                        opacity: open ? 1 : 0,
                      }}
                    />
                  </ListItemButton>
                )}
            </>
          );
        })}
      </List>
      <Divider />

      <Divider />
    </Drawer>

    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 4,
        fontFamily: "Poppins",
      }}
    >
      <DrawerHeader />
      {props.children}
    </Box>
  </Box>);
}
