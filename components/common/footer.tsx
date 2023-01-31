import Link from "next/link";
import Container from "../container";
import styled from "styled-components";

const FooterWrap = styled.footer`
  padding: 15px;
  margin-top: 30px;
  border-top: rgb(238 238 238) 1px solid;
  background-color: #f8f8f8;
`;

const Footer = () => {
  return (
    <FooterWrap>
      <Container>
        <Link
          href="https://github.com/hanagertrudekim/papers"
          className="hover:underline"
        >
          Github
        </Link>
      </Container>
    </FooterWrap>
  );
};

export default Footer;
