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
                                    <span className="text-xl">📍</span> Apollo Hospital Rd, Jubilee Hills, Hyderabad, Telangana 500033
                                </p>
                                <p className="flex items-center gap-3">
                                    <span className="text-xl">📞</span> +91 95537 22793
                                </p>
                                <p className="flex items-center gap-3">
                                    <span className="text-xl">✉️</span> care@cityhospital.in
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
                                src="https://maps.google.com/maps?q=Apollo%20Hospitals%20Jubilee%20Hills%20Hyderabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
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
                        <form 
                            className="space-y-6" 
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                const name = formData.get('name');
                                const phone = formData.get('phone');
                                const service = formData.get('service');
                                const notes = formData.get('message');
                                
                                const message = encodeURIComponent(
                                    `*New Appointment Request*\n\n` +
                                    `*Full Name:* ${name}\n` +
                                    `*Phone:* ${phone}\n` +
                                    `*Service:* ${service}\n` +
                                    `*Notes:* ${notes || 'None'}`
                                );
                                
                                window.open(`https://api.whatsapp.com/send?phone=919553722793&text=${message}`, '_blank');
                            }}
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Full Name</label>
                                <input name="name" type="text" id="name" className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-medical focus:border-transparent" placeholder="John Doe" required />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phone">Phone Number</label>
                                <input name="phone" type="tel" id="phone" className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-medical focus:border-transparent" placeholder="+91 00000 00000" required />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="service">Service Required</label>
                                <select name="service" id="service" className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-medical focus:border-transparent bg-white">
                                    <option>General Checkup</option>
                                    <option>Diabetes Care</option>
                                    <option>Child Vaccination</option>
                                    <option>Women's Health</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="message">Additional Notes</label>
                                <textarea name="message" id="message" rows="4" className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-medical focus:border-transparent" placeholder="Briefly describe your symptoms or inquiry..."></textarea>
                            </div>

                            <Button type="submit" className="w-full">Submit Request</Button>
                            <p className="text-xs text-gray-500 text-center mt-4">This will open WhatsApp to send your request directly to our team.</p>
                        </form>
                    </div>
                </div>
            </div>
        </FadeInSection>
    );
}