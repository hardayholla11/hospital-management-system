// Create Patient Check-in Using POST
$(document).ready(function() {
    $("#submit-form").submit(e => {
        e.preventDefault(e);
        let name = $("#patientName")
            .val()
            .trim();
        let email = $("#email")
            .val()
            .trim();
        let telephone = $("#patientPhone")
            .val()
            .trim();
        let age = $("#patientAge")
            .val()
            .trim();
        let diagnosis = $("#patientDiagnosis")
            .val()
            .trim();
        let address = $("#patientAddress")
            .val()
            .trim();
        let nationality = $("#patientNationality")
            .val()
            .trim();
        let gender = $("#patientGender")
            .val()
            .trim();
        let marital = $("#marital")
            .val()
            .trim();
        let status = $("#patientStatus")
            .val()
            .trim();
        let checkin = $("#checkin")
            .val()
            .trim();
        let checkout = $("#checkout")
            .val()
            .trim();
        if (
            name !== "" &&
            email !== "" &&
            telephone !== "" &&
            age !== "" &&
            diagnosis !== "" &&
            address !== "" &&
            nationality !== "" &&
            gender !== "" &&
            marital !== "" &&
            checkin !== "" &&
            status !== ""

        ) {
            $.ajax({
                url: "http://localhost:3000/patient",
                method: "post",
                data: {
                    name,
                    email,
                    telephone,
                    age,
                    diagnosis,
                    address,
                    nationality,
                    gender,
                    marital,
                    checkin,
                    checkout,
                    status
                }
            }).done(resp => {
                location.reload();
                console.log(resp);
            });
        }
    });
});

//READ ALL PATIENTS
$.ajax({
    url: "http://localhost:3000/patient",
    method: "get"
}).done(resp => {

    resp.forEach((elem, i) => {
        $("#data-display").append(
            `<tr>
			<td>${i + 1}</td>
			<td>${elem.name}</td>
          <td>${elem.telephone}</td>
          <td>${elem.age}</td>
          <td>${elem.diagnosis}</td>
          <td>${elem.nationality}</td>
			<td><input type="button" class="btn btn-primary btn-general" onclick="onePatient(${
			  elem.id
			})" value="Edit">&nbsp; <input type="button" class="btn btn-danger btn-general" onclick="deletePatient(${
		  elem.id
		})" value="delete">`
        );
    });
});

//Patient Search
$("#search-form").on("#search-patient", function(e) {
    e.preventDefault(e);
    let pNum = $("#search-number").val();
    let pEmail = $("#search-email").val();
    let patientExist = false;
    $.ajax({
        url: "http://localhost:3000/patient",
        method: "get"
    }).done(resp => {

        let name = "";
        let age = "";
        let diagnosis = "";
        let nationality = "";
        let id = "";
        for (var i = 0; i < resp.length; i++) {
            if (resp[i].telephone === pNum && resp[i].email === pEmail) {
                patientExist = true;
                name = resp[i].name;
                age = resp[i].age;
                diagnosis = resp[i].diagnosis;
                nationality = resp[i].nationality;
                id = resp[i].id;
                // console.log(patientExist);
            }
        }
        if (patientExist) {
            $("#data-display").html(`<tr>
			<td>${1}</td>
			<td>${name}</td>
			<td>${pEmail}</td>
			<td>${pNum}</td>
			<td>${age}</td>
			<td>${diagnosis}</td>
			<td>${nationality}</td>
			<td><input type="button" class="btn btn-primary btn-general" onclick="onePatient(${id})" value="Edit">&nbsp; <input type="button" class="btn btn-danger btn-general" onclick="deletePatient(${id})" value="delete"> </td>
		</tr>
			`);

        } else {
            alert("User Does Not Exist");
        }
    });
});
// }

