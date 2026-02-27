import React, { useState, useEffect } from 'react';
import courseService from '../../services/courseService';
import type { Course, AddLectureData } from '../../services/courseService';
import { CreateCourseForm, AddLectureModal, UploadContentModal } from '../../components/course';
import { Notification } from '../../components/ui';

interface CourseManagementProps {
    onBack?: () => void;
}

export const CourseManagement: React.FC<CourseManagementProps> = ({ onBack }) => {
    const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [selectedLecture, setSelectedLecture] = useState<number | null>(null);
    const [showAddLectureModal, setShowAddLectureModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isAddingLecture, setIsAddingLecture] = useState(false);
    const [addLectureError, setAddLectureError] = useState<string | null>(null);
    const [expandedLectures, setExpandedLectures] = useState<Set<number>>(new Set());
    const [deleteConfirmation, setDeleteConfirmation] = useState<{
        show: boolean;
        type: 'lecture' | 'material' | 'video';
        lectureNumber?: number;
        materialId?: string;
        materialTitle?: string;
    }>({ show: false, type: 'lecture' });
    const [notification, setNotification] = useState<{
        show: boolean;
        type: 'success' | 'error' | 'info';
        title: string;
        message: string;
    }>({ show: false, type: 'success', title: '', message: '' });

    useEffect(() => {
        if (view === 'list') {
            loadCourses();
        }
    }, [view]);

    const loadCourses = async () => {
        setIsLoading(true);
        try {
            const response = await courseService.getTeacherCourses();
            if (response.success && response.data) {
                setCourses(response.data);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to load courses');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateCourse = () => {
        setView('create');
    };

    const handleCourseCreated = async (courseId: string) => {
        setView('list');
        await loadCourses();
        // Optionally, navigate to the created course
        const course = courses.find(c => c._id === courseId);
        if (course) {
            setSelectedCourse(course);
            setView('edit');
        }
    };

    const handleEditCourse = (course: Course) => {
        setSelectedCourse(course);
        setView('edit');
    };

    const handleAddLecture = () => {
        setShowAddLectureModal(true);
    };

    const handleLectureSubmit = async (title: string, description: string, isFree: boolean) => {
        if (!selectedCourse) return;

        const lectureData: AddLectureData = {
            title,
            description: description || undefined,
            isFree,
        };

        setIsAddingLecture(true);
        setAddLectureError(null);

        try {
            const response = await courseService.addLecture(selectedCourse._id, lectureData);
            
            if (response.success) {
                // Reload course details
                const courseResponse = await courseService.getCourseDetails(selectedCourse._id);
                if (courseResponse.success && courseResponse.data) {
                    setSelectedCourse(courseResponse.data);
                }
                setShowAddLectureModal(false);
            } else {
                setAddLectureError(response.message || 'Failed to add lecture');
            }
        } catch (err: any) {
            setAddLectureError(err.response?.data?.message || 'Failed to add lecture');
        } finally {
            setIsAddingLecture(false);
        }
    };

    const handleUploadContent = (lectureNumber: number) => {
        setSelectedLecture(lectureNumber);
        setShowUploadModal(true);
    };

    const handleUploadSuccess = async () => {
        if (selectedCourse) {
            const response = await courseService.getCourseDetails(selectedCourse._id);
            if (response.success && response.data) {
                setSelectedCourse(response.data);
            }
        }
        setShowUploadModal(false);
    };

    const toggleLectureExpansion = (lectureNumber: number) => {
        setExpandedLectures(prev => {
            const newSet = new Set(prev);
            if (newSet.has(lectureNumber)) {
                newSet.delete(lectureNumber);
            } else {
                newSet.add(lectureNumber);
            }
            return newSet;
        });
    };

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const handleDeleteMaterial = async (lectureNumber: number, materialId: string, materialTitle: string) => {
        setDeleteConfirmation({
            show: true,
            type: 'material',
            lectureNumber,
            materialId,
            materialTitle
        });
    };

    const handleDeleteLecture = async (lectureNumber: number) => {
        setDeleteConfirmation({
            show: true,
            type: 'lecture',
            lectureNumber
        });
    };

    const handleDeleteVideo = async (lectureNumber: number) => {
        setDeleteConfirmation({
            show: true,
            type: 'video',
            lectureNumber
        });
    };

    const confirmDelete = async () => {
        if (!selectedCourse) return;

        try {
            if (deleteConfirmation.type === 'material' && deleteConfirmation.materialId && deleteConfirmation.lectureNumber !== undefined) {
                await courseService.deleteMaterial(
                    selectedCourse._id,
                    deleteConfirmation.lectureNumber,
                    deleteConfirmation.materialId
                );
                setNotification({
                    show: true,
                    type: 'success',
                    title: 'Material Deleted',
                    message: `"${deleteConfirmation.materialTitle}" has been successfully deleted.`
                });
            } else if (deleteConfirmation.type === 'lecture' && deleteConfirmation.lectureNumber !== undefined) {
                await courseService.deleteLecture(selectedCourse._id, deleteConfirmation.lectureNumber);
                setNotification({
                    show: true,
                    type: 'success',
                    title: 'Lecture Deleted',
                    message: `Lecture ${deleteConfirmation.lectureNumber} and all its content have been successfully deleted.`
                });
            } else if (deleteConfirmation.type === 'video' && deleteConfirmation.lectureNumber !== undefined) {
                setNotification({
                    show: true,
                    type: 'info',
                    title: 'Coming Soon',
                    message: 'Video deletion will be implemented soon. Please use Update Content to replace the video.'
                });
                setDeleteConfirmation({ show: false, type: 'lecture' });
                return;
            }

            // Refresh course details
            const response = await courseService.getCourseDetails(selectedCourse._id);
            if (response.success && response.data) {
                setSelectedCourse(response.data);
            }

            setDeleteConfirmation({ show: false, type: 'lecture' });
        } catch (err: any) {
            setNotification({
                show: true,
                type: 'error',
                title: 'Delete Failed',
                message: err.response?.data?.message || 'Failed to delete. Please try again.'
            });
        }
    };

    const handleViewVideo = async (lectureNumber: number) => {
        if (!selectedCourse) return;
        try {
            const response = await courseService.getVideoStreamingUrls(selectedCourse._id, lectureNumber);
            if (response.success && response.data) {
                // Open video in new tab or show in modal
                window.open(response.data.qualities?.[0]?.url || response.data.hls, '_blank');
            }
        } catch (err: any) {
            setNotification({
                show: true,
                type: 'error',
                title: 'Failed to Load Video',
                message: err.response?.data?.message || 'Unable to get video URL. Please try again.'
            });
        }
    };

    if (view === 'create') {
        return (
            <div className="p-6">
                <CreateCourseForm
                    onSuccess={handleCourseCreated}
                    onCancel={() => setView('list')}
                />
            </div>
        );
    }

    if (view === 'edit' && selectedCourse) {
        return (
            <div className="p-6 max-w-6xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <button
                                onClick={() => setView('list')}
                                className="text-blue-600 hover:text-blue-700 flex items-center gap-2 mb-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to Courses
                            </button>
                            <h2 className="text-2xl font-bold text-gray-900">{selectedCourse.class_name}</h2>
                            <p className="text-gray-600 mt-1">{selectedCourse.description}</p>
                        </div>
                    </div>

                    {/* Course Stats */}
                    <div className="grid grid-cols-4 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4">
                            <p className="text-blue-600 text-sm font-medium">Total Lectures</p>
                            <p className="text-2xl font-bold text-blue-900">{selectedCourse.lectures?.length || 0}</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4">
                            <p className="text-green-600 text-sm font-medium">Duration</p>
                            <p className="text-2xl font-bold text-green-900">{selectedCourse.totalDuration || 0} min</p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-4">
                            <p className="text-purple-600 text-sm font-medium">Students</p>
                            <p className="text-2xl font-bold text-purple-900">{selectedCourse.enrollmentCount || 0}</p>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-4">
                            <p className="text-amber-600 text-sm font-medium">Status</p>
                            <p className="text-2xl font-bold text-amber-900">{selectedCourse.isFree ? 'Free' : `$${selectedCourse.price}`}</p>
                        </div>
                    </div>

                    {/* Lectures List */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Lectures</h3>
                            <button
                                onClick={handleAddLecture}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                </svg>
                                Add Lecture
                            </button>
                        </div>

                        {!selectedCourse.lectures || selectedCourse.lectures.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 rounded-lg">
                                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                <p className="text-gray-600">No lectures yet. Add your first lecture to get started.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {selectedCourse.lectures.map((lecture) => {
                                    const isExpanded = expandedLectures.has(lecture.lectureNumber);
                                    return (
                                        <div
                                            key={lecture.lectureNumber}
                                            className="border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-colors"
                                        >
                                            {/* Lecture Header */}
                                            <div className="p-4 bg-white">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                                                Lecture {lecture.lectureNumber}
                                                            </span>
                                                            {lecture.video?.isFree && (
                                                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                                                    Free Preview
                                                                </span>
                                                            )}
                                                        </div>
                                                        <h4 className="text-lg font-semibold text-gray-900 mb-1">{lecture.title}</h4>
                                                        {lecture.description && (
                                                            <p className="text-gray-600 text-sm mb-3">{lecture.description}</p>
                                                        )}
                                                        
                                                        {/* Quick Stats */}
                                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                                            {lecture.video && (
                                                                <span className="flex items-center gap-1">
                                                                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                                                                    </svg>
                                                                    Video uploaded
                                                                    {lecture.video.duration && ` • ${Math.ceil(lecture.video.duration / 60)} min`}
                                                                </span>
                                                            )}
                                                            {!lecture.video && (
                                                                <span className="flex items-center gap-1 text-gray-400">
                                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                                                                    </svg>
                                                                    No video
                                                                </span>
                                                            )}
                                                            {lecture.materials && lecture.materials.length > 0 && (
                                                                <span className="flex items-center gap-1">
                                                                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                                                    </svg>
                                                                    {lecture.materials.length} Material(s)
                                                                </span>
                                                            )}
                                                            {(!lecture.materials || lecture.materials.length === 0) && (
                                                                <span className="flex items-center gap-1 text-gray-400">
                                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                                                    </svg>
                                                                    No materials
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex items-center gap-2 ml-4">
                                                        <button
                                                            onClick={() => toggleLectureExpansion(lecture.lectureNumber)}
                                                            className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                                            title={isExpanded ? "Collapse details" : "Expand details"}
                                                        >
                                                            <svg 
                                                                className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                                                                fill="none" 
                                                                stroke="currentColor" 
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteLecture(lecture.lectureNumber)}
                                                            className="px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Delete lecture"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => handleUploadContent(lecture.lectureNumber)}
                                                            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                                                        >
                                                            {lecture.video ? 'Update Content' : 'Upload Content'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Expanded Details */}
                                            {isExpanded && (
                                                <div className="border-t border-gray-200 bg-gray-50 p-4 space-y-4">
                                                    {/* Video Details */}
                                                    {lecture.video && (
                                                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                                                            <div className="flex items-start justify-between mb-3">
                                                                <div className="flex items-start gap-3 flex-1">
                                                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                                            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                                                                        </svg>
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <h5 className="font-semibold text-gray-900 mb-2">Video Content</h5>
                                                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                                                            <div>
                                                                                <span className="text-gray-600">Duration:</span>
                                                                                <span className="ml-2 text-gray-900 font-medium">
                                                                                    {lecture.video.duration ? `${Math.ceil(lecture.video.duration / 60)} minutes` : 'N/A'}
                                                                                </span>
                                                                            </div>
                                                                            <div>
                                                                                <span className="text-gray-600">Format:</span>
                                                                                <span className="ml-2 text-gray-900 font-medium uppercase">{lecture.video.format || 'N/A'}</span>
                                                                            </div>
                                                                            <div>
                                                                                <span className="text-gray-600">Size:</span>
                                                                                <span className="ml-2 text-gray-900 font-medium">{formatFileSize(lecture.video.size)}</span>
                                                                            </div>
                                                                            <div>
                                                                                <span className="text-gray-600">Access:</span>
                                                                                <span className={`ml-2 font-medium ${lecture.video.isFree ? 'text-green-600' : 'text-gray-900'}`}>
                                                                                    {lecture.video.isFree ? 'Free' : 'Paid'}
                                                                                </span>
                                                                            </div>
                                                                            <div className="col-span-2">
                                                                                <span className="text-gray-600">Uploaded:</span>
                                                                                <span className="ml-2 text-gray-900 font-medium">
                                                                                    {new Date(lecture.video.createdAt).toLocaleDateString('en-US', { 
                                                                                        year: 'numeric', 
                                                                                        month: 'short', 
                                                                                        day: 'numeric',
                                                                                        hour: '2-digit',
                                                                                        minute: '2-digit'
                                                                                    })}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-2 ml-4">
                                                                    <button
                                                                        onClick={() => handleViewVideo(lecture.lectureNumber)}
                                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                                        title="View Video"
                                                                    >
                                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                        </svg>
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleDeleteVideo(lecture.lectureNumber)}
                                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                        title="Delete Video"
                                                                    >
                                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Materials List */}
                                                    {lecture.materials && lecture.materials.length > 0 && (
                                                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                                                    </svg>
                                                                </div>
                                                                <h5 className="font-semibold text-gray-900">Lecture Materials ({lecture.materials.length})</h5>
                                                            </div>
                                                            <div className="space-y-2">
                                                                {lecture.materials.map((material, idx) => (
                                                                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                                                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                                                            <svg className="w-5 h-5 text-gray-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                                                            </svg>
                                                                            <div className="flex-1 min-w-0">
                                                                                <p className="text-sm font-medium text-gray-900 truncate">{material.title}</p>
                                                                                <div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
                                                                                    <span className="uppercase">{material.format}</span>
                                                                                    <span>•</span>
                                                                                    <span>{formatFileSize(material.size)}</span>
                                                                                    <span>•</span>
                                                                                    <span className={material.isDownloadable ? 'text-green-600' : 'text-gray-600'}>
                                                                                        {material.isDownloadable ? 'Downloadable' : 'View only'}
                                                                                    </span>
                                                                                    {material.isFree && (
                                                                                        <>
                                                                                            <span>•</span>
                                                                                            <span className="text-green-600 font-medium">Free</span>
                                                                                        </>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex gap-2 ml-4">
                                                                            <button
                                                                                onClick={() => handleDeleteMaterial(lecture.lectureNumber, material._id, material.title)}
                                                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                                                title="Delete Material"
                                                                            >
                                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                                </svg>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Empty States */}
                                                    {!lecture.video && (!lecture.materials || lecture.materials.length === 0) && (
                                                        <div className="text-center py-6 text-gray-500">
                                                            <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                            </svg>
                                                            <p className="text-sm">No content uploaded yet</p>
                                                            <p className="text-xs mt-1">Click "Upload Content" to add video and materials</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Notification */}
                <Notification
                    show={notification.show}
                    type={notification.type}
                    title={notification.title}
                    message={notification.message}
                    onClose={() => setNotification({ ...notification, show: false })}
                />

                {/* Delete Confirmation Modal */}
                {deleteConfirmation.show && (
                    <div className="fixed inset-0 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                                        {deleteConfirmation.type === 'lecture' && 'Delete Lecture?'}
                                        {deleteConfirmation.type === 'video' && 'Delete Video?'}
                                        {deleteConfirmation.type === 'material' && 'Delete Material?'}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {deleteConfirmation.type === 'lecture' && (
                                            <>Are you sure you want to delete <span className="font-semibold">Lecture {deleteConfirmation.lectureNumber}</span>? This will permanently remove the lecture and all its content (video and materials). This action cannot be undone.</>
                                        )}
                                        {deleteConfirmation.type === 'video' && (
                                            <>Are you sure you want to delete the video for <span className="font-semibold">Lecture {deleteConfirmation.lectureNumber}</span>? This action cannot be undone.</>
                                        )}
                                        {deleteConfirmation.type === 'material' && (
                                            <>Are you sure you want to delete <span className="font-semibold">{deleteConfirmation.materialTitle}</span>? This action cannot be undone.</>
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setDeleteConfirmation({ show: false, type: 'lecture' })}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Yes, Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Upload Content Modal */}
                {showUploadModal && selectedLecture && (
                    <UploadContentModal
                        isOpen={showUploadModal}
                        courseId={selectedCourse._id}
                        lectureNumber={selectedLecture}
                        onClose={() => setShowUploadModal(false)}
                        onSuccess={handleUploadSuccess}
                    />
                )}

                {/* Add Lecture Modal */}
                <AddLectureModal
                    isOpen={showAddLectureModal}
                    onClose={() => setShowAddLectureModal(false)}
                    onAdd={handleLectureSubmit}
                    isLoading={isAddingLecture}
                    error={addLectureError}
                />
            </div>
        );
    }

    // List view
    return (
        <div className="p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
                    <button
                        onClick={handleCreateCourse}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Create New Course
                    </button>
                </div>

                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-gray-600 mt-4">Loading courses...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-12 bg-red-50 rounded-lg">
                        <p className="text-red-600">{error}</p>
                    </div>
                ) : courses.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <p className="text-gray-600 mb-4">No courses yet. Create your first course to get started.</p>
                        <button
                            onClick={handleCreateCourse}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Create Your First Course
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <div
                                key={course._id}
                                onClick={() => handleEditCourse(course)}
                                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                            >
                                {course.thumbnail?.fileUrl ? (
                                    <img
                                        src={course.thumbnail.fileUrl}
                                        alt={course.class_name}
                                        className="w-full h-48 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                        <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                        </svg>
                                    </div>
                                )}
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.class_name}</h3>
                                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">{course.description || 'No description'}</p>
                                    <div className="flex items-center justify-between text-sm text-gray-600">
                                        <span>{course.lectures?.length || 0} lectures</span>
                                        <span>{course.enrollmentCount || 0} students</span>
                                        <span className="font-semibold text-blue-600">
                                            {course.isFree ? 'Free' : `$${course.price}`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

