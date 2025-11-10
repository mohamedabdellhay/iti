import authMiddleWare from "../middleWare/authMiddleWare.js";
import StudentService from "../services/StudentService.js";
import CourseService from "../services/CourseService.js";
import AuthService from "../services/AuthService.js";

const students = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
];

const courses = [
  { id: "a", title: "Math" },
  { id: "b", title: "Physics" },
  { id: "c", title: "History" },
];

// enrollments map: key = studentId, value = array of courseIds
const enrollments = {
  1: ["a", "b"], // Alice takes Math + Physics
  2: ["a"], // Bob takes Math
  3: ["b", "c"], // Charlie takes Physics + History
};

const resolvers = {
  Query: {
    getAllStudents: async (_, { filter, options }) =>
      StudentService.getAll({ filter, options }),
    getStudent: async (_, { id }) => StudentService.getById(id),
    getAllCourses: async (_, { filter, options }) =>
      CourseService.getAll({ filter, options }),
    getCourse: async (_, { id }) => CourseService.getById(id),
    searchStudentsByMajor: async (_, { major }) =>
      StudentService.findByMajor(major),

    // part 2 Nested resolvers (relations)
    students: () => students,
    courses: () => courses,
  },
  Student: {
    // Nested resolver
    courses: (parent) => {
      const enrolledCourseIds = enrollments[parent.id] || [];
      return courses.filter((course) => enrolledCourseIds.includes(course.id));
    },

    // Computed field
    coursesCount: (parent) => {
      return (enrollments[parent.id] || []).length;
    },
  },

  Course: {
    // Nested resolver
    students: (parent) => {
      // Find all students whose enrollments include this course.id
      return students.filter((student) =>
        (enrollments[student.id] || []).includes(parent.id)
      );
    },

    // Computed field
    studentsCount: (parent) => {
      // Count how many students are enrolled in this course
      return students.filter((student) =>
        (enrollments[student.id] || []).includes(parent.id)
      ).length;
    },
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

    enrollStudent: (parent, { studentId, courseId }, context) => {
      if (!context.user) throw new Error("Unauthorized");

      const student = students.find((s) => s.id === studentId);
      if (!student) throw new Error("Student not found");

      const course = courses.find((c) => c.id === courseId);
      if (!course) throw new Error("Course not found");

      if (!enrollments[studentId]) enrollments[studentId] = [];

      if (enrollments[studentId].includes(courseId)) {
        return student;
      }

      enrollments[studentId].push(courseId);
      return student;
    },

    unenrollStudent: (parent, { studentId, courseId }, context) => {
      if (!context.user) throw new Error("Unauthorized");

      const student = students.find((s) => s.id === studentId);
      if (!student) throw new Error("Student not found");

      const course = courses.find((c) => c.id === courseId);
      if (!course) throw new Error("Course not found");

      if (!enrollments[studentId]) enrollments[studentId] = [];

      enrollments[studentId] = enrollments[studentId].filter(
        (id) => id !== courseId
      );
      return student;
    },
  },

  // Courses: async () => StudentService.getCourses(),
};

export default resolvers;
