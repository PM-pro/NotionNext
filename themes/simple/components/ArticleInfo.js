import Link from 'next/link'
import { useGlobal } from '@/lib/global'
import formatDate from '@/lib/formatDate'
import CONFIG_SIMPLE from '../config_simple'
import BLOG from '@/blog.config'

export const ArticleInfo = (props) => {
  const { post } = props

  const { locale } = useGlobal()
  const date = formatDate(post?.date?.start_date || post?.createdTime, locale.LOCALE)

  return (
        <section className="flex-wrap flex mt-2 text-gray-400 dark:text-gray-400 font-light leading-8">
            <div>
                <h2
                    id='blog-item-title'
                    className="mb-5 font-bold text-black text-xl md:text-2xl no-underline">
                    {post.title}
                </h2>

                {post?.type !== 'Page' && (<>
                    <div className="mb-4 text-sm text-gray-700 dark:text-gray-300">
                        <span> <i className="fa-regular fa-user"></i> <a href={CONFIG_SIMPLE.AUTHOR_LINK}>{BLOG.AUTHOR}</a></span>
                        <span> - <i className="fa-regular fa-clock"></i> {post.date?.start_date || post.createdTime}</span>
                        {post.category && <span> - <i className="fa-regular fa-folder"></i> <a href="#" className="hover:text-red-400 transition-all duration-200">{post.category}</a></span>}
                        {post.tags && post.tags?.length > 0 && post.tags.map(t => <span key={t}> / <Link href={`tag/${t}`}><span className=' hover:text-red-400 transition-all duration-200'>{t}</span></Link></span>)}
                    </div>
                </>)}

                {post?.type !== 'Page' && (<>
                    <Link
                        href={`/archive#${post?.date?.start_date?.substr(0, 7)}`}
                        passHref
                        className="pl-1 mr-2 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 border-b dark:border-gray-500 border-dashed">

                        {date}

                    </Link>
                    <span className='mr-2'>|</span>
                    <span className='mx-2 text-gray-400 dark:text-gray-500'>
                        {locale.COMMON.LAST_EDITED_TIME}: {post.lastEditedTime}
                    </span>
                    <span className='mr-2'>|</span>
                    <span className="hidden busuanzi_container_page_pv font-light mr-2">
                        <i className='mr-1 fas fa-eye' />
                        &nbsp;
                        <span className="mr-2 busuanzi_value_page_pv" />
                    </span>
                </>)}

            </div>

        </section>
  )
}
