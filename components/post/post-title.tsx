import { ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children?: ReactNode;
};

const Wrap = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
  font-size: 30px;
  font-weight: 600;
  color: white;
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
