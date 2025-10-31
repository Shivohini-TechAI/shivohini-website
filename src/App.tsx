import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Industries from './components/Industries';
import Footer from './components/Footer';
import FloatingChatButton from './components/FloatingChatButton';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Products />
      <Industries />
      <Footer />
      <FloatingChatButton />
    </div>
  );
}

export default App;