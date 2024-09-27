import { Box, Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { Category } from "../../../types/Category";

const MainContent = styled(Box)({
  flexGrow: 1,
  padding: "24px",
});

const FormContainer = styled(Box)({
  backgroundColor: "#fff",
});

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Category>();
  const navigate = useNavigate();

  const onSubmit = (data: Category) => {
    axios
      .post(BASE_URL + "/categories", data)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/admin/category/list");
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  return (
    <MainContent>
      <Typography variant="h5" gutterBottom>
        Add Category
      </Typography>
      <FormContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Name"
            {...register("name", { required: "* Required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
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

export default AddCategory;
