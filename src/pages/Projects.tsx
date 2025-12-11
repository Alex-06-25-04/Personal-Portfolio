import useInView from '../hooks/useInView';
import { Title, Meta } from 'react-head';
import { projects } from '../datas/projects';
import { useEffect, useState } from 'react';

export default function Projects() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [titleRef, titleInView] = useInView<HTMLDivElement>({ threshold: isMobile ? 0.2 : 0.5 });

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <Title>Ale - Projects</Title>
            <Meta name="description" content="Explore my portfolio of projects. Discover the work I've done, the technologies I use, and the solutions I've built." />


            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden px-6 sm:px-12 lg:px-20 xl:px-24 py-24">
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/3 right-1/6 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="relative z-10">
                    <div ref={titleRef} className="text-center mb-16">
                        <h1 className={`transition-all duration-800 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6`}>
                            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Projects</span>
                        </h1>
                        <p className={`transition-all duration-2000 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} text-lg lg:text-xl text-gray-400 max-w-4xl mx-auto`}>
                            A collection of projects I've built using modern technologies and best practices.
                            Each project represents a unique challenge and learning experience.
                        </p>
                    </div>

                    {/* LAYOUT: Usa tutto lo spazio disponibile */}
                    <div className="w-full space-y-8 lg:space-y-12">
                        {projects.map((project, index) => {
                            const [ref, inView] = useInView<HTMLDivElement>({ threshold: isMobile ? 0.2 : 0.5 }) // // threshold 0.2 significa che l'animazione parte quando il 20% dell'elemento è visibile
                            return (
                                <div
                                    ref={ref}
                                    key={project.id}
                                    className={`group relative bg-gray-800/40 backdrop-blur-lg border border-gray-700/30 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-2000 hover:-translate-y-2 
                              ${inView
                                            ? 'translate-y-0 opacity-100' // Stato "visibile"
                                            : 'translate-y-16 opacity-0'    // Stato iniziale "nascosto"
                                        }
                              ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                                        } flex flex-col lg:flex`}
                                    // Se la condizione index % 2 === 0 è vera (cioè, l'indice è pari), 
                                    // viene applicata la classe lg:flex-row. 
                                    // Questa classe imposta la direzione di Flexbox su una riga normale, 
                                    // mantenendo l'ordine originale dei div: prima l'immagine (Preview Section),
                                    //  poi il contenuto (Content Section).
                                    style={{ animationDelay: `${index * 150}ms` }}
                                >
                                    {/* Preview Section */}
                                    <div className="lg:w-2/5 xl:w-1/3 relative bg-gradient-to-br from-gray-900/60 to-gray-800/60 overflow-hidden min-h-[250px] p-4 lg:min-h-[350px] xl:min-h-[400px]">
                                        <img
                                            src={project.preview}
                                            alt={project.name}
                                            loading="lazy"
                                            className={`rounded-2xl opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 shadow-2xl
                                                    ${project.isMobile
                                                    ? 'w-full h-auto max-h-[300px] lg:max-h-[500px] object-contain' // immagine mobile: alta e centrata
                                                    : 'w-full h-full min-h-[300px] lg:min-h-[350px] object-cover'   // immagine desktop: riempie tutto
                                                }`}
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                        {/* Status Badge */}
                                        <div className="absolute top-4 lg:top-6 right-4 lg:right-6">
                                            <span className="px-3 lg:px-4 py-1 lg:py-2 bg-cyan-900/20 backdrop-blur-sm text-cyan-300 rounded-full text-xs lg:text-sm font-medium border border-cyan-500/30">
                                                {project.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="lg:w-3/5 xl:w-2/3 p-8 lg:p-12 xl:p-16 flex flex-col justify-center">
                                        <div className="space-y-6 lg:space-y-8">
                                            <div>
                                                <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-4 lg:mb-6 group-hover:text-cyan-400 transition-colors duration-300">
                                                    {project.name}
                                                </h2>
                                                <p className="text-gray-300 text-base lg:text-lg xl:text-xl leading-relaxed">
                                                    {project.description}
                                                </p>
                                            </div>

                                            {/* Tech Stack */}
                                            <div className="space-y-3 lg:space-y-4">
                                                <h3 className="text-sm lg:text-base font-semibold text-cyan-400 uppercase tracking-wider">
                                                    Technologies Used
                                                </h3>
                                                <div className="flex flex-wrap gap-2 lg:gap-3">
                                                    {project.tech.split(', ').map((tech, techIndex) => (
                                                        <span
                                                            key={techIndex}
                                                            className="px-3 lg:px-4 py-1 lg:py-2 bg-gray-900/60 text-gray-300 rounded-xl text-xs lg:text-sm font-medium border border-gray-700/50 hover:border-cyan-400/50 hover:text-cyan-400 transition-colors duration-200"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                                {/* <button className="px-6 lg:px-8 py-3 lg:py-4 border border-gray-600 text-gray-300 font-semibold rounded-xl hover:border-cyan-400 hover:text-cyan-400 hover:bg-cyan-400/5 transition-all duration-300 text-sm lg:text-base">
                                                View Demo
                                            </button> */}

                                                <a target="_blank" href={project.github}>
                                                    <button className="px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-1 transition-all duration-300 text-sm lg:text-base">
                                                        Source Code
                                                    </button>
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}