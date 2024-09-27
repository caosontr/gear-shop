import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Box, styled } from "@mui/material";
import { useEffect } from "react";
import Swal from "sweetalert2";

const DashboardContainer = styled(Box)({
  display: "flex",
});

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Vui lòng đăng nhập để tiếp tục!",
      });
      navigate("/login");
    }
  }, [navigate]);
  return (
    <>
      <DashboardContainer>
        <Sidebar />
        <Outlet />
      </DashboardContainer>
    </>
  );
};

export default AdminLayout;
