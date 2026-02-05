// oauthClient.js
import { google } from "googleapis";

const CLIENT_ID =
  "497105170769-jovr105n48s95l213oq6n470el356ml1.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

// 👇 Instead of storing in .env, you can pass refreshToken when you import
function createOAuthClient(refreshToken) {
  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );

  oAuth2Client.setCredentials({ refresh_token: refreshToken });
  return oAuth2Client;
}

export default createOAuthClient;
