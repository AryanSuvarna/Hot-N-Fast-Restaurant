import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions, User, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./connect"
import bcrypt from "bcrypt"

// ADDING THESE 2 DECLARE MODULES TO OVERWRITE THE DEFAULT SESSION TYPE
declare module "next-auth" {
    interface Session {
        user: User & {
            isAdmin: Boolean
        }
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        isAdmin: Boolean
    }
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    // checking for users token
    session: { strategy: "jwt" }, // JWT = JSON Web Token
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            id: "email-login",
            name: "Email",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "example@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password) throw new Error("Missing credentials")

                // ADD YOUR AUTHORIZATION LOGIC HERE

                // get user from database
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                // verify password
                if (user && await bcrypt.compare(credentials.password, user.password || "")) {
                    // remove unneeded data
                    const { password, ...userWithoutPassword } = user
                    return userWithoutPassword as User
                }
                return null
            }
        }),
    ],
    // callback function to check if user is admin without having to check the database
    // this function will run every time a user logs in. We store the isAdmin value.
    // This check is done on the server side so that we dont have to constantly make queries to the database
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user.isAdmin = token.isAdmin
            }

            return session
        },

        async jwt({ token }) {
            const DBUser = await prisma.user.findUnique({
                where: {
                    email: token.email!
                }
            })

            token.isAdmin = DBUser?.isAdmin!

            return token
        },

        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }
    },
    pages: {
        signIn: "/login",
        signOut: "/",
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export const getAuthSession = () => getServerSession(authOptions)