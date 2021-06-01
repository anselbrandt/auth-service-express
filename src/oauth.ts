import { Request } from "express";

export const Oauth = async (providers: any) => {
  const getRedirect = async (provider: string) =>
    await providers[provider].getRedirect();

  const getProfile = async (provider: string, req: Request) =>
    await providers[provider].getProfile(req);

  return { getRedirect, getProfile };
};
