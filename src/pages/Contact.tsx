import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import DOMPurify from 'dompurify';
import { Title, Meta } from 'react-head';
import useInView from '../hooks/useInView';
import type { ContactInfo } from '../interfaces/ContactInfo';
import { mockContactInfo } from '../datas/contactInfo';

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);

    const [mainRef, mainInView] = useInView<HTMLDivElement>({ threshold: 0.6 });
    const [contactRef, contactInView] = useInView<HTMLDivElement>({ threshold: 0.2 });
    const [contactInfoRef, contactInfoInView] = useInView<HTMLDivElement>({ threshold: 0.2 });
    const [connectRef, connectInView] = useInView<HTMLDivElement>({ threshold: 0.2 });
    const [callToActionRef, callToActionInView] = useInView<HTMLDivElement>({ threshold: 0.2 });

    const deployContactInfo = () => setContactInfo(mockContactInfo);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // evita il reload della pagina

        // Toast di loading mentre invii
        const loadingToast = toast.loading('Sending your message...', {
            style: {
                background: 'rgba(31, 41, 55, 0.95)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(107, 114, 128, 0.3)',
                color: '#ffffff',
            }
        });

        // Sanitizza gli input prima dell'invio
        const sanitizedData = {
            from_name: DOMPurify.sanitize(name.trim()),
            from_email: DOMPurify.sanitize(email.trim()),
            subject: DOMPurify.sanitize(subject.trim()),
            message: DOMPurify.sanitize(message.trim()),
        };

        if (!sanitizedData.from_name || !sanitizedData.from_email || !sanitizedData.message) {
            toast.error('Please fill all required fields');
            return;
        }

        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    from_name: sanitizedData.from_name,
                    from_email: sanitizedData.from_email,
                    subject: sanitizedData.subject,
                    message: sanitizedData.message
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            )

            // Dismissi il toast di loading e mostra successo
            toast.dismiss(loadingToast);

            toast.success('Message sent successfully! I\'ll get back to you soon.', {
                duration: 5000,
                style: {
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    color: '#ffffff',
                },
                iconTheme: {
                    primary: '#06b6d4',
                    secondary: '#ffffff',
                },
            });

            // Reset form
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');

        } catch (e) {
            // Dismissi il toast di loading e mostra errore
            toast.dismiss(loadingToast);
            toast.error('Failed to send message. Please try again or contact me directly.', {
                duration: 6000,
                style: {
                    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1))',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#ffffff',
                },
                iconTheme: {
                    primary: '#ef4444',
                    secondary: '#ffffff',
                },
            });
        }
    };

    useEffect(() => {
        deployContactInfo();
    }, []);

    return (
        <>
            <Title>Ale - Contact</Title>
            <Meta name="description" content="Get in touch with me. Feel free to reach out for collaborations, inquiries, or just to say hello." />

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden px-6 sm:px-12 lg:px-20 xl:px-24 py-24">
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="relative z-10">
                    {/* Header */}
                    <div ref={mainRef} className="text-center mb-16">
                        <h1 className={`transition-all duration-800 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 ${mainInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
                            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Touch</span>
                        </h1>
                        <p className={`transition-all duration-2000 text-lg lg:text-xl text-gray-400 max-w-4xl mx-auto ${mainInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
                            Have a project in mind? Let's discuss how we can bring your ideas to life.
                            I'm always excited to work on new challenges.
                        </p>
                    </div>

                    {/* LAYOUT OTTIMIZZATO - Usa tutto lo spazio disponibile */}
                    <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start">

                        {/* Left: Contact Form - OTTIMIZZATO */}
                        <div className="relative w-full">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl blur-xl"></div>
                            <div ref={contactRef} className={`transition-all duration-4000 ${contactInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} relative bg-gray-800/40 backdrop-blur-lg border border-gray-700/30 rounded-3xl p-6 lg:p-8 xl:p-10 shadow-2xl`}>
                                <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-6 lg:mb-8">Send Me a Message</h2>

                                <form className="space-y-6 lg:space-y-8" onSubmit={handleSubmit}>
                                    {/* Name e Email in riga */}
                                    <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
                                        <div>
                                            <label className="block text-gray-300 text-sm lg:text-base font-medium mb-2">
                                                Your Name *
                                            </label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                placeholder="John Doe"
                                                className="w-full bg-gray-900/40 backdrop-blur-sm border border-gray-700/40 rounded-xl px-4 lg:px-5 py-3 lg:py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-sm lg:text-base"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-gray-300 text-sm lg:text-base font-medium mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                placeholder="john@example.com"
                                                className="w-full bg-gray-900/40 backdrop-blur-sm border border-gray-700/40 rounded-xl px-4 lg:px-5 py-3 lg:py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-sm lg:text-base"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label className="block text-gray-300 text-sm lg:text-base font-medium mb-2">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            value={subject}
                                            onChange={e => setSubject(e.target.value)}
                                            placeholder="Project Inquiry"
                                            className="w-full bg-gray-900/40 backdrop-blur-sm border border-gray-700/40 rounded-xl px-4 lg:px-5 py-3 lg:py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-sm lg:text-base"
                                        />
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-gray-300 text-sm lg:text-base font-medium mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            value={message}
                                            onChange={e => setMessage(e.target.value)}
                                            placeholder="Tell me about your project..."
                                            rows={6}
                                            className="w-full bg-gray-900/40 backdrop-blur-sm border border-gray-700/40 rounded-xl px-4 lg:px-5 py-3 lg:py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 resize-none text-sm lg:text-base"
                                            required
                                        ></textarea>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="group relative w-full px-6 lg:px-8 py-4 lg:py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/30 hover:-translate-y-1 text-base lg:text-lg"
                                    >
                                        <span className="relative z-10 flex items-center justify-center space-x-2">
                                            <span>Send Message</span>
                                            <svg className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Right: Contact Info - OTTIMIZZATO */}
                        <div className="space-y-6 lg:space-y-8 w-full">
                            <div ref={contactInfoRef}>
                                <h2 className={`transition-all duration-6000 ${contactInfoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4 lg:mb-6`}>Let's Connect</h2>
                                <p className={`transition-all duration-6000 ${contactInfoInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} text-base lg:text-lg xl:text-xl text-gray-400 leading-relaxed`}>
                                    I'm always open to discussing new opportunities, creative projects,
                                    or just having a chat about technology and development.
                                </p>
                            </div>

                            {/* Contact Cards - OTTIMIZZATO */}
                            <div ref={connectRef} className="space-y-4 lg:space-y-6">
                                {contactInfo.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`transition-all duration-5000 
                                                    ${connectInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
                                                    group relative bg-gray-800/40 backdrop-blur-lg border border-gray-700/30
                                                    rounded-2xl p-6 lg:p-8 xl:p-10 hover:shadow-xl hover:-translate-y-1`}
                                        style={{
                                            transitionDelay: `${index * 500}ms`
                                        }}
                                    >
                                        <div className="flex items-start space-x-4 lg:space-x-6">
                                            <div className="flex-shrink-0 w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center text-xl lg:text-2xl xl:text-3xl">
                                                {item.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg lg:text-xl xl:text-2xl font-bold text-white mb-1 lg:mb-2 group-hover:text-cyan-400 transition-colors">
                                                    {item.title}
                                                </h3>
                                                <p className="text-cyan-400 font-medium mb-1 lg:mb-2 text-sm lg:text-base xl:text-lg">
                                                    {item.info}
                                                </p>
                                                <p className="text-gray-400 text-xs lg:text-sm xl:text-base">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Hover Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
                                    </div>
                                ))}
                            </div>

                            {/* Call to Action - OTTIMIZZATO */}
                            <div ref={callToActionRef} className={`transition-all duration-3000 ${callToActionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} relative bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-6 lg:p-8 xl:p-10`}>
                                <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-3 lg:mb-4">
                                    Ready to Start Your Project?
                                </h3>
                                <p className="text-gray-300 mb-4 lg:mb-6 text-sm lg:text-base xl:text-lg">
                                    I typically respond within 24 hours. Let's discuss your ideas and bring them to life!
                                </p>
                                <div className="flex items-center text-cyan-400 text-xs lg:text-sm xl:text-base">
                                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                                    Currently available for new projects
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}