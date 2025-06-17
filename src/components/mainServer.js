import { getDatabase } from "@/lib/notion";
import Main from "./main"; // client component

export default async function MainServer() {
  const posts = await getDatabase();
  return <Main posts={posts} />;
}