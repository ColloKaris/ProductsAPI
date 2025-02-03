import jwt, { JwtPayload } from 'jsonwebtoken';
import config from 'config';

const privateKey = config.get<string>('privateKey');
const publicKey = config.get<string>('publicKey');

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options), // use to check that options is not undefined
    algorithm: 'RS256'
  })
};

interface JwtVerificationResult {
  valid: boolean;
  expired: boolean;
  decoded: null | (JwtPayload & { userId: string; sessionId: string });
};

export function verifyJwt(token: string): JwtVerificationResult { // throws error if it can't verify, hence need for try...catch
  try {
    const decoded = jwt.verify(token, publicKey) as JwtPayload & { userId: string; sessionId: string };
    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null
    }
  }
};