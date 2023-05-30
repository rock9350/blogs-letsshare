'use client'
import NavBar from '../../component/NavBar/NavBar'
import LetsShare from '../../component/frontPage/slideShow/letsShare'
import NewsPage from '../../component/frontPage/blogs/News'


export default function Home() {

  
  return (
    <main >
      <NavBar/>
      <LetsShare/> 
      <NewsPage />
    </main>
  )
}
