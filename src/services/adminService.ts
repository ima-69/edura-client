import api from '../config/api';

export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  totalRevenue: number;
}

export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  createdAt: Date;
}

export interface Course {
  _id: string;
  class_name: string;
  description?: string;
  price?: number;
  teacher?: {
    first_name: string;
    last_name: string;
  };
  studentCount?: number;
}

export interface Payment {
  _id: string;
  transactionId: string;
  student: {
    name: string;
    email: string;
  };
  course: string;
  amount: number;
  status: string;
  date: Date;
}

// Dashboard
export const getAdminDashboard = async (): Promise<DashboardStats> => {
  const response = await api.get('/admin/dashboard');
  return response.data.data;
};

// User Management
export const getAllStudents = async (page = 1, limit = 10, search = '') => {
  const response = await api.get(`/admin/users/students?page=${page}&limit=${limit}&search=${search}`);
  return response.data.data;
};

export const getAllTeachers = async (page = 1, limit = 10, search = '') => {
  const response = await api.get(`/admin/users/teachers?page=${page}&limit=${limit}&search=${search}`);
  return response.data.data;
};

export const updateUserStatus = async (userType: 'student' | 'teacher', userId: string, status: boolean) => {
  const response = await api.patch(`/admin/users/${userType}/${userId}/status`, { status });
  return response.data.data;
};

export const deleteUser = async (userType: 'student' | 'teacher', userId: string) => {
  await api.delete(`/admin/users/${userType}/${userId}`);
};

// Course Management
export const getAllCourses = async (page = 1, limit = 10) => {
  const response = await api.get(`/admin/courses?page=${page}&limit=${limit}`);
  return response.data.data;
};

export const updateCourseStatus = async (courseId: string, status: boolean) => {
  const response = await api.patch(`/admin/courses/${courseId}/status`, { status });
  return response.data.data;
};

export const deleteCourse = async (courseId: string) => {
  await api.delete(`/admin/courses/${courseId}`);
};

// Payment Management
export const getAllPayments = async (page = 1, limit = 10, status = 'all') => {
  const response = await api.get(`/admin/payments?page=${page}&limit=${limit}&status=${status}`);
  return response.data.data;
};

// Reports
export const getRecentActivity = async () => {
  const response = await api.get('/admin/reports/recent-activity');
  return response.data.data;
};

// Profile
export const getAdminProfile = async () => {
  const response = await api.get('/admin/profile');
  return response.data.data;
};

export const updateAdminProfile = async (profileData: any) => {
  const response = await api.put('/admin/profile', profileData);
  return response.data.data;
};

