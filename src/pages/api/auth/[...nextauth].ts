import { query } from "faunadb"
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { signIn } from "next-auth/react"

import { fauna } from '../../../services/fauna'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: 'https://github.com/login/oauth/authorize?scope=read:user+user:email'
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      const { email } = user
      try {
        await fauna.query(
          query.If(
            query.Not(
              query.Exists(
                query.Match(
                  query.Index('user_by_email'),
                  query.Casefold(email)
                )
              )
            ),
            query.Create(
              query.Collection('users'),
              { data: { email } }
            ),
            query.Get(
              query.Match(
                query.Index('user_by_email'),
                query.Casefold(email)
              )
            )
          )
        )
        return true
      } catch {
        return false
      }

    },
  }
})