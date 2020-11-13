import jwt from "jsonwebtoken";
import RefreshToken from "./models/refreshToken";
import commonConfig from "./../common/_config";

function createAccessToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_SECRET, {
    expiresIn: Math.floor(Date.now() / 1000) + commonConfig.ACCESS_AUTH_EXP,
  });
}

function createRefreshToken(payload) {
  let token = jwt.sign(
    { ...payload, issued: new Date() },
    process.env.REFRESH_SECRET,
    {
      expiresIn: Math.floor(Date.now() / 1000) + commonConfig.REFRESH_AUTH_EXP,
    }
  );

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

/**
 * REFRESH TOKEN SCHEME
 *
 * When the user logs in for the first time, a refresh token and
 * an access token are created. When the access token expires,
 * user needs to send refresh to issue a new access token. New
 * refresh token is issued only if the previous refresh token is
 * at least config.REFRESH_AUTH_EXP/2 old.
 *
 */
function verifyRefreshToken(token) {
  try {
    let refresh = null;
    let decoded = jwt.verify(token, process.env.REFRESH_SECRET);
    if (
      (Date.now() - decoded.issued) / 1000 >=
      commonConfig.REFRESH_AUTH_EXP / 2
    )
      refresh = createRefreshToken(decoded);

    return { refresh, access: createAccessToken(decoded) };
  } catch (err) {
    return null;
  }
}

/**
 * JWT MIDDLEWARE
 *
 * This middleware is used to protect routes that require prior
 * authentication.
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const [authType, token] = authHeader.split(" ");
    if (authType === "Bearer")
      jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
        if (err) return res.status(401);

        req.user = decoded;
        next();
      });
  } else return res.status(403);
}

// module.exports.default = { getAccessToken, getRefreshToken, authenticateToken };
export default {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
  authenticateToken,
};
