import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { BASE_URL } from "../../config";
import { Order } from "../../types/Order";
import { IconButton } from "@mui/material";

const OrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/orders`);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleUpdateOrder = async (orderId: string) => {
    try {
      const response = await axios.put(`${BASE_URL}/orders/${orderId}`, {
        status: "Updated Status",
      });
      console.log("Order updated successfully:", response.data);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: "Updated Status" } : order
        )
      );
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      await axios.delete(`${BASE_URL}/orders/${orderId}`);
      console.log("Order deleted successfully");
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  if (loading) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  return (
    <OrdersContainer>
      <OrdersTitle>Order Management</OrdersTitle>
      <OrdersTable>
        <thead>
          <OrdersHeaderRow>
            <OrdersHeaderCell>Order ID</OrdersHeaderCell>
            <OrdersHeaderCell>User</OrdersHeaderCell>
            <OrdersHeaderCell>Address</OrdersHeaderCell>
            <OrdersHeaderCell>Phone</OrdersHeaderCell>
            <OrdersHeaderCell>Name</OrdersHeaderCell>
            <OrdersHeaderCell>Status</OrdersHeaderCell>
            <OrdersHeaderCell>Actions</OrdersHeaderCell>
          </OrdersHeaderRow>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrdersRow key={order._id}>
              <OrdersCell>{order._id}</OrdersCell>
              <OrdersCell>{order.user}</OrdersCell>
              <OrdersCell>{order.address}</OrdersCell>
              <OrdersCell>{order.phone}</OrdersCell>
              <OrdersCell>{order.name}</OrdersCell>
              <OrdersCell>{order.status}</OrdersCell>
              <OrdersCell>
                <Link to={`/admin/order/${order._id}/detail`}>
                  <IconButton color="default">View</IconButton>
                </Link>
                <ActionButton onClick={() => handleUpdateOrder(order._id)}>
                  Update
                </ActionButton>
                <DeleteButton onClick={() => handleDeleteOrder(order._id)}>
                  Delete
                </DeleteButton>
              </OrdersCell>
            </OrdersRow>
          ))}
        </tbody>
      </OrdersTable>
    </OrdersContainer>
  );
};

// Styled components
const OrdersContainer = styled("div")({
  padding: "2rem",
  width: "100%",
});

const OrdersTitle = styled("h1")({
  marginBottom: "2rem",
  color: "#333",
  textAlign: "center",
});

const OrdersTable = styled("table")({
  width: "100%",
  borderCollapse: "collapse",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
});

const OrdersHeaderRow = styled("tr")({
  backgroundColor: "#333",
  color: "#fff",
});

const OrdersHeaderCell = styled("th")({
  padding: "1rem",
  textAlign: "left",
  borderBottom: "2px solid #ddd",
  fontWeight: "bold",
});

const OrdersRow = styled("tr")({
  "&:nth-of-type(even)": {
    backgroundColor: "#e6e6e6",
  },
  "&:hover": {
    backgroundColor: "#dcdcdc",
  },
});

const OrdersCell = styled("td")({
  padding: "1rem",
  borderBottom: "1px solid #ddd",
  color: "#555",
});

const ActionButton = styled("button")({
  margin: "0 5px",
  padding: "0.5rem 1rem",
  borderRadius: "5px",
  border: "1px solid #333",
  cursor: "pointer",
  backgroundColor: "#fff",
  color: "#333",
  "&:hover": {
    backgroundColor: "#333",
    color: "#fff",
  },
});

const DeleteButton = styled(ActionButton)({
  borderColor: "#444",
  "&:hover": {
    backgroundColor: "#444",
  },
});

const LoadingContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  fontSize: "1.5rem",
  color: "#555",
});

export default OrderManagement;
