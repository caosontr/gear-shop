import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../../config";
import { CartProduct, FormOrder } from "../../types/Order";

const CheckOut = () => {
  const location = useLocation();
  const cartProducts: CartProduct[] = location.state?.cartProducts || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormOrder>();

  const onSubmit = async (data: FormOrder) => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.post(`${BASE_URL}/orders`, {
        user: userId,
        address: data.address,
        phone: data.phone,
        name: data.name,
        payment: "COD",
        products: cartProducts,
      });
      console.log("Order created successfully:", response.data);
      alert("Order created successfully");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error creating order:",
          error.response ? error.response.data : error.message
        );
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <Container>
      <FormSection onSubmit={handleSubmit(onSubmit)}>
        <FormTitle>Billing Details</FormTitle>
        <FormContainer>
          <InputContainer>
            <Label>Name</Label>
            <Input {...register("name", { required: "Name is required" })} />
            {errors.name && <Error>{errors.name.message}</Error>}
          </InputContainer>

          <InputContainer>
            <Label>Phone</Label>
            <Input
              {...register("phone", { required: "Phone number is required" })}
            />
            {errors.phone && <Error>{errors.phone.message}</Error>}
          </InputContainer>

          <InputContainer>
            <Label>Street Address</Label>
            <Input
              {...register("address", {
                required: "Street address is required",
              })}
            />
            {errors.address && <Error>{errors.address.message}</Error>}
          </InputContainer>
        </FormContainer>
        <BtnCheckout type="submit">Place Order</BtnCheckout>
      </FormSection>

      <CartSection>
        <CartTitle>Order Summary</CartTitle>
        <CartList>
          <thead>
            <CartListHeader>
              <CartListHeaderCell>Product</CartListHeaderCell>
              <CartListHeaderCell>Quantity</CartListHeaderCell>
              <CartListHeaderCell>Price</CartListHeaderCell>
              <CartListHeaderCell>Total</CartListHeaderCell>
            </CartListHeader>
          </thead>
          <tbody>
            {cartProducts.map((item) => (
              <CartListRow key={item.product._id}>
                <CartListCell>{item.product.title}</CartListCell>
                <CartListCell>{item.quantity}</CartListCell>
                <CartListCell>{item.product.price.toFixed(2)} VNĐ</CartListCell>
                <CartListCell>
                  {(item.product.price * item.quantity).toFixed(2)} VNĐ
                </CartListCell>
              </CartListRow>
            ))}
          </tbody>
        </CartList>
        <TotalContainer>
          <TotalLabel>Total:</TotalLabel>
          <TotalAmount>
            {cartProducts
              .reduce(
                (sum, item) => sum + item.product.price * item.quantity,
                0
              )
              .toFixed(2)}{" "}
            VNĐ
          </TotalAmount>
        </TotalContainer>
      </CartSection>
    </Container>
  );
};

// CSS

const Container = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  padding: "2rem 10rem",
});

const FormSection = styled("form")({
  width: "60%",
});

const FormTitle = styled("h2")({
  fontSize: "1.5rem",
  marginBottom: "1rem",
});

const FormContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "1rem",
});

const InputContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  marginBottom: "1rem",
});

const Label = styled("label")({
  marginBottom: "0.5rem",
  fontSize: "1rem",
});

const Input = styled("input")({
  padding: "0.5rem",
  fontSize: "1rem",
  border: "1px solid #ccc",
  borderRadius: "4px",
});

const Error = styled("span")({
  color: "red",
  fontSize: "0.875rem",
  marginTop: "0.5rem",
});

const BtnCheckout = styled("button")({
  border: "none",
  padding: "0.75rem 2rem",
  backgroundColor: "black",
  color: "white",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "1rem",
  marginTop: "1rem",
});

const CartSection = styled("div")({
  width: "35%",
});

const CartTitle = styled("h2")({
  fontSize: "1.5rem",
  marginBottom: "1rem",
});

const CartList = styled("table")({
  width: "100%",
  borderSpacing: 0,
});

const CartListHeader = styled("tr")({});

const CartListHeaderCell = styled("th")({
  padding: "10px 0",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
});

const CartListRow = styled("tr")({
  borderBottom: "1px solid #ddd",
});

const CartListCell = styled("td")({
  padding: "10px 0",
});

const TotalContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "2rem",
});

const TotalLabel = styled("p")({
  fontSize: "1.25rem",
  fontWeight: 600,
});

const TotalAmount = styled("p")({
  fontSize: "1.25rem",
  fontWeight: 600,
  color: "red",
});

export default CheckOut;
