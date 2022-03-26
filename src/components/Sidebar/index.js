import "./style.css";

import { AutoStories } from "@mui/icons-material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

import UniTextLogo from "../../assets/images/2021-Greenwich-Black-Eng.webp";
import { ROLES, URL_PATHS } from "../../common/env";
import { UserContext } from "../../context/AppContext";

const drawerWidth = 240;

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
		width: `calc(${theme.spacing(9)} + 1px)`,
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
	zIndex: theme.zIndex.drawer + 1,
	width: "100%",
	transition: theme.transitions.create(["width", "margin", "left"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		// width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin", "left"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		left: `none`,
		[theme.breakpoints.up("sm")]: {
			width: "100%",
		},
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
	const { state, setState } = useContext(UserContext);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const navigate = useNavigate();
	const [open, setOpen] = React.useState(true);
	const [selectedIndex, setSelectedIndex] = React.useState("home");

	const { pathname } = useLocation();

	useEffect(() => {
		const index = setSelected(pathname);
		setSelectedIndex(index);
	}, [pathname]);

	const setSelected = (path) => {
		switch (path) {
			case URL_PATHS.MANAGE_USER:
				return 1;
			case URL_PATHS.MANAGE_DEP:
				return 2;
			case URL_PATHS.MANAGE_TAG:
				return 3;
			default:
				return 0;
		}
	};

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

	const itemsManagementList = [
		{
			roles: [],
			text: "Home",
			icon: <HomeIcon />,

			onClick: () => {
				navigate(URL_PATHS.HOME);
			},
		},
		{
			roles: [ROLES.ADMIN],
			text: "User Management",
			icon: <AssignmentIndIcon />,
			onClick: () => {
				navigate(URL_PATHS.MANAGE_USER);
			},
		},
		{
			roles: [ROLES.ADMIN],
			text: "Department Management",
			icon: <CorporateFareIcon />,
			onClick: () => {
				navigate(URL_PATHS.MANAGE_DEP);
			},
		},
		{
			roles: [ROLES.ADMIN, ROLES.MANAGER],
			text: "Tag Management",
			icon: <AutoStories />,
			onClick: () => {
				navigate(URL_PATHS.MANAGE_TAG);
			},
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
							<ColorButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
					{itemsManagementList.map((item, index) => {
						const { roles, text, icon, onClick } = item;
						return (
							<>
								{(roles.length === 0 ||
									roles.includes(state?.dataUser.role)) && (
									<ListItemButton
										selected={selectedIndex === index}
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
		</Box>
	);
}
