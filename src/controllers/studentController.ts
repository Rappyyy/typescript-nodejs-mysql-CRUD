import { Request, Response } from 'express';
import { StudentRepository } from '../controllers/repository/studentRepository';

const studentRepo = new StudentRepository();

// Get all students
export const getStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const students = await studentRepo.getStudents();
    res.status(200).json({
      success: true,
      message: 'All student records',
      totalStudents: students.length,
      data: students,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error in getting all student records',
      error
    });
  }
};

// Get student by ID
export const getStudentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const studentId = req.params.id;

    if (!studentId) {
      res.status(400).json({ success: false, message: 'Invalid or missing student ID' });
      return;
    }

    const student = await studentRepo.getStudentById(studentId);

    if (!student) {
      res.status(404).json({ success: false, message: 'No records found' });
      return;
    }

    res.status(200).json({ success: true, studentDetails: student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error in getting student by ID', error });
  }
};

// Create student
export const createStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, roll_no, fees, medium } = req.body;

    if (!name || !roll_no || !fees || !medium) {
      res.status(400).json({ success: false, message: 'Please provide all required fields' });
      return;
    }

    const newStudent = await studentRepo.create({ name, roll_no, fees, medium });

    res.status(201).json({ success: true, message: 'New student record created', student: newStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error in creating student', error });
  }
};

// Update student
export const updateStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const studentId = req.params.id;
    const { name, roll_no, fees, medium } = req.body;

    if (!studentId) {
      res.status(400).json({ success: false, message: 'Invalid or missing student ID' });
      return;
    }

    const updatedStudent = await studentRepo.updateStudent(studentId, { name, roll_no, fees, medium });

    res.status(200).json({ success: true, message: 'Student details updated successfully', student: updatedStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error in updating student details', error});
  }
};

// Delete student
export const deleteStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const studentId = req.params.id;

    if (!studentId) {
      res.status(400).json({ success: false, message: 'Please provide a valid student ID' });
      return;
    }

    const deletedStudent = await studentRepo.delete(studentId);
    res.status(200).json({ success: true, message: 'Student deleted successfully', student: deletedStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error in deleting student', error});
  }
};
