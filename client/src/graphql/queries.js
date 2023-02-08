import { request, gql } from 'graphql-request';
import { getAccessToken } from '../auth';

const GRAPHQL_URL = 'http://localhost:9090/graphql';

export async function createJob(input) {
  const query = gql`
    mutation ($input: CreateJobInput!) {
      job: createJob(input: $input ) {
        id
      }
    }
  `;
  const variables = { input }
  const headers = { 'Authorization': 'Bearer ' + getAccessToken() }
  const { job } = await request(GRAPHQL_URL, query, variables, headers);
  return job;
}
export async function getJob(id) {
  const query = gql`
    query JobQuery($id: ID!){
      job(id:$id){
        id, 
        title, 
        description,
        company{
          id,
          name
        }
      }
    }
  `;
  const variables = { id }
  const { job } = await request(GRAPHQL_URL, query, variables);
  return job;
}
export async function getJobs() {
  const query = gql`
    query {
      jobs{
        id, 
        title, 
        description,
        company{
          name
        }
      }
    }
  `;

  const { jobs } = await request(GRAPHQL_URL, query);
  return jobs;
}
export async function getCompany(id) {
  const query = gql`
    query CompanyQuery($id: ID!){
      company(id: $id) {
        id
        name
        description
        jobs{
          id
          title
        }
      }
    }
  `;
  const variables = { id }
  const { company } = await request(GRAPHQL_URL, query, variables);
  return company;
}