import { parseISO, format } from "date-fns";
import styled from "styled-components";

type Props = {
  dateString: string;
};

const Wrap = styled.div`
  padding: 0px 15px;
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
