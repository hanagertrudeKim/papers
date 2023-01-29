import styled from "styled-components";

const Wrap = styled.div`
  margin-bottom: 40px;
`;

const Intro = () => {
  return (
    <Wrap>
      <h3>Introduction</h3>
      <ul className="list-disc">
        <li>간단하게 paper 정리</li>
      </ul>
    </Wrap>
  );
};

export default Intro;
