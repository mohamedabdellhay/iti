console.log("start sign up page");
const inputFields = document.forms[0].querySelectorAll("input");
const password = document.querySelector(".password");
const confirmPassword = document.querySelector(".confirm-password");
const signUp = document.getElementById("signup");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]).{6,}$/;
let isValidName = false;
let isValidEmail = false;
let isValidPassword = false;
let confirmedPassword = false;

console.log(inputFields);
const userData = {
  name: null,
  email: null,
  password: null,
  valid: false,
};

inputFields.forEach((ele) =>
  ele.addEventListener("input", function (event) {
    if (event.target.getAttribute("type") === "email") {
      isValidEmail = emailRegex.test(event.target.value);
      isValidEmail ? (userData.email = event.target.value) : null;
    } else if (event.target.getAttribute("type") === "text") {
      const val = event.target.value.trim();
      if (val == 0) {
        userData.name = null;
        isValidName = false;
        return;
      }
      userData.name = val;
      isValidName = true;
    }
    isValidPassword = passwordRegex.test(password.value);
    confirmedPassword = password.value === confirmPassword.value;
    if (isValidPassword && confirmedPassword) {
      console.log("pas", password.value);

      userData.password = password.value;
    }

    if (isValidName && isValidEmail && isValidPassword && confirmedPassword) {
      userData.valid = true;
      console.log("user data is valid", userData);
    }
  })
);

signUp.addEventListener("click", async function (event) {
  event.preventDefault();
  if (!userData.valid) {
    console.log("data is not valid");
    return;
  }
  registerUser(userData);
});

async function registerUser(data) {
  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("User created:", result);

    // Save the access token
    // localStorage.setItem("accessToken", result.accessToken);

    window.location.href = "/login";
  } catch (error) {
    console.error("Error:", error);
  }
}
