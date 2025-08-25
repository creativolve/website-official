import HomeClient from "./homepageClient";
import BlogServe from "@/components/organism/blog/blogServe";

export default function HomeServe() {
  return (
    <>
      <HomeClient>
        <BlogServe />
      </HomeClient>
    </>
  );
}
