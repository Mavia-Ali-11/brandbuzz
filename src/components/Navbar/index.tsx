import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Footer, PrimaryButton } from '..';
import logo from '../../assets/images/logo.png'
import "./navbar.scss"

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  { label: "Home", url: "/", access: ["/faqs"] },
  { label: "Features", url: "/features", access: ["/", "/features", "/faqs"] },
  { label: "FAQs", url: "/faqs", access: ["/", "/features"] },
  { label: "Sign in", url: "/login", access: ["/faqs"] },
  { label: "Sign up", url: "/signup", access: ["/faqs"] }
];

const Navbar = (props: Props) => {
  const { window } = props;
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box className="bb-nav-mb" onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <div className="logo">
        <Link to="/">
          <img src={logo} className="m-auto" alt="logo" />
        </Link>
      </div>
      <List className="links">
        {navItems.map(({ label, url, access }, key) => {
          if (!access.includes(location.pathname)) return null;

          return (
            <li key={key}>
              <Link to={url}>{label}</Link>
            </li>
          )
        })}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar component="nav" className="bb-nav">
        <Toolbar>
          <div className="logo">
            <Link to="/">
              <img src={logo} className="m-auto" alt="logo" />
            </Link>
          </div>
          <IconButton
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {/* sx={{ display: { xs: 'none', sm: 'block' } }} */}
          <Box className="links" sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map(({ label, url, access }, key) => {
              if (!access.includes(location.pathname)) return null;

              if (url === "/signup")
                return (
                  <PrimaryButton
                    key={key}
                    type="link"
                    to={url}
                    text={label}
                    className="px-[16px] inline !text-white"
                  />
                )

              return (
                <Link
                  to={url}
                  key={key}
                  className={`${url === "/login" ? "!text-dark_orange duration-300 hover:!text-hover_orange" : ""}`}
                >
                  {label}
                </Link>
              )
            })}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box>
        <Toolbar style={{ minHeight: 80 }} />
        <Outlet />
        <Footer />
      </Box>
    </>
  );
}

export default Navbar