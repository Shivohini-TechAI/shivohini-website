import Hero from "../components/Hero";
import About from "../components/About";
import Industries from "../components/Industries";
import Products from "../components/Products";
import BlogUpdates from "../components/BlogUpdates";
import VoiceAssistant from "../components/VoiceAssistant";
import { useState } from "react";

export default function Home() {

  const [showAssistant, setShowAssistant] = useState(false);

  return (
    <>
      <Hero />
      <About />
      <Industries />
      <Products />
      <BlogUpdates />

      {/* ✅ button to open voice assistant */}
      <button
        onClick={() => setShowAssistant(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        🎤 Voice Assistant
      </button>

      {/* ✅ only show when user clicks */}
      {showAssistant && <VoiceAssistant onClose={() => setShowAssistant(false)} />}
    </>
  );
}