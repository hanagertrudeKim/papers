import { parseISO, format } from "date-fns";
import styled from "styled-components";

type Props = {
  dateString: string;
};

const Wrap = styled.div`
  padding: 0 0 40px;
  font-weight: 300;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.17em;
`;

const DateFormatter = ({ dateString }: Props) => {
  const date = parseISO(dateString);
  return (
    <Wrap>
      <time dateTime={dateString}>{format(date, "LLLL	d, yyyy")}</time>
    </Wrap>
  );
};

export default DateFormatter;
