import React, { useState } from 'react';
import axios from 'axios';
import Toast from '../ui/Toast';

interface FormData {
    name: string;
    subject: string;
    message: string;
}

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await axios.post('/contact', formData, {
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
                }
            });
            console.log(response.data);
            if (response.data.success) {
                setStatus('success');
                setToast({
                    message: 'Thank you for your message. We will get back to you soon!',
                    type: 'success'
                });
                setFormData({
                    name: '',
                    subject: '',
                    message: '',
                });
            } else {
                setStatus('error');
                setToast({
                    message: 'Something went wrong. Please try again.',
                    type: 'error'
                });
            }
        } catch (error) {
            setStatus('error');
            setToast({
                message: 'Something went wrong. Please try again.',
                type: 'error'
            });
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 hover:border-slate-400 hover:shadow-sm focus:border-slate-400 focus:ring-2 focus:ring-slate-200 focus:shadow-md transition-all duration-300 outline-none"
                        />
                </div>

                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                        Subject
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="Message subject"
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 hover:border-slate-400 hover:shadow-sm focus:border-slate-400 focus:ring-2 focus:ring-slate-200 focus:shadow-md transition-all duration-300 outline-none"
                        />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Your message"
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-400 hover:border-slate-400 hover:shadow-sm focus:border-slate-400 focus:ring-2 focus:ring-slate-200 focus:shadow-md transition-all duration-300 outline-none resize-none"
                        />
                </div>

                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-slate-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-slate-700 transition-colors duration-300"
                    >
                    {status === 'loading' ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                        </span>
                    ) : (
                        'Send Message'
                    )}
                </button>
            </form>
        </div>
    );
} 