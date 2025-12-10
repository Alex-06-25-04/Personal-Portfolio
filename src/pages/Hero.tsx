import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useInView from '../hooks/useInView';
import { frasi, techStack } from '../datas/heroDatas';

export default function Hero() {
    const navigate = useNavigate();

    const handleNavigate = (navigation: string) => {
        navigate(navigation);
    };

    const [displayedText, setDisplayedText] = useState("");
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const [leftRef, leftVisible] = useInView<HTMLDivElement>({ threshold: 0.4 });
    const [rightTechRef, rightTechVisible] = useInView<HTMLDivElement>({ threshold: 0.4 });



    useEffect(() => {
        // Variabile currentPhrese = frasi[currentPhraseIndex]
        const currentPhrase = frasi[currentPhraseIndex];

        // Crea un intervallo
        const interval = setInterval(() => {
            // Se isDeleting non esiste
            if (!isDeleting) {
                // Se charIndex è minore della lunghezza della frase corrente
                if (charIndex < currentPhrase.length) {
                    // displayedText (prev + currentPhrase[charIndex])
                    setDisplayedText(prev => prev + currentPhrase[charIndex]);
                    // charIndex (prev + 1)
                    setCharIndex(prev => prev + 1);
                } else {
                    // Altrimenti pulisci l'intervallo
                    clearInterval(interval);
                    // E imposta un timeout con isDeleting true e di 2 secondi
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                // Altrimenti se charIndex è > 0
                if (charIndex > 0) {
                    // displayedText (prev.slice(0, -1))
                    setDisplayedText(prev => prev.slice(0, -1));
                    // charIndex (prev - 1)
                    setCharIndex(prev => prev - 1);
                } else {
                    // Altrimenti isDeleting è false
                    setIsDeleting(false);
                    // currentPhraseIndex((prev + 1) % frasi.length)
                    setCurrentPhraseIndex(prev => (prev + 1) % frasi.length)
                }
            }
            // Velocità scrittura/cancellazione
        }, isDeleting ? 50 : 100);

        // Return clearInterval(interval)
        return () => clearInterval(interval);

        // Array di dipendenze con l'indice della frase corrente, indice del carattere e isDeleting
    }, [currentPhraseIndex, charIndex, isDeleting]);

    return (
        <>
            <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
                </div>

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

                {/* LAYOUT OTTIMIZZATO - Usa tutto lo spazio disponibile */}
                <div className="relative z-10 min-h-screen flex items-center justify-center px-6 sm:px-12 lg:px-20 xl:px-24 py-20">
                    <div className="w-full grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

                        {/* Left Column - Main Content */}
                        <div
                            ref={leftRef}
                            className={`text-center lg:text-left space-y-8 transform transition-all duration-1000
                                       ${leftVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                        >
                            <div>
                                <p className="text-cyan-400 font-medium mb-4 text-lg tracking-wide">
                                    Welcome to my portfolio
                                </p>
                                <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight mb-6">
                                    Hey! I'm{' '}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                        Ale
                                    </span>
                                </h1>

                                {/* Typing Animation */}
                                <div className="h-16 lg:h-20 flex items-center justify-center lg:justify-start">
                                    <span className="text-2xl lg:text-4xl xl:text-5xl font-semibold text-gray-300">
                                        {displayedText}
                                    </span>
                                    <span className="animate-pulse text-cyan-400 text-2xl lg:text-4xl xl:text-5xl ml-1">|</span>
                                </div>
                            </div>

                            <p className="text-lg lg:text-xl xl:text-2xl text-gray-400 leading-relaxed">
                                I'm a passionate developer who loves creating digital experiences.
                                Here you'll find some of the projects I've built over the years.
                                <span className="text-cyan-400 font-medium block mt-2"> Let's build something amazing together!</span>
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-4">
                                <button
                                    onClick={() => handleNavigate('/projects')}
                                    className="group relative px-8 lg:px-10 py-4 lg:py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-2xl transition-transform duration-300 ease-in-out hover:scale-105 hover:translate-y-[-0.25rem] hover:shadow-2xl hover:shadow-cyan-500/50">
                                    <span className="relative z-10">View My Work</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </button>

                                <button
                                    onClick={() => handleNavigate('/contact')}
                                    className="px-8 lg:px-10 py-4 lg:py-5 border-2 border-gray-600 text-gray-300 font-semibold rounded-2xl hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-400/5 transition-all duration-800 hover:translate-y-[-0.25rem] text-base lg:text-lg">
                                    Get In Touch
                                </button>
                            </div>
                        </div>

                        {/* Right Column - Tech Stack OTTIMIZZATO */}
                        <div className="flex justify-center pt-10 lg:justify-end">
                            <div className="relative w-full max-w-lg lg:max-w-none">
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl"></div>
                                <div ref={rightTechRef} className={`relative h-full bg-gray-800/60 backdrop-blur-lg border border-gray-700/50 rounded-3xl p-6 lg:p-8 xl:p-10 shadow-2xl transform transition-all duration-3000 ${rightTechVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                                    <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-8 lg:mb-10 text-center">Tech Stack</h3>
                                    <div className="grid grid-cols-3 gap-4 lg:gap-6 xl:gap-8">
                                        {techStack.map((tech, index) => (
                                            <div
                                                key={tech.name}
                                                className="group relative flex flex-col items-center space-y-3 lg:space-y-4 p-4 lg:p-5 xl:p-6 rounded-2xl bg-gray-900/60 border border-gray-700/40 hover:border-cyan-400/60 transition-all duration-300 hover:-translate-y-3 hover:shadow-xl"
                                                style={{ animationDelay: `${index * 100}ms` }}
                                            >
                                                <div
                                                    className={`w-12 h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 rounded-2xl bg-gradient-to-br ${tech.color} flex items-center justify-center text-lg lg:text-2xl xl:text-3xl shadow-lg group-hover:scale-125 transition-transform duration-300`}
                                                >
                                                    {tech.icon}
                                                </div>
                                                <span className="text-xs lg:text-sm xl:text-base font-semibold text-gray-300 group-hover:text-white transition-colors text-center">
                                                    {tech.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <style>{`
                .bg-grid-pattern {
                    background-image: 
                        linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px);
                    background-size: 50px 50px;
                }
            `}</style>
            </div>
        </>
    );
}