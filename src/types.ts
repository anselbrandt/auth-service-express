export interface Credentials {
  clientId: string;
  clientSecret: string;
  callback: string;
}

export interface Provider {
  name: string;
  credentials: Credentials;
  redirect: {
    baseUrl: any;
  };
  requestToken?: {
    baseUrl: string;
    params: object;
  };
  accessToken: {
    baseUrl: any;
    params?: any;
  };
  profile: {
    baseUrl: string;
    urlParams: string;
    params: any;
  };
}
