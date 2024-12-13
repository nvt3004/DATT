import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const options: any = {
  // pages: {
  //   signIn: '/auth/Login',
  //   signOut: '/auth/logout',
  //   error: '/auth/error', // Error code passed in query string as ?error=
  //   verifyRequest: '/auth/verify-request', // (used for check email message)
  //   newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  // },
  session: {
    strategy: "jwt",
    maxAge: Number(process.env.MAX_AGE) || 24 * 60 * 60, // in seconds, default 1 day
    updateAge: 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      // credentials: {
      //   username: { label: "Username", type: "text", placeholder: "jsmith" },
      //   password: { label: "Password", type: "password" },
      // },
      //eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      async authorize(credentials: Record<string, string> | undefined) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        if (!credentials) return null;

        let path = "";
        switch (credentials["method"]) {
          // case 'otp':
          //   path = Auth.GET_TOKEN_BY_OTP;
          //   break;
          // case 'username':
          //   path = Auth.GET_TOKEN;
          //   break;
          // case 'sso':
          //   path = Auth.GET_TOKEN_BY_SSO;
          //   break;
          // case 'refresh':
          //   path = Auth.REFRESH_TOKEN;
          //   break;
          default:
            path = "";
        }

        let resJson = null;
        let authorizedData = null;
        console.log("[LOG_DEBUG][credentials]", credentials?.authorizedData);
        if (
          credentials?.["authorizedData"] &&
          credentials?.["authorizedData"] !== "undefined"
        ) {
          try {
            authorizedData = JSON.parse(credentials?.["authorizedData"]);
          } catch (e) {
            console.log("[nextauth]authorizedData parse json err:", e);
          }
        }
        let res = null;
        if (authorizedData && authorizedData?.["payload"]?.["access_token"]) {
          resJson = authorizedData;
        } else {
          res = await fetch(process.env.API_URL + path, {
            method: "POST",
            body: JSON.stringify({
              ...credentials,
              captcha: credentials?.captcha
                ? JSON.parse(credentials.captcha)
                : null,
            }),
            headers: {
              "Content-Type": "application/json",
              "Two-Factor": credentials["twoFactor"] || "false",
              "PASS-CAPTCHA": credentials["passCaptcha"] || "false",
            },
          }).catch((e) => {
            console.error("[Auth] Loi khong the dang nhap", e);
            throw new Error(JSON.stringify(e));
          });

          resJson = await res.json();
          if (resJson?.payload?.["otpId"]) {
            throw new Error(JSON.stringify(resJson));
          }

          const ERR_CODES = [
            2003, 2004, 65212, 65213, 3001, 55555, 1104, 55554,
          ];
          if ("code" in resJson && ERR_CODES.includes(resJson["code"])) {
            throw new Error(JSON.stringify(resJson));
          }
        }

        // const resGetUser = await fetch(publicRuntimeConfig.baseApiUrl + UserAccount.FIND_CRT_ACC, {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Authorization: 'Bearer ' + resJson?.payload?.access_token,
        //   },
        //   agent: publicRuntimeConfig.enableHttps == 'true' ? httpsAgent : null,
        // })
        //   .then((res) => res.json())
        //   .catch((e) => {
        //     console.error('[Auth] Khong the lay thong tin nguoi dung.', e);
        //   });

        const payload = {
          // user: resGetUser?.payload,
          user: null,
          sub: null,
          access_token: resJson?.payload?.access_token,
          refresh_token: resJson?.payload?.refresh_token,
          expired: resJson?.payload?.expired,
          // expired: new Date(2022,10,24,0,0,0,0).getTime(),
        };

        // If no error and we have user data, return it
        if (payload?.access_token) {
          // console.log('========== Đã đăng nhập:', user);
          return payload;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   console.log('[callbacks][redirect]URL = ', url);
    //   console.log('[callbacks][redirect]baseUrl = ', baseUrl);
    //   // Allows relative callback URLs
    //   if (url.startsWith("/")) return `${baseUrl}${url}`
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url
    //   return baseUrl
    // },
    async jwt({ token, user }: any) {
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        token.accessToken = user.access_token;
        token.refreshToken = user.refresh_token;
        token.expired = user.expired;
      }

      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.expired = token.expired;

      return session;
    },
  },
};

// export default NextAuth(options);
const handler = NextAuth(options);
export { handler as GET, handler as POST };
