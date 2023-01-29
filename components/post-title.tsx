import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children?: ReactNode;
};

const Wrap = styled.div`
  padding: 50px 0 30px;
  font-weight: 600;
  font-size: 19px;
  line-height: 20px;
  letter-spacing: 0.21em;
`;

const Title = styled.div``;

const PostTitle = ({ children }: Props) => {
  return (
    <Wrap>
      <Title>{children}</Title>
    </Wrap>
  );
};

export default PostTitle;
