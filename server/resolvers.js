import { Company, Job } from "./db.js"

export const resolvers = {
  Query: {
    job: (_, { id }) => Job.findById(id),
    jobs: () => Job.findAll(),
    company: (_, { id }) => Company.findById(id)
  },
  Mutation: {
    createJob: (_, { title, companyId, description }) => {
      return Job.create({ title, companyId, description })
    }
  },
  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id)
  },
  Job: {
    company: (job) => Company.findById(job.companyId)
  }
}