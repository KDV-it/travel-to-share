import jwt from 'jsonwebtoken';
import { serialize } from "cookie"
import { FaVectorSquare } from 'react-icons/fa';
import { getCookie, setCookie } from 'cookies-next';
import clientPromise from '../../lib/mongodb';



export default function isAuthenticated(req, res) {
  const { token } = req.query;

  if (!token) {
    res.status(403).send("Can't verify user.");
  }

  let decode;

  try {
    decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch {
    res.status(403).send('Invalid auth credentials.');
    return;
  }

  if (
    !decode.hasOwnProperty('email') ||
    !decode.hasOwnProperty('expirationDate')
  ) {
    res.status(403).send('Invalid auth credentials.');
    return;
  }

  const { expirationDate } = decode;
  const { email } = decode;

  if (expirationDate < new Date()) {
    res.status(403).send('Token has expired.');
  }

  setCookie('KDV', token.toString(), { req, res, maxAge: 60 * 60 * 24 * 30 })



  // console.log(token)
  // console.log("[verify.js]", getCookie("KDV"));

  // res.setHeader('Set-Cookie', serialised)

  res.status(200).redirect(`/profile`)
}
