import Container from "../components/container";
import MoreStories from "../components/more-stories";
import Intro from "../components/intro";
import Layout from "../components/common/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import Post from "../interfaces/post";

type Props = {
  allPosts: Post[];
};

export default function Index({ allPosts }: Props) {
  const morePosts = allPosts.slice();
  return (
    <>
      <Layout>
        <Head>
          <title>{`hanagertrudeKim`}</title>
        </Head>
        <Container>
          <Intro />
          <MoreStories posts={morePosts} />
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["title", "date", "slug", "tag"]);

  return {
    props: { allPosts },
  };
};
