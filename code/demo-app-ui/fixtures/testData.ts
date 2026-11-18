export const users = {
  claimantUser: {
    email: "claimant@demo.com",
    password: "Claimant123!",
  },
  adminUser: {
    email: "admin@demo.com",
    password: "Admin123!",
  },
  invalidUser: {
    email: "invalid@demo.com",
    password: "Invalid123!",
  },
};

export const loginUsers = [
  {
    role: "Claimant",
    email: users.claimantUser.email,
    password: users.claimantUser.password,
    url: "/claims",
    welcomeMessage: "Welcome, Test Claimant",
  },
  {
    role: "Admin",
    email: users.adminUser.email,
    password: users.adminUser.password,
    url: "/admin/dashboard",
    welcomeMessage: "Welcome, Admin User",
  },
];

export const messages = {
  invalidCredentials: "Invalid email or password",
};
