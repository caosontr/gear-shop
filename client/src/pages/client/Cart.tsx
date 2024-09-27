import { styled } from "@mui/material/styles";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../config";
import { Product } from "../../types/Product";

interface CartProduct {
  product: Product;
  quantity: number;
}

interface Cart {
  products: CartProduct[];
}

const Cart = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get<Cart>(
          `${BASE_URL}/carts/user/${userId}`
        );
        setCart(response.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Error fetching cart:",
            error.response ? error.response.data : error.message
          );
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };

    fetchCart();
  }, [userId]);

  const handleDeleteProduct = async (productId: string) => {
    try {
      await axios.delete(
        `${BASE_URL}/carts/user/${userId}/product/${productId}`
      );
      setCart((prevCart) => {
        if (!prevCart || !prevCart.products) return prevCart;
        return {
          ...prevCart,
          products: prevCart.products.filter(
            (item) => item.product._id !== productId
          ),
        };
      });
    } catch (error) {
      console.error("Error deleting product from cart:", error);
    }
  };

  const handleCheckout = () => {
    navigate("/check-out", { state: { cartProducts: cart?.products } });
  };

  if (!cart) {
    return (
      <Container>
        <CartContainer>
          <CartHeader>
            <HeaderCell>Image</HeaderCell>
            <HeaderCell>Product</HeaderCell>
            <HeaderCell>Quantity</HeaderCell>
            <HeaderCell>Price</HeaderCell>
            <HeaderCell>Total</HeaderCell>
            <HeaderCell></HeaderCell>
          </CartHeader>
          <EmptyMessage>There are no products in the cart yet.</EmptyMessage>
        </CartContainer>
        <OrderSummary>
          <SummaryTitle>Order Summary</SummaryTitle>
          <SummaryItem>
            <span>Total Cost:</span>
            <span>0.00 VNĐ</span>
          </SummaryItem>
          <CheckoutButton disabled>Check Out</CheckoutButton>
        </OrderSummary>
      </Container>
    );
  }

  return (
    <Container>
      <CartContainer>
        <CartHeader>
          <HeaderCell>Image</HeaderCell>
          <HeaderCell>Product</HeaderCell>
          <HeaderCell>Quantity</HeaderCell>
          <HeaderCell>Price</HeaderCell>
          <HeaderCell>Total</HeaderCell>
          <HeaderCell></HeaderCell>
        </CartHeader>
        {cart.products.map((item) => (
          <CartRow key={item.product._id}>
            <Cell>
              <ProductImage src={item.product.image} alt={item.product.title} />
            </Cell>
            <Cell>{item.product.title}</Cell>
            <QuantityCell>{item.quantity}</QuantityCell>
            <Cell>{item.product.price.toFixed(2)} VNĐ</Cell>
            <Cell>{(item.product.price * item.quantity).toFixed(2)} VNĐ</Cell>
            <Cell>
              <DeleteForeverIcon
                onClick={() => handleDeleteProduct(item.product._id)}
                style={{ cursor: "pointer", color: "red" }}
              />
            </Cell>
          </CartRow>
        ))}
      </CartContainer>

      <OrderSummary>
        <SummaryTitle>Order Summary</SummaryTitle>
        <SummaryItem>
          <span>Items:</span>
          <span>{cart.products.length}</span>
        </SummaryItem>
        <SummaryItem>
          <span>Shipping:</span>
          <span>14.000 VNĐ</span>
        </SummaryItem>
        <SummaryItem>
          <span>Total Cost:</span>
          <span>
            {cart.products
              .reduce(
                (sum, item) => sum + item.product.price * item.quantity,
                0
              )
              .toFixed(2)}{" "}
            VNĐ
          </span>
        </SummaryItem>
        <CheckoutButton onClick={handleCheckout}>Check Out</CheckoutButton>
      </OrderSummary>
    </Container>
  );
};

// CSS
const Container = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  padding: "2rem 10rem",
});

const CartContainer = styled("div")({
  width: "60%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#fff",
  padding: "1rem",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
});
const ProductImage = styled("img")({
  width: "100px",
  height: "auto",
  objectFit: "cover",
  borderRadius: "4px",
});

const CartHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  padding: "1rem 0",
  borderBottom: "1px solid #ddd",
  fontWeight: "bold",
  color: "#333",
});

const HeaderCell = styled("div")({
  flex: 1,
  textAlign: "left",
  paddingLeft: "1rem",
});

const CartRow = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  padding: "1rem 0",
  borderBottom: "1px solid #ddd",
  alignItems: "center",
});

const Cell = styled("div")({
  flex: 1,
  textAlign: "left",
  paddingLeft: "1rem",
});

const QuantityCell = styled(Cell)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
});

const EmptyMessage = styled("div")({
  textAlign: "center",
  padding: "2rem 0",
  color: "#999",
});

const OrderSummary = styled("div")({
  width: "30%",
  backgroundColor: "#fff",
  padding: "1rem",
  borderRadius: "8px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  textAlign: "left",
});

const SummaryTitle = styled("h2")({
  fontSize: "1.5rem",
  marginBottom: "1rem",
});

const SummaryItem = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  padding: "0.5rem 0",
  borderBottom: "1px solid #ddd",
});

const CheckoutButton = styled("button")({
  marginTop: "1rem",
  padding: "0.75rem 2rem",
  backgroundColor: "#000",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#333",
  },
  "&:disabled": {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
  },
});

export default Cart;
