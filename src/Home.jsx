import React from 'react';
import { Button, FadeInSection } from './App';

export default function Home({ setPage }) {
    const services = [
        { title: "General Checkup", desc: "Comprehensive health assessments for all ages.", icon: "🩺" },
        { title: "Diabetes Care", desc: "Expert management and dietary planning.", icon: "🩸" },
        { title: "Child Vaccination", desc: "Safe, scheduled immunizations for children.", icon: "💉" },
        { title: "Women’s Health", desc: "Specialized care, screenings, and consultations.", icon: "👩‍⚕️" },
        { title: "Cardiology", desc: "Advanced heart care and prevention programs.", icon: "❤️" },
        { title: "Pediatrics", desc: "Compassionate healthcare for infants and adolescents.", icon: "🧸" },
        { title: "Dermatology", desc: "Treatments for skin, hair, and nail conditions.", icon: "✨" },
        { title: "Dental Care", desc: "Complete oral health services and treatments.", icon: "🦷" }
    ];

    return (
        <>
            {/* Hero Section */}
            {/* Hero Section */}
            <FadeInSection>
                <section className="relative overflow-hidden bg-white pt-6 pb-16 md:pt-10 md:pb-24">
                    {/* Decorative Gradient Background (Blue) */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/30 rounded-[50%] blur-[120px] pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
                    <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-600/20 rounded-[50%] blur-[120px] pointer-events-none transform -translate-x-1/4 translate-y-1/4" />

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
                        {/* Left Content */}
                        <div className="flex-[0.9] space-y-6 z-10 pt-4">
                            {/* Pill Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f0f5ff] border border-blue-100 pointer-events-none">
                                <svg className="w-4 h-4 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-xs font-bold text-[#2563EB] tracking-wider uppercase pt-[1px]">Licensed & Verified Doctors</span>
                            </div>

                            {/* Main Heading */}
                            <h1 className="font-heading text-5xl md:text-[4.5rem] md:leading-[1.1] font-black text-[#111827] tracking-tight">
                                Professional <br/>
                                <span className="text-[#2563EB]">Medical Services</span> <br/>
                                You Can <br/>
                                Trust
                            </h1>

                            {/* Subtext */}
                            <p className="text-lg text-gray-600 max-w-[420px] font-medium leading-relaxed mt-2 border-l-2 border-transparent">
                                Expert medical solutions for families and individuals. Certified doctors providing safe, reliable, and affordable healthcare services 24/7.
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap items-center gap-4 pt-4">
                                <Button onClick={() => setPage('Contact')} className="!py-[14px] !px-8 text-base font-bold rounded-xl shadow-[0_8px_16px_rgba(37,99,235,0.25)] hover:-translate-y-1 transition-transform">
                                    Call Now
                                </Button>
                                <button 
                                    onClick={() => setPage('Contact')} 
                                    className="bg-white text-gray-900 border-[1.5px] border-gray-200 hover:border-gray-300 font-heading font-bold py-[14px] px-8 rounded-xl transition-all duration-200 text-base shadow-sm hover:-translate-y-1"
                                >
                                    Book Appointment
                                </button>
                            </div>
                        </div>

                        {/* Right Image Container */}
                        <div className="flex-[1.1] w-full relative mt-12 md:mt-0">
                            <div className="relative w-full h-[400px] md:h-[550px] rounded-bl-[4rem] rounded-tr-[4rem] rounded-tl-xl rounded-br-xl overflow-hidden ml-auto">
                                <img
                                    src="/Hero_indiandoctor.jpg"
                                    alt="CityCare Professional Medical Staff"
                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-black/5 pointer-events-none" />
                            </div>

                            {/* Floating Doctor Qualification Card */}
                            <div className="absolute -bottom-8 -left-4 md:-bottom-10 md:left-[-4rem] bg-gradient-to-br from-[#10b981] to-[#047857] text-white p-5 md:p-7 border-[6px] border-white rounded-[1.5rem] shadow-2xl flex items-center gap-5 z-20 transition-transform duration-300 hover:-translate-y-2">
                                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm border-2 border-white/50 rounded-full flex items-center justify-center flex-shrink-0 shadow-inner">
                                    <svg className="w-7 h-7 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                </div>
                                <div className="pr-2 flex flex-col">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[11px] font-bold tracking-widest text-[#d1fae5] uppercase drop-shadow-sm">Chief Medical Officer</span>
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#a7f3d0]"></div>
                                    </div>
                                    <p className="text-[24px] font-black leading-tight drop-shadow-md">Dr. Sanjay Gupta</p>
                                    <p className="text-[13px] font-semibold text-[#ecfdf5] mt-1 drop-shadow-sm">15+ Years Exp. • AIIMS Alumnus</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </FadeInSection>

            {/* Quick Services */}
            <FadeInSection>
                <section className="py-16 md:py-24">
                    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="font-heading text-3xl font-bold text-gray-900">Our Services</h2>
                            <p className="text-gray-600 mt-4">Comprehensive medical solutions under one roof.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {services.map((srv, idx) => (
                                <article key={idx} className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white hover:-translate-y-1 duration-300 aspect-square flex flex-col items-center justify-center text-center">
                                    <div className="text-4xl mb-4">{srv.icon}</div>
                                    <h3 className="font-heading text-xl font-semibold text-medical mb-2">{srv.title}</h3>
                                    <p className="text-gray-600 text-sm">{srv.desc}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </FadeInSection>

            {/* Trust Section */}
            <FadeInSection>
                <section className="bg-medical text-white py-16 w-full">
                    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="font-heading text-3xl font-bold mb-6">Why Choose Us?</h2>
                            <ul className="space-y-4">
                                {['10+ Years of Excellence', 'Board Certified Doctors', 'Affordable Treatments', 'State-of-the-Art Equipment'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <svg className="w-6 h-6 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        <span className="font-medium text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white text-gray-800 p-8 rounded-lg shadow-xl">
                            <div className="w-32 h-32 bg-gray-300 rounded-full mb-4 mx-auto overflow-hidden">
                                <img src="/Hero_indiandoctor.jpg" alt="Dr. Sanjay Gupta" className="w-full h-full object-cover object-top" />
                            </div>
                            <h3 className="font-heading text-xl font-bold text-center">Dr. Sanjay Gupta</h3>
                            <p className="text-medical font-medium text-center mb-4">Chief Medical Officer</p>
                            <p className="text-gray-600 text-sm text-center">"Our mission is to provide world-class healthcare with a personal touch. We treat patients, not just symptoms."</p>
                        </div>
                    </div>
                </section>
            </FadeInSection>

            {/* CTA Section */}
            <FadeInSection>
                <section className="py-20 bg-lightGray text-center">
                    <h2 className="font-heading text-3xl font-bold text-gray-900 mb-6">Need medical help today?</h2>
                    <Button onClick={() => setPage('Contact')} className="text-lg px-8 py-4">Call Now to Book</Button>
                </section>
            </FadeInSection>
        </>
    );
}