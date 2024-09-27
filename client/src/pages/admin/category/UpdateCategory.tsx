import { Box, Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { Category } from "../../../types/Category";
import { useEffect } from "react";

const MainContent = styled(Box)({
  flexGrow: 1,
  padding: "24px",
});

const FormContainer = styled(Box)({
  backgroundColor: "#fff",
});

const UpdateCategory = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Category>();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(BASE_URL + "/categories/" + id).then((res) => {
      console.log(res);
      const productData = res.data.data;
      setValue("name", productData.name);
      setValue("description", productData.description);
    });
  }, [setValue, id]);

  const onsubmit = (data: Category) => {
    console.log(data);

    axios.put(BASE_URL + "/categories/" + id, data).then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Update successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/admin/category/list");
    });
  };

  return (
    <MainContent>
      <Typography variant="h5" gutterBottom>
        Update Category
      </Typography>
      <FormContainer>
        <form onSubmit={handleSubmit(onsubmit)}>
          <TextField
            fullWidth
            label="Name"
            {...register("name", { required: "* Required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
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

export default UpdateCategory;
