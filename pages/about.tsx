import React, { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

export interface AppProps {}

const Header = dynamic(() => import('@/components/common/header'), { ssr: false })

export default function About (props: AppProps) {
  const [postList, setPostList] = useState([])
  const router = useRouter()
  const page = Number(router.query?.page)

  useEffect(() => {
    ;(async () => {
      const res = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=${page}`)
      const data = await res.json()
      setPostList(data.data)
    })()
  }, [page])

  const handleClickNext = () => {
    router.push(
      {
        pathname: '/about',
        query: {
          page: (page || 1) + 1
        }
      },
      undefined,
      {shallow: true}
    )
  }

  return (
    <div>
      <Header />
      <ul>
        {postList?.map((item: any) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
      <button onClick={handleClickNext}>Next</button>
    </div>
  );
}
