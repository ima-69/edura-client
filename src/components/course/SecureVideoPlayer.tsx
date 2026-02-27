import React, { useEffect, useRef, useState } from 'react';
import courseService from '../../services/courseService';

interface SecureVideoPlayerProps {
    courseId: string;
    lectureNumber: number;
    autoPlay?: boolean;
    onError?: (error: string) => void;
}

export const SecureVideoPlayer: React.FC<SecureVideoPlayerProps> = ({
    courseId,
    lectureNumber,
    autoPlay = false,
    onError
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoUrl, setVideoUrl] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [quality, setQuality] = useState<'720p' | '480p' | '360p'>('720p');
    const [streamingUrls, setStreamingUrls] = useState<any>(null);

    useEffect(() => {
        loadVideoUrl();
    }, [courseId, lectureNumber]);

    useEffect(() => {
        if (streamingUrls && quality) {
            const qualityMap = {
                '720p': streamingUrls.mp4_720p,
                '480p': streamingUrls.mp4_480p,
                '360p': streamingUrls.mp4_360p
            };
            setVideoUrl(qualityMap[quality] || streamingUrls.mp4_720p);
        }
    }, [quality, streamingUrls]);

    const loadVideoUrl = async () => {
        setIsLoading(true);
        setError('');

        try {
            const response = await courseService.getVideoStreamingUrls(courseId, lectureNumber);
            
            if (response.success) {
                setStreamingUrls(response.data.streamingUrls);
                setVideoUrl(response.data.streamingUrls.mp4_720p);
            } else {
                const errorMsg = response.message || 'Failed to load video';
                setError(errorMsg);
                onError?.(errorMsg);
            }
        } catch (err: any) {
            const errorMsg = err.response?.data?.message || 'Failed to load video. Please try again.';
            setError(errorMsg);
            onError?.(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    // Prevent right-click and download
    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        return false;
    };

    // Prevent keyboard shortcuts for downloading
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (
            (e.ctrlKey && e.key === 's') || // Ctrl+S
            (e.metaKey && e.key === 's') || // Cmd+S
            e.key === 'F12' // DevTools
        ) {
            e.preventDefault();
            return false;
        }
    };

    if (isLoading) {
        return (
            <div className="w-full aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
                    <p className="text-white text-sm">Loading video...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full aspect-video bg-red-50 rounded-lg flex items-center justify-center border-2 border-red-200">
                <div className="text-center space-y-4 p-6">
                    <svg className="w-16 h-16 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <h3 className="text-lg font-semibold text-red-900 mb-2">Video Unavailable</h3>
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                    <button
                        onClick={loadVideoUrl}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full space-y-4">
            <div 
                className="relative w-full aspect-video bg-black rounded-lg overflow-hidden"
                onContextMenu={handleContextMenu}
                onKeyDown={handleKeyDown}
            >
                <video
                    ref={videoRef}
                    src={videoUrl}
                    controls
                    controlsList="nodownload noplaybackrate"
                    disablePictureInPicture
                    autoPlay={autoPlay}
                    className="w-full h-full"
                    onError={() => {
                        setError('Failed to play video. Please try another quality.');
                    }}
                >
                    Your browser does not support the video tag.
                </video>

                {/* Watermark overlay (optional) */}
                <div className="absolute top-4 left-4 bg-black bg-opacity-50 px-3 py-1 rounded text-white text-sm">
                    Edura
                </div>
            </div>

            {/* Quality selector */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Quality:</span>
                    <div className="flex gap-2">
                        {['720p', '480p', '360p'].map((q) => (
                            <button
                                key={q}
                                onClick={() => setQuality(q as any)}
                                className={`
                                    px-3 py-1 text-sm rounded-lg transition-colors
                                    ${quality === q 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                                `}
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>Secure Streaming</span>
                </div>
            </div>

            {/* Warning message */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div className="text-sm text-amber-800">
                    <strong>Protected Content:</strong> This video is protected and cannot be downloaded. 
                    Screen recording is monitored and may result in account suspension.
                </div>
            </div>
        </div>
    );
};

