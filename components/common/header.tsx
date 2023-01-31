import Link from "next/link";
import styled from "styled-components";

const HeaderWrap = styled.div`
  padding: 30px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const Logo = styled.div`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 14px;
  position: absolute;
  left: 20px;
  color: #323232;
`;

const CategoryBox = styled.div`
  display: flex;
`;

const Category = styled.div`
  font-weight: 500;
  font-size: 13px;
  margin: 0px 2em;
  text-transform: capitalize;
  :hover {
    font-weight: 600;
    font-size: 13px;
    color: #b70339;
    cursor: pointer;
    font-style: italic;
  }
`;

const Header = () => {
  return (
    <HeaderWrap>
      <Logo>
        <Link href="/" className="hover:underline">
          hanagertrudeKim
        </Link>
      </Logo>
      <CategoryBox>
        <Category>
          <Link href="/">Paper</Link>
        </Category>
        <Category>
          <Link href="/Project">Project</Link>
        </Category>
        <Category>Lab</Category>
      </CategoryBox>
    </HeaderWrap>
  );
};

export default Header;
