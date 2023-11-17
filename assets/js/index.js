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
  // window.location="http://127.0.0.1:5500/index.html";
  clearform();
}


var apiurl = "http://localhost:8080/api/employees";

// get employees detials
read_emp();

async function read_emp() {
  let temp = "";
  await fetch(apiurl)
    .then((res) => {
      
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const maxCountOnPage = 5; //its the number if data to be displayed on the page
      const totalPages = Math.ceil(data.length / maxCountOnPage); //finding the total pages as per the data
      pagination(totalPages); //returning the value to pagination function
      const start = maxCountOnPage * (CurrentPage - 1);
      const end = Math.min(maxCountOnPage * CurrentPage, data.length);

      for (var i = start; i < end; i++) {
        // employees id
        var id = data[i].id;
        // console.log(id);
        const employees = data[i];

        temp += `<tr class="emp_column">
            <td>#${i + 1}</td>
            <td class="td_emp_img">
                <div class="table_emp_img"><img src='${apiurl}/${employees.id}/avatar' style="width:30px; height:30px;">
                </div>${
                  employees.salutation +
                  " " +
                  employees.firstname +
                  " " +
                  employees.lastname
                }</td>
            <td>${employees.emailAddress
            }</td>
            <td>${employees.mobilenumber
            }</td>
            <td>${employees.gender}</td>
            <td>${employees.DOB}</td>
            <td>${employees.country}</td>
            <td>
        <div class="v_e_d_box">
      <button class="btn btn-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="fa-solid fa-ellipsis"></i>
      </button>
      <ul class="dropdown-menu v_e_d_menu">
        <li><a href="view.html?id=${employees.id}"><button class="dropdown-item" type="button" onclick=homeEmployee()><i class="bi bi-eye"></i>View Details</button></a></li>
        <li><button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="editEmp('${id}')"><i class="bi bi-pencil-fill"></i>Edit</button></li>
        <li><button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#deleteModal" 
        onclick=delete_emp('${employees.id}')><i class="bi bi-trash"></i>Delete</button></li>
      </ul>
    </div>
            </td>
            </tr>`;
      }
    });
  document.getElementById("table_body").innerHTML = temp;
}
// const addForm = document.getElementById("add_employee_form");
//send the POST request
const sumbit_emp = document.getElementById("submit_data");
sumbit_emp.addEventListener("click", (e) => {
  e.preventDefault();

  const isValid = FormValidation();
  if(!isValid){
    return;
  }

  var salutation = document.getElementById("salutation").value;
  var firstName = document.getElementById("firstname").value;
  var lastName = document.getElementById("lastname").value;
  var email = document.getElementById("emailAddress").value;
  var phone = document.getElementById("mobilenumber").value;
  var dob = document.getElementById("DOB").value;
  var qualifications = document.getElementById("qualifications").value;
  var address = document.getElementById("address").value;
  var country = document.getElementById("country").value;
  var state = document.getElementById("state").value;
  var city = document.getElementById("city").value;
  var password = document.getElementById("password").value;
  var username = document.getElementById("username").value;

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

  const post_emp = {
    salutation,
    firstName,
    lastName,
    email,
    phone,
    dob: newDate,
    address,
    country,
    state,
    city,
    password: password,
    username: username,
    gender,
    qualifications,
  };

  fetch(apiurl, {
    
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post_emp),
    
  })
    .then((res) => {
      // Parse the response JSON once and store it in a variable
      return res.json();
      
    })
    // .then((post_emp) => {

    //       // Image upload
    //       const uploadImage = document.getElementById("input_file");
    //       const formData = new FormData();
    //       formData.append("avatar", uploadImage.files[0]);
    //       console.log("data id",post_emp.id);

    //       fetch(`${apiurl}/${post_emp.id}/avatar`, {
    //       method: "POST",
    //       body: formData,
    //     })
        .then((res) => {
          console.log("Response JSON:", post_emp) // Log the parsed JSON response
          
          window.alert("Employee added successfully");
          clearform();
          showPopup();         
          read_emp();

          
        })
        .then(employees => {
          console.log(employees);
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });



// detet employee
function delete_emp(id) {
    console.log(id);
  
    fetch(`${apiurl}/${id}`, {
      method: "DELETE",
    });
  }

//  clear the form
function clearform() {
    var salutation = (document.getElementById("salutation").value = "");
    var firstName = (document.getElementById("firstname").value = "");
    var lastName = (document.getElementById("lastname").value = "");
    var email = (document.getElementById("emailAddress").value = "");
    var phone = (document.getElementById("mobilenumber").value = "");
    var dob = (document.getElementById("DOB").value = "");
    var qualifications = (document.getElementById("qualifications").value = "");
    var address = (document.getElementById("address").value = "");
    var gender = (document.querySelector('input[name="gender"]:checked').value ="");
    var country = (document.getElementById("country").value = "");
    var state = (document.getElementById("state").value = "");
    var city = (document.getElementById("city").value = "");
    var Pin = (document.getElementById("pinzip").value = "");
    var password = (document.getElementById("password").value = "");
    var username = (document.getElementById("username").value = "");
    var image = (document.getElementById("input_file").value = "");
  }
  
  // edit employee detials
  function editEmp(id) {
    console.log(id);
    fetch(`${apiurl}/${id}`, {
      method: "get",
    })
      .then((res) => res.json())
      .then((employ) => {
        console.log(employ);
  
        function formatchange(dob) {
          const array = dob.split("-");
          let day = array[2];
          let month = array[1];
          let year = array[0];
          let dateformat = day + "-" + month + "-" + year;
          return dateformat;
        }
    //   edit image
        document.getElementById("editImg").src=`http://localhost:3000/employees/${employ.id}/avatar`
  
        document.getElementById("edit-salutation").value = employ.salutation;
        document.getElementById("edit-firstName").value = employ.firstName;
        document.getElementById("edit-lastName").value = employ.lastName;
        document.getElementById("edit-email").value = employ.email;
        document.getElementById("edit-mobilenumber").value = employ.phone;
        document.getElementById("edit-dob").value = formatchange(employ.dob);

        var gender = document.getElementsByName("genders");
        var dbgender = employ.gender;
  
        for (var i = 0; i < gender.length; i++) {
          if (gender[i].value == dbgender) {
            gender[i].checked = true;
          }
        }
  
        document.getElementById("edit-address").value = employ.address;
        document.getElementById("edit-country").value = employ.country;
        document.getElementById("edit_state").value = employ.state;
        document.getElementById("edit-city").value = employ.city;
        document.getElementById("edit-password").value = employ.password;
        document.getElementById("edit-username").value = employ.username;
        document.getElementById("edit-pin").value = employ.Pin;
        document.getElementById("edit-qualifications").value = employ.qualifications;
      });
  
    const form_emp_updata = document.getElementById("zero-edit");
    form_emp_updata.addEventListener("submit", (e) => {
      e.preventDefault();
  
      function formatchangeedit(dob) {
        const array = dob.split("-");
        let day = array[0];
        let month = array[1];
        let year = array[2];
        let dateformat = year + "-" + month + "-" + day;
        return dateformat;
      }
  
      let editdatefromat = document.getElementById("edit-dob").value;
      let editdateupdate = formatchangeedit(editdatefromat);
  
      let formup = {
        salutation: document.getElementById("edit-salutation").value,
        firstName: document.getElementById("edit-firstName").value,
        lastName: document.getElementById("edit-lastName").value,
        email: document.getElementById("edit-email").value,
        phone: document.getElementById("edit-mobilenumber").value,
        address: document.getElementById("edit-address").value,
        dob: editdateupdate,
        country: document.getElementById("edit-country").value,
        state : document.getElementById("edit_state").value,
        city: document.getElementById("edit-city").value,
        gender: document.querySelector('input[name="genders"]:checked').value,
        password: document.getElementById("edit-password").value,
        username: document.getElementById("edit-username").value,
        qualifications: document.getElementById("edit-qualifications").value,
        Pin : document.getElementById("edit-pin").value,
      };
  
      fetch(`${apiurl}/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formup),
      })
        .then((res) => {
          return res.json();
        })
        .then((employ) => {
          read_emp();
        });
    });
  }

  // pagination
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
const add_hide = document.querySelector("#add_emp_hide")
var  upload_file = "";

input_file.addEventListener("change", function(){
  if(input_file.files[0]){
    selected_img.src= URL.createObjectURL(input_file.files[0]);
    selected_img.style.display = "block";
    add_hide.style.display = "none";

  }
  else{
    selected_img.src= "";
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

  
  // function for search the element from table
  function searchEmployee() {
    let input = document.getElementById("search_input").value;
    input = input.toLowerCase();
    let tag = document.getElementsByTagName("tr");
    let foundEmployee = false; // Variable to track if any employees are found
  
    for (let i = 0; i < tag.length; i++) {
      // console.log(tag.length);
      if (!tag[i].innerHTML.toLowerCase().includes(input)) {
        tag[i].style.display = "none";
      } else {
        tag[i].style.display = "table-row";
        foundEmployee = true; // Set to true if at least one employee is found
      }
    }
  
  }

    
function FormValidation(){
  const form = document.getElementById("add_employee_form");
  // const image = document.getElementById("input_file");
  const salutation = document.getElementById("salutation");
  const firstname = document.getElementById("firstname").value.trim();
  const lastname = document.getElementById("lastname").value.trim();
  const emailAddress = document.getElementById("emailAddress").value.trim();
  const mobilenumber = document.getElementById("mobilenumber").value.trim();
  const DOB = document.getElementById("DOB");
  const qualifications = document.getElementById("qualifications");
  const address = document.getElementById("address");
  const country = document.getElementById("country");
  const state = document.getElementById("state");
  const city = document.getElementById("city");
  const pinzip = document.getElementById("pinzip");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  
  //   // date of birth
    const dobInput = document.getElementById('DOB');
    const dobError = document.getElementById('errormessageDob');
    const dobValue = dobInput.value.trim();

    // Regular expression patterns
    const namePattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/; // Allows a space between names
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phonePattern = /^\d{10,}$/; // Validates for at least 10 digits
  
    // Flag to check for validation
    let isValid = true;
  
  // image validation
  // if (image.value.trim() === "") {
  //   errormessageImg.textContent = "Please select Image";
  //   isValid = false;
  // } 
  // else {
  //   errormessageImg.textContent = "";
  // }

  // salutation validation
  if (salutation.value.trim() === "select") {
    errormessageSalutation.textContent = "Invalid select";
    isValid = false;
  } 
  else {
    errormessageSalutation.textContent = "";
  }

  // firstname validation
  if (!namePattern.test(firstname)) {
    document.getElementById('errormessagefirstname').textContent = 'First Name is required';
    isValid = false;
  } else {
    errormessagefirstname.textContent = "";
  }

  // lastname validation
  if (!namePattern.test(lastname)) {
    document.getElementById('errormessagelastname').textContent = 'Please enter a valid last name.';
    isValid = false;
  } else {
    errormessagelastname.textContent = "";
  }

  // email validation
  if (!emailPattern.test(emailAddress)) {
    document.getElementById('errormessageEmail').textContent = 'Please enter a valid email address';
    isValid = false;
  } else {
    errormessageEmail.textContent = "";
  }

  // phone validation
  if (!phonePattern.test(mobilenumber)) {
    document.getElementById('errormessagePhone').textContent = 'Please enter a valid phone number.';
    isValid = false;
  } else {
     errormessagePhone.textContent = "";
  }

    // dob  validation
    if (DOB.value.trim() === "") {
      errormessageDob.textContent = "Please select a date of birth";
      isValid = false;
    } else {
      errormessageDob.textContent = "";
    }

    // qualifications validation
    if (qualifications.value.trim() === "") {
      errormessageQualifications.textContent = "Qualifications is required";
      isValid = false;
    } else {
      errormessageQualifications.textContent = "";
    }

    // address validation
    if (address.value.trim() === "") {
      errormessageAddress.textContent = "Address is required";
      isValid = false;
    } else {
      errormessageAddress.textContent = "";
    }

    // country validation
    if (country.value.trim() === "select country") {
      errormessageCountry.textContent = "country is required";
      isValid = false;
    } else {
      errormessageCountry.textContent = "";
    }
        
    // state validation
    if (state.value.trim() === "select State") {
      errormessageState.textContent = "state is required";
      isValid = false;
    } else {
      errormessageState.textContent = "";
     }

    // city validation
    if (city.value.trim() === "") {
      errormessageCity.textContent = "city is required";
      isValid = false;
    } else {
      errormessageCity.textContent = "";
    }

    // Pin validation
    if (pinzip.value.trim() === "") {
      errormessagePin.textContent = "pin is required";
      isValid = false;
    } else {
      errormessagePin.textContent = "";
    }

    // username validation
    if (username.value.trim() === "") {
      errormessageUsrname.textContent = "UserName is required";
      isValid = false;
    } else {
      errormessageUsrname.textContent = "";
    }

    // password validation
    if (password.value.trim() === "") {
      errormessagePass.textContent = "Password is required";
      isValid = false;
    } else {
      errormessagePass.textContent = "";
    }
  
    return isValid;
}