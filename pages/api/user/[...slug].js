import clientPromise from "../../../lib/mongodb";

export default async (req,res) => {
  const {slug} = req.query;

  const key = slug[0]
  const value = slug[1]


  const client = await clientPromise
  const db = client.db("travel-to-share")

  const users =  await db.collection("User").find({email: value}).toArray()
  res.status(200).json(users)
}