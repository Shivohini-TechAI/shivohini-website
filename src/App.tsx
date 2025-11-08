import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Pages
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Industries from "./pages/Industries";
import Solutions from "./pages/Solutions";
import Products from "./pages/Products";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";

// Solutions Sub Pages
import AIChatbot from "./pages/solutions/AIChatbot";
import VoiceAssistant from "./pages/solutions/VoiceAssistant";
import AIChatApp from "./pages/solutions/AIChatApp";

import Header from "./components/Header"; 
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/products" element={<Products />} />
        <Route path="/Careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Solutions Sub Routes */}
        <Route path="/solutions/ai-chatbot" element={<AIChatbot />} />
        <Route path="/solutions/voice-assistant" element={<VoiceAssistant />} />
        <Route path="/solutions/ai-chat-app" element={<AIChatApp />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
