import { useQuery } from "@tanstack/react-query";
import {
  Table,
  Button,
  Modal,
  Spinner,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { deleteProduct, getProducts } from "../../services/product";

export default function ProductListPage() {
  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false);
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(
    null
  );

  const result = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const products = result.data || [];
  const loading = result.isLoading;

  console.log(products);

  const handleClickBtnDelete = (id: string) => {
    setProductIdToDelete(id);
    setOpenModalConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (productIdToDelete) {
      await deleteProduct(productIdToDelete);
      setProductIdToDelete(null);
      setOpenModalConfirm(false);
      result.refetch();
    }
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
    <Container className="mt-6">
      <h1 className="text-center mb-4">Product List</h1>
      <Row className="mb-3">
        <Col className="text-right">
          <div className="">
            <Link to={"/"}>
              <Button variant="primary" className="mr-2">
                Home
              </Button>
            </Link>
            <Link to={"/admin/products/create"}>
              <Button variant="success">Add Product</Button>
            </Link>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table striped bordered hover responsive>
            <thead>
              <tr className="text-center">
                <th>#ID</th>
                <th className="col-2">Name</th>
                <th className="col-2">Ảnh sản phẩm</th>
                <th>Description</th>
                <th>Brand</th>
                <th className="col-2">Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="text-center">{product.id}</td>
                  <td className="col-2">{product.title}</td>
                  <td className="col-2">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      style={{ width: "100px", height: "auto" }}
                    />
                  </td>
                  <td>{product.description}</td>
                  <td className="text-center">{product.brand}</td>
                  <td className="col-2 text-center">{product.price} VNĐ</td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <Link
                        to={`/admin/products/${product.id}`}
                        className="btn btn-info mr-2"
                      >
                        Edit
                      </Link>
                      <Button
                        variant="danger"
                        onClick={() => handleClickBtnDelete(product.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Modal show={openModalConfirm} onHide={() => setOpenModalConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Bạn có chắc muốn xóa?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setOpenModalConfirm(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
