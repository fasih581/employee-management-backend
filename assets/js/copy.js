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
  
  function display(){
  
  }
  
  // get employees detials
  read_emp();
  async function read_emp() {
    maxCountOnPage=3;
    let temp = "";
    await fetch(`http://localhost:8080/api/employees`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        //its the number if data to be displayed on the page
        const totalPages = Math.ceil(data.length / maxCountOnPage); //finding the total pages as per the data
        pagination(totalPages); //returning the value to pagination function
        const start = maxCountOnPage * (CurrentPage - 1);
        const end = Math.min(maxCountOnPage * CurrentPage, data.length);
  
        for (var i = start; i < end; i++) {
          // employees id
          var id = data[i]._id;
          console.log(id);
          let employees = data[i]
  
          temp += `<tr class="emp_column">
              <td>#${i + 1}</td>
              <td class="td_emp_img">
                  <div class="table_emp_img"><img src='${employees.avatar}' style="width:30px; height:30px;">
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
          <li><a href="/view/?id=${employees._id}"><button class="dropdown-item" type="button" onclick=homeEmployee()><i class="bi bi-eye"></i>View Details</button></a></li>
          <li><button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="editEmp('${id}')"><i class="bi bi-pencil-fill"></i>Edit</button></li>
          <li><button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#deleteModal"
          onclick=delete_emp('${employees._id}')><i class="bi bi-trash"></i>Delete</button></li>
        </ul>
      </div>
              </td>
              </tr>`;
        }
      });
    document.getElementById("table_body").innerHTML = temp;
  }
  
  // async function read_emp() {
  //   let temp = "";
  //   await fetch(`http://localhost:8080/api/employees`)
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       for (var i = 0; i < data.length; i++) {
  //         // employees id
  //         var id = data[i]._id;
  //         // console.log(id);
  //         let employees = data[i];
  
  //         temp += `<tr class="emp_column">
  //             <td>#${i + 1}</td>
  //             <td class="td_emp_img">
  //                 <div class="table_emp_img"><img src='${employees.avatar}' style="width:30px; height:30px;">
  //                 </div>${
  //                   employees.salutation +
  //                   " " +
  //                   employees.firstname +
  //                   " " +
  //                   employees.lastname
  //                 }</td>
  //             <td>${employees.emailAddress}</td>
  //             <td>${employees.mobilenumber}</td>
  //             <td>${employees.gender}</td>
  //             <td>${employees.DOB}</td>
  //             <td>${employees.country}</td>
  //             <td>
  //         <div class="v_e_d_box">
  //       <button class="btn btn-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
  //         <i class="fa-solid fa-ellipsis"></i>
  //       </button>
  //       <ul class="dropdown-menu v_e_d_menu">
  //         <li><a href="/view/?id=${
  //           employees._id
  //         }"><button class="dropdown-item" type="button" onclick=homeEmployee()><i class="bi bi-eye"></i>View Details</button></a></li>
  //         <li><button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="editEmp('${id}')"><i class="bi bi-pencil-fill"></i>Edit</button></li>
  //         <li><button class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#deleteModal" 
  //         onclick=delete_emp('${
  //           employees._id
  //         }')><i class="bi bi-trash"></i>Delete</button></li>
  //       </ul>
  //     </div>
  //             </td>
  //             </tr>`;
  //       }
  //     });
  //   document.getElementById("table_body").innerHTML = temp;
  
  // const tr = document.getElementById("table_body").getElementsByTagName("tr");
  // var empno = tr.length;
  // // console.log(empno);
  // var pageno = document.getElementById("pagina");
  // var display = 5;
  // var count = 1;
  // var buttcount = Math.ceil(empno / display);
  // for (let i = 1; i <= buttcount; i++) {
  //   var button = document.createElement("button");
  //   button.innerHTML = i;
  //   pageno.appendChild(button);
  // }
  // document.getElementById("pageleft").addEventListener("click", prev);
  // document.getElementById("pageright").addEventListener("click", next);
  // document.getElementById("pageleft").setAttribute("disabled", true);
  // function main(pageNum) {
  //   console.log("pageNum");
  //   var nextpage = display * pageNum;
  //   var prevpage = display * (pageNum - 1);
  //   for (let i = 0; i < empno; i++) {
  //     tr[i].style.display = "none";
  //     if (i >= prevpage && i < nextpage) {
  //       tr[i].style.display = "table-row";
  //     }
  //   }
  // }
  // main(1);
  // var pagbutton = pagina.getElementsByTagName("button");
  // // console.log(pagbutton.length);
  // for (i = 0; i < pagbutton.length; i++) {
  //   pagbutton[i].addEventListener("click", buttonclick);
  // }
  // pagbutton[count - 1].classList.add("buttoncss");
  // function buttonclick() {
  //   pagbutton[count - 1].classList.remove("buttoncss");
  //   if (this.innerHTML == buttcount) {
  //     document.getElementById("pageright").setAttribute("disabled", true);
  //     document.getElementById("pageleft").removeAttribute("disabled");
  //   } else if (this.innerHTML == 1) {
  //     document.getElementById("pageright").removeAttribute("disabled");
  //     document.getElementById("pageleft").setAttribute("disabled", true);
  //   } else {
  //     document.getElementById("pageleft").removeAttribute("disabled");
  //     document.getElementById("pageright").removeAttribute("disabled");
  //   }
  //   count = this.innerHTML;
  //   main(count);
  //   this.classList.add("buttoncss");
  // }
  // function prev() {
  //   pagbutton[count - 1].classList.remove("buttoncss");
  //   pagbutton[count - 2].classList.add("buttoncss");
  //   document.getElementById("pageleft").removeAttribute("disabled");
  //   if (count !== 1) {
  //     count--;
  //   }
  //   if (count == 1) {
  //     document.getElementById("pageleft").setAttribute("disabled", true);
  //   }
  //   main(count);
  // }
  // function next() {
  //   document.getElementById("pageright").removeAttribute("disabled");
  //   if (count !== buttcount) {
  //     pagbutton[count - 1].classList.remove("buttoncss");
  //     pagbutton[count].classList.add("buttoncss");
  //     count++;
  //   }
  //   if (count == pagbutton) {
  //     document.getElementById("pageright").setAttribute("disbled", true);
  //   }
  //   main(count);
  // }
  // }
  
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
    newEmpData.append('salutation', salutation);
    newEmpData.append('firstname', firstname);
    newEmpData.append('lastname', lastname);
    newEmpData.append('emailAddress', emailAddress);
    newEmpData.append('mobilenumber',mobilenumber);
    newEmpData.append('address', address);
    newEmpData.append('qualifications', qualifications);
    newEmpData.append('country', country);
    newEmpData.append('state', state);
    newEmpData.append('city', city);
    newEmpData.append('pinzip', pinzip);
    newEmpData.append('password', password);
    newEmpData.append('DOB', newDate);
    newEmpData.append('gender', gender)
    newEmpData.append('username', username);
    newEmpData.append('avatar', file);
  
    // const post_emp = {
    //   salutation,
    //   firstname,
    //   lastname,
    //   emailAddress,
    //   mobilenumber,
    //   DOB: newDate,
    //   address,
    //   country,
    //   state,
    //   city,
    //   password,
    //   username,
    //   gender,
    //   qualifications,
    //   pinzip,
    // };
  
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
  
  // function delete_emp(id) {
  //   document.getElementById("deleteModal").style.visibility = "visible";
  //   var del = document.getElementById("delete_emp_id");
  //   del.addEventListener("click", () => {
  //     fetch(`http://localhost:8080/api/employees/${id}`, {
  //       method: "DELETE",
  //     }).then((response) => {
  //       if (response.ok) {
  //         document.getElementById("deleteModal").style.visibility = "hidden";
  //         location.reload();
  //       }
  //     });
  //   });
  // }
  
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
    console.log(id);
    fetch(`http://localhost:8080/api/employees?id=${id}`, {
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
        document.getElementById("editImg").src = `/${employ.avatar}`;
  
        document.getElementById("edit-salutation").value = employ.salutation;
        document.getElementById("edit-firstName").value = employ.firstname;
        document.getElementById("edit-lastName").value = employ.lastname;
        document.getElementById("edit-email").value = employ.emailAddress;
        document.getElementById("edit-mobilenumber").value = employ.mobilenumber;
        document.getElementById("edit-dob").value = formatchange(employ.DOB);
  
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
        document.getElementById("edit-pin").value = employ.pinzip;
        document.getElementById("edit-qualifications").value =
          employ.qualifications;
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
        firstname: document.getElementById("edit-firstName").value,
        lastname: document.getElementById("edit-lastName").value,
        emailAddress: document.getElementById("edit-email").value,
        mobilenumber: document.getElementById("edit-mobilenumber").value,
        address: document.getElementById("edit-address").value,
        DOB: editdateupdate,
        country: document.getElementById("edit-country").value,
        state: document.getElementById("edit_state").value,
        city: document.getElementById("edit-city").value,
        gender: document.querySelector('input[name="genders"]:checked').value,
        password: document.getElementById("edit-password").value,
        username: document.getElementById("edit-username").value,
        qualifications: document.getElementById("edit-qualifications").value,
        pinzip: document.getElementById("edit-pin").value,
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
        .then((employ) => {
          read_emp();
        });
    });
  }
  
  //   // pagination
  let CurrentPage = 1; 
  
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
    }
    else {
      errormessageImg.textContent = "";
    }
  
    // salutation validation
    if (salutation.value.trim() === "select") {
      errormessageSalutation.textContent = "Invalid select";
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
  