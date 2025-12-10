import { socialLinks, quickLinks } from '../datas/footerItems';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-gray-900/60 backdrop-blur-lg border-t border-gray-700/30 mt-2">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent pointer-events-none"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-16">
                <div className="grid md:grid-cols-4 gap-12">

                    {/* Brand Section */}
                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <div className="text-3xl font-bold mb-4">
                                <span className="text-white">Ale</span>
                                <span className="text-cyan-400">.</span>
                            </div>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                                Full Stack Developer passionate about creating amazing digital experiences.
                                Let's build something great together.
                            </p>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h3 className="text-white font-semibold mb-4">Connect With Me</h3>
                            <div className="flex space-x-4">
                                {socialLinks.map((link) => (
                                    <a
                                        target={`${link.name === 'Email' ? '' : '_blank'}`}
                                        key={link.name}
                                        href={link.href}
                                        className="group relative w-12 h-12 bg-gray-800/60 hover:bg-cyan-500/20 border border-gray-700/50 hover:border-cyan-400/50 rounded-xl flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:-translate-y-1"
                                        aria-label={link.name}
                                    >
                                        {link.icon}
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-white font-semibold text-lg">Quick Links</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tech Stack */}
                    <div className="space-y-6">
                        <h3 className="text-white font-semibold text-lg">Tech Stack</h3>
                        <div className="space-y-3 text-sm">
                            <div className="text-gray-400">Frontend: React, JavaScript, CSS, Bootstrap</div>
                            <div className="text-gray-400">Backend: Node.js, Express, ORM Prisma, PHP</div>
                            <div className="text-gray-400">Database: MySQL</div>
                            <div className="text-gray-400">Mobile: React Native</div>
                        </div>

                        {/* Status Indicator */}
                        <div className="flex items-center space-x-2 text-sm">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-gray-400">Available for new projects</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-700/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div></div>

                    <div className="flex items-center space-x-6 text-sm text-gray-400">
                        © {currentYear} Alessandro Maria Leonardo Mattera. All rights reserved.
                    </div>
                </div>
            </div>

            {/* Decorative gradient at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
        </footer>
    );
}