const { validateToken } = require("../services/auth");

function checkForAuthCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return next(); // Return here to stop further execution
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
      next(); // Call next after successful authentication
    } catch (error) {
      next();
    }
  };
}

module.exports = checkForAuthCookie;
