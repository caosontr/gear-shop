import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { ApiResPro, Product } from "../../../types/Product";
import axios from "axios";
import { BASE_URL } from "../../../config";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MainContent = styled(Box)({
  flexGrow: 1,
  padding: "24px",
  backgroundColor: "#f1f1f1",
  color: "#333",
  minHeight: "100vh",
});

const ProductTable = styled(TableContainer)({
  marginTop: "16px",
  backgroundColor: "#fff",
  color: "#000",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
});

const HeaderContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
  color: "#333",
});

const CustomTableCell = styled(TableCell)({
  color: "#333",
  borderColor: "#ccc",
});

const ListProduct = () => {
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get<ApiResPro>(BASE_URL + "/products")
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        console.log(err);
      });
  }, []);

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(BASE_URL + "/products/" + id).then(() => {
          Swal.fire({
            title: "Deleted!",
            icon: "success",
          }).then(() => {
            setData((prevData) => prevData.filter((item) => item._id !== id));
          });
        });
      }
    });
  };

  return (
    <MainContent>
      <HeaderContainer>
        <Typography variant="h5" gutterBottom>
          List Product
        </Typography>
        <Link to={"/admin/product/add"}>
          <Button variant="contained" sx={{ backgroundColor: "#333", color: "#fff" }}>
            Add +
          </Button>
        </Link>
      </HeaderContainer>
      <ProductTable>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell>ID</CustomTableCell>
              <CustomTableCell>Title</CustomTableCell>
              <CustomTableCell>Image</CustomTableCell>
              <CustomTableCell>Description</CustomTableCell>
              <CustomTableCell align="center">Price</CustomTableCell>
              <CustomTableCell align="center">Show</CustomTableCell>
              <CustomTableCell align="center">Actions</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((d) => (
              <TableRow key={d._id}>
                <CustomTableCell>{d._id}</CustomTableCell>
                <CustomTableCell>{d.title}</CustomTableCell>
                <CustomTableCell>
                  <img
                    src={d.image}
                    alt={d.title}
                    style={{ maxWidth: "120px", maxHeight: "80px", objectFit: "cover" }}
                  />
                </CustomTableCell>
                <CustomTableCell
                  style={{
                    maxWidth: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {d.description}
                </CustomTableCell>
                <CustomTableCell align="center">{d.price}</CustomTableCell>
                <CustomTableCell align="center">
                  {d.show ? "✓" : "✗"}
                </CustomTableCell>
                <CustomTableCell align="center">
                  <Link to={`/admin/product/${d._id}/update`}>
                    <IconButton color="default">
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton color="default" onClick={() => handleDelete(d._id)}>
                    <DeleteIcon />
                  </IconButton>
                </CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ProductTable>
    </MainContent>
  );
};

export default ListProduct;
