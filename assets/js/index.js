function btn_filled() {
  const btn_filled = document.getElementsByClassName("add_employee")[0];
  btn_filled.style.display = "block";
  const overlay = document.getElementsByClassName("overlay")[0];
  overlay.style.display = "block";
}

function close_btn() {
  const btn_filled = document.getElementsByClassName("add_employee")[0];
  btn_filled.style.display = "none";
  const overlay = document.getElementsByClassName("overlay")[0];
  overlay.style.display = "none";
  clearform();
}

function display(data, maxCountOnPage) {
  let temp = "";

  for (var i = 0; i < data.length; i++) {
    // employees id
    var id = data[i]._id;
    let employees = data[i];
    temp += `<tr class="emp_column">
    <td>#${(CurrentPage - 1) * maxCountOnPage + i + 1}</td>
    <td class="td_emp_img">
        <div class="table_emp_img"><img src='${
          employees.avatar
        }' style="width:30px; height:30px;">
        </div>${
          employees.salutation +
          " " +
          employees.firstname +
          " " +
          employees.lastname
        }</td>
    <td>${employees.emailAddress}</td>
    <td>${employees.mobilenumber}</td>
    <td>${employees.gender}</td>
    <td>${employees.DOB}</td>
    <td>${employees.country}</td>
    <td>
<div class="v_e_d_box">
<button class="btn btn-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
<i class="fa-solid fa-ellipsis"></i>
</button>
<ul class="dropdown-menu v_e_d_menu">
<li><a href="/view/?id=${
      employees._id
    }"><button class="dropdown-item" type="button" onclick=homeEmployee()><i class="bi bi-eye"></i>View Details</button></a></li>
<li><button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="editEmp('${id}')"><i class="bi bi-pencil-fill"></i>Edit</button></li>
<li><button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#deleteModal"
onclick=delete_emp('${
      employees._id
    }')><i class="bi bi-trash"></i>Delete</button></li>
</ul>
</div>
    </td>
    </tr>`;
  }

  document.getElementById("table_body").innerHTML = temp;
}

// get employees detials
read_emp();
async function read_emp() {
  maxCountOnPage = 5; //its the number if data to be displayed on the page

  await fetch(
    `http://localhost:8080/api/employees?page=${CurrentPage}&size=${maxCountOnPage}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const totalPages = Math.ceil(data.maxCountOnPage.length / maxCountOnPage); //finding the total pages as per the data
      pagination(totalPages); //returning the value to pagination function

      display(data.employees, maxCountOnPage);
    });
}

const chooseFile = document.getElementById("input_file");

//send the POST request
const sumbit_emp = document.getElementById("submit_data");
sumbit_emp.addEventListener("click", (e) => {
  e.preventDefault();

  const isValid = FormValidation();
  if (!isValid) {
    return;
  }

  var salutation = document.getElementById("salutation").value;
  var firstname = document.getElementById("firstname").value;
  var lastname = document.getElementById("lastname").value;
  var emailAddress = document.getElementById("emailAddress").value;
  var mobilenumber = document.getElementById("mobilenumber").value;
  var dob = document.getElementById("DOB").value;
  var qualifications = document.getElementById("qualifications").value;
  var address = document.getElementById("address").value;
  var country = document.getElementById("country").value;
  var state = document.getElementById("state").value;
  var city = document.getElementById("city").value;
  var password = document.getElementById("password").value;
  var username = document.getElementById("username").value;
  var pinzip = document.getElementById("pinzip").value;
  let file = chooseFile.files[0];

  // gander
  var gender = document.querySelector('input[name="gender"]:checked').value;
  //  console.log(gender);

  // day-month-year
  var newDate = formatchange(dob);
  function formatchange(dob) {
    const array = dob.split("-");
    let day = array[0];
    let month = array[1];
    let year = array[2];
    let dateformat = year + "-" + month + "-" + day;
    return dateformat;
  }

  const newEmpData = new FormData();
  newEmpData.append("salutation", salutation);
  newEmpData.append("firstname", firstname);
  newEmpData.append("lastname", lastname);
  newEmpData.append("emailAddress", emailAddress);
  newEmpData.append("mobilenumber", mobilenumber);
  newEmpData.append("address", address);
  newEmpData.append("qualifications", qualifications);
  newEmpData.append("country", country);
  newEmpData.append("state", state);
  newEmpData.append("city", city);
  newEmpData.append("pinzip", pinzip);
  newEmpData.append("password", password);
  newEmpData.append("DOB", newDate);
  newEmpData.append("gender", gender);
  newEmpData.append("username", username);
  newEmpData.append("avatar", file);

  console.log(newEmpData);
  fetch("http://localhost:8080/api/employees", {
    method: "POST",
    body: newEmpData,
  })
    .then((res) => {
      // Parse the response JSON once and store it in a variable
      return res.json();
    })
    .then((newEmpData) => {
      console.log(newEmpData);
      clearform();
      showPopup();
      read_emp();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
});

// detet employee
function delete_emp(id) {
  console.log(id);

  fetch(`http://localhost:8080/api/employees/${id}`, {
    method: "DELETE",
  });
}

