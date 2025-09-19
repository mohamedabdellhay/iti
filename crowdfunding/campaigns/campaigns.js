import AuthService from "../AuthUser.js";
const authService = new AuthService();

(async function () {
  authService.getStorage();
  await authService.renderHeder();
  console.log("isLogged", authService.isLoggedIn);
  console.log("user authorization");

  userStatus = await authService.userAuthorization(authService.token());
  console.log("user", userStatus);
})();

console.log("start campaigns");

// ===== API Configuration =====
const API_CONFIG = {
  baseURL: "http://localhost:3000/",
  endpoints: {
    campaigns: "campaigns",
  },
  query: {
    isApproved: true,
  },
  headers: {
    "Content-Type": "application/json",
    // 'Authorization': 'Bearer your-token-here'
  },
};

const DOM_SELECTION = {
  tableBody: document.querySelector("#campaignsTable>tbody"),
};
const APP_STATE = {
  campaigns: [],
  length: 0,
};

class Campaign {
  constructor(campaignData) {
    this.id = campaignData.id;
    this.title = campaignData.title;
    this.creatorId = campaignData.creatorId;
    this.goal = campaignData.goal;
    this.deadline = campaignData.deadline;
    this.isApproved = campaignData.isApproved;
    this.rewards = campaignData.rewards || [];
  }

  generateRewardsHtml() {
    if (this.rewards.length > 0) {
      return this.rewards.map(
        (reward) =>
          `<span class="tag">${reward.title}: $${reward.amount}</span>`
      );
    }
    return null;
  }

  generateTableRow() {
    const rewardsHtml = this.generateRewardsHtml();

    return `
     <tr>
        <td>${this.id}</td>
            <td>
                <div class="inline-edit">
                    <input class="input" value="${
                      this.title || ""
                    }" data-camp="title" data-id="${this.id}"/>
                </div>
            </td>
            <td>${this.creatorId ? this.creatorId : "—"}</td>
            <td>
                <div class="inline-edit">
                    <input type="number" class="input" value="${
                      this.goal || 0
                    }" data-camp="goal" data-id="${this.id}"/>
                </div>
            </td>
            <td>
                <div class="inline-edit">
                    <input type="date" class="input" value="${
                      this.deadline || ""
                    }" data-camp="deadline" data-id="${this.id}"/>
                </div>
            </td>
            <td>
                <label style="display:inline-flex;align-items:center;gap:8px">
                    <input type="checkbox" class="switch" ${
                      this.isApproved ? "checked" : ""
                    } data-action="toggle-approved" data-id="${this.id}">
                </label>
            </td>
            <td>${rewardsHtml || '<span class="tag">No rewards</span>'}</td>
            <td class="actions">
                <button class="icon-btn" data-action="add-reward" data-id="${
                  this.id
                }">Add Reward</button>
                <button class="icon-btn" data-action="delete-campaign" data-id="${
                  this.id
                }">Delete</button>
            </td>
    </tr>
    `;
  }
}

class CampaignManager {
  constructor() {
    this.campaigns = [];
    this.length = 0;
  }

  async fetchAllCampaigns() {
    const api = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.campaigns}?isApproved=${API_CONFIG.query.isApproved}`;
    console.log("api", api);

    const data = await fetch(api);
    const campaignsData = await data.json();

    this.campaigns = campaignsData.map(
      (campaignData) => new Campaign(campaignData) // create a object of type campaign
    );
    this.length = this.campaigns.length;

    APP_STATE.campaigns = this.campaigns;
    APP_STATE.length = this.length;
    console.log("APP_STATE", APP_STATE);

    this.renderTable();
  }

  renderTable() {
    const campaignsHtml = this.campaigns.map((campaign) =>
      campaign.generateTableRow()
    );
    console.log("campaigns", campaignsHtml);
    DOM_SELECTION.tableBody.innerHTML = campaignsHtml;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const campaignManager = new CampaignManager();
  campaignManager.fetchAllCampaigns();
  console.log("state", APP_STATE);
});
