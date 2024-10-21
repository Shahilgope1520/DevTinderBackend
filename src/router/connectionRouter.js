const express = require("express");
const { authUser } = require("../middleware/auth");
const { ConnectionRequest } = require("../model/connectionRequest");
const { User } = require("../model/user");
const connectionRouter = express.Router();

connectionRouter.post(
  "/sendConnection/:status/:toUserId",
  authUser,
  async (req, res) => {
    try {
      const { status, toUserId } = req.params;
      const { _id: fromUserId } = req.user;
      if (!status || !toUserId || !fromUserId) {
        throw new Error("Invalid data for connection");
      }
      if (!["intrested", "ignored"].includes(status)) {
        throw new Error("Status is not good");
      }
      const user = await User.findById(toUserId);
      if (!user) {
        throw new Error("not a good req");
      }

      const exisistingConnection = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if(exisistingConnection){
        throw new Error("Connection req already exist");
        
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      await connectionRequest.save();
      res.send(
        `connection sent by ${req?.user?.firstName}` + status + " " + fromUserId
      );
    } catch (error) {
      res.status(500).send("something went wrong " + error);
    }
  }
);

module.exports = connectionRouter;
