const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const UserModel = require("../models/userModel");

router.route("/user").get(isLoggedIn, async (request, response) => {
      try {
            let { email, name } = await UserModel.findOne({
                  _id: request.user._id,
            });

            setTimeout(() => {
                  response.status(200).json({
                        status: "success",
                        message: "fetched successfully",
                        payload: { email, name },
                  });
            }, 1000);
      } catch (error) {
            response
                  .status(500)
                  .json({ status: "error", message: error.message });
      }
});

module.exports = router;
