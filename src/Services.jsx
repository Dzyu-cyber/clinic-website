import React from 'react';
import { Button } from './App';

export default function Services({ setPage }) {
    const serviceDetails = [
        {
            title: "General Checkup",
            desc: "Routine physical exams to monitor your overall health and catch potential issues early.",
            benefits: ["Blood pressure monitoring", "Cholesterol screening", "Lifestyle counseling"]
        },
        {
            title: "Diabetes Care",
            desc: "End-to-end management of Type 1 and Type 2 diabetes to maintain optimal blood sugar levels.",
            benefits: ["A1C testing", "Dietary planning", "Insulin management"]
        },
        {
            title: "Women's Health",
            desc: "Specialized gynecological care, family planning, and preventative screenings.",
            benefits: ["Pap smears", "Prenatal care", "Menopause management"]
        },
        {
            title: "Blood Tests & Labs",
            desc: "On-site laboratory for fast, accurate diagnostic testing.",
            benefits: ["Complete Blood Count (CBC)", "Thyroid panels", "Same-day results for urgent tests"]
        }
    ];

    return (
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-24">
            <div className="text-center mb-16">
                <h1 className="font-heading text-4xl font-bold text-gray-900 mb-4">Our Medical Services</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">We provide a wide range of medical services tailored to meet the needs of you and your family.</p>
            </div>

            <div className="space-y-8">
                {serviceDetails.map((srv, idx) => (
                    <article key={idx} className="border border-gray-200 rounded-lg p-6 md:p-8 hover:border-medical transition-colors">
                        <h2 className="font-heading text-2xl font-bold text-medical mb-3">{srv.title}</h2>
                        <p className="text-gray-700 mb-4">{srv.desc}</p>
                        <div>
                            <h3 className="font-heading font-semibold text-gray-900 mb-2">Key Benefits:</h3>
                            <ul className="list-disc pl-5 text-gray-600 space-y-1">
                                {srv.benefits.map((benefit, i) => <li key={i}>{benefit}</li>)}
                            </ul>
                        </div>
                    </article>
                ))}
            </div>

            <div className="mt-16 text-center">
                <Button onClick={() => setPage('Contact')}>Schedule a Consultation</Button>
            </div>
        </div>
    );
}