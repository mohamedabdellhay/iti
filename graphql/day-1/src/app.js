import express from "express";
import { ApolloServer } from "apollo-server-express";
import { gql } from "apollo-server-express";
import connectDB from "./config/db.js";
import StudentService from "./services/StudentService.js";
import CourseService from "./services/CourseService.js";

connectDB(); // ✅ connect MongoDB

const typeDefs = gql`
  type Student {
    id: ID!
    name: String!
    email: String!
    age: Int
    major: String
  }

  type Course {
    id: ID!
    title: String!
    code: String!
    credits: Int
    instructor: String
  }

  type Query {
    getAllStudents: [Student]
    getStudent(id: ID!): Student
    getAllCourses: [Course]
    getCourse(id: ID!): Course
    searchStudentsByMajor(major: String!): [Student]
  }

  type Mutation {
    addStudent(name: String!, email: String!, age: Int, major: String): Student
    updateStudent(
      id: ID!
      name: String
      email: String
      age: Int
      major: String
    ): Student
    deleteStudent(id: ID!): Boolean

    addCourse(
      title: String!
      code: String!
      credits: Int
      instructor: String
    ): Course
    updateCourse(
      id: ID!
      title: String
      code: String
      credits: Int
      instructor: String
    ): Course
    deleteCourse(id: ID!): Boolean
  }
`;

const resolvers = {
  Query: {
    getAllStudents: async () => StudentService.getAll(),
    getStudent: async (_, { id }) => StudentService.getById(id),
    getAllCourses: async () => CourseService.getAll(),
    getCourse: async (_, { id }) => CourseService.getById(id),
    searchStudentsByMajor: async (_, { major }) =>
      StudentService.findByMajor(major),
  },

  Mutation: {
    addStudent: async (_, { name, email, age, major }) =>
      StudentService.create({ name, email, age, major }),

    updateStudent: async (_, args) => StudentService.update(args),

    deleteStudent: async (_, { id }) => StudentService.delete(id),

    addCourse: async (_, { title, code, credits, instructor }) =>
      CourseService.create({ title, code, credits, instructor }),

    updateCourse: async (_, args) => CourseService.update(args),

    deleteCourse: async (_, { id }) => CourseService.delete(id),
  },
};

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = 4000;
  app.listen(PORT, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
};

export default startServer;
