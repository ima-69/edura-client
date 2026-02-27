import api from '../config/api';

export interface Course {
    _id: string;
    class_name: string;
    description?: string;
    categories?: string[];
    class_status: boolean;
    price?: number;
    isFree: boolean;
    teacher: any;
    thumbnail?: {
        publicId: string;
        fileUrl: string;
    };
    lectures: Lecture[];
    totalDuration?: number;
    enrollmentCount: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface Lecture {
    lectureNumber: number;
    title: string;
    description?: string;
    video?: {
        duration?: number;
        format: string;
        isFree: boolean;
    };
    materials: Material[];
    createdAt: string;
}

export interface Material {
    _id: string;
    title: string;
    resourceType: 'image' | 'video' | 'raw';
    format: string;
    size: number;
    isFree: boolean;
    isDownloadable: boolean;
    createdAt: string;
}

export interface CreateCourseData {
    class_name: string;
    description?: string;
    categories?: string[];
    price?: number;
    isFree?: boolean;
}

export interface AddLectureData {
    title: string;
    description?: string;
}

export interface UploadMaterialData {
    title: string;
    isFree?: boolean;
    isDownloadable?: boolean;
}

class CourseService {
    /**
     * Create new course
     */
    async createCourse(data: CreateCourseData): Promise<{ success: boolean; data?: any; message: string }> {
        const response = await api.post('/courses', data);
        return response.data;
    }

    /**
     * Get course details
     */
    async getCourseDetails(courseId: string): Promise<{ success: boolean; data?: Course; message: string }> {
        const response = await api.get(`/courses/${courseId}`);
        return response.data;
    }

    /**
     * Upload course thumbnail
     */
    async uploadThumbnail(courseId: string, file: File): Promise<{ success: boolean; data?: any; message: string }> {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post(`/courses/${courseId}/thumbnail`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }

    /**
     * Add lecture to course
     */
    async addLecture(courseId: string, data: AddLectureData): Promise<{ success: boolean; data?: any; message: string }> {
        const response = await api.post(`/courses/${courseId}/lectures`, data);
        return response.data;
    }

    /**
     * Upload lecture video
     */
    async uploadLectureVideo(
        courseId: string,
        lectureNumber: number,
        file: File,
        isFree: boolean = false,
        onProgress?: (progress: number) => void
    ): Promise<{ success: boolean; data?: any; message: string }> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('isFree', String(isFree));

        const response = await api.post(
            `/courses/${courseId}/lectures/${lectureNumber}/video`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    if (onProgress && progressEvent.total) {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        onProgress(percentCompleted);
                    }
                },
            }
        );
        return response.data;
    }

    /**
     * Upload lecture material
     */
    async uploadLectureMaterial(
        courseId: string,
        lectureNumber: number,
        file: File,
        data: UploadMaterialData,
        onProgress?: (progress: number) => void
    ): Promise<{ success: boolean; data?: any; message: string }> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', data.title);
        formData.append('isFree', String(data.isFree || false));
        formData.append('isDownloadable', String(data.isDownloadable !== undefined ? data.isDownloadable : true));

        const response = await api.post(
            `/courses/${courseId}/lectures/${lectureNumber}/materials`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    if (onProgress && progressEvent.total) {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        onProgress(percentCompleted);
                    }
                },
            }
        );
        return response.data;
    }

    /**
     * Get video streaming URLs
     */
    async getVideoStreamingUrls(
        courseId: string,
        lectureNumber: number
    ): Promise<{ success: boolean; data?: any; message: string }> {
        const response = await api.get(`/courses/${courseId}/lectures/${lectureNumber}/video/stream`);
        return response.data;
    }

    /**
     * Delete material
     */
    async deleteMaterial(
        courseId: string,
        lectureNumber: number,
        materialId: string
    ): Promise<{ success: boolean; message: string }> {
        const response = await api.delete(`/courses/${courseId}/lectures/${lectureNumber}/materials/${materialId}`);
        return response.data;
    }

    /**
     * Delete lecture
     */
    async deleteLecture(courseId: string, lectureNumber: number): Promise<{ success: boolean; message: string }> {
        const response = await api.delete(`/courses/${courseId}/lectures/${lectureNumber}`);
        return response.data;
    }

    /**
     * Get teacher's courses
     */
    async getTeacherCourses(): Promise<{ success: boolean; data?: Course[]; message: string }> {
        const response = await api.get('/teacher/courses');
        return response.data;
    }
}

export default new CourseService();

