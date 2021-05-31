import * as dotenv from "dotenv";
dotenv.config();

const GITHUB_CLIENT_ID = process.env["GITHUB_CLIENT_ID"] as string;

const GITHUB_CLIENT_SECRET = process.env["GITHUB_CLIENT_SECRET"] as string;

const GITHUB_CALLBACK =
  process.env.GITHUB_CALLBACK ||
  "http://localhost:3000/api/auth/callback/github";

const TWITTER_CLIENT_ID = process.env["TWITTER_CLIENT_ID"] as string;

const TWITTER_CLIENT_SECRET = process.env["TWITTER_CLIENT_SECRET"] as string;

const TWITTER_CALLBACK =
  process.env["TWITTER_CALLBACK"] ||
  "http://localhost:3000/api/auth/callback/twitter";

const credentials = {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK,
  TWITTER_CLIENT_ID,
  TWITTER_CLIENT_SECRET,
  TWITTER_CALLBACK,
};

export default credentials;
