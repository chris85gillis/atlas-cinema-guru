import exp from "constants";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: {
    brandColor: "#1ED2AF",
    logo: "/logo.png",
    buttonText: "#ffffff",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    // Session callback to pass email to session
    async session({ session, token }) {
      session.user.email = token.email;
      return session;
    },
    // Redirect to login if unauthorized
    authorized: async ({ auth }) => {
      return !!auth; // true if authenticated, false otherwise
    },
  },
});
