import PostPreview from "./post/post-preview";
import type Post from "../interfaces/post";
import styled from "styled-components";

type Props = {
  posts: Post[];
};

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  max-width: 900px;

  h2 {
    align-items: center;
    background-color: #975569;;
    border-left: 3px solid #fff;
    border-radius: 2px;
    display: flex;
    margin-bottom: 1.5rem;
    padding-left: 7px;
    font-weight: 700;
  }
`;

const PostsWrap = styled.div`
`;

const MoreStories = ({ posts }: Props) => {
  const renderPostsByTag = (tag) => {
    return posts
      .filter((post) => post.tag === tag)
      .map((post) => (
        <PostPreview
          key={post.slug}
          title={post.title}
          date={post.date}
          slug={post.slug}
        />
      ));
  };

  return (
    <section>
      <Wrap className="list-disc">
        <PostsWrap>
          <h2>Issue</h2>
          {renderPostsByTag('Issue')}
        </PostsWrap>
        <PostsWrap>
          <h2>DeepDive</h2>
          {renderPostsByTag('DeepDive')}
        </PostsWrap>
        <PostsWrap>
          <h2>Essay</h2>
          {renderPostsByTag('Essay')}
        </PostsWrap>
      </Wrap>
    </section>
  );
};


export default MoreStories;
