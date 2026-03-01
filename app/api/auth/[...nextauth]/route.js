import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { ConnectDB } from "@/lib/config/db";
import AdminModel from "@/lib/models/Admin";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await ConnectDB();

                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }

                const admin = await AdminModel.findOne({ email: credentials.email });

                if (!admin) {
                    throw new Error("No admin found with this email");
                }

                const isPasswordCorrect = await bcrypt.compare(credentials.password, admin.password);

                if (!isPasswordCorrect) {
                    throw new Error("Invalid password");
                }

                return {
                    id: admin._id.toString(),
                    email: admin.email,
                    role: admin.role
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        }
    },
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
