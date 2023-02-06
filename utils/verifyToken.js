import jwt from "jsonwebtoken";

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
    if (error) {
      return false;
    } else {
      decoded;
    }
  });
};

export default verifyToken;
