// This is an example of how to read a JSON Web Token from an API route
import { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // If you don't have NEXTAUTH_SECRET set, you will have to pass your secret as `secret` to `getToken`
  const token = await getToken({ req, secret: process.env.JWT_SECRET })
  if (token) {
    // Signed in
   return res.json({
        status: 200,
        token
    });

  } else {
    // Not Signed in
    res.json({
        status: 401,
        error: "Unauthorized"
    });

     res.status(401)
  }
  return res.end()
}