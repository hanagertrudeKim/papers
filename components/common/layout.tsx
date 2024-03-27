import Footer from "./footer";
import Header from "./header";
import Meta from "../meta";
import styled from "styled-components";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
};

const Wrap = styled.div`
`;

const Layout = ({ preview, children }: Props) => {
  return (
    <>
      <Meta />
      <Header />
      <Wrap className="min-h-screen">
        <main>{children}</main>
      </Wrap>
      <Footer />
    </>
  );
};

export default Layout;
