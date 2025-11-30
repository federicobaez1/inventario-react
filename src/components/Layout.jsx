// src/components/Layout.jsx
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import InventoryIcon from "@mui/icons-material/Inventory";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import PeopleIcon from "@mui/icons-material/People";
import DevicesIcon from "@mui/icons-material/Devices";
import SecurityIcon from "@mui/icons-material/Security";
import LockIcon from "@mui/icons-material/Lock";
import ImportExportIcon from "@mui/icons-material/ImportExport";

const drawerWidth = 240;

const menuItems = [
  { text: "Productos", icon: <InventoryIcon />, path: "/productos" },
  { text: "Depósitos", icon: <WarehouseIcon />, path: "/depositos" },
  { text: "Inventarios", icon: <InventoryIcon />, path: "/inventarios" },
  { text: "Empleado-Equipo", icon: <PeopleIcon />, path: "/empleadoequipos" },
  { text: "Empleados", icon: <PeopleIcon />, path: "/empleados" },
  { text: "Equipos", icon: <DevicesIcon />, path: "/equipos" },
  { text: "Usuarios", icon: <SecurityIcon />, path: "/admin" },
  { text: "Roles", icon: <SecurityIcon />, path: "/admin-roles" },
  { text: "Contraseña", icon: <LockIcon />, path: "/cambiar-password" },
  { text: "Detalles", icon: <InventoryIcon />, path: "/detalleInventarios" },
  { text: "Importar Excel", icon: <ImportExportIcon />, path: "/importar-excel" },
];

export default function Layout() {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* NAVBAR */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Inventario
          </Typography>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR */}
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : 64,
          flexShrink: 0,
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : 64,
            transition: "width 0.3s",
            overflowX: "hidden",
          },
        }}
      >
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {open && <ListItemText primary={item.text} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* CONTENIDO */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: "margin-left 0.3s",
          ml: open ? `${drawerWidth}px` : "64px",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
