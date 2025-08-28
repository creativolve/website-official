// BerandaBlogServer.js
export const dynamic = 'force-dynamic';

import { getCachedDatabase } from "@/lib/notion";
import BerandaBlog from "./berandaBlog";

export default async function BerandaBlogServer() {
  const { posts } = await getCachedDatabase();
  return <BerandaBlog posts={posts} />;
}