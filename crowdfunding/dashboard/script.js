import AuthService from "../AuthUser.js";
const authService = new AuthService();

// ===== API Configuration =====
const API_CONFIG = {
  baseURL: "http://localhost:3000",
  endpoints: {
    users: "users",
    campaigns: "campaigns",
    pledges: "pledges",
  },
  headers: {
    "Content-Type": "application/json",
    // Add authorization header if needed
    // 'Authorization': 'Bearer your-token-here'
  },
};
const DOM_SELECTION = {
  dashboard: document.querySelector("#dashboard"),
};

// ===== HTTP Client Module =====
const HttpClient = {
  async request(method, url, data = null) {
    const config = {
      method,
      headers: API_CONFIG.headers,
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${API_CONFIG.baseURL}/${url}`, config);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      }

      return response;
    } catch (error) {
      console.error(`API Request failed: ${method} ${url}`, error);
      throw error;
    }
  },

  get(url) {
    return this.request("GET", url);
  },

  post(url, data) {
    return this.request("POST", url, data);
  },

  put(url, data) {
    return this.request("PUT", url, data);
  },

  patch(url, data) {
    return this.request("PATCH", url, data);
  },

  delete(url) {
    return this.request("DELETE", url);
  },
};

let userStatus = null;

// iife function to run dashboard as async operation
(async function () {
  authService.getStorage();
  await authService.renderHeder();
  console.log("isLogged", authService.isLoggedIn);
  console.log("user authorization");

  userStatus = await authService.userAuthorization(authService.token());
  console.log("user", userStatus);

  const unAuthorizedUser = `
        <div class='container' style='height:100%'>

        <div style='display: grid;height: 100%;width: 100%;place-items: center;'>
        <h2>Not Authorized</h2>
          <p>You do not have permission to access this page .</p>
        </div>
        </div>
`;

  if (userStatus.userRole != "admin") {
    DOM_SELECTION.dashboard.innerHTML = "";
    DOM_SELECTION.dashboard.insertAdjacentHTML("afterbegin", unAuthorizedUser);
    return;
  } else {
    DOM_SELECTION.dashboard.innerHTML = ` <div class="container">
            <nav class="header">
                <div style="display:flex; align-items:center; gap:8px">
                    <h1 style="margin:0;font-size:22px;font-weight:800">Admin Dashboard</h1>

                </div>
                <div style="display:flex; gap:8px">
                    <button class="btn" id="refreshBtn">Refresh</button>
                </div>
            </nav>

            <nav class="tabs" id="tabs">
                <button class="tab active" data-tab="Overview">Overview</button>
                <button class="tab" data-tab="Users">Users</button>
                <button class="tab" data-tab="Campaigns">Campaigns</button>
                <button class="tab" data-tab="Pledges">Pledges</button>
            </nav>

            <section id="Overview" class="tab-panel">
                <div class="grid">
                    <div class="stat">
                        <div class="label">Total Users</div>
                        <div class="value" id="statUsers">0</div>
                        <div class="footer-note">Active vs inactive breakdown</div>
                    </div>
                    <div class="stat">
                        <div class="label">Campaigns</div>
                        <div class="value" id="statCampaigns">0</div>
                        <div class="footer-note">Approved & pending</div>
                    </div>
                    <div class="stat">
                        <div class="label">Pledges</div>
                        <div class="value" id="statPledges">0</div>
                        <div class="footer-note">Total records</div>
                    </div>
                </div>
                <p class="footer-note">Tip: press <span class="kbd">/</span> to focus search in tables.</p>
            </section>

            <section id="Users" class="tab-panel" hidden>
                <div class="card">
                    <div class="toolbar">
                        <input id="userSearch" class="input" placeholder="Search users (name or email)" />
                        <select id="userFilter" class="select">
                            <option value="all">All statuses</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <table class="table" id="usersTable">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </section>

            <section id="Campaigns" class="tab-panel" hidden>
                <div class="card">
                    <div class="toolbar">
                        <input id="campSearch" class="input" placeholder="Search campaigns (title)" />
                        <select id="campFilter" class="select">
                            <option value="all">All approvals</option>
                            <option value="approved">Approved</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                    <table class="table" id="campaignsTable">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Creator</th>
                                <th>Goal</th>
                                <th>Deadline</th>
                                <th>Approved</th>
                                <th>Rewards</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </section>

            <section id="Pledges" class="tab-panel" hidden>
                <div class="card">
                    <div class="toolbar">
                        <input id="pledgeSearch" class="input" placeholder="Search by campaign or user id" />
                    </div>
                    <table class="table" id="pledgesTable">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Campaign</th>
                                <th>User</th>
                                <th>Amount</th>
                                <th>Reward</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </section>


        </div>`;
  }

  // ===== Database API Module =====
  const DatabaseOperations = {
    // User operations object
    users: {
      async getAll() {
        const url = API_CONFIG.endpoints.users;
        return await HttpClient.get(url);
      },

      async findById(id) {
        return await HttpClient.get(`${API_CONFIG.endpoints.users}/${id}`);
      },

      async create(userData) {
        return await HttpClient.post(API_CONFIG.endpoints.users, userData);
      },

      async update(id, updates) {
        return await HttpClient.patch(
          `${API_CONFIG.endpoints.users}/${id}`,
          updates
        );
      },

      async delete(id) {
        return await HttpClient.delete(`${API_CONFIG.endpoints.users}/${id}`);
      },

      async toggleActive(id, isActive) {
        return await this.update(id, { isActive });
      },
    },

    // campaign operations object
    campaigns: {
      async getAll() {
        const url = API_CONFIG.endpoints.campaigns;
        return await HttpClient.get(url);
      },

      async findById(id) {
        return await HttpClient.get(`${API_CONFIG.endpoints.campaigns}/${id}`);
      },

      async create(campaignData) {
        return await HttpClient.post(
          API_CONFIG.endpoints.campaigns,
          campaignData
        );
      },

      async update(id, updates) {
        return await HttpClient.patch(
          `${API_CONFIG.endpoints.campaigns}/${id}`,
          updates
        );
      },

      async delete(id) {
        return await HttpClient.delete(
          `${API_CONFIG.endpoints.campaigns}/${id}`
        );
      },

      async toggleApproval(id, isApproved) {
        return await this.update(id, { isApproved });
      },

      async addReward(campaignId, rewardData) {
        return await HttpClient.post(
          `${API_CONFIG.endpoints.campaigns}/${campaignId}/rewards`,
          rewardData
        );
      },

      async updateReward(campaignId, rewardId, updates) {
        return await HttpClient.patch(
          `${API_CONFIG.endpoints.campaigns}/${campaignId}/rewards/${rewardId}`,
          updates
        );
      },

      async deleteReward(campaignId, rewardId) {
        return await HttpClient.delete(
          `${API_CONFIG.endpoints.campaigns}/${campaignId}/rewards/${rewardId}`
        );
      },
    },

    // Pledge operations obj
    pledges: {
      async getAll() {
        const url = API_CONFIG.endpoints.pledges;
        return await HttpClient.get(url);
      },

      async findById(id) {
        return await HttpClient.get(`${API_CONFIG.endpoints.pledges}/${id}`);
      },

      async create(pledgeData) {
        return await HttpClient.post(API_CONFIG.endpoints.pledges, pledgeData);
      },

      async update(id, updates) {
        return await HttpClient.patch(
          `${API_CONFIG.endpoints.pledges}/${id}`,
          updates
        );
      },

      async delete(id) {
        return await HttpClient.delete(`${API_CONFIG.endpoints.pledges}/${id}`);
      },
    },
  };

  // ===== Loading State Module =====
  const LoadingState = {
    show(element) {
      if (element) {
        element.style.opacity = "0.5";
        element.style.pointerEvents = "none";
      }
    },

    hide(element) {
      if (element) {
        element.style.opacity = "1";
        element.style.pointerEvents = "auto";
      }
    },

    showSpinner(containerId) {
      const container = Utils.$(containerId);
      if (container) {
        container.innerHTML = '<div class="loading-spinner">Loading...</div>';
      }
    },
  };

  // ===== Error Handler Module =====
  const ErrorHandler = {
    show(message, type = "error") {
      // Create or update error message element
      let errorDiv = Utils.$("#error-message");
      if (!errorDiv) {
        errorDiv = document.createElement("div");
        errorDiv.id = "error-message";
        errorDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 12px 16px;
                border-radius: 4px;
                color: white;
                font-weight: 500;
                z-index: 1000;
                max-width: 400px;
            `;
        document.body.appendChild(errorDiv);
      }

      errorDiv.textContent = message;
      errorDiv.style.backgroundColor = type === "error" ? "#ef4444" : "#10b981";
      errorDiv.style.display = "block";

      // Auto-hide after 5 seconds
      setTimeout(() => {
        errorDiv.style.display = "none";
      }, 5000);
    },

    hide() {
      const errorDiv = Utils.$("#error-message");
      if (errorDiv) {
        errorDiv.style.display = "none";
      }
    },
  };

  // ===== Utilities Module =====
  const Utils = {
    // DOM selectors
    $: (sel, ctx = document) => ctx.querySelector(sel),
    $$: (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel)),

    // Async wrapper for error handling
    async withErrorHandling(asyncFn, errorMessage = "An error occurred") {
      try {
        return await asyncFn();
      } catch (error) {
        console.error(error);
        ErrorHandler.show(`${errorMessage}: ${error.message}`);
        return null;
      }
    },

    // Client-side filtering (for better UX while API loads)
    filterByQuery: (items, query, fields) => {
      if (!query || !items) return items;
      const lowerQuery = query.toLowerCase().trim();
      return items.filter((item) =>
        fields.some((field) =>
          String(item[field] || "")
            .toLowerCase()
            .includes(lowerQuery)
        )
      );
    },

    filterByStatus: (items, filter, statusField) => {
      if (filter === "all" || !items) return items;
      return items.filter((item) =>
        filter === "active" || filter === "approved"
          ? item[statusField]
          : !item[statusField]
      );
    },

    // Debounce function for search inputs
    debounce: (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },
  };

  // ===== Data Cache Module =====
  const DataCache = {
    users: [],
    campaigns: [],
    pledges: [],
    lastFetch: {
      users: null,
      campaigns: null,
      pledges: null,
    },

    isStale(type, maxAge = 5 * 60 * 1000) {
      // 5 minutes default
      const lastFetch = this.lastFetch[type];
      return !lastFetch || Date.now() - lastFetch > maxAge;
    },

    set(type, data) {
      this[type] = data;
      this.lastFetch[type] = Date.now();
    },

    get(type) {
      return this[type];
    },

    findById(type, id) {
      return this[type].find((item) => item.id === parseInt(id));
    },
  };

  // ===== UI Components Module =====
  const UIComponents = {
    createUserRow: (user) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
            <td>${user.id}</td>
            <td>
                <div class="inline-edit">
                    <input class="input" value="${
                      user.name || ""
                    }" data-bind="name" data-id="${user.id}"/>
                </div>
            </td>
            <td>${user.email || ""}</td>
            <td>
                <select class="select" data-bind="role" data-id="${user.id}">
                    <option ${
                      user.role === "admin" ? "selected" : ""
                    } value="admin">admin</option>
                    <option ${
                      user.role === "user" ? "selected" : ""
                    } value="user">user</option>
                </select>
            </td>
            <td>
                <span class="tag dot ${user.isActive ? "ok" : "bad"}">${
        user.isActive ? "Active" : "Inactive"
      }</span>
            </td>
            <td class="actions">
                <label style="display:inline-flex;align-items:center;gap:8px">
                    <input type="checkbox" class="switch" ${
                      user.isActive ? "checked" : ""
                    } data-action="toggle-active" data-id="${user.id}">
                </label>
                <button class="icon-btn" data-action="delete-user" data-id="${
                  user.id
                }">Delete</button>
            </td>
        `;
      return tr;
    },

    createCampaignRow: (campaign) => {
      const creator = DataCache.findById("users", campaign.creatorId);
      const rewardsHtml = (campaign.rewards || [])
        .map((r) => `<span class="tag">${r.title}: $${r.amount}</span>`)
        .join(" ");

      const tr = document.createElement("tr");
      tr.innerHTML = `
            <td>${campaign.id}</td>
            <td>
                <div class="inline-edit">
                    <input class="input" value="${
                      campaign.title || ""
                    }" data-camp="title" data-id="${campaign.id}"/>
                </div>
            </td>
            <td>${creator ? creator.name : "—"}</td>
            <td>
                <div class="inline-edit">
                    <input type="number" class="input" value="${
                      campaign.goal || 0
                    }" data-camp="goal" data-id="${campaign.id}"/>
                </div>
            </td>
            <td>
                <div class="inline-edit">
                    <input type="date" class="input" value="${
                      campaign.deadline || ""
                    }" data-camp="deadline" data-id="${campaign.id}"/>
                </div>
            </td>
            <td>
                <label style="display:inline-flex;align-items:center;gap:8px">
                    <input type="checkbox" class="switch" ${
                      campaign.isApproved ? "checked" : ""
                    } data-action="toggle-approved" data-id="${campaign.id}">
                </label>
            </td>
            <td>${rewardsHtml || '<span class="tag">No rewards</span>'}</td>
            <td class="actions">
                <button class="icon-btn" data-action="add-reward" data-id="${
                  campaign.id
                }">Add Reward</button>
                <button class="icon-btn" data-action="delete-campaign" data-id="${
                  campaign.id
                }">Delete</button>
            </td>
        `;
      return tr;
    },

    createPledgeRow: (pledge) => {
      const campaign = DataCache.findById("campaigns", pledge.campaignId);
      const user = DataCache.findById("users", pledge.userId);
      const reward = (campaign?.rewards || []).find(
        (r) => r.id === pledge.rewardId
      );

      const tr = document.createElement("tr");
      tr.innerHTML = `
            <td>${pledge.id}</td>
            <td>${campaign ? campaign.title : "—"} (#${pledge.campaignId})</td>
            <td>${user ? user.name : "—"} (#${pledge.userId})</td>
            <td>$${pledge.amount || 0}</td>
            <td>${reward ? reward.title : "—"}</td>
        `;
      return tr;
    },
  };

  // ===== Rendering Module =====
  const Renderer = {
    async setStats() {
      const statsElement = Utils.$("#statUsers");
      if (statsElement) statsElement.textContent = DataCache.users.length;

      const campaignsElement = Utils.$("#statCampaigns");
      if (campaignsElement)
        campaignsElement.textContent = DataCache.campaigns.length;

      const pledgesElement = Utils.$("#statPledges");
      if (pledgesElement) pledgesElement.textContent = DataCache.pledges.length;
    },

    async renderUsers(forceRefresh = false) {
      const body = Utils.$("#usersTable tbody");
      if (!body) return;

      if (DataCache.isStale("users") || forceRefresh) {
        LoadingState.showSpinner("#usersTable tbody");

        const users = await Utils.withErrorHandling(
          () => DatabaseOperations.users.getAll(),
          "Failed to load users"
        );

        if (users) {
          DataCache.set("users", users);
        }
      }

      const query = Utils.$("#userSearch")?.value || "";
      const filter = Utils.$("#userFilter")?.value || "all";

      let users = DataCache.get("users");
      users = Utils.filterByQuery(users, query, ["name", "email"]);
      users = Utils.filterByStatus(users, filter, "isActive");

      body.innerHTML = "";
      users.forEach((user) => {
        body.appendChild(UIComponents.createUserRow(user));
      });

      await this.setStats();
    },

    async renderCampaigns(forceRefresh = false) {
      const body = Utils.$("#campaignsTable tbody");
      if (!body) return;

      if (DataCache.isStale("campaigns") || forceRefresh) {
        LoadingState.showSpinner("#campaignsTable tbody");

        const campaigns = await Utils.withErrorHandling(
          () => DatabaseOperations.campaigns.getAll(),
          "Failed to load campaigns"
        );

        if (campaigns) {
          DataCache.set("campaigns", campaigns);
        }
      }

      const query = Utils.$("#campSearch")?.value || "";
      const filter = Utils.$("#campFilter")?.value || "all";

      let campaigns = DataCache.get("campaigns");
      campaigns = Utils.filterByQuery(campaigns, query, ["title"]);
      campaigns = Utils.filterByStatus(campaigns, filter, "isApproved");

      body.innerHTML = "";
      campaigns.forEach((campaign) => {
        body.appendChild(UIComponents.createCampaignRow(campaign));
      });

      await this.setStats();
    },

    async renderPledges(forceRefresh = false) {
      const body = Utils.$("#pledgesTable tbody");
      if (!body) return;

      if (DataCache.isStale("pledges") || forceRefresh) {
        LoadingState.showSpinner("#pledgesTable tbody");

        const pledges = await Utils.withErrorHandling(
          () => DatabaseOperations.pledges.getAll(),
          "Failed to load pledges"
        );

        if (pledges) {
          DataCache.set("pledges", pledges);
        }
      }

      const query = Utils.$("#pledgeSearch")?.value?.trim() || "";

      let pledges = DataCache.get("pledges");
      if (query) {
        pledges = pledges.filter((p) =>
          [p.campaignId, p.userId, String(p.amount)].some((v) =>
            String(v).includes(query)
          )
        );
      }

      body.innerHTML = "";
      pledges.forEach((pledge) => {
        body.appendChild(UIComponents.createPledgeRow(pledge));
      });

      await this.setStats();
    },

    async refreshAll() {
      await Promise.all([
        this.renderUsers(true),
        this.renderCampaigns(true),
        this.renderPledges(true),
      ]);
      ErrorHandler.show("Data refreshed successfully", "success");
    },
  };

  // ===== Navigation Module =====
  const Navigation = {
    switchTab: (tabName) => {
      Utils.$$("#tabs .tab").forEach((btn) =>
        btn.classList.toggle("active", btn.dataset.tab === tabName)
      );
      Utils.$$(".tab-panel").forEach(
        (panel) => (panel.hidden = panel.id !== tabName)
      );
    },
  };

  // ===== Event Handlers Module =====
  const EventHandlers = {
    async handleTabClick(e) {
      const btn = e.target.closest(".tab");
      if (!btn) return;

      Navigation.switchTab(btn.dataset.tab);

      switch (btn.dataset.tab) {
        case "Users":
          await Renderer.renderUsers();
          break;
        case "Campaigns":
          await Renderer.renderCampaigns();
          break;
        case "Pledges":
          await Renderer.renderPledges();
          break;
      }
    },

    handleKeydown: (e) => {
      if (
        e.key === "/" &&
        !/input|textarea|select/i.test(document.activeElement.tagName)
      ) {
        e.preventDefault();
        const visibleSearch = Array.from(
          document.querySelectorAll(".tab-panel:not([hidden]) .input")
        ).find((el) => el.id.endsWith("Search"));
        visibleSearch?.focus();
      }
    },

    async handleInput(e) {
      const target = e.target;

      if (target.matches("[data-bind]")) {
        const id = parseInt(target.dataset.id);
        const key = target.dataset.bind;
        const value = target.value;

        await Utils.withErrorHandling(async () => {
          await DatabaseOperations.users.update(id, { [key]: value });
          // Update cache
          const user = DataCache.findById("users", id);
          if (user) user[key] = value;
        }, "Failed to update user");
      }

      if (target.matches("[data-camp]")) {
        const id = parseInt(target.dataset.id);
        const key = target.dataset.camp;
        const value = key === "goal" ? Number(target.value) : target.value;

        await Utils.withErrorHandling(async () => {
          await DatabaseOperations.campaigns.update(id, { [key]: value });
          // Update cache
          const campaign = DataCache.findById("campaigns", id);
          if (campaign) campaign[key] = value;
        }, "Failed to update campaign");
      }
    },

    async handleChange(e) {
      const target = e.target;

      if (target.matches('[data-action="toggle-active"]')) {
        const id = parseInt(target.dataset.id);
        const isActive = !!target.checked;

        await Utils.withErrorHandling(async () => {
          await DatabaseOperations.users.toggleActive(id, isActive);
          // Update cache
          const user = DataCache.findById("users", id);
          if (user) user.isActive = isActive;
          await Renderer.renderUsers();
        }, "Failed to toggle user status");
        window.location.href("./login");
        localStorage.clear();
      }

      if (target.matches('[data-action="toggle-approved"]')) {
        const id = parseInt(target.dataset.id);
        const isApproved = !!target.checked;

        await Utils.withErrorHandling(async () => {
          await DatabaseOperations.campaigns.toggleApproval(id, isApproved);
          // Update cache
          const campaign = DataCache.findById("campaigns", id);
          if (campaign) campaign.isApproved = isApproved;
          await Renderer.renderCampaigns();
        }, "Failed to toggle campaign approval");
      }

      if (target.matches("#userFilter")) {
        await Renderer.renderUsers();
      }

      if (target.matches("#campFilter")) {
        await Renderer.renderCampaigns();
      }
    },

    async handleClick(e) {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;

      const id = parseInt(btn.dataset.id);
      const action = btn.dataset.action;

      switch (action) {
        case "delete-user":
          if (!confirm("Are you sure you want to delete this user?")) return;

          await Utils.withErrorHandling(async () => {
            await DatabaseOperations.users.delete(id);
            // Remove from cache
            DataCache.users = DataCache.users.filter((u) => u.id !== id);
            await Renderer.renderUsers();
          }, "Failed to delete user");
          break;

        case "delete-campaign":
          if (!confirm("Are you sure you want to delete this campaign?"))
            return;

          await Utils.withErrorHandling(async () => {
            await DatabaseOperations.campaigns.delete(id);
            // Remove from cache
            DataCache.campaigns = DataCache.campaigns.filter(
              (c) => c.id !== id
            );
            await Renderer.renderCampaigns();
          }, "Failed to delete campaign");
          break;

        case "add-reward":
          const title = prompt("Reward title?");
          if (!title) return;
          const amount = Number(prompt("Reward amount?") || "0");

          await Utils.withErrorHandling(async () => {
            const reward = await DatabaseOperations.campaigns.addReward(id, {
              title,
              amount,
            });
            // Update cache
            const campaign = DataCache.findById("campaigns", id);
            if (campaign) {
              campaign.rewards = campaign.rewards || [];
              campaign.rewards.push(reward);
            }
            await Renderer.renderCampaigns();
          }, "Failed to add reward");
          break;
      }
    },
  };

  // ===== Application Module =====
  const App = {
    async init() {
      await this.loadInitialData();
      this.bindEvents();
      await Renderer.setStats();
    },

    async loadInitialData() {
      try {
        // Load all data in parallel
        const [users, campaigns, pledges] = await Promise.all([
          DatabaseOperations.users.getAll().catch(() => []),
          DatabaseOperations.campaigns.getAll().catch(() => []),
          DatabaseOperations.pledges.getAll().catch(() => []),
        ]);

        DataCache.set("users", users);
        DataCache.set("campaigns", campaigns);
        DataCache.set("pledges", pledges);
      } catch (error) {
        console.error("Failed to load initial data:", error);
        ErrorHandler.show(
          "Failed to load initial data. Some features may not work properly."
        );
      }
    },

    bindEvents() {
      // Tab navigation
      Utils.$("#tabs")?.addEventListener("click", EventHandlers.handleTabClick);

      // Quick search with '/'
      window.addEventListener("keydown", EventHandlers.handleKeydown);

      // Input handlers with debouncing for better performance
      document.addEventListener(
        "input",
        Utils.debounce(EventHandlers.handleInput, 500)
      );
      document.addEventListener("change", EventHandlers.handleChange);
      document.addEventListener("click", EventHandlers.handleClick);

      // Search inputs with debouncing
      const debouncedRenderUsers = Utils.debounce(
        () => Renderer.renderUsers(),
        300
      );
      const debouncedRenderCampaigns = Utils.debounce(
        () => Renderer.renderCampaigns(),
        300
      );
      const debouncedRenderPledges = Utils.debounce(
        () => Renderer.renderPledges(),
        300
      );

      Utils.$("#userSearch")?.addEventListener("input", debouncedRenderUsers);
      Utils.$("#campSearch")?.addEventListener(
        "input",
        debouncedRenderCampaigns
      );
      Utils.$("#pledgeSearch")?.addEventListener(
        "input",
        debouncedRenderPledges
      );

      // Refresh button
      Utils.$("#refreshBtn")?.addEventListener("click", () =>
        Renderer.refreshAll()
      );
    },
  };

  // Initialize the application when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => App.init());
  } else {
    App.init();
  }
})();
