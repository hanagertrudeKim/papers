import DateFormatter from "./date-formatter";
import PostTitle from "./post-title";
import styled from "styled-components";

type Props = {
  title: string;
  date: string;
};

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const PostHeader = ({ title, date }: Props) => {
  return (
    <Wrap>
      <PostTitle>{title}</PostTitle>
      <div>
        <DateFormatter dateString={date} />
      </div>
    </Wrap>
  );
};

export default PostHeader;
