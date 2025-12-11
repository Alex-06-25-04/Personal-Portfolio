import { useState, useEffect } from 'react';
import { Title, Meta } from 'react-head';
import useInView from '../hooks/useInView';
import type { Skill, JourneyItem } from '../interfaces/AboutInterfaces';
import { mockBio, mockSkills, mockJourney } from '../datas/aboutDatas';

export default function About() {
    const name = 'Alessandro';

    const [bio, setBio] = useState<string[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [journey, setJourney] = useState<JourneyItem[]>([]);

    const [titleRef, titleInView] = useInView<HTMLDivElement>({ threshold: 0.3 });
    const [mainRef, mainInView] = useInView<HTMLDivElement>({ threshold: 0.3 });
    const [skillsSectionRef, skillsSectionInView] = useInView<HTMLDivElement>({ threshold: 0.4 });
    const [journeyRef, journeyInView] = useInView<HTMLDivElement>({ threshold: 0.4 });

    const deployDatas = () => {
        setBio(mockBio);
        setSkills(mockSkills);
        setJourney(mockJourney);
    };


    useEffect(() => {
        deployDatas();
    }, []);

    return (
        <>
            <Title>Ale - About</Title>
            <Meta name="description" content="Learn more about me, my background, skills, and passion for development. Discover what drives my work and creativity." />

            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden px-6 sm:px-12 lg:px-20 xl:px-24 py-24">
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="relative z-10">
                    {/* Header */}
                    <div ref={titleRef} className="text-center mb-16">
                        <h1 className={`transition-all duration-800 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6`}>
                            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Me</span>
                        </h1>
                        <p className={`transition-all duration-2000 ${titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} text-lg lg:text-xl text-gray-400 max-w-4xl mx-auto`}>
                            Get to know the person behind the code. My journey, skills, and passion for development.
                        </p>
                    </div>

                    <div className="w-full space-y-20 lg:space-y-24">
                        {/* MAIN ABOUT SECTION - Con animazione */}
                        <div
                            ref={mainRef}
                            className={`grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center transition-all duration-5000 ${mainInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
                        >
                            {/* Left: Photo Placeholder */}
                            <div className={`transition-all duration-3000 ${mainInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'} order-2 lg:order-1 flex justify-center lg:justify-start`}>
                                <div className="relative w-full max-w-md lg:max-w-lg">
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-3xl blur-xl"></div>
                                    <div className="relative w-full aspect-[4/5] bg-gray-800/60 backdrop-blur-lg border border-gray-700/50 rounded-3xl overflow-hidden">
                                        <div className="w-full h-full bg-gradient-to-br from-gray-700/50 to-gray-800/50 flex items-center justify-center">
                                            <div className="text-center text-gray-400">
                                                <div className={` text-5xl lg:text-6xl xl:text-7xl mb-4`}>
                                                    <img src="https://res.cloudinary.com/ddmfajyml/image/upload/v1765332185/IO_svw1wd.jpg"
                                                        className="pt-6 rounded-4xl object-cover" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: About Text */}
                            <div className="order-1 lg:order-2 space-y-6 lg:space-y-8">
                                <div className={`transition-all duration-6000 space-y-6 ${mainInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
                                    <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6">
                                        Hi! I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{name}</span>
                                    </h2>

                                    {/* ✅ Nessun hook nel map */}
                                    {bio.map((p, index) => (
                                        <p
                                            key={index}
                                            className={`${index === 0
                                                ? 'text-lg lg:text-xl xl:text-2xl text-gray-300 leading-relaxed'
                                                : 'text-base lg:text-lg xl:text-xl text-gray-400 leading-relaxed'
                                                }`}
                                        >
                                            {p}
                                        </p>
                                    ))}
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-3 gap-6 lg:gap-8 pt-6 lg:pt-8">
                                    <div className="text-center">
                                        <div className="text-2xl lg:text-3xl xl:text-4xl font-bold text-cyan-400">10+</div>
                                        <div className="text-gray-400 text-xs lg:text-sm">Projects Built</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl lg:text-3xl xl:text-4xl font-bold text-cyan-400">6</div>
                                        <div className="text-gray-400 text-xs lg:text-sm">Technologies</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl lg:text-3xl xl:text-4xl font-bold text-cyan-400">6+</div>
                                        <div className="text-gray-400 text-xs lg:text-sm">Month Learning</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SKILLS SECTION - Con animazione */}
                        <div
                            ref={skillsSectionRef}
                            className={`transition-all duration-2000 ${skillsSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                                }`}
                        >
                            <h2 className="transition-all duration-500 text-3xl lg:text-4xl xl:text-5xl font-bold text-white text-center mb-12 lg:mb-16">
                                Core <span className="text-cyan-400">Skills</span>
                            </h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10">
                                {/* ✅ Nessun hook nel map - usa CSS per stagger */}
                                {skills.map((skill, index) => (
                                    <div
                                        key={skill.name}
                                        className="group relative bg-gray-800/40 backdrop-blur-lg border border-gray-700/30 rounded-2xl p-6 lg:p-8 xl:p-10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-2000"
                                        style={{
                                            transitionDelay: `${index * 500}ms`,
                                            opacity: skillsSectionInView ? 1 : 0,
                                            transform: skillsSectionInView ? 'translateY(0)' : 'translateY(4rem)'
                                        }}
                                    >
                                        <div className="text-3xl lg:text-4xl xl:text-5xl mb-4 lg:mb-6">{skill.icon}</div>
                                        <h3 className="text-lg lg:text-xl xl:text-2xl font-bold text-white mb-3 lg:mb-4 group-hover:text-cyan-400 transition-colors">
                                            {skill.name}
                                        </h3>
                                        <p className="text-gray-400 text-sm lg:text-base leading-relaxed">
                                            {skill.description}
                                        </p>

                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* JOURNEY TIMELINE - Con animazione */}
                        <div
                            ref={journeyRef}
                            className={`transition-all duration-500 ${journeyInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                                }`}
                        >
                            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white text-center mb-12 lg:mb-16">
                                My <span className="text-cyan-400">Journey</span>
                            </h2>
                            <div className="w-full max-w-5xl mx-auto">
                                {journey.map((item, index) => (
                                    <div
                                        key={index}
                                        className="relative flex items-center mb-12 lg:mb-16 last:mb-0 transition-all duration-3000"
                                        style={{
                                            transitionDelay: `${index * 500}ms`,
                                            opacity: journeyInView ? 1 : 0,
                                            transform: journeyInView ? 'translateX(0)' : 'translateX(-2rem)'
                                        }}
                                    >
                                        {index !== journey.length - 1 && (
                                            <div className="absolute left-6 md:left-8 top-14 md:top-16 w-0.5 h-16 md:h-20 bg-gradient-to-b from-cyan-400 to-blue-500 -z-10"></div>
                                        )}

                                        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                            {item.month}
                                        </div>

                                        <div className="ml-8 bg-gray-800/40 backdrop-blur-lg border border-gray-700/30 rounded-2xl p-6 flex-1">
                                            <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                                            <p className="text-gray-400">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}