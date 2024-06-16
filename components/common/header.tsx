import Link from "next/link";
import styled from "styled-components";

const HeaderWrap = styled.div`
  padding: 30px 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.div`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 20px;
  position: absolute;
  left: 60px;
  @media (max-width: 600px) {
    display: none;
  }
`;

const CategoryBox = styled.div`
  display: flex;
`;

const Category = styled.div`
  font-weight: 500;
  font-size: 16px;
  margin: 0px 2em;
  text-transform: capitalize;
  :hover {
    font-weight: 600;
    font-size: 16px;
    color: #b70339;
    cursor: pointer;
  }
`;

const Header = () => {
  return (
    <HeaderWrap>
      <Logo className="logo">
        <Link href="/" className="hover:underline">
          hanagertrudeKim.dev
        </Link>
      </Logo>
      <CategoryBox>
        <Category>
          <Link href="/">Paper</Link>
        </Category>
        <Category>
          <Link href="/project">Project</Link>
        </Category>
        <Category>
          <Link href="https://hanagertridekim.notion.site/Hana-Kim-9528a0cf680e45d0a596a719e9ca1b74">
            About
          </Link>
        </Category>
      </CategoryBox>
    </HeaderWrap>
  );
};

export default Header;
