import React, { useState, useEffect } from 'react';
import { Button, Input, Card } from '../ui';

interface AddLectureModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (title: string, description: string, isFree: boolean) => void;
    isLoading: boolean;
    error: string | null;
}

export const AddLectureModal: React.FC<AddLectureModalProps> = ({ isOpen, onClose, onAdd, isLoading, error }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isFree, setIsFree] = useState(false);
    const [inputError, setInputError] = useState<string | null>(null);

    // Reset form when modal closes
    useEffect(() => {
        if (!isOpen) {
            setTitle('');
            setDescription('');
            setIsFree(false);
            setInputError(null);
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            setInputError('Lecture title cannot be empty.');
            return;
        }
        setInputError(null);
        onAdd(title, description, isFree);
    };

    const handleClose = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md p-6 relative shadow-2xl">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={isLoading}
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Lecture</h2>

                {(error || inputError) && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                        {error || inputError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Lecture Title"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value); setInputError(null); }}
                        placeholder="e.g., Introduction to React Hooks"
                        required
                        disabled={isLoading}
                    />
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            Description (Optional)
                        </label>
                        <textarea
                            id="description"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Briefly describe the lecture content..."
                            disabled={isLoading}
                        ></textarea>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="isFree"
                            checked={isFree}
                            onChange={(e) => setIsFree(e.target.checked)}
                            className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                            disabled={isLoading}
                        />
                        <label htmlFor="isFree" className="ml-2 text-sm text-gray-900">
                            Mark as Free Lecture
                        </label>
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                        <Button type="button" variant="ghost" onClick={handleClose} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" disabled={isLoading}>
                            {isLoading ? 'Adding...' : 'Add Lecture'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};
