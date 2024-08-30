import { useState } from "react";
import { Button, Form, Container, Row, Col, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { SignInForm } from "../types/Auth";
import { signIn } from "../services/auth";

const SignInPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInForm>();

  const onSubmit = (formValue: SignInForm) => {
    setLoading(true);

    signIn(formValue)
      .then((res) => {
        const accessToken = res.accessToken;
        window.sessionStorage.setItem("access-token", accessToken);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Đăng Ký Thành Công!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          text: error.response.data.message || "Tài khoản này đã tồn tại 🤦‍♂️!",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h1 className="text-center mb-4">Sign Up</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                {...register("email", {
                  required: "Please type your email!",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Email not valid",
                  },
                })}
                isInvalid={!!errors?.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                {...register("password", {
                  required: "Please type your password!",
                  minLength: {
                    value: 8,
                    message: "Min length by 8 chars",
                  },
                })}
                isInvalid={!!errors?.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-end mt-6">
              <Button type="submit" className="btn-primary">
                Register
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignInPage;
