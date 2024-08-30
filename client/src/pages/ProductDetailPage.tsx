import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Spinner, Image } from "react-bootstrap";
import { getProduct } from "../services/product";
import Menu from "../layouts/Menu";

const ProductDetail = () => {
  const { id } = useParams<{ id?: string }>();

  const result = useQuery({
    queryKey: ["product", id],
    queryFn: () => (id ? getProduct(id) : Promise.resolve(null)),
  });

  const product = result.data;
  const loading = result.isLoading;

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

  if (!product) {
    return (
      <Container className="mt-6">
        <h1 className="text-center">Product not found</h1>
      </Container>
    );
  }

  return (
    <>
      <Menu />
      <Container className="mt-6">
        <Row>
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center"
          >
            <Image
              src={product.thumbnail}
              alt={product.title}
              className="product-image"
            />
          </Col>
          <Col md={6}>
            <h2 className="product-title">{product.title}</h2>
            <p>
              <strong>Brand:</strong>{" "}
              <span className="product-info">{product.brand}</span>
            </p>
            <p>
              <strong>Price:</strong>{" "}
              <span className=" product-info">{product.price} VNĐ</span>
            </p>
            <p>
              <strong>Description:</strong>{" "}
              <span className="product-info">{product.description}</span>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductDetail;
