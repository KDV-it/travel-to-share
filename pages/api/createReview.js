import clientPromise from "../../lib/mongodb";

export default async function reviewHandler(req, res) {
  const client = await clientPromise;
  const db = client.db("travel-to-share")
  console.log("[api profile]" + JSON.stringify(req.body));
 
  
  

  const updateResult = db.collection('Reviews').insertOne(
    {
      slug: req.body.slug,
      content: req.body.content,
      created_at: req.body.created_at,
      user: req.body.user,
      email: req.body.email,
      avatar: req.body.avatar
    }
  )

  return res.status(200).redirect(`/place/${req.body.slug}`);
}


