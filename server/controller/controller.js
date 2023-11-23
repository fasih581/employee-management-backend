const addEmp = require("../model/model");
const multer = require("multer");
const asyncHandler = require("express-async-handler");
const path = require("path");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "avatars");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Multer upload configuration
const upload = multer({ storage: storage }).single("avatar");

// create and save new user
exports.create = (req, res) => {
  console.log("init file", req.file);
  upload(req, res, async (error) => {
    if (error instanceof multer.MulterError) {
      console.log("init avatar", req.body.avatar);
      return res.status(400).json({ error: "image error" + error });
    } else if (error) {
      return res.status(500).json({ error: "server error " + error });
    } else {
      // Validate required fields
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

      console.log("Received Data:", req.body);
      console.log("Received File:", req.file);

      const avatarPath = req.file ? req.file.path : null;
      console.log(avatarPath);

      // new employee

      const user = new addEmp({
        salutation: req.body.salutation,
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
        avatar: avatarPath,
      });

      // save employee in database
      user
        .save()
        .then((data) => {
          res.status(201).json(data); // 201 status for successful creation
          // res.send(data);
        })
        .catch((err) => {
          console.error("Error creating user:", err);
          res.status(500).json({
            message: "Error occurred while creating a user.",
            error: err.message || "Internal Server Error",
          });
        });
    }
  });
};


exports. getEmployees = asyncHandler(async (req, res) => {
  let { page, size } = req.query;
  const limit = parseInt(size);
  const skip = (page - 1) * size;
  const maxCountOnPage = await addEmp.find();

  const employees = await addEmp.find().limit(limit).skip(skip);
  res.status(200).json({ maxCountOnPage, employees });
});

exports. getEmployee = asyncHandler(async (req, res) => {
  const employee = await addEmp.findById(req.params.id);
  if (!employee) {
    res.status(404);
    throw new Error("Employee not found");
  }
  res.status(200).json(employee);
});

// retrieve and return all user/retrieve and return a single user
// exports.find = (req, res) => {
//   if (req.query.id) {
//     const id = req.query.id;
//     addEmp
//       .findById(id)
//       .then((data) => {
//         if (!data) {
//           return res.status(400).json({
//             message: `Not found user with id` + id,
//           });
//         } else {
//           console.log(id);
//           res.send(data);
//         }
//       })
//       .catch((err) => {
//         console.error("Error creating user:", err);
//         res.status(500).json({
//           message: "Error retrieving user with id" + id,
//           error: err.message || "Internal Server Error",
//         });
//       });
//   } else {
//     addEmp
//       .find()
//       .then((user) => {
//         res.send(user);
//       })
//       .catch((err) => {
//         console.error("Error creating user:", err);
//         res.status(500).json({
//           message: "Error occurred while retring user information",
//           error: err.message || "Internal Server Error",
//         });
//       });
//   }
// };

// exports.find = (req, res) => {
//   const page = req.query.page || 1;
//   const limit = req.query.limit || 4;
//   const skip = (page - 1) * limit;
//   console.log(skip);

//   if (req.query.id) {
//     const id = req.query.id;
//     addEmp
//       .findById(id)
//       .then((data) => {
//         if (!data) {
//           return res.status(400).json({
//             message: `Not found user with id` + id,
//           });
//         } else {
//           console.log(id);
//           res.send(data);
//         }
//       })
//       .catch((err) => {
//         console.error("Error creating user:", err);
//         res.status(500).json({
//           message: "Error retrieving user with id" + id,
//           error: err.message || "Internal Server Error",
//         });
//       });
//   } else {
//     addEmp
//       .countDocuments()
//       .exec()
//       .then((totalCount) => {
//         addEmp
//           .find()
//           .then((user) => {
//             user;

//             const slicedData = user.slice(skip, skip + limit);

//             res.status(200).json({
//               message: "ok",
//               length: totalCount,
//               data: slicedData,
//             });
//           })
//           .catch((err) => {
//             console.error("Error creating user:", err);
//             res.status(500).json({
//               message: "Error occurred while retring user information",
//               error: err.message || "Internal Server Error",
//             });
//           });
//       });
//   }
// };
exports. update = asyncHandler(async (req, res) => {
  const employee = await addEmp.findById(req.params.id);
  if (!employee) {
    res.status(404);
    throw new Error("Employee not found");
  }
  const updatedemployee = await addEmp.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true}
  );
  res.status(200).json(updatedemployee);
});
// update and new idetified user bu user id
// exports.update = (req, res) => {
//   upload(req, res, async (error) => {
//     if (error instanceof multer.MulterError) {
//       res.status(400).json({ err: "image upload error" });
//     } else if (error) {
//       res.status(500).json({ error: "server error" });
//     }

//     let avatarPath;
//     if (req.file) {
//       avatarPath = path.join("avatars", req.file.filename);
//     } else {
//       // If no new file is uploaded, keep the existing avatar path
//       const emp = await addEmp.findById(req.params.id);
//       if (!emp) {
//         res.status(404).json({ error: "employee not found" });
//         return;
//       }
//       avatarPath = emp.avatar; // Use the existing avatar path
//     }

//     const emp = await addEmp.findById(req.params.id);
//     if (!emp) {
//       res.status(404);
//       throw new Error("employee not found");
//     }
//     // Update avatar only if a new file was uploaded
//     const updateData = {
//       ...req.body,
//       ...(avatarPath ? { avatar: avatarPath } : {}), // Conditionally include avatar field
//     };

//     console.log(avatarPath);
//     const upd = await addEmp.findByIdAndUpdate(req.params.id,updateData, {
//       new: true,
//     });
//     console.log(upd);
//     res.status(200).json(upd);
//   });
// };

// exports.update = (req, res) => {
//   if (isEmpty(req.body)) {
//     return res.status(400).json({ message: "data to update cannot be empty!" });
//   }

//   const id = req.params.id;
//   addEmp
//     .findByIdAndUpdate(id, req.body, { new: true })
//     .then((data) => {
//       if (!data) {
//         return res.status(400).json({
//           message: `Cannot update user with ${id}. May user not found!`,
//         });
//       } else {
//         console.log(id);
//         res.send(data);
//       }
//     })
//     .catch((err) => {
//       console.error("Error updating user:", err);
//       res.status(500).json({
//         message: "Error updating user information",
//         error: err.message || "Internal Server Error",
//       });
//     });
// };

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

exports.searchEmployee = asyncHandler(async (req, res) => {
  const employee = await addEmp.find({
    $or: [
      { firstname: { $regex: req.params.key, $options: "i" } },
      { lastname: { $regex: req.params.key, $options: "i" } },
      { emailAddress: { $regex: req.params.key, $options: "i" } },
    ],
  });
  if (!employee) {
    res.status(404);
    throw new Error("Employee not found");
  }
  console.log(employee);
  res.status(200).json({employee});
});