import { Company, Job } from "./db.js"

export const resolvers = {
  Query: {
    job: (_, { id }) => Job.findById(id),
    jobs: () => Job.findAll(),
    company: (_, { id }) => Company.findById(id)
  },
  Mutation: {
    createJob: (_, { input }, { user }) => {
      if (!user) {
        throw new Error('Unauthorized');
      }
      return Job.create({ ...input, companyId: user.companyId });
    },
    deleteJob: (_, { id }) => {
      return Job.delete(id)
    },
    updateJob: (_, { input }) => {
      return Job.update(input)
    }
  },
  Company: {
    jobs: (company) => Job.findAll((job) => job.companyId === company.id)
  },
  Job: {
    company: (job) => Company.findById(job.companyId)
  }
}