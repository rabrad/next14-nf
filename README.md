
Setting up NextAuth.js with Prisma as the database adapter in a Next.js application involves several steps. Below is a step-by-step guide to help you achieve this:

## Install Required Packages

- `npm install next-auth`
- `npm install @prisma/client @auth/prisma-adapter`
   `npm install prisma --save-dev`

# Set Up Prisma with NextAuth

1-  Initialize Prisma: `npx prisma init`. This will create `/prisma/schema.prisma`  and `.env` which include `DATBASE_URL` value. We will use Use `Supabase` for that.

- When Supabase is created. copy the URI from project (sitting/database/Connection sting/URI).

    `DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"`

    The links can be replaced with the one in the .env and add the Supabase pw to it.

2 - create a schema
following the [documentation page](https://authjs.dev/reference/adapter/prisma). find the schema `model/s` and add them to `prisma/schema.prisma`

3 - run `npx prisma push` to populate the DB.

4 - create `app/utils/db.ts` we need to fix a current issue in NextAuth when running prisma on Dev mode.See [Best practice for instantiating PrismaClient with Next.js](https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices)

    import { PrismaClient } from '@prisma/client'

    const prismaClientSingleton = () => {
    return new PrismaClient()
    }

    declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
    }

    const prisma = globalThis.prisma ?? prismaClientSingleton()

    export default prisma

    if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

5- create `app/utils/auth.ts`. in this file we are adding the `providers` & the `adapter` for NextAuth.

        import { PrismaAdapter } from "@auth/prisma-adapter";
        import { NextAuthOptions } from "next-auth";
        import prisma from './db'
        import { Adapter } from "next-auth/adapters";

        export const authOptions  = {
        adapter: PrismaAdapter(prisma) as Adapter,
        providers:[
            // github, google, email provider ...
        ]

        } satisfies NextAuthOptions

**See the final providers in `app/utils/auth.ts`**

6 - Add `authOptions` from `app/utils/auth.ts` NextAuth()

        import { authOptions } from "@/app/utils/auth"
        import NextAuth from "next-auth"

        const handler = NextAuth(authOptions)

        export { handler as GET, handler as POST }

And that is it. We set up Prisma with NextAuth and we created a DB in Supabase

There are more steps to take in order to set up the NextAuth provider:
In this project we have used github, google, email provider. see the following doc pages accordingly:

- [GitHub](https://next-auth.js.org/providers/github) Create OAuth
- [google](https://next-auth.js.org/providers/google)
- [email provider](https://next-auth.js.org/providers/email) Used Resend service for this provider. Email provider option SMTP.. [How to use SMTP link](https://resend.com/changelog/smtp-service)

7 - Create `NextAuthProvider.tsx` component and wrap children in appLayout. See `app/components/NextAuthProvider.tsx`

8 - to hock the UI with NextAuth, use `signIn()` and `signOut()` methods and use them accordingly on onClick within `app/(auth)/login/page.tsx` adn `app/(auth)/sign-up/page.tsx`

Note: for login with email, make sure you add method and the acton:

```
 <form method="post" action="/api/auth/signin">
 ```
