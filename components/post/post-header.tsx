import DateFormatter from "../date-formatter";
import PostTitle from "./post-title";
import styled from "styled-components";

type Props = {
  title: string;
  date: string;
};

const Wrap = styled.div`
  position: relative
  display: flex;
  flex-direction: column;
  margin-bottom: 5vw;
`;

const DateWrap = styled.div`
  position: absolute;
  right: 15vw;
`;

const PostHeader = ({ title, date }: Props) => {
  return (
    <Wrap>
      <PostTitle>{title}</PostTitle>
      <DateWrap>
        <DateFormatter dateString={date} />
      </DateWrap>
    </Wrap>
  );
};

export default PostHeader;
