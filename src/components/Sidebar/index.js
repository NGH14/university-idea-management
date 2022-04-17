import './style.css';

import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tippy from '@tippyjs/react';
import UniTextLogo from 'assets/images/logo-500.webp';
import { stringToSvg } from 'common/DiceBear';
import { ROLES, URL_PATHS } from 'common/env';
import { UserContext } from 'context/AppContext';
import React, { useContext, useEffect, useState } from 'react';
import {
	BsBookmarksFill,
	BsChevronContract,
	BsChevronExpand,
	BsFillPeopleFill,
	BsHouseFill,
} from 'react-icons/bs';
import { FaBuilding, FaLightbulb } from 'react-icons/fa';
import { HiPresentationChartLine } from 'react-icons/hi';
import { RiDiscussFill } from 'react-icons/ri';
import { useLocation } from 'react-router';
import { createSearchParams, useNavigate } from 'react-router-dom';

import SidebarItem from './SidebarItem';
import { AppBar, ColorButton, Drawer, DrawerHeader } from './SidebarStyled';

export default function Sidebar(props) {
	const { state, setState } = useContext(UserContext);
	const [managementPage, setManagementPage] = useState(true);
	const [selectedPage, setSelectedPage] = useState('Homepage');
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [reportPage, setReportPage] = useState(true);
	const [open, setOpen] = useState(false);
	const { pathname } = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const pageText = setSelected(pathname);
		setSelectedPage(pageText);
	}, [pathname]);

	const UserMenu = [
		{
			text: 'Profile',
			icon: <PersonIcon fontSize='small' />,
			onClick: () =>
				navigate({
					pathname: URL_PATHS.PROFILE,
					search: `${createSearchParams({
						email: state?.dataUser?.email,
					})}`,
				}),
		},
		{
			text: 'Logout',
			icon: <LogoutIcon fontSize='small' />,
			onClick: () => onLogout(),
		},
	];

	const navItems = {
		generals: [
			{
				text: 'Home',
				icon: <BsHouseFill className='sidebar_icon' />,
				selectedText: 'Homepage',

				onClick: () => {
					navigate(URL_PATHS.HOME);
				},
			},
		],
		reports: [
			{
				roles: [ROLES.ADMIN, ROLES.MANAGER],
				text: 'Dashboard',
				selectedText: 'Dashboard',
				icon: <HiPresentationChartLine className='sidebar_icon' />,
				onClick: () => {
					navigate(URL_PATHS.DASHBOARD);
				},
			},
		],
		managements: [
			{
				roles: [ROLES.ADMIN, ROLES.MANAGER],
				text: 'User',
				selectedText: 'User Management',
				icon: <BsFillPeopleFill className='sidebar_icon' />,
				onClick: () => {
					navigate(URL_PATHS.MANAGE_USER);
				},
			},
			{
				roles: [ROLES.ADMIN, ROLES.MANAGER],
				text: 'Department',
				selectedText: 'Department Management',
				icon: <FaBuilding className='sidebar_icon' />,
				onClick: () => {
					navigate(URL_PATHS.MANAGE_DEP);
				},
			},
			{
				roles: [ROLES.ADMIN, ROLES.MANAGER],
				text: 'Tag',
				selectedText: 'Tag Management',

				icon: <BsBookmarksFill className='sidebar_icon' />,
				onClick: () => {
					navigate(URL_PATHS.MANAGE_TAG);
				},
			},
			{
				roles: [ROLES.ADMIN, ROLES.MANAGER],
				text: 'Submission',
				selectedText: 'Submission Management',
				icon: <RiDiscussFill className='sidebar_icon' />,
				onClick: () => {
					navigate(URL_PATHS.MANAGE_SUB);
				},
			},
			{
				roles: [ROLES.ADMIN, ROLES.MANAGER],
				text: 'Idea',
				selectedText: 'Idea Management',
				icon: <FaLightbulb className='sidebar_icon' />,
				onClick: () => {
					navigate(URL_PATHS.MANAGE_IDEA);
				},
			},
		],
	};

	const setSelected = (path) => {
		switch (path) {
			case '/':
				return 'Homepage';
			case URL_PATHS.HOME:
				return 'Homepage';
			case URL_PATHS.MANAGE_USER:
				return 'User Management';
			case URL_PATHS.MANAGE_DEP:
				return 'Department Management';
			case URL_PATHS.MANAGE_TAG:
				return 'Tag Management';
			case URL_PATHS.MANAGE_SUB:
				return 'Submission Management';
			case URL_PATHS.MANAGE_IDEA:
				return 'Idea Management';
			case URL_PATHS.DASHBOARD:
				return 'Dashboard';
			default:
				return '';
		}
	};

	const onLogout = () => {
		localStorage.clear();
		setState({ ...state, isLogin: false, loading: false, dataUser: {} });
		navigate(URL_PATHS.LOGIN);
	};

	const handleDrawerCick = () => {
		setOpen((pre) => !pre);
		setManagementPage(true);
		setReportPage(true);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />

			<AppBar
				className='app_header'
				position='fixed'
				open={open}
				color='inherit'
				style={{
					boxShadow: 'none',
				}}
			>
				<CssBaseline />

				<Toolbar
					sx={{
						justifyContent: 'space-between',
						alignItems: 'center',
						borderBottom: '0.1px solid #e2e0e0',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							gap: '10px',
						}}
					>
						<IconButton
							color='inherit'
							aria-label='open drawer'
							onClick={handleDrawerCick}
							edge='start'
						>
							<MenuIcon />
						</IconButton>
						<img
							onClick={() => navigate(URL_PATHS.HOME)}
							className='drawer_logo'
							src={UniTextLogo}
							alt=''
						/>
					</Box>
					<Box>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								gap: 5,
							}}
						>
							<ColorButton
								onClose={() => setAnchorElUser(null)}
								onClick={(event) => setAnchorElUser(event.currentTarget)}
								sx={{ p: 0 }}
							>
								<Avatar alt={state.dataUser.full_name ?? 'Username'}>
									{stringToSvg(state.dataUser.avatar)}
								</Avatar>

								<Stack className='avatar_text' spacing={0.5}>
									<Typography
										fontWeight={500}
										fontSize={14}
										fontFamily='Poppins'
									>
										{state.dataUser.full_name ?? 'Username'}
									</Typography>
									<Typography
										style={{ textTransform: 'capitalize' }}
										variant='body2'
										color='text.secondary'
										fontSize={12}
										fontFamily='Nunito'
										sx={{
											textAlign: 'left',
										}}
									>
										{state.dataUser.role || 'Role'}
									</Typography>
								</Stack>
							</ColorButton>
						</Box>

						<Menu
							anchorEl={anchorElUser}
							onClose={() => setAnchorElUser(null)}
							onClick={() => setAnchorElUser(null)}
							open={Boolean(anchorElUser)}
							sx={{ mt: '50px' }}
							id='menu-appbar'
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
						>
							{UserMenu.map((item, index) => {
								const { text, icon, onClick } = item;
								return (
									<Tippy content={text} placement='left'>
										<ListItemButton
											key={text + index}
											sx={{
												justifyContent: 'center',
												px: 2.5,
											}}
											onClick={onClick}
										>
											{icon && icon}
											<ListItemText
												key={index}
												disableTypography
												primary={text}
												sx={{
													fontFamily: 'Nunito, sans-serif',
													fontSize: '16px',
													fontWeight: 700,
													ml: 1.7,
												}}
											/>
										</ListItemButton>
									</Tippy>
								);
							})}
						</Menu>
					</Box>
				</Toolbar>
			</AppBar>
			<Drawer variant='permanent' open={open} className='drawer_sidebar'>
				<DrawerHeader></DrawerHeader>
				<List className='sidebar_customize'>
					{navItems.generals.map(
						({ selectedText, text, icon, onClick }, index) => (
							<SidebarItem
								selected={selectedText === selectedPage}
								onClick={onClick}
								openButton={open}
								index={index}
								text={text}
								icon={icon}
							/>
						),
					)}

					{state?.dataUser.role === ROLES.ADMIN ||
					state?.dataUser.role === ROLES.MANAGER ? (
						<>
							<ListItemButton
								onClick={() => setReportPage(!reportPage)}
								sx={{
									display: open ? 'flex' : 'none',
									justifyContent: 'space-between',
									alignItems: 'center',
									width: '100%',
								}}
							>
								<ListItemText
									disableTypography
									sx={{
										fontSize: '0.7rem',
										lineHeight: '1.125rem',
										color: '#888',
										fontFamily: 'Poppins, sans-serif',
										fontWeight: '700',
										opacity: open ? 1 : 0,
									}}
								>
									Report
								</ListItemText>
								<ListItemIcon
									sx={{
										minWidth: 0,
										ml: open ? 3 : 'auto',
										fontWeight: '700',
									}}
								>
									{reportPage ? (
										<BsChevronContract />
									) : (
										<BsChevronExpand />
									)}
								</ListItemIcon>
							</ListItemButton>
							<Collapse in={reportPage} timeout='auto' unmountOnExit>
								{navItems.reports.map(
									(
										{ selectedText, roles, text, icon, onClick },
										index,
									) =>
										(roles.length === 0 ||
											roles.includes(state?.dataUser.role)) && (
											<SidebarItem
												selected={selectedText === selectedPage}
												onClick={onClick}
												openButton={open}
												index={index}
												text={text}
												icon={icon}
											/>
										),
								)}
							</Collapse>
						</>
					) : (
						<></>
					)}

					{state?.dataUser.role === ROLES.ADMIN ||
					state?.dataUser.role === ROLES.MANAGER ? (
						<>
							<ListItemButton
								onClick={() => setManagementPage(!managementPage)}
								sx={{
									display: open ? 'flex' : 'none',
									alignItems: 'center',
									justifyContent: 'space-between',
									width: '100%',
								}}
							>
								<ListItemText
									disableTypography
									sx={{
										fontSize: '0.7rem',
										lineHeight: '1.125rem',
										color: '#888',
										fontFamily: 'Poppins, sans-serif',
										fontWeight: '700',
										opacity: open ? 1 : 0,
									}}
								>
									Manage
								</ListItemText>
								<ListItemIcon
									sx={{
										minWidth: 0,
										ml: open ? 3 : 'auto',
										fontWeight: '700',
									}}
								>
									{managementPage ? (
										<BsChevronContract />
									) : (
										<BsChevronExpand />
									)}
								</ListItemIcon>
							</ListItemButton>

							<Collapse in={managementPage} timeout='auto' unmountOnExit>
								{navItems.managements.map(
									(
										{ selectedText, roles, text, icon, onClick },
										index,
									) =>
										(roles.length === 0 ||
											roles.includes(state?.dataUser.role)) && (
											<SidebarItem
												selected={selectedText === selectedPage}
												onClick={onClick}
												openButton={open}
												index={index}
												text={text}
												icon={icon}
											/>
										),
								)}
							</Collapse>
						</>
					) : (
						<></>
					)}

					{open && (
						<div
							style={{
								position: 'fixed',
								bottom: 0,
								padding: '16px 20px',
								color: '#999',
								fontSize: '10px',
							}}
						>
							<Button
								variant='text'
								onClick={() => navigate(URL_PATHS.TERM_CONDITION)}
								disableFocusRipple
								disableTouchRipple
								sx={{
									textTransform: 'capitalize',
									fontSize: '10px',
									color: '#888',
									'&:hover': {
										backgroundColor: '#fff',
										color: '#333',
									},
								}}
							>
								Terms and Conditions
							</Button>
							<p
								style={{
									padding: '0 8px',
								}}
							>
								© 2022 Group 26
							</p>
						</div>
					)}
				</List>
			</Drawer>

			<Box
				component='main'
				sx={{
					flexGrow: 1,
					p: 4,
					fontFamily: 'Poppins',
				}}
			>
				<DrawerHeader />
				{props.children}
			</Box>
		</Box>
	);
}
