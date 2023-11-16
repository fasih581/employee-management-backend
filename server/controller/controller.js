const addEmp = require("../model/model");

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

// create and save new user
exports.create = (req, res) => {
  // validate request
  if (isEmpty(req.body)) {
    return res.status(400).json({ message: "Content cannot be empty!" });
  }

  //   new user
  const user = new addEmp({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    emailAddress: req.body.emailAddress,
    mobilenumber: req.body.mobilenumber,
    DOB: req.body.DOB,
    gender: req.body.gender,
    qualifications: req.body.qualifications,
    address: req.body.address,
    country: req.body.country,
    state: req.body.state,
    city: req.body.city,
    pinzip: req.body.pinzip,
    username: req.body.username,
    password: req.body.password,
  });

  // save user in the database
  user
    .save(user)
    .then((data) => {
      res.status(201).json(data); // 201 status for successful creation
      res.send(data);
    })
    .catch((err) => {
      console.error("Error creating user:", err);
      res.status(500).json({
        message: "Error occurred while creating a user.",
        error: err.message || "Internal Server Error",
      });
    });
};

// retrieve and return all user/retrieve and return a single user
exports.find = (req, res) => {
  addEmp
    .find()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.error("Error creating user:", err);
      res.status(500).json({
        message: "Error occurred while retring user information",
        error: err.message || "Internal Server Error",
      });
    });
};

// update and new idetified user bu user id
exports.update = (req, res) => {
  if (isEmpty(req.body)) {
    return res.status(400).json({ message: "data to update cannot be empty!" });
  }

  const id = req.params.id;
  addEmp
    // .findByIdAndUpdate(id.req.body)
    .then((data) => {
      if (!data) {
        return res
          .status(400)
          .json({
            message: "Cannot update user with ${id}.May user not found!",
          });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      console.error("Error creating user:", err);
      res.status(500).json({
        message: "Error update user information",
        error: err.message || "Internal Server Error",
      });
    });
};

// delete a user with specified user id in the rquest
exports.delete = (req, res) => {};
