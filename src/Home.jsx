import React from 'react';
import { Button } from './App';

export default function Home({ setPage }) {
    const services = [
        { title: "General Checkup", desc: "Comprehensive health assessments for all ages." },
        { title: "Diabetes Care", desc: "Expert management and dietary planning." },
        { title: "Child Vaccination", desc: "Safe, scheduled immunizations for children." },
        { title: "Women’s Health", desc: "Specialized care, screenings, and consultations." }
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="bg-lightGray py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6">
                        <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                            Trusted Family Healthcare
                        </h1>
                        <p className="text-lg text-gray-600 max-w-lg">
                            Expert doctors, modern facilities, and compassionate care. Your health is our top priority. Book your consultation today.
                        </p>
                        <Button onClick={() => setPage('Contact')}>Book an Appointment</Button>
                    </div>
                    <div className="flex-1 w-full">
                        <div className="w-full h-64 md:h-96 bg-gray-300 rounded-lg shadow-md flex items-center justify-center text-gray-500">
                            [Hero Image Placeholder - 800x600]
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Services */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="font-heading text-3xl font-bold text-gray-900">Our Services</h2>
                        <p className="text-gray-600 mt-4">Comprehensive medical solutions under one roof.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((srv, idx) => (
                            <article key={idx} className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow bg-white">
                                <h3 className="font-heading text-xl font-semibold text-medical mb-2">{srv.title}</h3>
                                <p className="text-gray-600 text-sm">{srv.desc}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="bg-medical text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
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
                        <div className="w-24 h-24 bg-gray-300 rounded-full mb-4 mx-auto flex items-center justify-center text-xs text-gray-500">[Photo]</div>
                        <h3 className="font-heading text-xl font-bold text-center">Dr. Sarah Jenkins</h3>
                        <p className="text-medical font-medium text-center mb-4">Chief Medical Officer</p>
                        <p className="text-gray-600 text-sm text-center">"Our mission is to provide world-class healthcare with a personal touch. We treat patients, not just symptoms."</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-lightGray text-center">
                <h2 className="font-heading text-3xl font-bold text-gray-900 mb-6">Need medical help today?</h2>
                <Button onClick={() => setPage('Contact')} className="text-lg px-8 py-4">Call Now to Book</Button>
            </section>
        </>
    );
}