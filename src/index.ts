import express from "express";
import http from "http";
const path = require("path");
import * as dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import { envVars } from "./views/envVars";
import credentials from "./constants";
import { Oauth, github, twitter } from "./oauth";

const PORT = process.env["PROXY"] ? 3000 : process.env["PORT"] || 3000;

const main = async () => {
  const {
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    GITHUB_CALLBACK,
    TWITTER_CLIENT_ID,
    TWITTER_CLIENT_SECRET,
    TWITTER_CALLBACK,
  } = credentials;

  const oauth = await Oauth({
    twitter: twitter({
      clientId: TWITTER_CLIENT_ID,
      clientSecret: TWITTER_CLIENT_SECRET,
      callback: TWITTER_CALLBACK,
    }),
    github: github({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callback: GITHUB_CALLBACK,
    }),
  });

  const app = express();
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );

  app.get("/api/auth/:provider", async (req, res) => {
    const provider = req.params.provider;
    const redirect = await oauth.getRedirect(provider);
    res.redirect(redirect);
  });

  app.get("/api/auth/callback/:provider", async (req, res) => {
    const provider = req.params.provider;
    const profile = await oauth.getProfile(provider, req);
    res.send(profile);
  });

  app.get("/image", (_, res) => {
    res.sendFile(path.join(__dirname + "/mountbaker.jpg"));
  });

  app.get("/", (_, res) => {
    res.send(envVars(credentials));
  });

  const httpServer = http.createServer(app);

  httpServer.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`);
  });
};

main().catch((error) => {
  console.error(error);
});
