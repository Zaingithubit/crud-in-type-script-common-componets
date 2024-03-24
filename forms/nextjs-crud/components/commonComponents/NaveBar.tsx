import * as React from "react";
import { useRouter } from "next/router";
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
  Menu,
  MenuItem,
} from "@mui/material/";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

type Url = string;

interface SubLink {
  to: Url;
  label: string;
}

interface NavigationLink {
  label: string;
  to?: Url;
  subLinks?: SubLink[];
}

interface NavigationItemProps {
  to: Url | undefined;
  label: string;
  subLinks?: SubLink[];
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  to,
  label,
  subLinks,
}) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (subLinks) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <ListItem button onClick={subLinks ? handleClick : undefined}>
        <ListItemText
          sx={{
            "& a": {
              color: "black",
              textDecoration: "none",
              borderBottom: "2px solid transparent",
              transition: "border-bottom 0.3s ease",
              fontSize: 20,
              fontWeight: router.asPath === to ? "bold" : "normal",
              position: "relative",
              "&:hover": {
                fontWeight: "bold",
              },
              "&.active::after": {
                content: '""',
                display: "block",
                borderBottom: "2px solid black",
                marginTop: "3px",
              },
            },
          }}
        >
          {subLinks ? (
            <span>{label}</span>
          ) : (
            <Link
              href={to || ""}
              passHref
              className={router.asPath === to ? "active" : ""}
            >
              {label}
            </Link>
          )}
        </ListItemText>
      </ListItem>

      {subLinks && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {subLinks.map((subLink, index) => (
            <MenuItem key={index} onClick={handleClose}>
              <NavigationItem to={subLink.to} label={subLink.label} />
            </MenuItem>
          ))}
        </Menu>
      )}
    </div>
  );
};

const createNavigationItems = (links: NavigationLink[]) =>
  links.map((link, index) => (
    <Typography
      key={index}
      variant="h6"
      color="inherit"
      component="div"
      sx={{
        mr: 2,
      }}
    >
      <NavigationItem
        to={link.to}
        label={link.label}
        subLinks={link.subLinks}
      />
    </Typography>
  ));

const NaveBar: React.FC = () => {
  
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = createTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const navigationLinks: NavigationLink[] = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "Vehicle",
      subLinks: [
        { to: "/vehicle", label: "Add Vehicle" },
        { to: "/vehicleListing", label: "Vehicle List" },
      ],
    },
    {
      label: "Driver",
      subLinks: [
        { to: "/driver", label: "Add Driver" },
        { to: "/driverListing", label: "Driver Listing" },
      ],
    },
    {
      label: "Contact",
      subLinks: [
        { to: "/contact", label: "Contact" },
        { to: "/contactListing", label: "Contact Listing" },
      ],
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <AppBar
          position="static"
          color="transparent"
          style={{ padding: "8px" }}
        >
          <Toolbar
            variant="dense"
            sx={{
              justifyContent: isSmallScreen ? "space-between" : "",
              paddingRight: isSmallScreen ? "0px" : "",
            }}
          >
            <Box
              sx={{
                "& img": {
                  width: "200px",
                  marginRight: "25px",
                  boxShadow: "5px 6px 6px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              <Link href="/">
                <img src="/images/pixako.png" alt="pixako" />
              </Link>
            </Box>
            {!isSmallScreen && createNavigationItems(navigationLinks)}
            {isSmallScreen && (
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>

        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
            },
          }}
        >
          <List>{createNavigationItems(navigationLinks)}</List>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
};

export default NaveBar;
