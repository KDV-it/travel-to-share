import clientPromise from "../../lib/mongodb";

export default async function profileHandler(req, res) {
  const client = await clientPromise;
  const db = client.db("travel-to-share")
  console.log("[api profile]" + JSON.stringify(req.body));
 
  const avatar = req.body.avatar

  const updateResult = db.collection('User').updateOne(
    { email: req.body.email },
    { $set: { "avatar": avatar } }
  )

  return res.status(200).redirect("/profile");
}

