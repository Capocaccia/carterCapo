import Link from 'next/link'
import { useRouter } from "next/router";


export default function Nav() {

  const router = useRouter();

  return (
    <nav className="flex-row md:flex-row flex items-center md:justify-between mt-4 mb-16 md:mb-12">
      <div>
        {router.route !== '/' && 
        <p className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight">
          <Link href="/">
            <a>Carter Capocaccia</a>
          </Link>
        </p>
        }
      </div>
      <div className="invisible md:visible">
        <Link
        href="#footer"> 
          <a className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold lg:px-8 duration-200 transition-colors">
            Contact
          </a>
        </Link>
        <Link
        href="/posts/uses"> 
          <a className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold lg:px-8 duration-200 transition-colors">
            Uses
          </a>
        </Link>
      </div>
    </nav>
  )
}
