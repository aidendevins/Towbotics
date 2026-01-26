import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [apiStatus, setApiStatus] = useState('checking...');

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
    fetch(`${API_URL}/status`)
      .then(res => res.json())
      .then(() => setApiStatus('✅ Connected'))
      .catch(() => setApiStatus('⚠️'));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-black text-slate-900">
              TOW<span className="text-amber-600">BOTICS</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-700 hover:text-amber-600 font-medium transition">Features</a>
              <a href="#how-it-works" className="text-slate-700 hover:text-amber-600 font-medium transition">How It Works</a>
              <a href="#who" className="text-slate-700 hover:text-amber-600 font-medium transition">Who It's For</a>
              <button className="px-6 py-2.5 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition">
                Get Early Access
              </button>
            </div>
            <span className="md:hidden text-xs text-slate-500">{apiStatus}</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full text-amber-900 text-sm font-semibold mb-6">
              🚀 Patent-pending technology from Georgia Tech
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-tight">
              Hitch Your Trailer.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">
                By Yourself. In Minutes.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              The remote-controlled trailer mover that makes precise alignment easy—so you can hitch solo, safely, and in a fraction of the time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all transform hover:scale-105 shadow-lg">
                Reserve Your Spot — $50
              </button>
              <button className="px-8 py-4 bg-white text-slate-900 font-bold rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-all">
                Watch Demo Video
              </button>
            </div>
          </div>

          {/* Product Showcase Placeholder */}
          <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎥</div>
                <p className="text-white/80 text-lg font-semibold">Product Demo Video</p>
                <p className="text-white/50 text-sm mt-2">Trailer mover in action</p>
              </div>
            </div>
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-20 h-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all transform hover:scale-110">
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-1"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              The Hardest Part of Towing?<br />
              <span className="text-amber-600">We Fixed It.</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Hitching is stressful, time-consuming, and downright frustrating—especially when you're doing it alone. One wrong move and you're jackknifed, misaligned, or worse.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <PainPointCard
              icon="⏱️"
              title="Takes Forever"
              description="15-30 minutes of back-and-forth just to line things up"
            />
            <PainPointCard
              icon="😰"
              title="High Risk"
              description="Damage to your truck, trailer, or worse—injuries from manual pushing"
            />
            <PainPointCard
              icon="🤷"
              title="Can't Do It Solo"
              description="Need a spotter or multiple attempts to get it right"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-900">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Precision. Control. <span className="text-amber-500">Confidence.</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              TowBotics gives you millimeter-perfect control so you can align and hitch in minutes—not hours.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <FeatureBlock
              icon="🎯"
              title="Precise Alignment"
              description="Move your trailer in tight increments with high control. No more guessing, no more adjusting 10 times."
            />
            <FeatureBlock
              icon="📱"
              title="Remote Control"
              description="Operate from your phone or dedicated remote. Stay in your truck or walk around—your choice."
            />
            <FeatureBlock
              icon="⚡"
              title="Fast Setup"
              description="From unhitched to road-ready in minutes. Perfect for frequent trips between home, storage, and campsites."
            />
            <FeatureBlock
              icon="🛡️"
              title="Safe & Solo-Friendly"
              description="No pushing, no strain, no risk. Do it all yourself, safely and confidently."
            />
          </div>

          {/* Product Image Carousel Placeholder */}
          <div className="relative">
            <div className="aspect-[16/9] bg-gradient-to-br from-slate-800 to-slate-700 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📸</div>
                  <p className="text-white/80 text-lg font-semibold">Product Image Carousel</p>
                  <p className="text-white/50 text-sm mt-2">← Swipe to see features →</p>
                </div>
              </div>
            </div>
            {/* Carousel indicators */}
            <div className="flex justify-center gap-2 mt-6">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
              <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
              <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              Hitch in <span className="text-amber-600">3 Simple Steps</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Attach TowBotics"
              description="Mount the unit to your trailer tongue. Takes just a few minutes."
            />
            <StepCard
              number="2"
              title="Position with Remote"
              description="Use the controller to move your trailer into perfect alignment with your hitch ball."
            />
            <StepCard
              number="3"
              title="Hitch & Go"
              description="Lower the coupler, secure the latch, and you're ready to roll. Done."
            />
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section id="who" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              Built For <span className="text-amber-600">Real RV Owners</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AudienceCard
              icon="🏕️"
              title="Solo Towers"
              description="No spotter? No problem. Do it all yourself."
            />
            <AudienceCard
              icon="🧓"
              title="Older Owners"
              description="No heavy pushing or physical strain required."
            />
            <AudienceCard
              icon="💎"
              title="Premium Rigs"
              description="Protect your investment from dings and damage."
            />
            <AudienceCard
              icon="🔄"
              title="Frequent Users"
              description="Storage ↔ campsite? Speed up every trip."
            />
          </div>
        </div>
      </section>

      {/* Social Proof / Stats Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <StatCard number="500+" label="RV Owners Interviewed" />
            <StatCard number="Patent" label="Pending Technology" />
            <StatCard number="15-30min" label="Time Saved Per Hitch" />
          </div>
        </div>
      </section>

      {/* Testimonials Placeholder */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              What <span className="text-amber-600">RV Owners</span> Are Saying
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="I used to dread hitching. Now I actually look forward to trips."
              author="Future Customer"
              role="Travel Trailer Owner"
            />
            <TestimonialCard
              quote="This is the product I've been waiting for. Game changer."
              author="Future Customer"
              role="Solo Tower"
            />
            <TestimonialCard
              quote="Finally, a solution that actually works. Can't wait to get mine."
              author="Future Customer"
              role="RV Enthusiast"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to Make Hitching <span className="text-amber-500">Easy?</span>
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Reserve your spot for just $50 (fully refundable). Be among the first to experience stress-free hitching.
          </p>
          <button className="px-10 py-5 bg-amber-500 text-slate-900 font-black text-lg rounded-xl hover:bg-amber-400 transition-all transform hover:scale-105 shadow-xl">
            Reserve Your TowBotics — $50
          </button>
          <p className="text-slate-400 text-sm mt-6">
            100% refundable · No commitment · Be first in line
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-xl font-black text-white mb-4">
                TOW<span className="text-amber-500">BOTICS</span>
              </div>
              <p className="text-slate-400 text-sm">
                Making hitching easy, safe, and solo-friendly.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Product</h4>
              <div className="space-y-2">
                <a href="#" className="block text-slate-400 hover:text-amber-500 text-sm transition">Features</a>
                <a href="#" className="block text-slate-400 hover:text-amber-500 text-sm transition">How It Works</a>
                <a href="#" className="block text-slate-400 hover:text-amber-500 text-sm transition">Specs</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Company</h4>
              <div className="space-y-2">
                <a href="#" className="block text-slate-400 hover:text-amber-500 text-sm transition">About Us</a>
                <a href="#" className="block text-slate-400 hover:text-amber-500 text-sm transition">Contact</a>
                <a href="#" className="block text-slate-400 hover:text-amber-500 text-sm transition">Careers</a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Support</h4>
              <div className="space-y-2">
                <a href="#" className="block text-slate-400 hover:text-amber-500 text-sm transition">FAQ</a>
                <a href="#" className="block text-slate-400 hover:text-amber-500 text-sm transition">Shipping</a>
                <a href="#" className="block text-slate-400 hover:text-amber-500 text-sm transition">Returns</a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 text-sm">
              © 2026 TowBotics. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-slate-500 hover:text-amber-500 text-sm transition">Privacy</a>
              <a href="#" className="text-slate-500 hover:text-amber-500 text-sm transition">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Component definitions
function PainPointCard({ icon, title, description }) {
  return (
    <div className="bg-slate-50 rounded-2xl p-8 border-2 border-slate-200">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
}

function FeatureBlock({ icon, title, description }) {
  return (
    <div className="flex gap-6">
      <div className="text-5xl flex-shrink-0">{icon}</div>
      <div>
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-slate-300 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function StepCard({ number, title, description }) {
  return (
    <div className="relative">
      <div className="bg-amber-500 text-slate-900 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-black mb-6">
        {number}
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

function AudienceCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-amber-500 transition-all hover:shadow-lg">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm">{description}</p>
    </div>
  );
}

function StatCard({ number, label }) {
  return (
    <div>
      <div className="text-5xl font-black text-amber-500 mb-3">{number}</div>
      <p className="text-slate-300 text-lg">{label}</p>
    </div>
  );
}

function TestimonialCard({ quote, author, role }) {
  return (
    <div className="bg-slate-50 rounded-2xl p-8 border-2 border-slate-200">
      <p className="text-slate-700 text-lg mb-6 italic">"{quote}"</p>
      <div>
        <p className="font-semibold text-slate-900">{author}</p>
        <p className="text-slate-500 text-sm">{role}</p>
      </div>
    </div>
  );
}

export default App;
