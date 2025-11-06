import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import Industries from './components/Industries';
import BlogUpdates from './components/BlogUpdates';
import Footer from './components/Footer';
import FloatingChatButton from './components/FloatingChatButton';
import BlogDetail from './components/BlogDetail';

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <Hero />
            <About />
            <Products />
            <Industries />
            <BlogUpdates />
            <Footer />
            <FloatingChatButton />
          </>
        } />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    </div>
  );
}

export default App;
