import { GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import * as React from 'react';

export interface AppProps {
  posts: any[]
}

export default function Posts (props: AppProps) {
  console.log(props.posts);
  
  return (
    <div>
      <ul>
        {props.posts.map((item) => (
          <li key={item.id}>
            <Link href={`/posts/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps<AppProps> = async (context: GetStaticPropsContext) => {
  const res = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1')
  const data = await res.json()

  return {
    props: {
      posts: data.data.map((item: any) => {
        return {
          id: item.id,
          title: item.title
        }
      })
    }
  }
}
