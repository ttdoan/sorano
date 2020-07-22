import jwt from "jsonwebtoken";
import RefreshToken from "./models/refreshToken";

function getAccessToken(payload) {
  return jwt.sign(payload, process.env.AUTH_SECRET, { expiresIn: "15min" });
}

function getRefreshToken(payload) {
  let token = jwt.sign(payload, process.env.REFRESH_SECRET, {
    expiresIn: "30 days",
  });

  let refreshToken = new RefreshToken({
    email: payload.email,
    token,
  });

  refreshToken.save((err) => {
    if (err)
      throw `Could not save refresh token ${token} for user ${payload.email} to database!`;
  });

  return token;
}

module.exports = { getAccessToken, getRefreshToken };
