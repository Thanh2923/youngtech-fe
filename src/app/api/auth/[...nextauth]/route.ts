import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { sign, decode } from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        const user = {
          id: profile.sub, // Google user ID
          email: profile.email,
          name: profile.name || profile.email.split('@')[0], // Nếu không có tên thì dùng email làm userName
          picture: profile.picture,
          password: Math.random().toString(36).slice(-8), // Tạo mật khẩu mặc định (Google không trả về mật khẩu)
        };
        return user;
      },
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
          return user; // Trả về user object khi đăng nhập thành công
        }
        return null; // Trả về null nếu đăng nhập thất bại
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Nếu có user, lưu thông tin vào token
      if (user) {
        if (account?.provider === "google") {
          // Tạo accessToken khi đăng nhập bằng Google
          token.accessToken = sign(
            { id: user.id, email: user.email, role: "user" },
            process.env.NEXTAUTH_SECRET!, // Dùng NEXTAUTH_SECRET để ký JWT
            { expiresIn: "2h" } // Thời gian hết hạn của accessToken (2 giờ)
          );
          token.role = "user";
          token.email = user.email;
          token.id = user.id;
        } else {
          // Nếu đăng nhập bằng credentials, giải mã accessToken
          const decoded = decode(user.accessToken);
          token.accessToken = user.accessToken;
          token.role = decoded?.role || "guest"; // Nếu không có role thì mặc định là 'guest'
          token.id = decoded?.id;
          token.email = decoded?.email;
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Lưu thông tin từ token vào session
      session.accessToken = token.accessToken;
      session.user.role = token.role || "guest";
      session.user.id = token.id || null;
      session.user.email = token.email || null;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Sử dụng JWT cho session
  },
  pages: {
    signIn: "/auth/signin", // Trang đăng nhập tùy chỉnh nếu cần
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
