import './style.css';

import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';

import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useContext, useEffect } from 'react';
import {
	BsBookmarksFill,
	BsChevronContract,
	BsChevronExpand,
	BsFillPeopleFill,
	BsHouseFill,
} from 'react-icons/bs';

import { HiPresentationChartLine } from 'react-icons/hi';

import { FaBuilding, FaLightbulb } from 'react-icons/fa';
import { RiDiscussFill } from 'react-icons/ri';
import { useLocation } from 'react-router';
import { createSearchParams, useNavigate } from 'react-router-dom';

import UniTextLogo from '../../assets/images/2021-Greenwich-Black-Eng.webp';
import { ROLES, URL_PATHS } from '../../common/env';
import { UserContext } from '../../context/AppContext';
import { AppBar, ColorButton, Drawer, DrawerHeader } from './SidebarStyled';

export default function Sidebar(props) {
	const { state, setState } = useContext(UserContext);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const navigate = useNavigate();
	const [open, setOpen] = React.useState(true);
	const [selectedPage, setSelectedPage] = React.useState('Homepage');
	const [managementPage, setManagementPage] = React.useState(true);
	const [reportPage, setReportPage] = React.useState(true);

	const handleClickManagement = () => {
		setManagementPage(!managementPage);
	};
	const handleClickReport = () => {
		setReportPage(!reportPage);
	};

	const { pathname } = useLocation();

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

	const itemsList = [
		{
			text: 'Home',
			icon: <BsHouseFill className='sidebar_icon' />,
			selectedText: 'Homepage',

			onClick: () => {
				navigate(URL_PATHS.HOME);
			},
		},
	];

	const itemsReportList = [
		{
			roles: [ROLES.ADMIN],
			text: 'Dashboard',
			selectedText: 'Dashboard',
			icon: <HiPresentationChartLine className='sidebar_icon' />,
			onClick: () => {
				navigate(URL_PATHS.DASHBOARD);
			},
		},
	];

	const itemsManagementList = [
		{
			roles: [ROLES.ADMIN],
			text: 'User',
			selectedText: 'User Management',
			icon: <BsFillPeopleFill className='sidebar_icon' />,
			onClick: () => {
				navigate(URL_PATHS.MANAGE_USER);
			},
		},
		{
			roles: [ROLES.ADMIN],
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
	];

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
		setManagementPage(true);
		setReportPage(true);
	};

	const nagivateHomepage = () => {
		navigate(URL_PATHS.HOME);
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
				}}>
				<CssBaseline />

				<Toolbar
					sx={{
						justifyContent: 'space-between',
						alignItems: 'center',
						borderBottom: '0.1px solid #e2e0e0',
					}}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							gap: '10px',
						}}>
						<IconButton
							color='inherit'
							aria-label='open drawer'
							onClick={handleDrawerCick}
							edge='start'>
							<MenuIcon />
						</IconButton>
						<img
							onClick={() => nagivateHomepage()}
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
							}}>
							<ColorButton
								onClose={handleCloseUserMenu}
								onClick={handleOpenUserMenu}
								sx={{ p: 0 }}>
								<Avatar
									alt={state.dataUser.full_name ?? 'Username'}
									src='/static/images/avatar/2.jpg'
								/>

								<Stack className='avatar_text' spacing={0.5}>
									<Typography
										fontWeight={500}
										fontSize={14}
										fontFamily='Poppins'>
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
										}}>
										{state.dataUser.role || 'Role'}
									</Typography>
								</Stack>
							</ColorButton>
						</Box>

						<Menu
							sx={{ mt: '50px' }}
							id='menu-appbar'
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
							onClick={handleCloseUserMenu}>
							{UserMenu.map((item, index) => {
								const { text, icon, onClick } = item;
								return (
									<Tooltip
										title={text}
										arrow
										placement='left'>
										<ListItemButton
											key={index + Math.random()}
											sx={{
												justifyContent: 'center',
												px: 2.5,
											}}
											onClick={onClick}>
											{icon && icon}
											<ListItemText
												key={index}
												disableTypography
												primary={text}
												sx={{
													fontFamily:
														'Nunito, sans-serif',
													fontSize: '16px',
													fontWeight: 700,
													ml: 1.7,
												}}
											/>
										</ListItemButton>
									</Tooltip>
								);
							})}
						</Menu>
					</Box>
				</Toolbar>
			</AppBar>
			<Drawer variant='permanent' open={open} className='drawer_sidebar'>
				<DrawerHeader></DrawerHeader>
				<List className='sidebar_customize'>
					{itemsList.map((item, index) => {
						const { selectedText, text, icon, onClick } = item;
						return (
							<>
								<Tooltip title={text} arrow placement='right'>
									<ListItemButton
										key={index + Math.random()}
										selected={selectedText === selectedPage}
										sx={{
											minHeight: 48,
											justifyContent: open
												? 'initial'
												: 'center',
											px: 2.5,
										}}
										onClick={() => onClick(index)}>
										{icon && (
											<ListItemIcon
												key={index + Math.random()}
												sx={{
													minWidth: 0,
													mr: open ? 3 : 'auto',
													justifyContent: 'center',
												}}>
												{icon}
											</ListItemIcon>
										)}
										<ListItemText
											key={index + Math.random()}
											disableTypography
											primary={text}
											sx={{
												fontFamily:
													'Poppins, sans-serif',
												fontSize: '14px',
												fontWeight: '700',
												opacity: open ? 1 : 0,
												color: '#777',
											}}
										/>
									</ListItemButton>
								</Tooltip>
							</>
						);
					})}
					{state?.dataUser.role === ROLES.STAFF ||
					state?.dataUser.role === ROLES.SUPERVISOR ? (
						<></>
					) : (
						<ListItemButton
							onClick={handleClickReport}
							sx={{
								display: open ? 'flex' : 'none',
								alignItems: 'center',
								justifyContent: 'space-between',
								width: '100%',
							}}>
							<>
								<ListItemText
									disableTypography
									sx={{
										fontSize: '0.7rem',
										lineHeight: '1.125rem',
										color: '#888',
										fontFamily: 'Poppins, sans-serif',
										fontWeight: '700',
										opacity: open ? 1 : 0,
									}}>
									Report
								</ListItemText>
								<ListItemIcon
									sx={{
										minWidth: 0,
										ml: open ? 3 : 'auto',
										fontWeight: '700',
									}}>
									{managementPage ? (
										<BsChevronContract />
									) : (
										<BsChevronExpand />
									)}
								</ListItemIcon>
							</>
						</ListItemButton>
					)}
					<Collapse in={reportPage} timeout='auto' unmountOnExit>
						{itemsReportList.map((item, index) => {
							const { selectedText, roles, text, icon, onClick } =
								item;
							return (
								<>
									{(roles.length === 0 ||
										roles.includes(
											state?.dataUser.role,
										)) && (
										<Tooltip
											title={text}
											arrow
											placement='right'>
											<ListItemButton
												key={index + Math.random()}
												selected={
													selectedText ===
													selectedPage
												}
												sx={{
													px: 2.5,
													minHeight: 48,
													justifyContent: open
														? 'initial'
														: 'center',
												}}
												onClick={() => onClick(index)}>
												{icon && (
													<ListItemIcon
														key={
															index +
															Math.random()
														}
														sx={{
															minWidth: 0,
															mr: open ? 3 : '0',
															justifyContent:
																'center',
														}}>
														{icon}
													</ListItemIcon>
												)}
												<ListItemText
													key={index + Math.random()}
													disableTypography
													primary={text}
													sx={{
														fontFamily:
															'Poppins, sans-serif',
														fontSize: '14px',
														fontWeight: '700',
														color: '#777',
														opacity: open ? 1 : 0,
													}}
												/>
											</ListItemButton>
										</Tooltip>
									)}
								</>
							);
						})}
					</Collapse>
					{state?.dataUser.role === ROLES.STAFF ||
					state?.dataUser.role === ROLES.SUPERVISOR ? (
						<></>
					) : (
						<ListItemButton
							onClick={handleClickManagement}
							sx={{
								display: open ? 'flex' : 'none',
								alignItems: 'center',
								justifyContent: 'space-between',
								width: '100%',
							}}>
							<>
								<ListItemText
									disableTypography
									sx={{
										fontSize: '0.7rem',
										lineHeight: '1.125rem',
										color: '#888',
										fontFamily: 'Poppins, sans-serif',
										fontWeight: '700',
										opacity: open ? 1 : 0,
									}}>
									Manage
								</ListItemText>
								<ListItemIcon
									sx={{
										minWidth: 0,
										ml: open ? 3 : 'auto',
										fontWeight: '700',
									}}>
									{managementPage ? (
										<BsChevronContract />
									) : (
										<BsChevronExpand />
									)}
								</ListItemIcon>
							</>
						</ListItemButton>
					)}
					<Collapse in={managementPage} timeout='auto' unmountOnExit>
						{itemsManagementList.map((item, index) => {
							const { selectedText, roles, text, icon, onClick } =
								item;
							return (
								<>
									{(roles.length === 0 ||
										roles.includes(
											state?.dataUser.role,
										)) && (
										<Tooltip
											title={text}
											arrow
											placement='right'>
											<ListItemButton
												key={index + Math.random()}
												selected={
													selectedText ===
													selectedPage
												}
												sx={{
													px: 2.5,
													minHeight: 48,
													justifyContent: open
														? 'initial'
														: 'center',
												}}
												onClick={() => onClick(index)}>
												{icon && (
													<ListItemIcon
														key={
															index +
															Math.random()
														}
														sx={{
															minWidth: 0,
															mr: open ? 3 : '0',
															justifyContent:
																'center',
														}}>
														{icon}
													</ListItemIcon>
												)}
												<ListItemText
													key={index + Math.random()}
													disableTypography
													primary={text}
													sx={{
														fontFamily:
															'Poppins, sans-serif',
														fontSize: '14px',
														fontWeight: '700',
														color: '#777',
														opacity: open ? 1 : 0,
													}}
												/>
											</ListItemButton>
										</Tooltip>
									)}
								</>
							);
						})}
					</Collapse>
				</List>
			</Drawer>

			<Box
				component='main'
				sx={{
					flexGrow: 1,
					p: 4,
					fontFamily: 'Poppins',
				}}>
				<DrawerHeader />
				{props.children}
			</Box>
		</Box>
	);
}
