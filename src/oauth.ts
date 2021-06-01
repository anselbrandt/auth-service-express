import { Providers } from "./types";
import { Request } from "express";

export const Oauth = async (providers: Providers) => {
  const getRedirect = async (provider: string) =>
    await providers[provider].getRedirect();

  const getProfile = async (provider: string, req: Request) =>
    await providers[provider].getProfile(req);

  return { getRedirect, getProfile };
};
