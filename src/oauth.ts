import fetch from "node-fetch";
import { getAuthString } from "./oauthUtils";
import { Request } from "express";
import { Provider } from "./types";

export const oauth = async (provider: Provider) => {
  const { requestToken, accessToken, profile, credentials, redirect } =
    provider;

  const getRequestToken = async () => {
    if (requestToken) {
      const authString = getAuthString(
        requestToken.baseUrl,
        requestToken.params,
        [credentials.clientSecret],
        "POST"
      );
      const response = await fetch(requestToken.baseUrl, {
        method: "POST",
        headers: {
          Authorization: authString,
        },
      });

      const body = await response.text();

      const oauth: any = body
        .split("&")
        .map((entry) => entry.split("="))
        .reduce((accumulator, current) => {
          const [k, v] = current;
          return Object.assign(accumulator, { [k]: v });
        }, {});
      return oauth.oauth_token;
    }
  };

  const getRedirect = async () => {
    if (requestToken) {
      const token = await getRequestToken();
      return redirect.baseUrl(token);
    } else {
      return redirect.baseUrl();
    }
  };

  const getTwitterAccessToken = async (req: Request) => {
    const oauthToken = req.query.oauth_token;
    const oauthVerifier = req.query.oauth_verifier;
    const response = await fetch(
      accessToken.baseUrl(oauthToken, oauthVerifier),
      {
        method: "POST",
      }
    );
    const body = await response.text();
    const oauthResponse: any = body
      .split("&")
      .reduce((accumulator, current) => {
        const [k, v] = current.split("=");
        return Object.assign(accumulator, { [k]: v });
      }, {});
    const { oauth_token, oauth_token_secret } = oauthResponse;
    return { oauth_token, oauth_token_secret };
  };

  const getGithubAccessToken = async (req: Request) => {
    const code = req.query.code;
    const response = await fetch(
      `${accessToken.baseUrl}?client_id=${credentials.clientId}&client_secret=${credentials.clientSecret}&code=${code}&redirect_uri=${credentials.callback}`,
      {
        method: "POST",
      }
    );
    const body = await response.text();
    const oauthResponse: any = body
      .split("&")
      .reduce((accumulator, current) => {
        const [k, v] = current.split("=");
        return Object.assign(accumulator, { [k]: v });
      }, {});
    const { access_token } = oauthResponse;
    return access_token;
  };

  const getProfile = async (req: Request) => {
    const accessToken = await getTwitterAccessToken(req);

    const authString = getAuthString(
      profile.baseUrl,
      profile.params(accessToken.oauth_token),
      [credentials.clientSecret, accessToken.oauth_token_secret],
      "GET"
    );

    const response = await fetch(`${profile.baseUrl}${profile.urlParams}`, {
      method: "GET",
      headers: {
        Authorization: authString,
      },
    });
    const userProfile = await response.json();
    return userProfile;
  };

  const getGithubProfile = async (req: Request) => {
    const accessToken = await getGithubAccessToken(req);
    const fetchedProfile = await fetch(profile.baseUrl, {
      method: "GET",
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });
    const userProfile = await fetchedProfile.json();

    const fetchedEmail = await fetch("https://api.github.com/user/emails", {
      method: "GET",
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });
    const userEmails = await fetchedEmail.json();

    const userEmail = userEmails[0];

    return { ...userProfile, ...userEmail };
  };

  return { getRedirect, getProfile, getGithubProfile };
};
