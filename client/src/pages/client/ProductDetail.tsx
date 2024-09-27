import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ApiResProDetail, Product } from "../../types/Product";
import axios from "axios";
import { BASE_URL } from "../../config";
import { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../redux/loadingSlice";
import { AppDispatch } from "../../redux/store";
import { CircularProgress } from "@mui/material";
import { Bounce, toast } from "react-toastify";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const ProductDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState<Product>();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  useEffect(() => {
    const fetchData = () => {
      dispatch(setLoading(true));
      axios
        .get<ApiResProDetail>(`${BASE_URL}/products/${id}`)
        .then(async (response) => {
          await delay(500);
          setData(response.data.data);
          dispatch(setLoading(false));
        })
        .catch((err) => {
          console.log(err);
          if (err.response && err.response.status === 400) {
            navigate("/product/not-found");
          }
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    };

    fetchData();
  }, [id, navigate, dispatch]);

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(prev + change, 1));
  };

  const userId = localStorage.getItem("userId");
  console.log(userId);

  const handleAddToCart = async () => {
    try {
      await axios.post(`${BASE_URL}/carts`, {
        user: userId,
        product: data?._id,
        quantity,
      });
      toast.success("Sản phẩm đã được thêm vào giỏ hàng", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      toast.error("Thêm sản phẩm thất bại", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  }

  return (
    <div>
      <BreadcrumbContainer>
        <Typography variant="body1">Home</Typography>
        <ChevronRightIcon />
        <Typography variant="body1">Shop</Typography>
        <ChevronRightIcon />
        <Typography variant="body1">Product</Typography>
      </BreadcrumbContainer>

      <SectionContainer>
        <DetailListContainer>
          <DetailImgContainer>
            <ThumbnailContainer>
              <ThumbnailImg src={data?.image} alt="" />
              <ThumbnailImg src={data?.image} alt="" />
              <ThumbnailImg src={data?.image} alt="" />
              <ThumbnailImg src={data?.image} alt="" />
            </ThumbnailContainer>
            <div>
              <MainImg src={data?.image} alt="" />
            </div>
          </DetailImgContainer>
          <DetailInfoContainer>
            <DetailName>{data?.title}</DetailName>
            <DetailPrice>{data?.price}VNĐ</DetailPrice>

            <DetailIntro>{data?.description}</DetailIntro>

            <DetailQuantity>
              <QuantityIcon onClick={() => handleQuantityChange(-1)}>
                <RemoveCircleIcon />
              </QuantityIcon>
              {quantity}
              <QuantityIcon onClick={() => handleQuantityChange(1)}>
                <AddCircleIcon />
              </QuantityIcon>
            </DetailQuantity>
            <DetailAction onClick={handleAddToCart}>
              <DetailActionText>Add to Cart</DetailActionText>
            </DetailAction>

            <CategoryTagsContainer>
              <CategoryTagsList>
                <CategoryTagsGroup>
                  <Typography variant="body1">SKU</Typography>
                  <Typography variant="body1">Category</Typography>
                  <Typography variant="body1">Tags</Typography>
                  <Typography variant="body1">Share</Typography>
                </CategoryTagsGroup>
              </CategoryTagsList>
            </CategoryTagsContainer>
          </DetailInfoContainer>
        </DetailListContainer>

        {/* Description */}
        <DetailDesc>
          <DescTitle>
            <TitleText>Description</TitleText>
          </DescTitle>
          <DescriptionText>
            Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn
            portable active stereo speaker takes the unmistakable look and sound
            of Marshall, unplugs the chords, and takes the show on the road.
          </DescriptionText>
          <DescriptionText>
            Weighing in under 7 pounds, the Kilburn is a lightweight piece of
            vintage styled engineering. Setting the bar as one of the
            loudestinfo speakers in its class, the Kilburn is a compact,
            stout-hearted hero with a well-balanced audio which boasts a clear
            midrange and extended highs for a sound that is both articulate and
            pronounced. The analogue knobs allow you to fine tune the controls
            to your personal preferences while the guitar-influenced leather
            strap enables easy and stylish travel.
          </DescriptionText>
          <DescImgContainer>
            <DescImage src="./img/height.jpg" alt="" />
            <DescImage src="./img/height.jpg" alt="" />
          </DescImgContainer>
        </DetailDesc>
      </SectionContainer>
    </div>
  );
};

// CSS
const BreadcrumbContainer = styled("div")({
  backgroundColor: "#f8f8f8",
  padding: "2rem 5rem",
  display: "flex",
  gap: "20px",
});

const SectionContainer = styled("section")({
  paddingLeft: "8rem",
  paddingRight: "8rem",
  backgroundColor: "#fff",
  color: "#333",
});

const DetailListContainer = styled("section")({
  display: "flex",
  gap: "8rem",
  marginTop: "40px",
});

const DetailImgContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
});

const ThumbnailContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const ThumbnailImg = styled("img")({
  backgroundColor: "#f8f8f8",
  marginBottom: "20px",
  width: "70px",
  height: "70px",
  padding: "10px 0",
  borderRadius: "10px",
});

const MainImg = styled("img")({
  width: "80%",
  backgroundColor: "#f8f8f8",
  marginLeft: "40px",
  borderRadius: "10px",
});

const DetailInfoContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const DetailName = styled("h2")({
  fontSize: "24px",
  fontWeight: "bold",
  color: "#333",
});

const DetailPrice = styled("span")({
  fontSize: "18px",
  fontWeight: "600",
  color: "red",
});

const DetailIntro = styled("p")({
  fontSize: "16px",
  lineHeight: "1.5",
  marginTop: "10px",
  color: "#333",
});

const DetailQuantity = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "16px",
  color: "#333",
});

const QuantityIcon = styled("div")({
  cursor: "pointer",
});

const DetailAction = styled("button")({
  padding: "10px 20px",
  backgroundColor: "#333",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
});

const DetailActionText = styled("span")({});

const CategoryTagsContainer = styled("div")({
  marginTop: "30px",
});

const CategoryTagsList = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const CategoryTagsGroup = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  color: "#333",
});

const DescTitle = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginTop: "40px",
});

const TitleText = styled("span")({
  fontSize: "20px",
  fontWeight: "bold",
  color: "#333",
});

const DescriptionText = styled("p")({
  fontSize: "16px",
  lineHeight: "1.5",
  marginTop: "10px",
  color: "#333",
});

const DescImgContainer = styled("div")({
  display: "flex",
  gap: "10px",
  marginTop: "20px",
});

const DescImage = styled("img")({
  width: "50%",
  borderRadius: "10px",
});

const LoadingContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const DetailDesc = styled("div")({
  marginTop: "40px",
});

export default ProductDetail;
