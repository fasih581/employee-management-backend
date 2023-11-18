
// Get the query parameters from the URL
let params = new URLSearchParams(document.location.search);
let id = params.get("id");

console.log("id =", id);
// -------------------------------------VIEW EMPLOYEE-------------------------------
function viewDetails(id) {
  fetch(`http://localhost:8080/api/employees/?id=${id}`,{
  method : "GET",
})
    .then((res) => {
      return res.json();
      console.log("id =", id);
    })
      .then((data) => {
        console.log(data);
      // document.getElementById("viewEmployeeProfilePic").innerHTML = ` <img src="http://localhost:3000/employees/${id}/avatar" >`;
      const fullName =
        data.salutation + " " + data.firstname + " " + data.lastname;
      document.getElementById("employeeName").innerHTML = fullName;
      document.getElementById("employeeEmail").innerHTML = data.emailAddress;
      document.getElementById("employeeGender").innerHTML = data.gender;
      document.getElementById("employeeDob").innerHTML = data.DOB;
      const DOB = changeformatYMD(data.DOB);
      const age = calculateAge(DOB);
      document.getElementById("employeeAge").innerHTML = age;
      document.getElementById("employeePhone").innerHTML = data.mobilenumber;
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
