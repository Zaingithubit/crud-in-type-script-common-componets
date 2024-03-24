import * as React from "react";
import {
  ThemeProvider,
  createTheme,
  Typography,
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material/";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/images/logoimage/pixako.png";
import { Link } from "react-router-dom";

const NavigationItem = ({ to, label }) => (
  <ListItem button>
    <ListItemText
      sx={{
        "& a": {
          color: "black",
          textDecoration: "none",
          borderBottom: "2px solid transparent",
          transition: "border-bottom 0.3s ease",
          fontSize: 20,
          "&:hover": {
            borderBottom: "2px solid #000",
            fontWeight: "bold",
          },
        },
      }}
    >
      <Link to={to}>{label}</Link>
    </ListItemText>
  </ListItem>
);

const createNavigationItems = (links) =>
  links.map((link) => (
    <Typography
      key={link.to}
      variant="h6"
      color="inherit"
      component="div"
      sx={{
        mr: 2,
      }}
    >
      <NavigationItem to={link.to} label={link.label} />
    </Typography>
  ));

export default function NaveBar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = createTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navigationLinks = [
    { to: "/", label: "Home" },
    { to: "/addvehicle", label: "Add Vehicles" },
    { to: "/listing", label: "Vehicle List" },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <AppBar position="static" color="transparent" style={{ padding: "8px" }}>
          <Toolbar variant="dense" sx={{ justifyContent: isSmallScreen ? "space-between" : "" }}>
            <Box
              sx={{
                "& img": {
                  width: "200px",
                  marginRight: "25px",
                  boxShadow: "5px 6px 6px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <Link to="/">
                <img src={Logo} alt="pixako" />
              </Link>
            </Box>
            {!isSmallScreen && createNavigationItems(navigationLinks)}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{
                mr: 2,
                display: { xs: "block", sm: "block", md: "none" },
                justifyContent: "space-between",
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          onClick={toggleDrawer(false)}
        >
          <List>{createNavigationItems(navigationLinks)}</List>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}
