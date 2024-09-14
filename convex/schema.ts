// import { action, mutation, query } from "./_generated/server";
// import { v } from "convex/values";
// import { api } from "./_generated/api"; // Correct reference to your API

// // Create a new task with the given text
// export const createTodo = mutation({
//   args: {
//     text: v.string(),
//   },
//   handler: async (ctx, args) => {
//     await ctx.db.insert("todos", {
//       text: args.text,
//     });
//     // Schedule a third-party API call using a scheduler
//     await ctx.scheduler.runAfter(0, api.todos.callThirdPartyApi);
//   },
// });

// // Query to get all todos
// export const getTodos = query({
//   handler: async (ctx) => {
//     return await ctx.db.query("todos").collect();
//   },
// });

// // Action to call third-party API
// export const callThirdPartyApi = action({
//   handler: async (ctx) => {
//     // You can implement a real third-party API call here
//     console.log("Third-party API called!");
//   },
// });

import { v } from "convex/values";
import { mutation, query, defineSchema } from "/Users/aahilali/Desktop/HackMITConvex/convex/_generated/server.js";

// Define the schema for the Company table
const companySchema = {
  companyId: v.string(),
  job: v.object({
    jobName: v.string(),
    jobId: v.number(),
    isClosed: v.boolean(),
  }),
  applicants: v.array(
    v.object({
      applicantId: v.string(),
      averages: v.object({
        gpa: v.number(),
        workExperience: v.number(),
        openSourceContributions: v.number(),
        codingLanguageExperience: v.number(),
        technologyExperience: v.number(),
      }),
    })
  ),
};

// Define the schema for the Applicant table
const applicantSchema = {
  applicantName: v.string(),
  applicantId: v.string(),
  gpa: v.number(),
  workExperience: v.number(),
  openSourceContributions: v.number(),
  codingLanguageExperience: v.number(),
  technologyExperience: v.number(),
};

// Define and export the schema
export default defineSchema({
  companies: companySchema,
  applicants: applicantSchema,
});

// Mutation to add a company
export const addCompany = mutation({
  args: companySchema,
  handler: async (ctx, args) => {
    await ctx.db.insert("companies", args);
  },
});

// Mutation to add an applicant
export const addApplicant = mutation({
  args: applicantSchema,
  handler: async (ctx, args) => {
    await ctx.db.insert("applicants", args);
  },
});

// Query to get all companies
export const getCompanies = query({
  handler: async (ctx) => {
    return await ctx.db.query("companies").collect();
  },
});

// Query to get all applicants
export const getApplicants = query({
  handler: async (ctx) => {
    return await ctx.db.query("applicants").collect();
  },
});

// Mutation to import sample company data
export const importSampleCompanyData = mutation({
  handler: async (ctx) => {
    const sampleData = require("/Users/aahilali/Desktop/HackMITConvex/sampleCompanyData.json");
    for (const company of sampleData) {
      await ctx.db.insert("companies", company);
    }
  },
});

// Mutation to import sample applicant data
export const importSampleApplicantData = mutation({
  handler: async (ctx) => {
    const sampleData = require("/Users/aahilali/Desktop/HackMITConvex/sampleApplicantData2.json");
    for (const applicant of sampleData) {
      await ctx.db.insert("applicants", applicant);
    }
  },
});