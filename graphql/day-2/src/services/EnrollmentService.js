import EnrollmentModel from "../models/Enrollment.js";

class EnrollmentService {
  async enroll(courseId, studentId) {
    const courseEnrollment = await EnrollmentModel.create({
      courseId,
      studentId,
    });

    courseEnrollment.message = courseEnrollment
      ? "Course Enrolled Successfully"
      : "Failed To Enrolled Course";

    console.log(courseEnrollment);

    return courseEnrollment;
  }

  async delete(id, studentId) {
    const deleteEnrollment = await EnrollmentModel.findOneAndDelete({
      _id: id,
      studentId,
    });
    console.log(deleteEnrollment);

    return deleteEnrollment;
  }
}

export default new EnrollmentService();
