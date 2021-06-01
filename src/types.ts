export interface Credentials {
  clientId: string;
  clientSecret: string;
  callback: string;
}

export interface Provider {
  getRedirect: () => string;
  getProfile: (req: any) => object;
}

export interface Providers {
  [name: string]: Provider;
}
