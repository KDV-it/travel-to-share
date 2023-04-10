import clientPromise from "../../../lib/mongodb";

export default async (req,res) => {
  const client = await clientPromise;
  const db = client.db("travel-to-share")
  const user = db.collection('User').find({email: "voduykhang312001@gmail.com"}).toArray();

  res.status(200).json(user);
}

