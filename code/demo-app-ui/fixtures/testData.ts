import { faker } from "@faker-js/faker";

const requiredEnv = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

export const users = {
  claimantUser: {
    email: requiredEnv("CLAIMANT_EMAIL"),
    password: requiredEnv("CLAIMANT_PASSWORD"),
  },
  adminUser: {
    email: requiredEnv("ADMIN_EMAIL"),
    password: requiredEnv("ADMIN_PASSWORD"),
  },
  invalidUser: {
    email: "invalid@demo.com",
    password: "Invalid123!",
  },
};

const previousDate = new Date();
previousDate.setDate(previousDate.getDate() - 1);

export const claimTestData = {
  incidentDate: previousDate.toISOString().split("T")[0],
  incidentLocation: faker.location.streetAddress(),
  claimAmount: 250.5,
  description: "The checked-in baggage was delayed during the journey.",
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

export const claimsUIData = {
  claimTableHeaders: [
    "Claim ID",
    "Date",
    "Description",
    "Amount",
    "Status",
    "Actions",
  ],
};
