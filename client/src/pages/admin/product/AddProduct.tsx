import {
  Box,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/system";
import { useForm } from "react-hook-form";
import { Product } from "../../../types/Product";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { useEffect, useState } from "react";
import { Category } from "../../../types/Category";

const MainContent = styled(Box)({
  flexGrow: 1,
  padding: "24px",
});

const FormContainer = styled(Box)({
  backgroundColor: "#fff",
});

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get(BASE_URL + "/categories")
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const onSubmit = (data: Product) => {
    axios
      .post(BASE_URL + "/products", data)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/product/list");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        console.error(err);
      });
  };

  return (
    <MainContent>
      <Typography variant="h5" gutterBottom>
        Add Product
      </Typography>
      <FormContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Title"
            {...register("title", { required: "* Required" })}
            error={!!errors.title}
            helperText={errors.title?.message}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Image URL"
            {...register("image", { required: "* Required" })}
            error={!!errors.image}
            helperText={errors.image?.message}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            {...register("description")}
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            label="Price"
            type="number"
            {...register("price", { required: "* Required" })}
            error={!!errors.price}
            helperText={errors.price?.message}
            margin="normal"
          />
          <FormControl fullWidth margin="normal" error={!!errors.category}>
            <InputLabel>Category</InputLabel>
            <Select
              {...register("category", { required: "Required" })}
              label="Category"
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
            {errors.category && (
              <FormHelperText error>* {errors.category.message}</FormHelperText>
            )}
          </FormControl>
          <FormControlLabel
            control={<Checkbox {...register("show")} />}
            label="Show"
          />
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/admin/product/list")}
              style={{ marginRight: "8px" }}
            >
              Back
            </Button>
            <Button type="submit" variant="contained" color="success">
              Add +
            </Button>
          </Box>
        </form>
      </FormContainer>
    </MainContent>
  );
};

export default AddProduct;
