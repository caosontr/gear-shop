import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

// Custom styled components
const SidebarCSS = styled(Box)({
  width: "200px",
  padding: "16px",
  backgroundColor: "#000",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  color: "#fff",
});

const MenuItem = styled(Link)({
  display: "block",
  padding: "8px 16px",
  color: "#fff",
  textDecoration: "none",
  "&:hover": {
    backgroundColor: "#333",
  },
});

const Logo = styled(Box)({
  textAlign: "center",
  marginBottom: "16px",
  fontSize: "24px",
  fontWeight: "bold",
  color: "#fff",
});

const Sidebar = () => {
  return (
    <SidebarCSS>
      <Box>
        <Logo>Logo</Logo>
        <MenuItem to="/admin/dashboard">Client</MenuItem>
        <MenuItem to="/admin/dashboard">Dashboard</MenuItem>
        <MenuItem to="/admin/category/list">Categories</MenuItem>
        <MenuItem to="/admin/product/list">Products</MenuItem>
        <MenuItem to="/admin/cart/odermanagement">Cart</MenuItem>
        <MenuItem to="/admin/account">Account</MenuItem>
      </Box>
    </SidebarCSS>
  );
};

export default Sidebar;
