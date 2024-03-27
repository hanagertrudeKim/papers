import Link from 'next/link'
import styled from 'styled-components'

const Wrap = styled.div`
  margin: 5px 0;
  margin-top: 10px;
  font-weight: 600;
  font-size: 20px;
`;

const Date = styled.div`
  color: gray;
  font-size: 13px;
`;

type Props = {
  title: string
  date: string
  slug: string
}

const PostPreview = ({ title, date, slug, }: Props) => {

  return (
    <Wrap>
        <Date>{date}</Date>
        <Link
          as={`/posts/${slug}`}
          href="/posts/[slug]"
          className="hover:underline"
        >
          {title}
        </Link>
    </Wrap>
  )
}

export default PostPreview
