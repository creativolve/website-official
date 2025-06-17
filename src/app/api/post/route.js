import { getDatabase } from "@/lib/notion"


export default async function handler(req, res) {
  const posts = await getDatabase()
  res.status(200).json(posts)
}