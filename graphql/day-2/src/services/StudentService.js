import StudentModel from "../models/Student.js";

class StudentService {
  // Get all students
  async getAll(filter_options) {
    const { filter, options } = filter_options;
    let query = {};

    if (filter) {
      if (filter.major) query.major = filter.major;
      if (filter.nameContains)
        query.name = { $regex: filter.nameContains, $options: "i" };
      if (filter.emailContains)
        query.email = { $regex: filter.emailContains, $options: "i" };
      if (filter.minAge || filter.maxAge)
        query.age = {
          ...(filter.minAge && { $gte: filter.minAge }),
          ...(filter.maxAge && { $lte: filter.maxAge }),
        };
    }

    const limit = Math.min(options?.limit ?? 10, 50);
    const offset = options?.offset ?? 0;
    const sortOrder = options?.sortOrder === "DESC" ? -1 : 1;
    const sortBy = options?.sortBy ?? "name";

    const students = await StudentModel.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(offset)
      .limit(limit);

    return students;
  }

  // Get student by ID
  async getById(id) {
    console.log(id);

    const student = await StudentModel.findById(id);
    return student;
  }

  // Create a new student
  async create(std) {
    console.log(std);
    console.log("$$$$$$$$$$$$$$$$");

    const newStd = new StudentModel(std);
    await newStd.save();
    console.log("Student created:", newStd);
    return newStd;
  }

  //  Update student (by ID)
  async update(stdData) {
    const { id, data } = stdData;
    console.log(id, data);

    const updatedStudent = await StudentModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    console.log(updatedStudent);

    return updatedStudent;
  }

  // Delete student (by ID)
  async delete(id) {
    const deletedStudent = await StudentModel.findByIdAndDelete(id);
    return !!deletedStudent;
  }
}

export default new StudentService();
