import { useRoutes } from "react-router-dom";
import Home from "./pages/client/Home";
import ProductDetail from "./pages/client/ProductDetail";
import ClientLayout from "./layouts/ClientLayout";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import AdminLayout from "./layouts/AdminLayout";
import ListProduct from "./pages/admin/product/ListProduct";
import AddProduct from "./pages/admin/product/AddProduct";
import UpdateProduct from "./pages/admin/product/UpdateProduct";
import AddCategory from "./pages/admin/category/AddCategory";
import ListCategory from "./pages/admin/category/ListCategory";
import UpdateCategory from "./pages/admin/category/UpdateCategory";
import NotFound from "./components/NotFound";
import Cart from "./pages/client/Cart";
import CheckOut from "./pages/client/CheckOut";
import ProtectRouter from "./services/ProtectRouter";
import OrderManagement from "./pages/cart/OrderManagement";
import OrderDetail from "./pages/cart/OrderDetail";

const routeConfig = [
  {
    path: "/admin",

    element: (
      <ProtectRouter>
        <AdminLayout />
      </ProtectRouter>
    ),
    children: [
      // Product
      { path: "product/list", element: <ListProduct /> },
      { path: "product/add", element: <AddProduct /> },
      { path: "product/:id/update", element: <UpdateProduct /> },
      // Category
      { path: "category/list", element: <ListCategory /> },
      { path: "category/add", element: <AddCategory /> },
      { path: "category/:id/update", element: <UpdateCategory /> },
      //cart
      { path: "cart/odermanagement", element: <OrderManagement /> },
      { path: "order/:id/detail", element: <OrderDetail /> },
    ],
  },
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "/product/not-found", element: <NotFound /> },
      { path: "/cart", element: <Cart /> },
      { path: "/check-out", element: <CheckOut /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

function App() {
  const routes = useRoutes(routeConfig);

  return <main>{routes}</main>;
}

export default App;
