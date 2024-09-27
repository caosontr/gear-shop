import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
} from "@mui/material";
import { ApiResPro, Product } from "../types/Product";
import axios from "axios";
import { BASE_URL } from "../config";
import Swal from "sweetalert2";

const ProductList = () => {
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResPro>(`${BASE_URL}/products`);
        setData(response.data.data);
        console.log("Data", response.data);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <Section>
      <SectionTitle>Sản Phẩm Mới Nhất</SectionTitle>
      <SectionContent>
        <ListProduct container spacing={2}>
          {data?.map((product, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <CardProduct>
                <ImgProduct image={product?.image} />
                <InfoProduct>
                  <NameProduct>{product?.title}</NameProduct>
                  <DescriptionProduct>
                    {product?.description}
                  </DescriptionProduct>
                  <PriceProduct>
                    <Price>{product?.price} VNĐ</Price>
                  </PriceProduct>
                </InfoProduct>
                <Overlay>
                  <OverlayContent>
                    <Link to={`/product/${product._id}`}>
                      <AddToCartButton>View Detail</AddToCartButton>
                    </Link>
                  </OverlayContent>
                </Overlay>
                <DiscountTag label="" />
              </CardProduct>
            </Grid>
          ))}
        </ListProduct>
      </SectionContent>
    </Section>
  );
};

// CSS
const Section = styled(Box)({
  paddingLeft: "8rem",
  paddingRight: "8rem",
  maxWidth: "1660px",
  margin: "0 auto",
});

const SectionTitle = styled("div")({
  fontSize: "1.8rem",
  fontWeight: 500,
  paddingTop: "2rem",
  paddingBottom: "1rem",
  textAlign: "center",
});

const SectionContent = styled(Box)({
  borderTop: "2px solid #000",
  paddingTop: "2rem",
  paddingBottom: "2rem",
  borderBottom: "2px solid #000",
});

const ListProduct = styled(Grid)({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "20px",
  justifyContent: "center",
});

const CardProduct = styled(Card)({
  position: "relative",
  display: "inline-block",
  backgroundColor: "#f4f5f7",
  textAlign: "center",
});

const ImgProduct = styled(CardMedia)({
  width: 280,
  height: 300,
  margin: "0 auto",
});

const InfoProduct = styled(CardContent)({
  paddingLeft: "1rem",
  paddingBottom: "2rem",
});

const NameProduct = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: 600,
});

const DescriptionProduct = styled(Typography)({
  paddingTop: "8px",
  fontWeight: 500,
  fontSize: "1rem",
  opacity: 0.6,
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  width: "200px",
  margin: "0 auto",
});

const PriceProduct = styled(Box)({
  paddingTop: "12px",
  display: "flex",
  justifyContent: "center",
  gap: "1.2rem",
});

const Price = styled(Typography)({
  fontSize: "1.2rem",
  fontWeight: 600,
  color: "red",
});

const Overlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  opacity: 0,
  transition: "opacity 0.3s ease",
  "&:hover": {
    opacity: 1,
  },
});

const OverlayContent = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  color: "white",
});

const AddToCartButton = styled("div")({
  backgroundColor: "#fff",
  fontSize: "1rem",
  fontWeight: 600,
  padding: "10px 20px",
  border: "none",
  cursor: "pointer",
  width: 200,
  marginBottom: "1rem",
  textAlign: "center",
});

const DiscountTag = styled(Chip)({
  position: "absolute",
  borderRadius: "50%",
  backgroundColor: "rgb(233, 113, 113)",
  width: 40,
  height: 40,
  top: "5%",
  right: "10%",
  color: "white",
  textAlign: "center",
});

export default ProductList;
