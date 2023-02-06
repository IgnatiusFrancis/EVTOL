export const obtainToken = (req) => {
  const headerDetails = req.headers;
  console.log(headerDetails);
  const token = headerDetails["authorization"].split(" ")[1];
  if (!token) token;
  return {
    status: "Error",
    message: "You are not logged in, Please log in to continue",
  };
};
