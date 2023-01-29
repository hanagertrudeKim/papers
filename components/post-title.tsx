import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children?: ReactNode;
};

const Wrap = styled.div`
  padding: 20px 0;
  margin: 10px 0;
  border-bottom: 1px solid #ddd;
  font-size: 25px;
  margin-bottom: 1vw;
  font-weight: 500;
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
