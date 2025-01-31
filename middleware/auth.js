const authMiddleware = async (req, res, next) => {
  try {
    const access_token = req.headers.access_token;

    if (!access_token) {
      return res.status(401).json({
        isValid: false,
        error: "Not authenticated",
      });
    }

    req.sessionStore.get(access_token, (err, session) => {
      if (err || !session) {
        return res.status(401).json({
          isValid: false,
          error: "Not authenticated",
        });
      }

      req.userData = session.userData;
      next();
    });
  } catch (error) {
    res.status(500).json({
      isValid: false,
      error: "Internal server error",
    });
  }
};

export default authMiddleware;
