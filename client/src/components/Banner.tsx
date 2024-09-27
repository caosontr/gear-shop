import {
  Box,
  Typography,
  ButtonGroup,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";

const Banner = () => {
  return (
    <Box
      component="section"
      sx={{
        mx: "auto",
        maxWidth: "1536px", // equivalent to max-w-screen-2xl
        px: { xs: 4, md: 8 },
      }}
    >
      <Box
        sx={{
          mb: { xs: 8, md: 16 },
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            mb: { xs: 6, sm: 12, lg: 0 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: { xs: "100%", lg: "33.333%" },
            pb: { lg: 24 },
            pt: { lg: 48 },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              mb: { xs: 4, md: 8 },
              fontSize: { xs: "2.25rem", sm: "3rem", md: "3.75rem" },
              fontWeight: "bold",
              color: "black",
            }}
          >
            Động Phím Cơ
          </Typography>

          <Typography
            sx={{
              maxWidth: "28rem",
              lineHeight: "1.75",
              color: "text.secondary",
              fontSize: { xl: "1.125rem" },
            }}
          >
            Nơi chia sẻ giao lưu của anh em đam mê bộ môn <br />
            "ma tuý nhựa", nhưng hơn thế đây là nơi anh em giao lưu, tư vấn,
            chia sẻ tất cả mọi thứ về bàn phím nói chung, và chi tiết hơn là bàn
            phím cơ nói riêng. Đừng ngần ngại đặt câu hỏi, cũng đừng ngại chia
            sẻ kiến thức. Giao lưu vui vẻ, có văn hoá và tôn trọng nhau nhé mọi
            người.
          </Typography>
        </Box>

        <Box
          sx={{
            mb: { xs: 12, md: 16 },
            display: "flex",
            width: { xs: "100%", lg: "66.666%" },
          }}
        >
          <Box
            sx={{
              position: "relative",
              left: { xs: 12, md: 16 },
              top: { xs: 12, md: 16 },
              zIndex: 10,
              ml: { xs: "-3rem", lg: 0 },
              overflow: "hidden",
              borderRadius: "8px",
              bgcolor: "grey.100",
              boxShadow: 1,
            }}
          >
            <img
              src="https://www.phongcachxanh.vn/cdn/shop/articles/banner-kich-thuoc-ban-phim.jpg?v=1692582140&width=2048"
              alt="Banner Image"
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </Box>

          <Box
            sx={{
              overflow: "hidden",
              borderRadius: "8px",
              bgcolor: "grey.100",
              boxShadow: 1,
            }}
          >
            <img
              src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/taco_banner_1024x1024.png"
              alt="Secondary Image"
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <ButtonGroup
          variant="outlined"
          sx={{
            height: "48px",
            width: "256px",
            borderRadius: "8px",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Button
            sx={{
              flex: 1,
              color: "text.secondary",
              transition: "background-color 0.1s",
              "&:hover": {
                backgroundColor: "grey.100",
              },
              "&:active": {
                backgroundColor: "grey.200",
              },
            }}
          >
            KeyCap
          </Button>
          <Button
            sx={{
              flex: 1,
              color: "text.secondary",
              transition: "background-color 0.1s",
              "&:hover": {
                backgroundColor: "grey.100",
              },
              "&:active": {
                backgroundColor: "grey.200",
              },
            }}
          >
            Switch
          </Button>
          <Button
            sx={{
              flex: 1,
              color: "text.secondary",
              transition: "background-color 0.1s",
              "&:hover": {
                backgroundColor: "grey.100",
              },
              "&:active": {
                backgroundColor: "grey.200",
              },
            }}
          >
            Teens
          </Button>
        </ButtonGroup>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "0.75rem", sm: "1rem" },
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "text.secondary",
            }}
          >
            Social
          </Typography>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ bgcolor: "divider" }}
          />

          <Box sx={{ display: "flex", gap: 4 }}>
            <IconButton
              href="#"
              target="_blank"
              sx={{
                color: "text.secondary",
                transition: "color 0.1s",
                "&:hover": {
                  color: "text.primary",
                },
                "&:active": {
                  color: "grey.600",
                },
              }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              href="#"
              target="_blank"
              sx={{
                color: "text.secondary",
                transition: "color 0.1s",
                "&:hover": {
                  color: "text.primary",
                },
                "&:active": {
                  color: "grey.600",
                },
              }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              href="#"
              target="_blank"
              sx={{
                color: "text.secondary",
                transition: "color 0.1s",
                "&:hover": {
                  color: "text.primary",
                },
                "&:active": {
                  color: "grey.600",
                },
              }}
            >
              <PinterestIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
