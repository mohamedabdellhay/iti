import StudentModel from "../models/Student.js";

class StudentService {
  // Get all students
  async getAll() {
    const data = await StudentModel.find();
    return data;
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
  async update(data) {
    const { id, ...updates } = data;
    console.log(id, updates);

    const updatedStudent = await StudentModel.findByIdAndUpdate(id, updates);
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
