import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import * as React from 'react';

export interface AppProps {
  post: any
}

export default function PostDetails ( {post}: AppProps) {
  if (!post) return null
  return (
    <div>
      <p>{post.title}</p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1')
  const data = await res.json()
  
  return {
    paths: data.data.map((post:any) => ({params: {postId: post.id}})),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<AppProps> = async (context: GetStaticPropsContext) => {
  console.log(context);
  
  const postId = context.params?.postId

  if (!postId) return { notFound: true}
  
  const res = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`)
  const data = await res.json()
  console.log(data);
  
  return {
    props: {
      post: data
    }
  }
}
