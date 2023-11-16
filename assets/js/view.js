var apiurl = "http://localhost:3000/employees";

// Get the query parameters from the URL
const url = new URL(window.location.href);
const id = url.searchParams.get("id");

console.log("id =", id);
// -------------------------------------VIEW EMPLOYEE-------------------------------
function viewDetails(id) {
  fetch(`${apiurl}/${id}`)
    .then((res) => {
      return res.json();
    })
      .then((data) => {
      document.getElementById("viewEmployeeProfilePic").innerHTML = ` <img src="http://localhost:3000/employees/${id}/avatar" >`;
      const fullName =
        data.salutation + " " + data.firstName + " " + data.lastName;
      document.getElementById("employeeName").innerHTML = fullName;
      document.getElementById("employeeEmail").innerHTML = data.email;
      document.getElementById("employeeGender").innerHTML = data.gender;
      document.getElementById("employeeDob").innerHTML = data.dob;
      const DOB = changeformatYMD(data.dob);
      const age = calculateAge(DOB);
      document.getElementById("employeeAge").innerHTML = age;
      document.getElementById("employeePhone").innerHTML = data.phone;
      document.getElementById("employeeQua").innerHTML = data.qualifications;
      document.getElementById("employeeAddress").innerHTML = data.address;
      document.getElementById("employeeUsername").innerHTML = data.username;
    });
}
viewDetails(id);

function calculateAge(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  const currentDate = new Date();
  const timeDiff = currentDate - dob;
  const age = Math.floor(timeDiff / (365.25 * 24 * 60 * 60 * 1000));
  return age;
}
function changeformatYMD(DOB) {
  const [date, month, year] = DOB.split("-");
  let formatteddate = year + "-" + month + "-" + date;
  return formatteddate;
}
// -----------------------------End-VIEW EMPLOYEE-------------------------------------------------
