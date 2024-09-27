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
import axios from "axios";
import { BASE_URL } from "../../../config";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { ApiResCate, Category } from "../../../types/Category";

const MainContent = styled(Box)({
  flexGrow: 1,
  padding: "24px",
});

const ProductTable = styled(TableContainer)({
  marginTop: "16px",
});

const HeaderContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
});

const ListCategory = () => {
  const [data, setData] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get<ApiResCate>(BASE_URL + "/categories")
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
        axios.delete(BASE_URL + "/categories/" + id).then(() => {
          Swal.fire({
            title: "Deleted!",
            icon: "success",
          }).then(() => {
            window.location.reload();
          });
        });
      }
    });
  };

  return (
    <>
      <MainContent>
        <HeaderContainer>
          <Typography variant="h5" gutterBottom>
            List Category
          </Typography>
          <Link to={"/admin/category/add"}>
            <Button variant="contained" color="success">
              Add +
            </Button>
          </Link>
        </HeaderContainer>
        <ProductTable>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((d) => (
                <TableRow key={d._id}>
                  <TableCell>{d._id}</TableCell>
                  <TableCell>{d.name}</TableCell>
                  <TableCell
                    style={{
                      maxWidth: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {d.description}
                  </TableCell>

                  <TableCell align="center">
                    <Link to={`/admin/category/${d._id}/update`}>
                      <IconButton color="secondary">
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(d._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ProductTable>
      </MainContent>
    </>
  );
};

export default ListCategory;
