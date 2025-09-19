const DashboardState = {
  users: [],
  campaigns: [],
  pledges: [],

  async renderState() {
    const users = await fetch("http://localhost:3000/users");
    this.users = await users.json();
    const campaigns = await fetch("http://localhost:3000/campaigns");
    this.campaigns = await campaigns.json();
    const pledges = await fetch("http://localhost:3000/pledges");
    this.pledges = await pledges.json();
  },

  async logState() {
    await this.renderState();
    console.log(this.users);
    console.log(this.campaigns);
    console.log(this.pledges);
  },
  async state() {
    await this.renderState();
    return {
      users: this.users,
      campaigns: this.campaigns,
      pledges: this.pledges,
    };
  },
};

// DashboardState.renderState();

export default DashboardState.state();
