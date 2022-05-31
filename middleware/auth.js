// eslint-disable-next-line import/extensions
import { UnAuthenticatedError } from '../errors/index.js';

const auth = async (req, res, next) => {
  // const { headers } = req;
  const authHeader = req.headers.authorization;

  // console.log(headers, 'headers');
  if (!authHeader) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
  console.log(authHeader, 'authHeader');

  next();
};

export default auth;
