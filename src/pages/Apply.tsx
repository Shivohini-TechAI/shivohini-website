import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Apply: React.FC = () => {
  const navigate = useNavigate();

  // 🧠 Form States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  // 📦 File Upload Handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResume(e.target.files[0]);
    }
  };

  // 🚀 Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !email || !experience || !resume) {
      alert("Please fill all fields before submitting.");
      return;
    }

    // Backend form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("experience", experience);
    formData.append("resume", resume);

    try {
      const response = await fetch("http://localhost:5000/api/apply", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("🎉 Application submitted successfully!");
        navigate("/"); // Redirect to home
      } else {
        alert("❌ Failed to submit. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#0A1A3F] to-[#1E2A78] text-white px-6 py-16">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-center text-cyan-400 mb-8">
          Apply Now
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 text-gray-200 font-medium"
        >
          {/* Name */}
          <div>
            <label className="block mb-2">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:border-cyan-400 outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:border-cyan-400 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:border-cyan-400 outline-none"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block mb-2">Experience</label>
            <textarea
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="Describe your experience"
              rows={3}
              className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:border-cyan-400 outline-none resize-none"
            ></textarea>
          </div>

          {/* Resume */}
          <div>
            <label className="block mb-2">Upload Resume (Only .pdf)</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-300 border border-white/30 rounded-lg cursor-pointer bg-white/10 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 font-semibold"
          >
            Submit Application
          </button>
        </form>
      </div>
    </section>
  );
};

export default Apply;
