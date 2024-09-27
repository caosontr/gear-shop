import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { BASE_URL } from "../../config";

interface OrderDetailProps {
  _id: string;
  user: string;
  address: string;
  phone: string;
  name: string;
  payment: string;
  products: CartProduct[];
  status: string;
}

interface CartProduct {
  product: {
    _id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    category: string;
  };
  quantity: number;
}

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<OrderDetailProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/orders/${id}`);
        setOrder(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order detail:", error);
        setLoading(false);
      }
    };
    fetchOrderDetail();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <OrderDetailContainer>
      <OrderDetailTitle>Order Details</OrderDetailTitle>
      <DetailItem>
        <strong>Order ID:</strong> {order._id}
      </DetailItem>
      <DetailItem>
        <strong>User:</strong> {order.user}
      </DetailItem>
      <DetailItem>
        <strong>Address:</strong> {order.address}
      </DetailItem>
      <DetailItem>
        <strong>Phone:</strong> {order.phone}
      </DetailItem>
      <DetailItem>
        <strong>Name:</strong> {order.name}
      </DetailItem>
      <DetailItem>
        <strong>Payment:</strong> {order.payment}
      </DetailItem>
      <DetailItem>
        <strong>Status:</strong> {order.status}
      </DetailItem>
      <ProductList>
        <ProductListTitle>Products:</ProductListTitle>
        {order.products.map((product) => (
          <ProductItem key={product.product._id}>
            <strong>{product.product.title}</strong> - {product.quantity} x $
            {product.product.price}
          </ProductItem>
        ))}
      </ProductList>
    </OrderDetailContainer>
  );
};

// CSS
const OrderDetailContainer = styled("div")({
  padding: "2rem",
});

const OrderDetailTitle = styled("h1")({
  marginBottom: "2rem",
});

const DetailItem = styled("div")({
  marginBottom: "1rem",
});

const ProductList = styled("div")({
  marginTop: "2rem",
});

const ProductListTitle = styled("h2")({
  marginBottom: "1rem",
});

const ProductItem = styled("div")({
  marginBottom: "0.5rem",
});

export default OrderDetail;
