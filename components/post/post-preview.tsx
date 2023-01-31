import Link from 'next/link'

type Props = {
  title: string
  date: string
  slug: string
}

const PostPreview = ({
  title,
  date,
  slug,
}: Props) => {
  return (
    <li>
        <Link
          as={`/posts/${slug}`}
          href="/posts/[slug]"
          className="hover:underline"
        >
          {title}
        </Link>
    </li>
  )
}

export default PostPreview
