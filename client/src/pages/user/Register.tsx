import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { useForm } from "react-hook-form";
import { RegisterForm } from "../../types/User";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const RegisterSpace = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "5rem",
});

const RegisterContainer = styled("div")({
  width: "40%",
  padding: "2rem",
  boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  backgroundColor: "#fff",
});

const BtnBack = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
});

const BackIcon = styled("div")({
  height: "25px",
  width: "25px",
  backgroundColor: "#000",
  color: "#fff",
  padding: "0 1px",
  borderRadius: "2px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const FormRegister = styled("form")({});

const FormTitle = styled("p")({
  color: "#000",
  fontSize: "30px",
  fontWeight: 700,
  paddingBottom: "20px",
  textAlign: "center",
});

const FormLabel = styled("label")({
  fontWeight: 500,
  fontSize: "18px",
  color: "#000",
  textAlign: "left",
  paddingBottom: "10px",
  display: "block",
});

const FormInput = styled(TextField)({
  width: "100%",
  borderRadius: "15px",
  marginBottom: "10px",
  "& .MuiInputBase-root": {
    height: "40px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "15px",
    },
  },
});

const FieldErr = styled("div")({
  color: "red",
  fontWeight: "500",
  marginTop: "5px",
  marginBottom: "10px",
});

const BtnSubmit = styled("div")({
  width: "100%",
  textAlign: "center",
});

const SubmitButton = styled(Button)({
  backgroundColor: "#000",
  color: "#fff",
  fontWeight: 700,
  fontSize: "15px",
  border: "none",
  padding: "10px 30px",
  marginTop: "20px",
  borderRadius: "8px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#333",
  },
  "&:active": {
    backgroundColor: "#555",
  },
});

const SocialLogin = styled("div")({
  display: "flex",
  justifyContent: "space-around",
  marginTop: "20px",
  textAlign: "center",
  alignItems: "center",
});

const SocialBtn = styled("div")({
  padding: "10px 20px",
  fontWeight: 700,
  borderRadius: "15px",
  color: "#fff",
  cursor: "pointer",
  "&:hover": {
    opacity: 0.8,
  },
});

const SocialFb = styled(SocialBtn)({
  backgroundColor: "#0171d3",
});

const SocialGg = styled(SocialBtn)({
  backgroundColor: "#fff",
  color: "#000",
  border: "1px solid #000",
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const navigate = useNavigate();

  const onSubmit = async (data: RegisterForm) => {
    try {
      const res = await axios.post("http://localhost:3000/auth/register", data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Đăng ký thành công",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(res);
      navigate("/login");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Đã xảy ra lỗi!",
        text: "Vui lòng kiểm tra lại Email và Password",
      });
      console.error(err);
    }
  };

  return (
    <RegisterSpace>
      <RegisterContainer>
        <BtnBack onClick={() => navigate("/")}>
          <BackIcon>
            <CloseSharpIcon />
          </BackIcon>
        </BtnBack>

        <FormRegister onSubmit={handleSubmit(onSubmit)}>
          <FormTitle>Register</FormTitle>
          <FormLabel htmlFor="username">UserName:</FormLabel>
          <FormInput
            id="username"
            type="username"
            variant="outlined"
            placeholder="Username"
            {...register("username", {
              required: "* Vui lòng nhập username",
            })}
          />
          {errors.username && <FieldErr>{errors.username.message}</FieldErr>}

          <FormLabel htmlFor="email">Email:</FormLabel>
          <FormInput
            id="email"
            type="email"
            variant="outlined"
            placeholder="Email"
            {...register("email", {
              required: "* Vui lòng nhập email",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "* Vui lòng nhập email hợp lệ",
              },
            })}
          />
          {errors.email && <FieldErr>{errors.email.message}</FieldErr>}

          <FormLabel htmlFor="password">Password:</FormLabel>
          <FormInput
            id="password"
            type="password"
            variant="outlined"
            placeholder="Nhập mật khẩu của bạn"
            {...register("password", {
              required: "* Vui lòng nhập mật khẩu",
              minLength: {
                value: 6,
                message: "* Mật khẩu phải có ít nhất 6 ký tự",
              },
            })}
          />
          {errors.password && <FieldErr>{errors.password.message}</FieldErr>}

          <BtnSubmit>
            <SubmitButton type="submit">Register</SubmitButton>
          </BtnSubmit>
        </FormRegister>

        <SocialLogin>
          <SocialFb>Facebook</SocialFb>
          <SocialGg>Google</SocialGg>
        </SocialLogin>
      </RegisterContainer>
    </RegisterSpace>
  );
};

export default Register;
