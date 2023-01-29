import PostPreview from "./post-preview";
import type Post from "../interfaces/post";
import styled from "styled-components";

type Props = {
  posts: Post[];
};

const PostWrap = styled.ul`
  color: #23527c;
`;

const MoreStories = ({ posts }: Props) => {
  return (
    <section>
      <h2>papers</h2>
      <PostWrap className="list-disc">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            date={post.date}
            slug={post.slug}
          />
        ))}
      </PostWrap>
    </section>
  );
};

export default MoreStories;
