import api from '../config/api';

export interface Course {
  _id: string;
  name: string;
  description: string;
  duration: number;
  fee: number;
  teacher: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Student {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  classes: string[];
}

export interface Exam {
  _id: string;
  title: string;
  description: string;
  class: string;
  start_time: Date;
  end_time: Date;
  duration: number;
  total_marks: number;
}

export interface DashboardStats {
  totalCourses: number;
  totalStudents: number;
  activeExams: number;
  averageRating: number;
}

// Dashboard
export const getTeacherDashboard = async (): Promise<DashboardStats> => {
  const response = await api.get('/teacher/dashboard');
  return response.data.data;
};

// Courses
export const getTeacherCourses = async (): Promise<Course[]> => {
  const response = await api.get('/teacher/courses');
  return response.data.data;
};

export const createCourse = async (courseData: Partial<Course>): Promise<Course> => {
  const response = await api.post('/teacher/courses', courseData);
  return response.data.data;
};

export const updateCourse = async (courseId: string, courseData: Partial<Course>): Promise<Course> => {
  const response = await api.put(`/teacher/courses/${courseId}`, courseData);
  return response.data.data;
};

export const deleteCourse = async (courseId: string): Promise<void> => {
  await api.delete(`/teacher/courses/${courseId}`);
};

// Students
export const getTeacherStudents = async (): Promise<Student[]> => {
  const response = await api.get('/teacher/students');
  return response.data.data;
};

// Exams
export const getTeacherExams = async (): Promise<Exam[]> => {
  const response = await api.get('/teacher/exams');
  return response.data.data;
};

export const createExam = async (examData: Partial<Exam>): Promise<Exam> => {
  const response = await api.post('/teacher/exams', examData);
  return response.data.data;
};

export const updateExam = async (examId: string, examData: Partial<Exam>): Promise<Exam> => {
  const response = await api.put(`/teacher/exams/${examId}`, examData);
  return response.data.data;
};

export const deleteExam = async (examId: string): Promise<void> => {
  await api.delete(`/teacher/exams/${examId}`);
};

// Profile
export const getTeacherProfile = async () => {
  const response = await api.get('/teacher/profile');
  return response.data.data;
};

export const updateTeacherProfile = async (profileData: any) => {
  const response = await api.put('/teacher/profile', profileData);
  return response.data.data;
};