//  clear the form
function clearform() {
  var salutation = (document.getElementById("salutation").value = "");
  var firstname = (document.getElementById("firstname").value = "");
  var lastname = (document.getElementById("lastname").value = "");
  var emailAddress = (document.getElementById("emailAddress").value = "");
  var mobilenumber = (document.getElementById("mobilenumber").value = "");
  var DOB = (document.getElementById("DOB").value = "");
  var qualifications = (document.getElementById("qualifications").value = "");
  var address = (document.getElementById("address").value = "");
  var gender = (document.querySelector('input[name="gender"]:checked').value =
    "");
  var country = (document.getElementById("country").value = "");
  var state = (document.getElementById("state").value = "");
  var city = (document.getElementById("city").value = "");
  var pinzip = (document.getElementById("pinzip").value = "");
  var password = (document.getElementById("password").value = "");
  var username = (document.getElementById("username").value = "");
  var image = (document.getElementById("input_file").value = "");
}

// edit employee detials
function editEmp(id) {
  // console.log(id);
  fetch(`http://localhost:8080/api/employees/${id}`, {
    method: "get",
  })
    .then((res) => res.json())
    .then((employ) => {
      // console.log(employ);

      function formatchange(dob) {
        const array = dob.split("-");
        let day = array[2];
        let month = array[1];
        let year = array[0];
        let dateformat = day + "-" + month + "-" + year;
        return dateformat;
      }
      //   edit image
      document.getElementById("editImg").src = `/${employ.avatar}`;

      document.getElementById("editsalutation").value = employ.salutation;
      document.getElementById("editfirstName").value = employ.firstname;
      document.getElementById("editlastName").value = employ.lastname;
      document.getElementById("editemail").value = employ.emailAddress;
      document.getElementById("editmobilenumber").value = employ.mobilenumber;
      document.getElementById("editdob").value = formatchange(employ.DOB);

      var gender = document.getElementsByName("genders");
      var dbgender = employ.gender;

      for (var i = 0; i < gender.length; i++) {
        if (gender[i].value == dbgender) {
          gender[i].checked = true;
        }
      }

      document.getElementById("editaddress").value = employ.address;
      document.getElementById("editcountry").value = employ.country;
      document.getElementById("editstate").value = employ.state;
      document.getElementById("editcity").value = employ.city;
      document.getElementById("editpassword").value = employ.password;
      document.getElementById("editusername").value = employ.username;
      document.getElementById("editpin").value = employ.pinzip;
      document.getElementById("editqualifications").value =
        employ.qualifications;
    });

  const form_emp_updata = document.getElementById("zeroedit");
  form_emp_updata.addEventListener("submit", (e) => {
    e.preventDefault();

    const isValid = FormValidationEdit();
    if (!isValid) {
      return;
    }

    // const isValid = FormValidationEdit();
    // console.log(isValid);
    // //FormValidationEdit();
    // if (isValid) {
      
  

    function formatchangeedit(dob) {
      const array = dob.split("-");
      let day = array[0];
      let month = array[1];
      let year = array[2];
      let dateformat = year + "-" + month + "-" + day;
      return dateformat;
    }

    let editdatefromat = document.getElementById("editdob").value;
    let editdateupdate = formatchangeedit(editdatefromat);

    let formup = {
      salutation: document.getElementById("editsalutation").value,
      firstname: document.getElementById("editfirstName").value,
      lastname: document.getElementById("editlastName").value,
      emailAddress: document.getElementById("editemail").value,
      mobilenumber: document.getElementById("editmobilenumber").value,
      address: document.getElementById("editaddress").value,
      DOB: editdateupdate,
      country: document.getElementById("editcountry").value,
      state: document.getElementById("editstate").value,
      city: document.getElementById("editcity").value,
      gender: document.querySelector('input[name="genders"]:checked').value,
      password: document.getElementById("editpassword").value,
      username: document.getElementById("editusername").value,
      qualifications: document.getElementById("editqualifications").value,
      pinzip: document.getElementById("editpin").value,
      // file: document.getElementById('editImg').files[0],
    };

    fetch(`http://localhost:8080/api/employees/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formup),
    })
      .then((res) => {
        return res.json();
      })
      // .then((data) => {
        read_emp();
        location.reload();
      // });
  });
}

// function editEmp(id) {
//   // console.log(id);
//   fetch(`http://localhost:8080/api/employees/${id}`, {
//     method: "get",
//   })
//     .then((res) => res.json())
//     .then((employ) => {
//       // console.log(employ);

//       function formatchange(dob) {
//         const array = dob.split("-");
//         let day = array[2];
//         let month = array[1];
//         let year = array[0];
//         let dateformat = day + "-" + month + "-" + year;
//         return dateformat;
//       }
//       //   edit image
//       document.getElementById("editImg").src = `/${employ.avatar}`;

//       document.getElementById("editsalutation").value = employ.salutation;
//       document.getElementById("editfirstName").value = employ.firstname;
//       document.getElementById("editlastName").value = employ.lastname;
//       document.getElementById("editemail").value = employ.emailAddress;
//       document.getElementById("editmobilenumber").value = employ.mobilenumber;
//       document.getElementById("editdob").value = formatchange(employ.DOB);

//       var gender = document.getElementsByName("genders");
//       var dbgender = employ.gender;

//       for (var i = 0; i < gender.length; i++) {
//         if (gender[i].value == dbgender) {
//           gender[i].checked = true;
//         }
//       }

//       document.getElementById("editaddress").value = employ.address;
//       document.getElementById("editcountry").value = employ.country;
//       document.getElementById("editstate").value = employ.state;
//       document.getElementById("editcity").value = employ.city;
//       document.getElementById("editpassword").value = employ.password;
//       document.getElementById("editusername").value = employ.username;
//       document.getElementById("editpin").value = employ.pinzip;
//       document.getElementById("editqualifications").value =
//         employ.qualifications;
//     });

//   const form_emp_updata = document.getElementById("zeroedit");
//   form_emp_updata.addEventListener("submit", (e) => {
//     e.preventDefault();

//     console.log("Before validation");
//     FormValidationEdit();
//     if (isValid) {
//       // Validation passed, proceed with form submission or other actions
//       console.log("Validation passed");

//       function formatchangeedit(dob) {
//         const array = dob.split("-");
//         let day = array[0];
//         let month = array[1];
//         let year = array[2];
//         let dateformat = year + "-" + month + "-" + day;
//         return dateformat;
//       }

//       let editdatefromat = document.getElementById("editdob").value;
//       let editdateupdate = formatchangeedit(editdatefromat);

//       let formup = {
//         salutation: document.getElementById("editsalutation").value,
//         firstname: document.getElementById("editfirstName").value,
//         lastname: document.getElementById("editlastName").value,
//         emailAddress: document.getElementById("editemail").value,
//         mobilenumber: document.getElementById("editmobilenumber").value,
//         address: document.getElementById("editaddress").value,
//         DOB: editdateupdate,
//         country: document.getElementById("editcountry").value,
//         state: document.getElementById("editstate").value,
//         city: document.getElementById("editcity").value,
//         gender: document.querySelector('input[name="genders"]:checked').value,
//         password: document.getElementById("editpassword").value,
//         username: document.getElementById("editusername").value,
//         qualifications: document.getElementById("editqualifications").value,
//         pinzip: document.getElementById("editpin").value,
//         // file: document.getElementById('editImg').files[0],
//       };

//       fetch(`http://localhost:8080/api/employees/${id}`, {
//         method: "put",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formup),
//       })
//         .then((res) => {
//           return res.json();
//         })
//         .then((data) => {
//           read_emp();
//         });
//       console.log("Form submitted successfully!");
//     } else {
//       // Validation failed, you can choose to display an additional message or take other actions
//       console.log("Form validation failed!");
//     }
//   });
// }

//   // pagination
var CurrentPage = 1;

function pagination(totalPages) {
  console.log(totalPages);
  var pgnum = document.getElementById("pgno"); // div element where the pagination buttons are displayed
  let temp = "";

  for (let i = 1; i <= totalPages; i++) {
    temp += `<button id="page${i}">${i}</button>`;
  }
  pgnum.innerHTML = temp;

  pgnum.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      const pageNumber = parseInt(e.target.textContent);
      if (!isNaN(pageNumber)) {
        CurrentPage = pageNumber;
        read_emp();
      }
    }
  });

  var pageLeftButton = document.getElementById("pageleft");
  var pageRightButton = document.getElementById("pageright");

  // Use CSS to control button visibility
  if (CurrentPage === 1) {
    pageLeftButton.classList.add("hidden");
  } else {
    pageLeftButton.classList.remove("hidden");
  }

  if (CurrentPage === totalPages) {
    pageRightButton.classList.add("hidden");
  } else {
    pageRightButton.classList.remove("hidden");
  }

  pageLeftButton.addEventListener("click", function () {
    if (CurrentPage > 1) {
      CurrentPage--;
      read_emp();
    }
  });

  pageRightButton.addEventListener("click", function () {
    if (CurrentPage < totalPages) {
      CurrentPage++;
      read_emp();
    }
  });
}
// end pagination

// ADD employee img
const input_file = document.querySelector("#input_file");
const selected_img = document.querySelector("#img_file");
const add_hide = document.querySelector("#add_emp_hide");
var upload_file = "";

input_file.addEventListener("change", function () {
  if (input_file.files[0]) {
    selected_img.src = URL.createObjectURL(input_file.files[0]);
    selected_img.style.display = "block";
    add_hide.style.display = "none";
  } else {
    selected_img.src = "";
    selected_img.style.display = "none";
  }
});

function showPopup() {
  close_btn();
  var overlay = document.getElementsByClassName("overlay")[0];
  overlay.style.display = "block";
  document.getElementById("employee_add").style.display = "block";
  clearform();
}

function closePopup() {
  document.getElementById("employee_add").style.display = "none";
  var overlay = document.getElementsByClassName("overlay")[0];
  overlay.style.display = "none";
  read_emp();
}

function searchEmployee() {
  let searchKey = document.getElementById("search_input").value;
  searchKey = searchKey.toLowerCase();
  if (searchKey) {
    fetch(`http://localhost:8080/api/employees/search/${searchKey}`)
      .then((response) => response.json())
      .then((data) => {
        display(data.employee, data.employee.length);
      })
      .catch((error) => console.error("Error:", error));
  } else {
    read_emp();
  }
}

// function for search the element from table

function FormValidation() {
  const form = document.getElementById("add_employee_form");
  const image = document.getElementById("input_file");
  const salutation = document.getElementById("salutation");
  const firstname = document.getElementById("firstname").value.trim();
  const lastname = document.getElementById("lastname").value.trim();
  const emailAddress = document.getElementById("emailAddress").value.trim();
  const mobilenumber = document.getElementById("mobilenumber").value.trim();
  const DOB = document.getElementById("DOB");
  const qualifications = document.getElementById("qualifications");
  const gender = document.querySelector('input[name="gender"]:checked');
  const address = document.getElementById("address");
  const country = document.getElementById("country");
  const state = document.getElementById("state");
  const city = document.getElementById("city");
  const pinzip = document.getElementById("pinzip");
  const username = document.getElementById("username");
  const password = document.getElementById("password");

  //   // date of birth
  const dobInput = document.getElementById("DOB");
  const dobError = document.getElementById("errormessageDob");
  const dobValue = dobInput.value.trim();

  // Regular expression patterns
  const namePattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/; // Allows a space between names
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phonePattern = /^\d{10,}$/; // Validates for at least 10 digits

  // Flag to check for validation
  let isValid = true;

  // image validation
  if (image.value.trim() === "") {
    errormessageImg.textContent = "Please select Image";
    isValid = false;
  } else {
    errormessageImg.textContent = "";
  }

  // salutation validation
  if (salutation.value.trim() === "select") {
    document.getElementById("errormessageSalutation").textContent =
      "Invalid select";
    isValid = false;
  } else {
    errormessageSalutation.textContent = "";
  }

  // firstname validation
  if (!namePattern.test(firstname)) {
    document.getElementById("errormessagefirstname").textContent =
      "First Name is required";
    isValid = false;
  } else {
    errormessagefirstname.textContent = "";
  }

  // lastname validation
  if (!namePattern.test(lastname)) {
    document.getElementById("errormessagelastname").textContent =
      "Please enter a valid last name.";
    isValid = false;
  } else {
    errormessagelastname.textContent = "";
  }

  // email validation
  if (!emailPattern.test(emailAddress)) {
    document.getElementById("errormessageEmail").textContent =
      "Please enter a valid email address";
    isValid = false;
  } else {
    errormessageEmail.textContent = "";
  }

  // phone validation
  if (!phonePattern.test(mobilenumber)) {
    document.getElementById("errormessagePhone").textContent =
      "Please enter a valid phone number.";
    isValid = false;
  } else {
    errormessagePhone.textContent = "";
  }

  // dob  validation
  if (DOB.value.trim() === "") {
    document.getElementById("errormessageDob").textContent =
      "Please select a date of birth";
    isValid = false;
  } else {
    errormessageDob.textContent = "";
  }

  // gender  validation
  if (!gender ) {
    document.getElementById("errormessageGender").textContent =
      "Please select your Gender";
    isValid = false;
  } else {
    errormessageGender.textContent = "";
  }

  // qualifications validation
  if (qualifications.value.trim() === "") {
    document.getElementById("errormessageQualifications").textContent =
      "Qualifications is required";
    isValid = false;
  } else {
    errormessageQualifications.textContent = "";
  }

  // address validation
  if (address.value.trim() === "") {
    document.getElementById("errormessageAddress").textContent =
      "Address is required";
    isValid = false;
  } else {
    errormessageAddress.textContent = "";
  }

  // country validation
  if (country.value.trim() === "select country") {
    document.getElementById("errormessageCountry").textContent =
      "country is required";
    isValid = false;
  } else {
    errormessageCountry.textContent = "";
  }

  // state validation
  if (state.value.trim() === "select State") {
    document.getElementById("errormessageState").textContent =
      "state is required";
    isValid = false;
  } else {
    errormessageState.textContent = "";
  }

  // city validation
  if (city.value.trim() === "") {
    document.getElementById("errormessageCity").textContent =
      "city is required";
    isValid = false;
  } else {
    errormessageCity.textContent = "";
  }

  // Pin validation
  if (pinzip.value.trim() === "") {
    document.getElementById("errormessagePin").textContent = "pin is required";
    isValid = false;
  } else {
    errormessagePin.textContent = "";
  }

  // username validation
  if (username.value.trim() === "") {
    document.getElementById("errormessageUsrname").textContent =
      "UserName is required";
    isValid = false;
  } else {
    errormessageUsrname.textContent = "";
  }

  // password validation
  if (password.value.trim() === "") {
    document.getElementById("errormessagePass").textContent =
      "Password is required";
    isValid = false;
  } else {
    errormessagePass.textContent = "";
  }

  return isValid;
}

function FormValidationEdit() {
  const form = document.getElementById("zero-edit");
  // const image = document.getElementById("input_file");
  const editsalutation = document.getElementById("editsalutation");
  // console.log(editsalutation);
  const editfirstName = document.getElementById("editfirstName").value.trim();
  const editlastName = document.getElementById("editlastName").value.trim();
  const editemail = document.getElementById("editemail").value.trim();
  const editmobilenumber = document
    .getElementById("editmobilenumber")
    .value.trim();
  const editdob = document.getElementById("editdob");
  const editqualifications = document.getElementById("editqualifications");
  const editaddress = document.getElementById("editaddress");
  const editcountry = document.getElementById("editcountry");
  const editstate = document.getElementById("editstate");
  const editcity = document.getElementById("editcity");
  const editpin = document.getElementById("editpin");
  const editusername = document.getElementById("editusername");
  const editpassword = document.getElementById("editpassword");

  //   // date of birth
  const dobInput = document.getElementById("editdob");
  const dobError = document.getElementById("errormessageDob");
  const dobValue = dobInput.value.trim();

  // Regular expression patterns
  const namePattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/; // Allows a space between names
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phonePattern = /^\d{10,}$/; // Validates for at least 10 digits

  // Flag to check for validation
  let isValid = true;


  // console.log("Before salutation validation:", editsalutation);
  // salutation validation
   if (editsalutation.value === "select") {
    document.getElementById("editErrormessageSalutation").textContent =
      "Invalid select";
    isValid = false;
  } else {
    document.getElementById("editErrormessageSalutation").textContent = "";
  }

  // firstname validation
  if (!namePattern.test(editfirstName)) {
    document.getElementById("editErrormessagefirstname").textContent =
      "First Name is required";
    isValid = false;
  } else {
    document.getElementById("editErrormessagefirstname").textContent = "";
  }

  // lastname validation
  if (!namePattern.test(editlastName)) {
    document.getElementById("editErrormessagelastname").textContent =
      "Please enter a valid last name.";
    isValid = false;
  } else {
    document.getElementById("editErrormessagelastname").textContent = "";
  }

  // email validation
  if (!emailPattern.test(editemail)) {
    document.getElementById("editErrormessageEmail").textContent =
      "Please enter a valid email address";
    isValid = false;
  } else {
    document.getElementById("editErrormessageEmail").textContent = "";
  }

  // phone validation
  if (!phonePattern.test(editmobilenumber)) {
    document.getElementById("editErrormessagePhone").textContent =
      "Please enter a valid phone number.";
    isValid = false;
  } else {
    document.getElementById("editErrormessagePhone").textContent = "";
  }

  // dob  validation
  if (editdob.value.trim() === "") {
    document.getElementById("editErrormessageDob").textContent =
      "Please select a date of birth";
    isValid = false;
  } else {
    document.getElementById("editErrormessageDob").textContent = "";
  }

  // qualifications validation
  if (editqualifications.value.trim() === "") {
    document.getElementById("editErrormessageQualifications").textContent =
      "Qualifications is required";
    isValid = false;
  } else {
    document.getElementById("editErrormessageQualifications").textContent = "";
  }

  // address validation
  if (editaddress.value.trim() == '') {
    document.getElementById("editErrormessageAddress").textContent =
      "Address is required";
    isValid = false;
  } else {
    document.getElementById("editErrormessageAddress").textContent = "";
  }

  // country validation
  if (editcountry.value.trim() === "select country") {
    document.getElementById("editErrormessageCountry").textContent =
      "country is required";
    isValid = false;
  } else {
    document.getElementById("editErrormessageCountry").textContent = "";
  }

  // state validation
  if (editstate.value.trim() === "select state") {
    document.getElementById("editErrormessageState").textContent =
      "state is required";
    isValid = false;
  } else {
    document.getElementById("editErrormessageState").textContent = "";
  }

  // city validation
  if (editcity.value.trim() === "") {
    document.getElementById("editErrormessageCity").textContent =
      "city is required";
    isValid = false;
  } else {
    document.getElementById("editErrormessageCity").textContent = "";
  }

  // Pin validation
  if (editpin.value.trim() === "") {
    document.getElementById("editErrormessagePin").textContent = "pin is required";
    isValid = false;
  } else {
    document.getElementById("editErrormessagePin").textContent = "";
  }

  // username validation
  if (editusername.value.trim() === "") {
    document.getElementById("editErrormessageUsrname").textContent =
      "UserName is required";
    isValid = false;
  } else {
    document.getElementById("editErrormessageUsrname").textContent = "";
  }

  // password validation
  if (editpassword.value.trim() === "") {
    document.getElementById("editErrormessagePass").textContent =
      "Password is required";
    isValid = false;
  } else {
    document.getElementById("editErrormessagePass").textContent = "";
  }

  return isValid;
}

