// BerandaBlogServer.js
export const dynamic = 'force-dynamic';

import { getCachedDatabase } from "@/lib/notion";
import BerandaBlogComponent from "./berandaBlog";

export default async function BerandaBlogServer() {
  const { posts } = await getCachedDatabase();
  return <BerandaBlogComponent posts={posts} />;
}
