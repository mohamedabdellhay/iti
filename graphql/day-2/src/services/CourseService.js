import CourseModel from "../models/Course.js";

class CourseService {
  // Get all courses
  async getAll(filter_options) {
    const { filter, options } = filter_options;
    let query = {};

    if (filter) {
      if (filter.codePrefix)
        query.code = { $regex: `^${filter.codePrefix}`, $options: "i" };
      if (filter.titleContains)
        query.title = { $regex: filter.titleContains, $options: "i" };
      if (filter.instructor) query.instructor = filter.instructor;
      if (filter.minCredits || filter.maxCredits)
        query.credits = {
          ...(filter.minCredits && { $gte: filter.minCredits }),
          ...(filter.maxCredits && { $lte: filter.maxCredits }),
        };
    }
    const limit = Math.min(options?.limit ?? 10, 50);
    const offset = options?.offset ?? 0;
    const sortOrder = options?.sortOrder === "DESC" ? -1 : 1;
    const sortBy = options?.sortBy ?? "title";
    const courses = await CourseModel.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(offset)
      .limit(limit);

    return courses;
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

  // get Student Courses

  // Update an existing course
  async update(crsData) {
    const { id, data } = crsData;
    console.log(id, data);

    const updatedCourse = await CourseModel.findByIdAndUpdate(id, data, {
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
