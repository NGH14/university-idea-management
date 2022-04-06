import MuiAppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

const drawerWidth = 240;

const ColorButton = styled(Button)(() => ({
	fontFamily: 'Poppins',
	fontSize: '13px',
	textTransform: 'none',
	color: '#000',
	margin: '10px 0',
	padding: '10px',
	display: 'flex',
	gap: 10,
}));

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(5)} + 0.5px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(7)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	width: '100%',
	transition: theme.transitions.create(['width', 'margin', 'left'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		// width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin', 'left'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		left: `none`,
		[theme.breakpoints.up('sm')]: {
			width: '100%',
		},
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 10px 0px',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

export { Drawer, AppBar, ColorButton, DrawerHeader };
