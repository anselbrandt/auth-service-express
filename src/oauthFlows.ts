import { v4 } from "uuid";
import { Credentials } from "./types";

export const twitter = (credentials: Credentials) => {
  const { clientId, callback } = credentials;
  return {
    name: "twitter",
    credentials,
    redirect: {
      baseUrl: (token: string) =>
        `https://api.twitter.com/oauth/authorize?oauth_token=${token}`,
    },
    requestToken: {
      baseUrl: "https://api.twitter.com/oauth/request_token",
      params: {
        oauth_consumer_key: clientId,
        oauth_signature_method: "HMAC-SHA1",
        oauth_timestamp: Math.floor(Date.now() / 1000),
        oauth_nonce: v4(),
        oauth_version: "1.0",
        oauth_callback: callback,
      },
    },
    accessToken: {
      baseUrl: (oauthToken: string, oauthVerifier: string) =>
        `https://api.twitter.com/oauth/access_token?oauth_token=${oauthToken}&oauth_verifier=${oauthVerifier}`,
    },
    profile: {
      baseUrl: "https://api.twitter.com/1.1/account/verify_credentials.json",
      urlParams: "?include_email=true",
      params: (oauthToken: string) => ({
        include_email: true,
        oauth_consumer_key: clientId,
        oauth_token: oauthToken,
        oauth_signature_method: "HMAC-SHA1",
        oauth_timestamp: Math.floor(Date.now() / 1000),
        oauth_nonce: v4(),
        oauth_version: "1.0",
      }),
    },
  };
};

export const github = (credentials: Credentials) => {
  const { clientId, clientSecret, callback } = credentials;
  return {
    name: "github",
    credentials,
    redirect: {
      baseUrl: () =>
        `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${callback}&scope=user%3Aemail`,
    },
    accessToken: {
      baseUrl: "https://github.com/login/oauth/access_token",
      params: (code: string) => ({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
      }),
    },
    profile: {
      baseUrl: "https://api.github.com/user",
      urlParams: "?",
      params: () => ({}),
    },
  };
};
