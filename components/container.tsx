import styled from "styled-components";

type Props = {
  children?: React.ReactNode;
};

const Wrap = styled.div`
  letter-spacing: 0.13em;
`;

const Container = ({ children }: Props) => {
  return <Wrap>{children}</Wrap>;
};

export default Container;
