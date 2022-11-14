import { getCookie, deleteCookie } from 'cookies-next';

export default async function logout(req, res) {

  const token = getCookie('KDV', { req, res })

  if(token) {
    deleteCookie('KDV', { req, res});
    res.status(200).redirect('/');
  }
  res.status(200).redirect('/login');

}
