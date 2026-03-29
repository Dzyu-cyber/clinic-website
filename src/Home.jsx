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
            <FadeInSection>
                <section className="relative overflow-hidden bg-white py-16 md:py-24">
                    {/* Decorative Gradient Background (Blue) */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/30 rounded-[50%] blur-[120px] pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
                    <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-600/20 rounded-[50%] blur-[120px] pointer-events-none transform -translate-x-1/4 translate-y-1/4" />

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 space-y-6">
                            <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                Welcome to CityCare Medical Center
                            </h1>
                            <p className="text-lg text-gray-600 max-w-lg">
                                Where your health is our top priority and where Expertise is met with Compassionate Care
                            </p>
                            <Button onClick={() => setPage('Contact')}>Book an Appointment</Button>
                        </div>
                        <div className="flex-1 w-full">
                            <div className="relative w-full h-64 md:h-[500px] overflow-hidden rounded-2xl shadow-2xl">
                                <img
                                    src="/Hero_indiandoctor.jpg"
                                    alt="CityCare Professional Medical Staff"
                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                />
                                {/* Subtle Overlay for Premium Feel */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
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