// Read Single Patient
function onePatient(i) {
    $.ajax({
        url: "http://localhost:3000/patient/" + i,
        method: "get"
    }).done(resp => {
        console.log(resp);

        $("#replace").html(
            `
		<div class="container" style="width:50%">
		<h4 class="text-center" style="font-size:24px">Update Patient Info</h4><br>
		<div class="row">
		<div class="col-md-6">
		<input type="text" id="patient-name1" value="${resp.name}" class="form-control" placeholder="Patient Name"><br>
		</div>
		<div class="col-md-6">
		<input type="email" id="patient-email1" value="${resp.email}" class="form-control" placeholder="Patient Email"><br>
		</div>
		<div class="col-md-6">
		<input type="tel" id="patient-mobile1" value="${resp.telephone}" class="form-control" placeholder="PhoneNumber"><br>
		</div>
		<div class="col-md-6">
		<input type="number" id="patient-age1" value="${resp.age}" class="form-control" placeholder="Patient Age"><br>
		</div>
		<div class="col-md-6">
		<input type="text" id="patient-diagnosis1" value="${resp.diagnosis}" class="form-control" placeholder="Patient Sickness"><br>
		</div>
		<div class="col-md-6">
		<input type="text" id="patient-status1" value="${resp.status}" class="form-control" placeholder="Patient Status"><br>
		</div>
		<div class="col-md-6">
		<input type="text" id="patient-nationality1" value="${resp.nationality}" class="form-control" placeholder="Patient Nationality"><br>
        </div>
        <div class="col-md-6">
		<input type="text" id="patient-nationality1" value="${resp.checkout}" class="form-control" placeholder="Check out date"><br>
		</div>
		</div>
		<input type="button" value="update" class="btn btn-dark my-2 my-sm-0 mr-1" onclick="upDateInfo(${resp.id})">
		</div>
		`
        );
    });
}
//VIEW A PATIENT
// function viewPatient(i) {
//     localStorage.setItem('patientId', i)
//     window.location = 'viewpatient.html'
// }
// // Checkout Date
// function checkOut(i) {
//     let date = $("#date").val().trim();
//     if (date != "") {
//         $.ajax({
//             url: "http://localhost:3000/patient/" + i,
//             method: "put",
//             data: {
//                 date
//             }
//         }).done(resp => {
//             window.location = "createpatient.html";
//         })
//     }
// }
// Update Patient Info
function upDateInfo(i) {
    let name = $("#patient-name1")
        .val()
        .trim();
    let email = $("#patient-email1")
        .val()
        .trim();
    let telephone = $("#patient-mobile1")
        .val()
        .trim();
    let age = $("#patient-age1")
        .val()
        .trim();
    let diagnosis = $("#patient-diagnosis1")
        .val()
        .trim();
    let status = $("#patient-status1")
        .val()
        .trim();
    let nationality = $("#patient-nationality1")
        .val()
        .trim();
    if (
        name !== "" &&
        email !== "" &&
        telephone !== "" &&
        age !== "" &&
        diagnosis !== "" &&
        status !== "" &&
        nationality !== ""

    ) {
        $.ajax({
            url: "http://localhost:3000/patient/" + i,
            method: "put",
            data: {
                name,
                email,
                telephone,
                age,
                diagnosis,
                status,
                nationality
            }
        }).done(resp => {
            location.reload();
            console.log(resp);
        });
    }
}

// Delete Patient
function deletePatient(i) {
    $.ajax({
        url: "http://localhost:3000/patient/" + i,
        method: "delete"
    }).done(resp => {
        console.log("Deleted");
    });
}

// Admin Login Authenticator

$("#login").on("submit", function(e) {
    e.preventDefault(e);
    let username = $("#login-user")
        .val()
        .trim();
    let pword = $("#login-pw")
        .val()
        .trim();
    let userExist = false;
    $.ajax({
        url: "http://localhost:3000/admin",
        method: "get"
    }).done(resp => {
        for (var i = 0; i < resp.length; i++) {
            if (resp[i].username === username && resp[i].password === pword) {
                userExist = true;
                localStorage.setItem("admin", resp[i].id);
            }
        }
        if (userExist) {
            window.location.href = "createpatient.html";
        } else {
            alert("User Does Not Exist");
        }
    });
});