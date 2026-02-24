// ---- DEFAULT PROFESSIONAL PHOTOS (BASE64) ----
const AVATAR_DEV = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiM0YzUxYmYiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSI3NSIgcj0iMzUiIGZpbGw9IiNmZmYiLz48cmVjdCB4PSI0MCIgeT0iMTIwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiByeD0iMzAiIGZpbGw9IiNmZmYiLz48dGV4dCB4PSIxMDAiIHk9IjE4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZiIgZm9udC1zaXplPSIxNCI+V2ViIERldjwvdGV4dD48L3N2Zz4=";

const AVATAR_DESIGNER = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmNTk3MzYiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSI3NSIgcj0iMzUiIGZpbGw9IiNmZmYiLz48cmVjdCB4PSI0MCIgeT0iMTIwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiByeD0iMzAiIGZpbGw9IiNmZmYiLz48dGV4dCB4PSIxMDAiIHk9IjE4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZiIgZm9udC1zaXplPSIxNCI+RGVzaWduZXI8L3RleHQ+PC9zdmc+";

const AVATAR_WRITER = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiMyZDk4NmUiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSI3NSIgcj0iMzUiIGZpbGw9IiNmZmYiLz48cmVjdCB4PSI0MCIgeT0iMTIwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiByeD0iMzAiIGZpbGw9IiNmZmYiLz48dGV4dCB4PSIxMDAiIHk9IjE4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZiIgZm9udC1zaXplPSIxNCI+V3JpdGVyPC90ZXh0Pjwvc3ZnPg==";
// Utilities
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}
function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}
// -------- DEMO USERS (AUTO CREATE) --------
if (!localStorage.getItem("users")) {
    saveUsers([
        {
            name:"Saad Hassan",
            email:"saad@gmail.com",
            password:"1234",
            job:"Web Developer",
            phone:"0300-0000000",
            study:"BSCS",
            institute:"UOG",
            about:"Frontend developer with strong JS skills",
            skills:["HTML","CSS","JavaScript"],
            photo:AVATAR_DEV
        },
        {
            name:"Ali Raza",
            email:"ali@gmail.com",
            password:"1234",
            job:"UI Designer",
            phone:"0301-1111111",
            study:"Design",
            institute:"PU",
            about:"Creative designer",
            skills:["Figma","Photoshop"],
            photo:AVATAR_DESIGNER
        },
        {
            name:"Ayesha Noor",
            email:"ayesha@gmail.com",
            password:"1234",
            job:"Content Writer",
            phone:"0302-2222222",
            study:"English",
            institute:"LCWU",
            about:"SEO content specialist",
            skills:["SEO","Writing"],
            photo:AVATAR_WRITER
        }
    ]);
}

// -------- REGISTER --------
document.getElementById("registerForm")?.addEventListener("submit", function(e){
    e.preventDefault();

    const reader = new FileReader();
    const file = photo.files[0];

    reader.onload = function () {
        let users = getUsers();

        users.push({
            name: name.value,
            email: email.value,
            password: password.value,
            phone: phone.value,
            study: study.value,
            institute: institute.value,
            about: about.value,
            skills: skills.value.split(','),
            job: job.value,
            photo: reader.result
        });

        saveUsers(users);
        alert("CV Created Successfully!");
        window.location.href = "login.html";
    };

    if (file) reader.readAsDataURL(file);
});

// -------- LOGIN --------
document.getElementById("loginForm")?.addEventListener("submit", function(e){
    e.preventDefault();

    let users = getUsers();
    let user = users.find(u =>
        u.email === loginEmail.value &&
        u.password === loginPassword.value
    );

    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        window.location.href = "dashboard.html";
    } else {
        loginError.style.display = "block";
    }
});

// -------- DASHBOARD --------
if (window.location.pathname.includes("dashboard.html")) {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) window.location.href = "login.html";

    // ✅ THIS IS THE CORRECT LINE
    cvPhoto.src = user.photo || AVATAR_DEV;

    cvName.innerText = user.name;
    cvJob.innerText = user.job;
    cvEmail.innerText = user.email;
    cvPhone.innerText = user.phone;
    cvAbout.innerText = user.about;
    cvStudy.innerText = user.study;
    cvInstitute.innerText = user.institute;

    cvSkills.innerHTML = ""; // clear previous
    user.skills.forEach(s => {
        let li = document.createElement("li");
        li.innerText = s.trim();
        cvSkills.appendChild(li);
    });
}

// -------- LOGOUT --------
function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}