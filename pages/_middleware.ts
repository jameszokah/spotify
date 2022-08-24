import {getToken} from 'next-auth/jwt'
import {NextResponse} from "next/server"
import type {NextRequest} from "next/server"
import { NextApiRequest } from 'next'

type nextRequest = NextApiRequest & NextRequest 


export const middleware = async (req: nextRequest) => {
    const token = await getToken({ req,secret: process.env.JWT_SECRET ?? "",  secureCookie: process.env.NODE_ENV === "production"});
    let url = req.nextUrl.clone();
    let {pathname, origin} = url;

    if(pathname.includes('/api/auth') && token) {
        return NextResponse.next()
    }

    else if(!token) {
     pathname = "/login"
        return NextResponse.redirect(origin + '/login',307);
    }

    else if(token && pathname.includes('/')) {
        return NextResponse.next()
    }
    console.log("meddle ware running",pathname)
     return NextResponse.next()
}