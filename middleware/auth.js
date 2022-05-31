import jwt from 'jsonwebtoken';
// eslint-disable-next-line import/extensions
import { UnAuthenticatedError } from '../errors/index.js';

const auth = async (req, res, next) => {
  // const { headers } = req;
  // Check header or if header doesn't start with Bearer
  const authHeader = req.headers.authorization;

  // console.log(headers, 'headers');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
  // If we're getting the header with Bearer then select the token
  const token = authHeader.split(' ')[1];
  // console.log(authHeader, 'authHeader');

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload, 'payload');
    // req.user = payload;
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnAuthenticatedError('Authentication Invalid');
  }
};

export default auth;
