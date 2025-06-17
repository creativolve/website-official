import Image from "next/image";
import Heading from "./heading";
import Button from "./button";
import Link from "next/link";
import { formatDate } from "@/utils/date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";




export default function Blogsec({posts}) {
  const latestPosts = posts.slice(0, 3); // ambil 3 artikel terbaru

  return (
    <div id="blog" className="h-[200vh] flex items-center lg:h-[144vh]">
      <div className="flex gap-4 flex-col lg:grid lg:grid-cols-1 lg:grid-rows-2 lg:gap-3 h-auto">
        
        {/* OPENING */}
        <div className="h-fit">
          <div className="content flex items-center bg-[#21252C] w-full h-full p-[15px] rounded-[15px] flex-col gap-8 overflow-hidden relative lg:p-[15px] lg:flex-row">
            <Image
              src="/images/card/circle.png"
              width={100}
              height={100}
              priority
              quality={100}
              alt="lightning"
              className="absolute pointer-events-none select-none w-[500px] opacity-[0.12] blur-2xl z-[0] bottom-[-10vw] right-[-20vw] md:bottom-[-25vw] md:right-[-20vw] lg:bottom-[-20vw] lg:right-[200]"
            />
            <div className="text w-full mt-5 lg:w-[60%] lg:px-[3rem] lg:mt-0 z-[30]">
              <Heading index={5} />
            </div>
            <div className="relative rounded-[12px] w-[100%] h-[350px] shadow-[0_0_30px_#000000] lg:w-[40%] lg:h-[50vh] lg:rounded-[5px] overflow-hidden">
              <Image
                src="/images/blog_section/foto.jpg"
                fill
                priority
                alt="image"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>

        {/* CONTAINER 2 BOX */}
        <div className="flex flex-col-reverse gap-4 lg:grid lg:grid-rows-1 lg:grid-cols-2 lg:gap-8">
          {/* VIDEO */}
          <div className="w-full h-full bg-[#21252C] rounded-[15px] p-[15px] justify-between flex flex-col gap-4 relative overflow-hidden">
            <Image
              src="/images/card/circle.png"
              width={100}
              height={100}
              priority
              quality={100}
              alt="lightning"
              className="absolute pointer-events-none select-none w-[500px] opacity-[0.12] blur-2xl z-[0] bottom-[-10vw] right-[-20vw] md:bottom-[-25vw] md:right-[-20vw] lg:bottom-[-20vw] lg:right-[200]"
            />
            <h2 className="text-[clamp(1rem,3vw,1.3rem)] text-white font-semibold">
              Konten Video
            </h2>
            <div className="image relative aspect-video rounded-[15px]  overflow-hidden">
              <Image
                src="/images/blog_section/comming-soon.png"
                fill
                priority
                quality={100}
                alt="image"
                className="object-cover object-center"
              />
            </div>
        <div className="z-10">
            <Button
              name="Lihat Instagram"
              href="https://www.instagram.com/creativolve_"
              target="_blank"
            />
        </div>
            <br />
          </div>

          {/* ARTIKEL TERBARU */}
          <div className="w-full h-full bg-[#21252C] rounded-[15px] p-[15px] flex flex-col gap-4 relative overflow-hidden">
          <Image
              src="/images/card/circle.png"
              width={100}
              height={100}
              priority
              quality={100}
              alt="lightning"
              className="absolute pointer-events-none select-none w-[500px] opacity-[0.12] blur-2xl z-[0] bottom-[-10vw] right-[-20vw] md:bottom-[-25vw] md:right-[-20vw] lg:bottom-[-20vw] lg:right-[200]"
            />
            <h2 className="text-[clamp(1rem,3vw,1.3rem)] font-semibold text-white">
              Blog Artikel Terbaru
            </h2>
            <ul className="grid h-[64%] grid-cols-1 grid-rows-3 p-6 gap-4">
          {latestPosts.map((post) => {
            const title =
              post.properties.Title?.title?.[0]?.plain_text || "Untitled";
            const slug =
              post.properties.Slug?.rich_text?.[0]?.plain_text || "#";
            const publishedDate = post.properties.Published?.date?.start;

            return (
              <li key={post.id} className="w-full leading-0 flex items-center bg-[#21252c] shadow-md gap-3 px-3 py-1 rounded-md transition-all ease-in-out
              
              hover:bg-[#00E5FF] hover:shadow-2xl group
              ">
                <FontAwesomeIcon 
                  icon={faNewspaper} 
                  className="text-[#00E5FF]   group-hover:text-[#353535] transition-all ease-in-out text-lg" 
                />
                <Link
                  href={`/blog/${slug}`}
                  className="text-[#bbbbbb] text-sm flex-1 group-hover:text-[#353535] transition-all ease-in-out"
                >
                  <strong className="text-white group-hover:text-[#111111] transition-all ease-in-out">{title}</strong><br />
                  {formatDate(publishedDate)}
                </Link>
              </li>
            );
          })}
        </ul>

<div className="z-10">
            <Button name="Lihat Semua Artikel" href="/blog" />
</div>
          </div>
        </div>
      </div>
    </div>
  );
}
