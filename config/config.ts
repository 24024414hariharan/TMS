export default {
  jwtSecret: process.env.JWT_SECRET || "your_jwt_secret",
  jwtExpiresIn: "1h",
};
