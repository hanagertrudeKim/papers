import DateFormatter from './date-formatter'
import PostTitle from './post-title'

type Props = {
  title: string
  date: string
}

const PostHeader = ({ title, date }: Props) => {
  return (
    <div className='py-2'>
      <PostTitle>{title}</PostTitle>
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
      </div>
    </div>
  )
}

export default PostHeader
