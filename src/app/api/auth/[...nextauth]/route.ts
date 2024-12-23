// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { sign } from "jsonwebtoken";

// Định nghĩa cấu hình `authOptions` cho NextAuth
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const user = await res.json();

        if (res.ok && user) {
          // Trả về user object nếu đăng nhập thành công
          return user;
        }
        // Trả về null nếu đăng nhập thất bại
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        if (account?.provider === "google") {
          token.accessToken = sign(
            { id: user.id, email: user.email, role: "user" },
            process.env.NEXTAUTH_SECRET!,
            { expiresIn: "2h" }
          );
          token.role = "user";
          token.email = user.email;
          token.id = user.id;
        } else {
          token.accessToken = user.accessToken;
          token.role = user.role || "guest";
          token.id = user.id;
          token.email = user.email;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = {
        id: token.id || null,
        email: token.email || null,
        role: token.role || "guest",
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Chế độ session sử dụng JWT
  },
  pages: {
    signIn: "/auth/signin", // Chỉ định trang đăng nhập
  },
};

// Tạo handler cho các phương thức HTTP
const handler = NextAuth(authOptions);

// Dùng cách export này để hỗ trợ API Routes trong Next.js 13
export { handler as GET, handler as POST };
