import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call backend API here (fetch or axios)
    console.log(form);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#1E2A78] via-[#0A1A3F] to-[#020617] text-white py-24 relative overflow-hidden">
      {/* Background floating balls */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-12">
          Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">Touch</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-6">
            <p className="text-gray-300 text-lg leading-relaxed">
              Have questions or want to discuss a project idea? Reach out to us — 
              our AI experts are ready to collaborate and bring your vision to life.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-cyan-400" />
                <span className="text-gray-300">info@shivohinitechai.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-cyan-400" />
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-cyan-400" />
                <span className="text-gray-300">Pune, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 shadow-lg border border-white/10 flex flex-col gap-6">
            {['name', 'email', 'subject'].map((field, idx) => (
              <div key={idx} className="relative">
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={(form as any)[field]}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-gray-600 text-white placeholder-transparent focus:border-cyan-400 outline-none p-3 peer"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                />
                <label className="absolute left-3 top-3 text-gray-400 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base transition-all duration-300">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
              </div>
            ))}
            <div className="relative">
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-transparent border-b border-gray-600 text-white placeholder-transparent focus:border-cyan-400 outline-none p-3 peer resize-none"
                placeholder="Message"
              />
              <label className="absolute left-3 top-3 text-gray-400 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base transition-all duration-300">
                Message
              </label>
            </div>

            <button className="flex items-center justify-center bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-[0_0_25px_rgba(0,224,255,0.3)]">
              Send Message
              <Send className="ml-2 w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
