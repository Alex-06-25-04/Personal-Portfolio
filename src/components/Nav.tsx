import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { navItems } from '../datas/navItems';

export default function Navbar() {
    const location = useLocation();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-700/30">
            <nav className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-6">
                {/* Logo */}
                <div className="text-3xl font-bold">
                    <Link to='/' className="group">
                        <span className="text-white group-hover:text-cyan-400 transition-colors duration-300">Ale</span>
                        <span className="text-cyan-400">.</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 ${isActive(item.path)
                                ? 'text-cyan-400 bg-cyan-400/10'
                                : 'text-gray-300 hover:text-white hover:bg-gray-700/30'
                                }`}
                        >
                            {item.name}
                            {isActive(item.path) && (
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full"></div>
                            )}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center space-y-1 z-50"
                >
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </button>
            </nav>

            {/* Mobile Menu */}
            <div className={`md:hidden fixed inset-x-0 top-0 bg-gray-900/95 backdrop-blur-lg transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
                }`}>
                <div className="pt-20 pb-8 px-4 space-y-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block px-6 py-4 rounded-2xl font-medium text-xl transition-all duration-300 ${isActive(item.path)
                                ? 'text-cyan-400 bg-cyan-400/10'
                                : 'text-gray-300 hover:text-white hover:bg-gray-700/30'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    );
}