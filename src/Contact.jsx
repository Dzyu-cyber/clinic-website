import React from 'react';
import { Button, FadeInSection } from './App';

export default function Contact() {
    return (
        <FadeInSection>
            <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
                <h1 className="font-heading text-4xl font-bold text-gray-900 mb-12 text-center">Contact Us</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info & Map */}
                    <div className="space-y-8">
                        <div className="bg-lightGray p-6 rounded-lg">
                            <h2 className="font-heading text-xl font-bold text-medical mb-6">Clinic Information</h2>
                            <div className="space-y-4 text-gray-600">
                                <p className="flex items-center gap-3">
                                    <span className="text-xl">📍</span> 123 Health Ave, Medical District, NY 10001
                                </p>
                                <p className="flex items-center gap-3">
                                    <span className="text-xl">📞</span> (555) 123-4567
                                </p>
                                <p className="flex items-center gap-3">
                                    <span className="text-xl">✉️</span> citycare@gmail.com
                                </p>
                            </div>
                        </div>

                        <div className="bg-lightGray p-6 rounded-lg">
                            <h2 className="font-heading text-xl font-bold text-medical mb-4">Working Hours</h2>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex justify-between border-b border-gray-200 pb-2"><span>Mon - Fri</span> <span>8:00 AM - 6:00 PM</span></li>
                                <li className="flex justify-between border-b border-gray-200 pb-2"><span>Saturday</span> <span>9:00 AM - 2:00 PM</span></li>
                                <li className="flex justify-between text-red-500 font-medium pt-2"><span>Sunday</span> <span>Closed</span></li>
                            </ul>
                        </div>

                        <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 border border-gray-300 overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29374.887258384915!2d-74.0152425!3d40.758364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2585438885b51%3A0x63dae2862dff8b91!2sCityMD%20West%2057th%20Urgent%20Care%20-%20NYC!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Citycare Medical Center Map"
                            ></iframe>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-sm h-fit">
                        <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">Book an Appointment</h2>
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Full Name</label>
                                <input type="text" id="name" className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-medical focus:border-transparent" placeholder="John Doe" required />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">Phone Number</label>
                                <input type="tel" id="phone" className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-medical focus:border-transparent" placeholder="(555) 000-0000" required />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="service">Service Required</label>
                                <select id="service" className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-medical focus:border-transparent bg-white">
                                    <option>General Checkup</option>
                                    <option>Diabetes Care</option>
                                    <option>Child Vaccination</option>
                                    <option>Women's Health</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">Additional Notes</label>
                                <textarea id="message" rows="4" className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-medical focus:border-transparent" placeholder="Briefly describe your symptoms or inquiry..."></textarea>
                            </div>

                            <Button type="submit" className="w-full">Submit Request</Button>
                            <p className="text-xs text-gray-500 text-center mt-4">We will call you within 1 business hour to confirm your appointment time.</p>
                        </form>
                    </div>
                </div>
            </div>
        </FadeInSection>
    );
}