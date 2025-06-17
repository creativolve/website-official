// BerandaBlogServer.js
import { getDatabase } from "@/lib/notion";
import BerandaBlogComponent from "./berandaBlog";

export default async function BerandaBlogServer() {
  const { posts } = await getDatabase();
  return <BerandaBlogComponent posts={posts} />;
}
