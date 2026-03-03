import React from 'react';

export default function About() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
            <h1 className="font-heading text-4xl font-bold text-gray-900 mb-8 text-center">About CityCare</h1>

            <div className="space-y-12">
                <section>
                    <h2 className="font-heading text-2xl font-semibold text-medical mb-4">Our Story</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Founded in 2012, CityCare started with a simple vision: to make high-quality healthcare accessible to every family. Over the past decade, we have grown from a small neighborhood practice into a comprehensive medical center, serving thousands of patients with dedication and compassion.
                    </p>
                </section>

                <section className="bg-lightGray p-8 rounded-lg">
                    <h2 className="font-heading text-2xl font-semibold text-medical mb-4">Mission & Values</h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        <li><strong>Integrity:</strong> Honest, transparent medical advice.</li>
                        <li><strong>Excellence:</strong> Continuous education and modern technology.</li>
                        <li><strong>Compassion:</strong> Treating every patient like family.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="font-heading text-2xl font-semibold text-medical mb-6">Our Leadership</h2>
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="w-32 h-32 bg-gray-300 rounded-lg flex-shrink-0 flex items-center justify-center text-gray-500 text-sm">
                            [Dr. Photo]
                        </div>
                        <div>
                            <h3 className="font-heading text-xl font-bold text-gray-900">Dr. Sarah Jenkins, MD</h3>
                            <p className="text-sm text-gray-500 mb-3">BSc., MD (Internal Medicine) - Harvard Medical School</p>
                            <p className="text-gray-600 leading-relaxed">
                                With over 15 years of clinical experience, Dr. Jenkins specializes in preventative care and chronic disease management. She leads our team of certified professionals to ensure the highest standard of patient care.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}