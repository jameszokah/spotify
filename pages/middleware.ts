import {getToken} from 'next-auth/jwt'
import {NextResponse} from "next/server"
import type {NextRequest} from "next/server"

export const middleware = async (req: NextRequest) => {
    const token = await getToken({ req,secret: process.env.JWT_SECRET ?? "",  secureCookie: process.env.NODE_ENV === "production"});
    let url = req.nextUrl.clone();
    let {pathname, origin} = url;

    if(pathname.includes('/api/auth') && token) {
        return NextResponse.next()
    }

    

    if (req.nextUrl.pathname.startsWith('/')) {
        if(!token) {
            pathname = "/login"
               return NextResponse.rewrite(origin + '/login');
           }
    }

     if(token && pathname.includes('/')) {
        return NextResponse.next()
    }
    console.log("meddle ware running",pathname)
     return NextResponse.next()
}

// Supports both a single string value or an array of matchers
export const config = {
    matcher: ['/', '/login', '/api/auth'],

  }