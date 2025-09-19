class AuthConfig {
  static api = {
    baseURL: "http://localhost:3000",
    endpoints: {
      validateToken: "/tokens",
    },
  };

  static storage = {
    keys: {
      accessToken: "accessToken",
      tokenID: "tokenID",
      userName: "userName",
      userEmail: "userEmail",
      refreshToken: "refreshToken",
    },
  };

  static ui = {
    containerSelector: document.getElementById("user-auth"),
    redirectUrl: "/",
  };
}

class AuthService {
  constructor() {
    this._isLoggedIn = false;
    this.accessToken = null;
    this.tokenID = null;
    this.userName = null;
    this.userEmail = null;
  }

  getStorage() {
    this.accessToken = localStorage.getItem("accessToken");
    this.tokenID = localStorage.getItem("tokenID");
    this.userName = localStorage.getItem("userName");
    this.userEmail = localStorage.getItem("userEmail");
  }

  async userAuthorization(token) {
    try {
      const tokenRes = await fetch(`http://localhost:3000/tokens/${token.id}`);
      const userRes = await fetch(
        `http://localhost:3000/users?isActive=true&email=${this.userEmail}`
      );
      const storedToken = await tokenRes.json();
      const userData = await userRes.json();
      console.log("userdata", userData);

      if (
        tokenRes.status === 200 &&
        storedToken.accessToken == token.accessToken
      ) {
        console.log("data", storedToken);
        console.log("token id is valid", storedToken.id);
        this.isLoggedIn = true;

        return {
          validToken: true,
          userRole: userData[0]?.role || null,
        };
      }
      console.log("token id is not valid");
      this.isLoggedIn = false;
      localStorage.clear();
      return {
        validToken: false,
        userRole: null,
      };
    } catch (err) {
      console.error("Server unreachable:", err);
      this.isLoggedIn = false;
      localStorage.clear();
      return {
        validToken: false,
        userRole: null,
      };
    }
  }

  logout() {
    console.log("logged out");
    localStorage.clear();
    window.location.href = AuthConfig.ui.redirectUrl;
  }

  token() {
    return { id: this.tokenID, accessToken: this.accessToken };
  }

