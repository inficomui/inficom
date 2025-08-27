'use client';

import { useState, useRef } from 'react';
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-gradient-to-br from-[#376E6F] to-[#1C3334]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-white rounded-full" />
            <span className="text-white font-medium">Get In Touch</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          
        <p className="text-lg text-gray-200 max-w-3xl mx-auto">
  Let&rsquo;s explore how our innovative IT solutions can drive your business growth and success. 
  Get in touch with us today for a free consultation.
</p>

        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Call Us Now</h3>
                  <a href="tel:+1234567890" className="text-gray-200 hover:text-white transition-colors text-lg">
                    +1 (234) 567-890
                  </a>
                  <p className="text-gray-300 text-sm mt-1">Available 24/7 for emergencies</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Email Us</h3>
                  <a href="mailto:info@inficomsolutions.com" className="text-gray-200 hover:text-white transition-colors text-lg">
                    info@inficomsolutions.com
                  </a>
                  <p className="text-gray-300 text-sm mt-1">We'll respond within 2 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Visit Our Office</h3>
                  <p className="text-gray-200 text-lg">123 Tech Street, Suite 100</p>
                  <p className="text-gray-200">New York, NY 10001</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="flex-shrink-0 w-12 h-12 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Business Hours</h3>
                  <p className="text-gray-200">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-200">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="text-gray-200">Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4 pt-8">
              <a href="tel:+1234567890" className="block">
                <Button className="w-full bg-white text-[#1C3334] hover:bg-gray-100 py-4 text-lg font-semibold rounded-xl transition-all duration-200 hover:scale-105 group">
                  <Phone className="mr-3 group-hover:rotate-12 transition-transform" size={20} />
                  Call Now for Immediate Support
                </Button>
              </a>
              
              <Button variant="outline" className="w-full border-2 border-white text-white hover:bg-white hover:text-[#1C3334] py-4 text-lg font-semibold rounded-xl transition-all duration-200 hover:scale-105">
                Schedule Free Consultation
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-white/40 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-white/40 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-white/40 transition-colors"
                    placeholder="+1 (234) 567-890"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Service Needed</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40 transition-colors"
                  >
                    <option value="" className="text-gray-800">Select a service</option>
                    <option value="web-development" className="text-gray-800">Web Development</option>
                    <option value="mobile-apps" className="text-gray-800">Mobile Apps</option>
                    <option value="cloud-solutions" className="text-gray-800">Cloud Solutions</option>
                    <option value="cybersecurity" className="text-gray-800">Cybersecurity</option>
                    <option value="custom-software" className="text-gray-800">Custom Software</option>
                    <option value="data-analytics" className="text-gray-800">Data Analytics</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-white/40 transition-colors resize-none"
                  placeholder="Tell us about your project requirements..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-200 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-white text-[#1C3334] hover:bg-gray-100 hover:scale-105'
                } group`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-[#1C3334] border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-3 group-hover:translate-x-1 transition-transform" size={20} />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}