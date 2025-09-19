console.log("start login.js");

const email = document.querySelector("input[type='email']");
const password = document.querySelector("input[type='password']");

document.querySelector("button").addEventListener("click", function (event) {
  event.preventDefault();
  if (email.value && password.value) {
    login({ email: email.value, password: password.value });
  }
});

const login = async function (credentials) {
  try {
    // Login request
    const CheckUserStatus = await fetch(
      `http://localhost:3000/users?isActive=true&email=${credentials.email}`
    );
    const isActive = await CheckUserStatus.json();
    if (isActive.length === 0) {
      alert("Sorry User is Not Active Or wrong data");
      return;
    }

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    console.log("user", data);

    const createToken = await fetch("http://localhost:3000/tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: data.user.id,
        accessToken: data.accessToken,
      }),
    });
    const tokenData = await createToken.json();
    console.log(createToken);

    console.log("token data", tokenData);

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("tokenID", tokenData.id);
    localStorage.setItem("userName", data.user.name);
    localStorage.setItem("userEmail", data.user.email);
    localStorage.setItem("role", data.user.role);
    console.log("Login Response:", data);
    window.location.href = "/dashboard";
  } catch (error) {
    console.error("Error:", error);
  }
};
