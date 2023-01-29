import styled from "styled-components";

type Props = {
  children?: React.ReactNode;
};

const Wrap = styled.div``;

const Container = ({ children }: Props) => {
  return <Wrap>{children}</Wrap>;
};

export default Container;
