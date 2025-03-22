import NavBlog from "@/components/blog/nav_blog";
import HeroBlog from "@/components/blog";

export default function Blog() {
  return (
    <>
      <NavBlog />
      <main
        className="
            m-auto px-[30px] py-[10px] mt-[90px]
            md:px-[100px]
            lg:px-[150px] lg:mt-0
            "
      >
        <HeroBlog />
      </main>
    </>
  );
}
