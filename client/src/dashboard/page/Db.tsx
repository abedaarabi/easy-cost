import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ThemeProvider } from "@mui/material/styles";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useAuth } from "../../authContext/components/AuthContext";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DnsIcon from "@mui/icons-material/Dns";
import { Avatar, Badge } from "@mui/material";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import ProjectMaterialTable from "../../project-material/page/ProjectMaterialTable";
import ProjectMaterialUser from "../../project-material/components/ProjectMaterialUser";
const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#343a40",
});
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",

  backgroundColor: "#343a40",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  backgroundColor: "#006466",
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const location = useLocation();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { user } = useAuth();

  //TODO: Display name on header bar!
  const { companyId, id: userId, name } = user;
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="overline"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, fontSize: "18px" }}
          >
            axioz 360
          </Typography>

          <Box sx={{ display: "flex" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mr: 2 }}>
              <Typography
                variant="overline"
                color="#ffff"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                {name}
              </Typography>

              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar></Avatar>
              </StyledBadge>
            </Box>
            {/* <IconButton color="inherit"> */}
            {/* <Badge badgeContent={4} color="secondary"> */}
            {/* <NotificationsIcon /> */}
            {/* </Badge> */}
            {/* </IconButton> */}
            <IconButton
              color="inherit"
              onClick={() => {
                logout();

                // navigate("/login");
              }}
            >
              <LogoutOutlinedIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {false ? (
        <Box sx={{ m: "auto", mt: 12, width: "90%" }}>
          <ProjectMaterialUser />
        </Box>
      ) : (
        <>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {drawerLinks.map(({ text, link, icon, id }) => (
                <Abed
                  key={id}
                  disablePadding
                  sx={{
                    display: "block",
                    color: "white",
                  }}
                  selected={location.pathname === link && true}
                >
                  <Link
                    to={link}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{
                          opacity: open ? 1 : 0,
                          color: location.pathname === link ? "#003844" : "",
                        }}
                      />
                    </ListItemButton>
                  </Link>
                </Abed>
              ))}
            </List>

            <Divider />
          </Drawer>
          <Box sx={{ m: "auto", mt: 10, width: "85%" }}>
            <Outlet />
          </Box>
        </>
      )}
    </Box>
  );
}

const drawerLinks = [
  {
    id: 1,
    text: (
      <Typography variant="overline" color={"white"}>
        Project
      </Typography>
    ),
    icon: (
      <Box sx={{ color: "white" }}>
        <WorkOutlineIcon />
      </Box>
    ),
    link: "/",
  },

  {
    id: 2,
    text: (
      <Typography variant="overline" color={"white"}>
        Material
      </Typography>
    ),
    icon: (
      <Box sx={{ color: "white" }}>
        <DashboardOutlinedIcon />
      </Box>
    ),
    link: "/material",
  },
  {
    id: 3,
    text: (
      <Typography variant="overline" color={"white"}>
        User
      </Typography>
    ),
    icon: (
      <Box sx={{ color: "white" }}>
        <PermIdentityIcon />
      </Box>
    ),
    link: "/user",
  },
  // {
  //   id: 4,
  //   text: "Dashboard",
  //   icon: <DnsIcon color="info" />,
  //   link: "/",
  // },
  // {
  //   id: 5,
  //   text: "Customer",
  //   icon: <ModelTrainingIcon color="info" />,
  //   link: "/dashboard/customer",
  // },
];

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export const Abed = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  // ".Mui-selected": "red",
  " &.Mui-selected": {
    backgroundColor: "#6c757d",
    color: "white",
  },

  "&:hover": {
    backgroundColor: "#6c757d",
    color: "white",
  },
}));