  set isLoggedIn(val) {
    this._isLoggedIn = val;
  }

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  renderUserStatus() {
    return `<ul class="flex space-between align-center">
            <li><svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.83333 1.66663L1.5 11.6666H9L8.16667 18.3333L16.5 8.33329H9L9.83333 1.66663Z"
                        stroke="#344054" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round" />
                </svg></li>
            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1203_662)">
                        <path
                            d="M10.0002 12.5C11.3809 12.5 12.5002 11.3808 12.5002 10C12.5002 8.61933 11.3809 7.50004 10.0002 7.50004C8.61945 7.50004 7.50016 8.61933 7.50016 10C7.50016 11.3808 8.61945 12.5 10.0002 12.5Z"
                            stroke="#667085" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M16.1668 12.5C16.0559 12.7514 16.0228 13.0302 16.0718 13.3005C16.1208 13.5709 16.2497 13.8203 16.4418 14.0167L16.4918 14.0667C16.6468 14.2215 16.7697 14.4053 16.8536 14.6076C16.9375 14.81 16.9806 15.0268 16.9806 15.2459C16.9806 15.4649 16.9375 15.6818 16.8536 15.8841C16.7697 16.0864 16.6468 16.2702 16.4918 16.425C16.337 16.58 16.1532 16.7029 15.9509 16.7868C15.7486 16.8707 15.5317 16.9139 15.3127 16.9139C15.0936 16.9139 14.8768 16.8707 14.6744 16.7868C14.4721 16.7029 14.2883 16.58 14.1335 16.425L14.0835 16.375C13.8871 16.1829 13.6376 16.0541 13.3673 16.005C13.097 15.956 12.8182 15.9891 12.5668 16.1C12.3204 16.2057 12.1101 16.3811 11.9621 16.6047C11.814 16.8282 11.7346 17.0902 11.7335 17.3584V17.5C11.7335 17.9421 11.5579 18.366 11.2453 18.6785C10.9328 18.9911 10.5089 19.1667 10.0668 19.1667C9.6248 19.1667 9.20088 18.9911 8.88832 18.6785C8.57576 18.366 8.40016 17.9421 8.40016 17.5V17.425C8.39371 17.1492 8.30443 16.8817 8.14392 16.6573C7.98341 16.4329 7.75911 16.2619 7.50016 16.1667C7.24882 16.0558 6.97 16.0227 6.69967 16.0717C6.42934 16.1207 6.17989 16.2496 5.9835 16.4417L5.9335 16.4917C5.77871 16.6467 5.59489 16.7696 5.39256 16.8535C5.19023 16.9373 4.97335 16.9805 4.75433 16.9805C4.5353 16.9805 4.31843 16.9373 4.1161 16.8535C3.91377 16.7696 3.72995 16.6467 3.57516 16.4917C3.4202 16.3369 3.29727 16.1531 3.2134 15.9508C3.12952 15.7484 3.08635 15.5316 3.08635 15.3125C3.08635 15.0935 3.12952 14.8766 3.2134 14.6743C3.29727 14.472 3.4202 14.2882 3.57516 14.1334L3.62516 14.0834C3.81728 13.887 3.94615 13.6375 3.99517 13.3672C4.04418 13.0969 4.01109 12.8181 3.90016 12.5667C3.79453 12.3202 3.61913 12.11 3.39555 11.962C3.17198 11.8139 2.90998 11.7344 2.64183 11.7334H2.50016C2.05814 11.7334 1.63421 11.5578 1.32165 11.2452C1.00909 10.9327 0.833496 10.5087 0.833496 10.0667C0.833496 9.62468 1.00909 9.20076 1.32165 8.8882C1.63421 8.57563 2.05814 8.40004 2.50016 8.40004H2.57516C2.85099 8.39359 3.1185 8.30431 3.34291 8.1438C3.56732 7.98329 3.73826 7.75899 3.8335 7.50004C3.94443 7.24869 3.97752 6.96988 3.9285 6.69955C3.87948 6.42922 3.75061 6.17977 3.5585 5.98337L3.5085 5.93337C3.35354 5.77858 3.2306 5.59477 3.14673 5.39244C3.06286 5.19011 3.01968 4.97323 3.01968 4.75421C3.01968 4.53518 3.06286 4.3183 3.14673 4.11597C3.2306 3.91364 3.35354 3.72983 3.5085 3.57504C3.66328 3.42008 3.8471 3.29715 4.04943 3.21327C4.25176 3.1294 4.46864 3.08623 4.68766 3.08623C4.90669 3.08623 5.12357 3.1294 5.3259 3.21327C5.52823 3.29715 5.71204 3.42008 5.86683 3.57504L5.91683 3.62504C6.11323 3.81715 6.36268 3.94603 6.633 3.99504C6.90333 4.04406 7.18215 4.01097 7.4335 3.90004H7.50016C7.74664 3.7944 7.95684 3.619 8.10491 3.39543C8.25297 3.17185 8.33243 2.90986 8.3335 2.64171V2.50004C8.3335 2.05801 8.50909 1.63409 8.82165 1.32153C9.13421 1.00897 9.55813 0.833374 10.0002 0.833374C10.4422 0.833374 10.8661 1.00897 11.1787 1.32153C11.4912 1.63409 11.6668 2.05801 11.6668 2.50004V2.57504C11.6679 2.8432 11.7474 3.10519 11.8954 3.32876C12.0435 3.55234 12.2537 3.72774 12.5002 3.83337C12.7515 3.9443 13.0303 3.97739 13.3007 3.92838C13.571 3.87936 13.8204 3.75049 14.0168 3.55837L14.0668 3.50837C14.2216 3.35341 14.4054 3.23048 14.6078 3.14661C14.8101 3.06273 15.027 3.01956 15.246 3.01956C15.465 3.01956 15.6819 3.06273 15.8842 3.14661C16.0866 3.23048 16.2704 3.35341 16.4252 3.50837C16.5801 3.66316 16.7031 3.84698 16.7869 4.04931C16.8708 4.25164 16.914 4.46851 16.914 4.68754C16.914 4.90657 16.8708 5.12344 16.7869 5.32577C16.7031 5.5281 16.5801 5.71192 16.4252 5.86671L16.3752 5.91671C16.183 6.11311 16.0542 6.36255 16.0052 6.63288C15.9561 6.90321 15.9892 7.18203 16.1002 7.43337V7.50004C16.2058 7.74651 16.3812 7.95672 16.6048 8.10478C16.8283 8.25285 17.0903 8.3323 17.3585 8.33337H17.5002C17.9422 8.33337 18.3661 8.50897 18.6787 8.82153C18.9912 9.13409 19.1668 9.55801 19.1668 10C19.1668 10.4421 18.9912 10.866 18.6787 11.1786C18.3661 11.4911 17.9422 11.6667 17.5002 11.6667H17.4252C17.157 11.6678 16.895 11.7472 16.6714 11.8953C16.4479 12.0434 16.2725 12.2536 16.1668 12.5Z"
                            stroke="#667085" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                    <defs>
                        <clipPath id="clip0_1203_662">
                            <rect width="20" height="20" fill="white" />
                        </clipPath>
                    </defs>
                </svg></li>
            <li><svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10.4417 17.5C10.2952 17.7525 10.0849 17.9622 9.83185 18.1079C9.57884 18.2536 9.29198 18.3303 9 18.3303C8.70802 18.3303 8.42116 18.2536 8.16814 18.1079C7.91513 17.9622 7.70484 17.7525 7.55833 17.5M14 6.66663C14 5.34054 13.4732 4.06877 12.5355 3.13109C11.5979 2.19341 10.3261 1.66663 9 1.66663C7.67392 1.66663 6.40215 2.19341 5.46447 3.13109C4.52678 4.06877 4 5.34054 4 6.66663C4 12.5 1.5 14.1666 1.5 14.1666H16.5C16.5 14.1666 14 12.5 14 6.66663Z"
                        stroke="#667085" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                </svg></li>
            <li class="avatar">
                <div style="display: flex;justify-content: center;align-items: center;gap: 5px;">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                            fill="#364c6f">
                            <path
                                d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
                        </svg>
                    </span>
                </div>
                <div class="user-actions hidden">
                    <ul>
                        <li><button class="logout-btn">Sign Out</button></li>
                        <li>account</li>
                    </ul>
                </div>
            </li>
        </ul>`;
  }

  async renderHeder() {
    await this.userAuthorization(this.token());
    if (this.isLoggedIn) {
      AuthConfig.ui.containerSelector.innerHTML = this.renderUserStatus();
    }
    document.querySelector(".logout-btn")?.addEventListener("click", () => {
      this.logout();
    });
  }
}

export default AuthService;
// const authService = new AuthService();

// (async function () {
//   authService.getStorage();
//   await authService.renderHeder();
//   console.log("isLogged", authService.isLoggedIn);
//   console.log(
//     "user authorization",
//     await authService.userAuthorization(authService.token())
//   );
// })();
