export const dynamic = 'force-dynamic';

import { getCachedDatabase } from "@/lib/notion";
import Main from "./main"; // client component

export default async function MainServer() {
  const { posts } = await getCachedDatabase();
  return <Main posts={posts} />;
}