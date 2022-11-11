import cookie from 'cookies'

export default async function checkLogin(req,res) {
  const {cookie} = await req;

  const jwt = cookie.get("KDV")

  if(jwt) {
    res.status(200).redirect('/profile');

  }else 
    res.status(200).redirect('/login')

}