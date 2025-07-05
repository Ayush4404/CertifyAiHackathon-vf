import { useState } from 'react';
import './App.css';
import HeroSection from './components/HeroSection';
import DataUploadPanel from './components/DataUploadPanel';
import ZKProofFlow from './components/ZKProofFlow';
import VerificationBadge from './components/VerificationBadge';
import BeforeAfterDemo from './components/BeforeAfterDemo';
import UseCaseGallery from './components/UseCaseGallery';
import TechStackFooter from './components/TechStackFooter';
import Hero from './components/Hero';
import Header from './components/Header';
import WhyCertifySection from './components/WhyCertifySection';
import Marque from './components/Marque';
import TestimonialSection from './components/Testimonials';
import FaqSection from "./components/FaqSection";
import CallToActionFooter from "./components/CallToActionFooter";
import DatasetDashboard from "./components/DatasetDashboard";
import CertifiedGallery from './components/CertifiedGallery';
import CertificateBadgeGallery from './components/CertificateBadgeGallery';
import UploadDataset from './components/UploadDataset';

function App() {
  return (
    <>
      <Header />
      <Hero />
      <HeroSection />
      
      <div className='bg-zinc-900 flex justify-center items-center overflow-hidden'>
        <Marque />
      </div>
      
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-10">
        <h1 className="text-3xl font-bold text-center mb-10 text-blue-700">
          Upload to Filecoin
        </h1>

        <div className="mb-20">
          <DataUploadPanel />
        </div>

        {/* ✅ Upload Dataset Form */}
        <div className="mb-20">
          <UploadDataset />
        </div>

        {/* 🔥 Dataset List + Certify Section */}
        <div className="mb-20">
          <DatasetDashboard />
        </div>

        <ZKProofFlow />
        <div className='mt-20'><CertifiedGallery /></div>
        <div className='mt-20'><CertificateBadgeGallery /></div>
        <VerificationBadge />
        <BeforeAfterDemo />
        <UseCaseGallery />
        <WhyCertifySection />
        <TestimonialSection />
        <FaqSection />

        <div className='mt-10'>
          <CallToActionFooter />
        </div>

        <TechStackFooter />
      </div>
    </>
  );
}


export default App;
