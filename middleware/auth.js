const auth = async (req, res, next) => {
  const { headers } = req;
  const authHeader = req.headers.authorization;

  console.log(headers, 'headers');
  console.log(authHeader, 'authHeader');

  next();
};

export default auth;
