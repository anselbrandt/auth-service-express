interface Credentials {
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  GITHUB_CALLBACK: string;
  TWITTER_CLIENT_ID: string;
  TWITTER_CLIENT_SECRET: string;
  TWITTER_CALLBACK: string;
}

export const envVars = (credentials: Credentials) => {
  const {
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    GITHUB_CALLBACK,
    TWITTER_CLIENT_ID,
    TWITTER_CLIENT_SECRET,
    TWITTER_CALLBACK,
  } = credentials;
  return `<html>
      <div>
        <div>Hello from Express. Current time is ${new Date().toLocaleTimeString()}</div>
        <br/>
        <div>If you have an <code>.env</code> file with your OAuth credentials, you should see them below:</div>
        <br/>
        ${`
          <div>Twitter Client ID: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${
            TWITTER_CLIENT_ID || ``
          }</div>
          <div>Twitter Client Secret: ${TWITTER_CLIENT_SECRET || ``}</div>
          <div>Twitter Callback: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${
            TWITTER_CALLBACK || ``
          }</div>
          `}
        ${`
          <div>Github Client ID: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${
            GITHUB_CLIENT_ID || ``
          }</div>
          <div>Github Client Secret: ${GITHUB_CLIENT_SECRET || ``}</div>
          <div>Github Callback: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${
            GITHUB_CALLBACK || ``
          }</div>
          `}
        <br/>
        <a href="/image"><img src="/image" alt="mount baker"/></a>
      </div>
    </html>`;
};
