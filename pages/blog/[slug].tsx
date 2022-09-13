import { Post } from '@/models'
import { getPostList } from '@/utils/posts'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { Box, Container } from '@mui/material'
import { MainLayout } from '@/components/layout'

import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify/lib'
import remarkParse from 'remark-parse/lib'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

export interface BlogPageProps {
  post: Post
}

export default function PostDetailPage({ post }: BlogPageProps) {
  if (!post) return null

  return (
    <Box>
      <Container>
        <h1>{post.title}</h1>
        <p>Author: <i>{post.author?.name}</i></p>
        <p><b>{post.description}</b></p>
        <div dangerouslySetInnerHTML={{ __html: post.htmlContent || '' }}></div>
      </Container>
    </Box>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postList = await getPostList()

  return {
    paths: postList.map((post: Post) => ({ params: { slug: post.slug } })),
    fallback: false,
  }
}

PostDetailPage.Layout = MainLayout

export const getStaticProps: GetStaticProps<BlogPageProps> = async (
  context: GetStaticPropsContext
) => {
  const postList = await getPostList()
  const slug = context.params?.slug
  if (!slug) return { notFound: true }

  const post = postList.find((x) => x.slug === slug)
  if (!post) return { notFound: true }

  // parse md to html
	const file = await unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeDocument, { title: 'Blog details page' })
  .use(rehypeFormat)
  .use(rehypeStringify)
  .process(post.mdContent || '')
  
  post.htmlContent = file.toString()

  return {
    props: {
      post,
    },
  }
}