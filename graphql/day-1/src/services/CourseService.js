import CourseModel from "../models/Course.js";

class CourseService {
  // Get all courses
  async getAll() {
    const data = await CourseModel.find();
    return data;
  }

  // Get single course by ID
  async getById(id) {
    const course = await CourseModel.findById(id);
    return course;
  }

  // Create a new course
  async create(courseData) {
    console.log(courseData);
    console.log("################");

    const newCourse = await CourseModel.create(courseData);
    console.log(newCourse);

    return newCourse.toJSON(); // to include virtual id
  }

  // Update an existing course
  async update(data) {
    const { id, ...updates } = data;
    console.log(id, updates);

    const updatedCourse = await CourseModel.findByIdAndUpdate(id, updates, {
      new: true,
    });

    return updatedCourse;
  }

  // Delete a course
  async delete(id) {
    const result = await CourseModel.findByIdAndDelete(id);
    return !!result; // true if deleted, false if not found
  }
}

export default new CourseService();
