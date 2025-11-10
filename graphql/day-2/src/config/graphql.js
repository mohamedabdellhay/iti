import { gql } from "apollo-server-express";

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
  type User {
    id: ID!
    email: String!
    token: String
  }
  input StudentUpdateInput {
    name: String
    email: String
    age: Int
    major: String
  }
  input CourseUpdateInput {
    title: String
    code: String
    credits: Int
    instructor: String
  }
  input ListOptions {
    limit: Int
    offset: Int
    sortBy: String
    sortOrder: String
  }
  input StudentFilter {
    major: String
    nameContains: String
    emailContains: String
    minAge: Int
    maxAge: Int
  }
  input CourseFilter {
    codePrefix: String
    titleContains: String
    instructor: String
    minCredits: Int
    maxCredits: Int
  }

  type Mutation {
    signup(email: String!, password: String): User
    login(email: String, password: String): User
    addStudent(name: String!, email: String!, age: Int, major: String): Student
    updateStudent(id: ID!, data: StudentUpdateInput!): Student!
    deleteStudent(id: ID!): Boolean

    addCourse(
      title: String!
      code: String!
      credits: Int
      instructor: String
    ): Course
    updateCourse(id: ID!, data: CourseUpdateInput): Course
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
    signup: async (_, { email, password }) =>
      AuthService.signup({ email, password }),
    login: async (_, { email, password }) =>
      AuthService.login({ email, password }),

    addStudent: async (_, { name, email, age, major }, context) =>
      authMiddleWare(
        { name, email, age, major },
        context,
        StudentService.create
      ),

    updateStudent: async (_, args, context) =>
      authMiddleWare(args, context, StudentService.update),

    deleteStudent: async (_, { id }, context) =>
      authMiddleWare(id, context, StudentService.delete),

    addCourse: async (_, { title, code, credits, instructor }, context) =>
      authMiddleWare(
        { title, code, credits, instructor },
        context,
        CourseService.create
      ),

    updateCourse: async (_, args, context) =>
      authMiddleWare(args, context, CourseService.update),

    deleteCourse: async (_, { id }, context) =>
      authMiddleWare(id, context, CourseService.delete),
  },
};

export { typeDefs, resolvers };
