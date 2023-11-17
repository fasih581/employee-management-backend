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
  const requiredFields = [
    "salutation",
    "firstname",
    "lastname",
    "emailAddress",
    "mobilenumber",
    "DOB",
    "gender",
    "qualifications",
    "address",
    "city",
    "pinzip",
    "state",
    "country",
    "username",
    "password",
];


for (const field of requiredFields) {
    if (!req.body[field]) {
        return res
            .status(400)
            .send({ message: `Error: Missing ${field} field` });
    }
}

  //   new user
  const user = new addEmp({
    salutation:req.body.salutation,
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
    .save()
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
  if (req.query.id) {
    const id = req.query.id;
    addEmp.findById(id)
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          message: `Not found user with id`+id,
        });
      } else {
        console.log(id);
        res.send(data);
      }
    })
    .catch((err) => {
      console.error("Error creating user:", err);
      res.status(500).json({
        message: "Error retrieving user with id"+id,
        error: err.message || "Internal Server Error",
      });
    });
  } else {
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
  }
};

// update and new idetified user bu user id
exports.update = (req, res) => {
  if (isEmpty(req.body)) {
    return res.status(400).json({ message: "data to update cannot be empty!" });
  }

  const id = req.params.id;
  addEmp
    .findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          message: `Cannot update user with ${id}. May user not found!`,
        });
      } else {
        console.log(id);
        res.send(data);
      }
    })
    .catch((err) => {
      console.error("Error updating user:", err);
      res.status(500).json({
        message: "Error updating user information",
        error: err.message || "Internal Server Error",
      });
    });
};

// delete a user with specified user id in the rquest
exports.delete = (req, res) => {
  const id = req.params.id;

  addEmp
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          message: `Cannot delete with id:${id}. May be id is wrong`,
        });
      } else {
        res.send({ message: `User delete successfuly!` });
      }
    })
    .catch((err) => {
      console.error("Error updating user:", err);
      res.status(500).json({
        message: "Could not delete User with id=" + id,
        error: err.message || "Internal Server Error",
      });
    });
};
