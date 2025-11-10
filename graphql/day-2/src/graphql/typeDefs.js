import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Student {
    id: ID!
    name: String!
    email: String!
    courses: [Course]
    coursesCount: Int
    age: Int
    major: String
  }

  type Course {
    id: ID!
    title: String!
    code: String!
    students: [Student]
    studentsCount: Int
    credits: Int
    instructor: String
  }

  type Query {
    getAllStudents(filter: StudentFilter, options: ListOptions): [Student!]!
    getAllCourses(filter: CourseFilter, options: ListOptions): [Course!]!
    getStudent(id: ID!): Student
    getCourse(id: ID!): Course
    searchStudentsByMajor(major: String!): [Student]
    students: [Student!]!
    courses: [Course!]!
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
  type Enrollment {
    message: String!
    courseId: ID!
    studentId: ID!
    date: String!
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

    enrollStudent(studentId: ID!, courseId: ID!): Student!
    unenrollStudent(studentId: ID!, courseId: ID!): Student!
  }
`;

export default typeDefs;
