const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("./models/userModel");
module.exports.isLoggedIn = async (request, response, next) => {
      try {
            const token = request.headers.authorization.split(" ")[1];

            if (!token) {
                  response.json({ status: "error", message: "please login" });
            } else {
                  const decodedToken = jwt.verify(token, "secret");

                  if (!decodedToken) {
                        response.status(500).json({
                              status: "error",
                              message: "not a valid token",
                        });
                  } else {
                        const isUserExist = await UserModel.findById(
                              decodedToken._id
                        );
                        if (!isUserExist) {
                              response.status(500).json({
                                    status: "error",
                                    message: "user does not exist ,logout and login again",
                              });
                        } else {
                              request.user = decodedToken;
                              next();
                        }
                  }
            }
      } catch (error) {
            response
                  .status(500)
                  .json({ status: "error", message: error.message });
      }
};
