import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/system";
import { useForm } from "react-hook-form";
import { Product } from "../../../types/Product";
import { useNavigate, useParams } from "react-router-dom";
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
  padding: "24px",
  borderRadius: "8px",
});

const CheckboxInput = styled("input")({
  marginRight: "8px",
});

const UpdateProduct = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Product>();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    axios.get(BASE_URL + "/products/" + id).then((res) => {
      console.log(res);
      const productData = res.data.data;
      setValue("title", productData.title);
      setValue("image", productData.image);
      setValue("description", productData.description);
      setValue("price", productData.price);
      setValue("show", productData.show);
      setSelectedCategory(productData.category);
    });

    axios
      .get(BASE_URL + "/categories")
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        console.error(err);
      });
  }, [setValue, id]);

  const onSubmit = (data: Product) => {
    const updatedData = {
      ...data,
      category: selectedCategory,
    };

    axios
      .put(BASE_URL + "/products/" + id, updatedData)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Updated successfully!",
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
        Update Product
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
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Image URL"
            {...register("image", { required: "* Required" })}
            error={!!errors.image}
            helperText={errors.image?.message}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Description"
            {...register("description")}
            margin="normal"
            multiline
            rows={4}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Price"
            type="number"
            {...register("price", { required: "* Required" })}
            error={!!errors.price}
            helperText={errors.price?.message}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth margin="normal" error={!!errors.category}>
            <InputLabel shrink>Category</InputLabel>
            <Select
              {...register("category")}
              label="Category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
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
          <Box display="flex" alignItems="center" mt={2}>
            <CheckboxInput type="checkbox" {...register("show")} />
            <Typography>Show</Typography>
          </Box>
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
              Update
            </Button>
          </Box>
        </form>
      </FormContainer>
    </MainContent>
  );
};

export default UpdateProduct;
