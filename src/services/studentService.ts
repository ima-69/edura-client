import api from '../config/api';

export interface Course {
  _id: string;
  class_name: string;
  description?: string;
  categories?: string[];
  class_status: boolean;
  price?: number;
  teacher?: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Exam {
  _id: string;
  exam_name: string;
  exam_description: string;
  exam_type: number | string;
  class_id: string | Course;
  duration: number;
  mcq: Array<{
    question: string;
    answers: string[];
    correct_answer: number[];
  }>;
  createdAt?: Date;
}

export interface DashboardStats {
  enrolledCourses: number;
  completedCourses: number;
  pendingExams: number;
  averageScore: string;
}

// Dashboard
export const getStudentDashboard = async (): Promise<DashboardStats> => {
  const response = await api.get('/student/dashboard');
  return response.data.data;
};

// Courses
export const getStudentCourses = async (): Promise<Course[]> => {
  const response = await api.get('/student/courses');
  return response.data.data;
};

export const enrollInCourse = async (courseId: string): Promise<any> => {
  const response = await api.post(`/student/courses/enroll/${courseId}`);
  return response.data.data;
};

// Exams
export const getStudentExams = async (): Promise<Exam[]> => {
  const response = await api.get('/student/exams');
  return response.data.data;
};

// Profile
export const getStudentProfile = async () => {
  const response = await api.get('/student/profile');
  return response.data.data;
};

export const updateStudentProfile = async (profileData: any) => {
  const response = await api.put('/student/profile', profileData);
  return response.data.data;
};

