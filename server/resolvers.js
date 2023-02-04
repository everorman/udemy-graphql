import { Company, Job } from "./db.js"

export const resolvers = {
  Query: {
    job: (_, { id }) => Job.findById(id),
    jobs: () => Job.findAll(),
    company: (_, { id }) => Company.findById(id)
  },
  Mutation: {
    createJob: (_, { input }) => {
      return Job.create(input)
    },
    deleteJob: (_, { id }) => {
      return Job.delete(id)
    }
  },
  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id)
  },
  Job: {
    company: (job) => Company.findById(job.companyId)
  }
}