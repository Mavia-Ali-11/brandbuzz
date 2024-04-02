import React, { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardLogo from '../../assets/images/dashboard-logo.png'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { getAuthSession, loadStorage } from '../../utils/common';
import { getPublisherProfile } from '../../services/publisherServices';
import { getBrandProfile } from '../../services/brandServices';

const drawerWidth = 252;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));
interface SidebarProps {
  module: string;
}

type UserType = {
  fullName?: string;
  email?: string;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 767;

  const [user, setUser] = useState<UserType>({});

  useEffect(() => {
    const getUser = async () => {
      const user = await getAuthSession();
      const role = loadStorage("userRole", "local");

      let profile;
      if (role === "publisher") profile = await getPublisherProfile(user.email);
      else profile = await getBrandProfile(user.email);
      setUser({ ...user, ...{ fullName: profile.fullName || profile.name } });
    }

    getUser();
  }, [])

  const userTab = <>
    <span className={location.pathname.includes("/account-settings") ? '!text-dark_orange' : '!text-black'}>
      Settings
    </span>
    <small className='text-silver text-[12px] block'>{user.email}</small>
  </>

  const [open, setOpen] = React.useState(!isMobile);

  const handleDrawerOpen = () => setOpen(!open);
  const navIconPosition = open ? " left-[252px]" : " left-0"

  const baseRoute = "/" + props.module

  const goToDashboard = () => navigate(baseRoute);
  const goToAccount = () => navigate(baseRoute + "/account-settings");
  const goToMissions = () => navigate(baseRoute + "/missions");
  const goToMedia = () => navigate(baseRoute + "/media");
  const goToAnalytics = () => navigate(baseRoute + "/analytics");
  const goToCampaigns = () => navigate(baseRoute + "/campaigns");
  const goToCreateCampaign = () => navigate(baseRoute + "/create-clicks-campaign");

  const publisherMenu = [
    {
      icon: <DashboardOutlinedIcon />,
      label: 'Dashboard',
      routes: ['/publisher', '/publisher/'],
      action: goToDashboard
    },
    {
      icon: <ShoppingCartOutlinedIcon />,
      label: 'Missions',
      routes: ['/publisher/missions', '/publisher/missions/'],
      action: goToMissions
    },
    {
      icon: <ReceiptLongOutlinedIcon />,
      label: 'Media',
      routes: ['/publisher/media', '/publisher/media/'],
      action: goToMedia
    },
    {
      icon: <LeaderboardOutlinedIcon />,
      label: 'Analytics',
      routes: ['/publisher/analytics', '/publisher/analytics/'],
      action: goToAnalytics
    }
  ];

  const brandMenu = [
    {
      icon: <DashboardOutlinedIcon />,
      label: 'Dashboard',
      routes: ['/brand', '/brand/'],
      action: goToDashboard
    },
    {
      icon: <Inventory2OutlinedIcon />,
      label: 'All Campaigns',
      routes: ['/brand/campaigns', '/brand/campaign/'],
      action: goToCampaigns
    },
    {
      icon: <ReceiptLongOutlinedIcon />,
      label: 'Create Campaign',
      routes: ['/brand/create-clicks-campaign', '/brand/single-article'],
      action: goToCreateCampaign
    },
    {
      icon: <LeaderboardOutlinedIcon />,
      label: 'Analytics',
      routes: ['/brand/analytics', '/brand/analytics/'],
      action: goToAnalytics
    }
  ];

  const menu = props.module === "publisher" ? publisherMenu : brandMenu

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        className='app-sidebar'
        open={open}
      >
        <DrawerHeader className='!min-h-[90px] !pt-[10px] !px-[16px]'>
          <img src={DashboardLogo} alt="logo" />
          <div className="pl-[12px]">
            <h6 className="text-black text-[18px] leading-[22px] font-[700] mb-[-4px]">{user.fullName}</h6>
            <span className="text-gray text-[11px] font-inter">BUZZING.COM</span>
          </div>
        </DrawerHeader>
        <List className='menu-bar h-[100%]'>
          {menu.map(({ label, icon, routes, action }, i) => (
            <ListItem key={i} className={routes.includes(location.pathname) ? 'active-menu' : ''} onClick={action} disablePadding>
              <ListItemButton>
                <ListItemIcon className='!min-w-[32px]'>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={label} className='!mb-0' />
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem className='!absolute bottom-0' onClick={goToAccount} disablePadding>
            <ListItemButton>
              {/* <ListItemIcon className='!min-w-[32px]'>
                <img src={UserAvatar} className='mr-[10px]' alt="avatar" />
              </ListItemIcon> */}
              <ListItemText primary={userTab} className='!mb-0' />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Main open={open} className='!px-[40px] max-w-full'>
        {
          isMobile &&
          <div
            className={"max-w-fit bg-[#eee] rounded-r-[20px] py-[10px] px-[3px] absolute top-[12px]" + navIconPosition}
            onClick={handleDrawerOpen}>
            {
              open ? <ChevronLeftIcon /> : <ChevronRightIcon />
            }
          </div>
        }

        <Outlet />
      </Main>
    </Box>
  );
}

export default Sidebar;