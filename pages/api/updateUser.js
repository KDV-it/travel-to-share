import clientPromise from "../../lib/mongodb";

export default async function profileHandler(req, res) {
  const client = await clientPromise;
  const db = client.db("travel-to-share")
  console.log("[api profile]" + JSON.stringify(req.body));

  const email = req.body.email
  const avatar = req.body.avatar
  const users = await db.collection('User').find({ email: email }).toArray()

  const job = req.body.job
  const name = req.body.name
  const facebook = req.body.facebook
  const gender = req.body.gender
  const github = req.body.github
  const linkedin = req.body.linkedin
  const twitter = req.body.twitter
  const age = req.body.age
  const bio = req.body.bio


  console.log(users[0]);
  if (job !== "" || job !== users[0].job) {
    const updateResult = await db.collection('User').updateOne(
      { email: email },
      {
        $set: {
          job: req.body.job,
        }
      }
    )
  }

  if (!name || name !== users[0].name) {
    const updateResult = await db.collection('User').updateOne(
      { email: email },
      {
        $set: {
          name: req.body.name,
        }
      }
    )
  }

  if (!facebook || facebook !== users[0].facebook) {
    const updateResult = await db.collection('User').updateOne(
      { email: email },
      {
        $set: {
          facebook: req.body.facebook,
        }
      }
    )
  }

  if (!gender || gender !== users[0].gender) {
    const updateResult = await db.collection('User').updateOne(
      { email: email },
      {
        $set: {
          gender: req.body.gender,
        }
      }
    )
  }

  if (!github || github !== users[0].github) {
    const updateResult = await db.collection('User').updateOne(
      { email: email },
      {
        $set: {
          github: req.body.github,
        }
      }
    )
  }

  if (!linkedin || linkedin !== users[0].linkedin) {
    const updateResult = await db.collection('User').updateOne(
      { email: email },
      {
        $set: {
          linkedin: req.body.linkedin,
        }
      }
    )
  }

  if (!twitter || twitter !== users[0].twitter) {
    const updateResult = await db.collection('User').updateOne(
      { email: email },
      {
        $set: {
          twitter: req.body.twitter,
        }
      }
    )
  }

  if (!age || age !== users[0].age) {
    const updateResult = await db.collection('User').updateOne(
      { email: email },
      {
        $set: {
          age: req.body.age,
        }
      }
    )
  }

  if (!bio || bio !== users[0].bio) {
    const updateResult = await db.collection('User').updateOne(
      { email: email },
      {
        $set: {
          bio: req.body.bio,
        }
      }
    )
  }

  return res.status(200).redirect("/profile");
}

