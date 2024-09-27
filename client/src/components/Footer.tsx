import { styled } from "@mui/system";

const FooterContainer = styled("footer")({
  width: "100%",
  padding: "4rem 0 5rem 0",
});

const FooterContent = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  paddingRight: "8rem",
  paddingLeft: "8rem",
});

const LogoAddress = styled("div")({});

const LogoFooter = styled("div")({
  fontSize: "1.5rem",
  fontWeight: 700,
  paddingBottom: "3rem",
});

const Address = styled("div")({
  "& p": {
    fontSize: "1rem",
    fontWeight: 400,
    color: "#9f9f9f",
  },
});

const Links = styled("div")({});

const TitleFooter = styled("div")({
  fontSize: "1rem",
  fontWeight: 500,
  color: "#9f9f9f",
  paddingBottom: "3rem",
});

const MenuFooter = styled("ul")({
  "& li": {
    paddingBottom: "2rem",
  },
  "& li a": {
    color: "#000",
    fontSize: "1rem",
    fontWeight: 500,
  },
});

const Help = styled("div")({});

const Newsletter = styled("div")({});

const FormNewsletter = styled("form")({
  '& input[type="text"]': {
    border: "none",
    borderBottom: "1px solid #000",
    marginRight: "1.2rem",
    paddingRight: "10px",
    width: "200px",
  },
  '& input[type="submit"]': {
    border: "none",
    backgroundColor: "#fff",
    borderBottom: "1px solid #000",
    fontWeight: 500,
    cursor: "pointer",
  },
  "& ::placeholder": {
    color: "#9f9f9f",
    fontSize: "14px",
  },
});

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <LogoAddress>
          <LogoFooter>Keyboard.</LogoFooter>
          <Address>
            <p>400 University Drive Suite 200 Coral Gables,</p>
            <p>FL 33134 USA</p>
          </Address>
        </LogoAddress>
        <Links>
          <TitleFooter>Links</TitleFooter>
          <MenuFooter>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Shop</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </MenuFooter>
        </Links>
        <Help>
          <TitleFooter>Help</TitleFooter>
          <MenuFooter>
            <li>
              <a href="#">Payment Options</a>
            </li>
            <li>
              <a href="#">Returns</a>
            </li>
            <li>
              <a href="#">Privacy Policies</a>
            </li>
          </MenuFooter>
        </Help>
        <Newsletter>
          <TitleFooter>Newsletter</TitleFooter>
          <FormNewsletter>
            <input type="text" placeholder="Enter Your Email Address" />
            <input type="submit" value="SUBSCRIBE" />
          </FormNewsletter>
        </Newsletter>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
