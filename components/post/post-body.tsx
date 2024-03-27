import markdownStyles from '../markdown-styles.module.css'
import PrismLoader from '../prism-loader'

type Props = {
  content: string
}

const PostBody = ({ content }: Props) => {
  return (
    <div>
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <PrismLoader />
    </div>
  )
}

export default PostBody
