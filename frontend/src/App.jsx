import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [apiStatus, setApiStatus] = useState('checking...');

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
    fetch(`${API_URL}/status`)
      .then(res => res.json())
      .then(() => setApiStatus('Connected'))
      .catch(() => setApiStatus(''));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50" style={{
      backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(148, 163, 184, 0.03) 0%, transparent 50%)',
    }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-black text-slate-800">
              TOW<span className="text-amber-600">BOTICS</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-700 hover:text-amber-600 font-medium transition">Features</a>
              <a href="#how-it-works" className="text-slate-700 hover:text-amber-600 font-medium transition">How It Works</a>
              <a href="#who" className="text-slate-700 hover:text-amber-600 font-medium transition">Who It's For</a>
              <button className="px-6 py-2.5 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-800 transition">
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
              Patent-Pending · Georgia Tech Innovation
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-800 mb-6 leading-tight">
              Hitch independently.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">
                In under 3 minutes.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              The first remote-controlled trailer positioning system that eliminates the physical strain, precision difficulty, and injury risk of manual hitching.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button className="px-8 py-4 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-all transform hover:scale-105 shadow-lg">
                Get Early Access
              </button>
              <button className="px-8 py-4 bg-white text-slate-800 font-bold rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-all">
                Watch Demo
              </button>
            </div>
            <p className="text-slate-500 text-sm">
              Trusted by Forest River · The largest travel trailer manufacturer in the U.S.
            </p>
          </div>

          {/* Product Showcase Placeholder */}
          <div className="relative aspect-video bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-700">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-white/80 text-lg font-semibold mb-2">TowBotics System in Action</p>
                <p className="text-white/50 text-sm">Remote-controlled positioning and powered jack</p>
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
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-6">
              Hitching shouldn't be<br />
              <span className="text-amber-600">this hard.</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Manual hitching is physically demanding, time-consuming, and dangerous. For elderly RV owners, it's often the reason they stop traveling—or sell their trailer entirely.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <PainPointCard
              title="Physical Strain"
              description="Lifting 650 lbs of tongue weight. Cranking manually. Pushing trailers by hand. For owners with arthritis or reduced grip strength, it's exhausting or impossible."
              />
            <PainPointCard
              title="Precision Trap"
              description="Aligning a 2-inch coupler within 1 inch of the hitch ball—often taking 15-30 minutes of back-and-forth. One misalignment and you start over."
            />
            <PainPointCard
              title="Real Danger"
              description="Injuries happen. Ian feared being crushed between his truck and trailer. John nearly lost a finger when a coupler slipped. Damage and injuries are common."
            />
          </div>

          <div className="bg-slate-50 rounded-2xl p-8 border-2 border-slate-200 max-w-3xl mx-auto">
            <p className="text-slate-700 text-lg mb-4 italic">
              "Hitching difficulty is the most common complaint we hear, especially from older and inexperienced users. Some elderly owners have sold their trailers because hitching became too physically demanding."
            </p>
            <p className="font-semibold text-slate-800">— Retailers, after 100+ customer interviews</p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="features" className="py-20 bg-slate-800">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Two systems. <span className="text-amber-500">One solution.</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              TowBotics integrates remote-controlled positioning with a powered jack—so you never touch your trailer during hitching.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <FeatureBlock
              title="Remote Positioning"
              description="Four independent motors and differential drive let you move your trailer laterally with millimeter precision. Full 360° steering. Works on grass, gravel, asphalt, and up to 5% grade. Command-to-motion latency under 150ms."
            />
            <FeatureBlock
              title="Powered Jack"
              description="Integrated linear actuator raises and lowers tongue weight up to 650 lbs. 22-inch stroke covers all standard hitch heights. No manual cranking. No physical strain."
            />
            <FeatureBlock
              title="Dead-Man Safety"
              description="Built-in dead-man switch and electronic braking. If you release the remote or connection drops, all motion stops immediately. Stopping distance under 0.5 inches. Default-braked motors prevent runaway."
            />
            <FeatureBlock
              title="Retrofit Installation"
              description="Replaces your existing tongue jack. Installs through standard A-frame opening in under 60 minutes with basic hand tools. No modifications to your truck or trailer frame. Remains attached during towing."
            />
          </div>

          {/* Product Image Carousel Placeholder */}
          <div className="relative">
            <div className="aspect-[16/9] bg-gradient-to-br from-slate-700 to-slate-600 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white/80 text-lg font-semibold mb-2">System Components</p>
                  <p className="text-white/50 text-sm">Drivetrain, actuator, and control housing</p>
                </div>
              </div>
            </div>
            {/* Carousel indicators */}
            <div className="flex justify-center gap-2 mt-6">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <div className="w-2 h-2 bg-slate-700 rounded-full"></div>
              <div className="w-2 h-2 bg-slate-700 rounded-full"></div>
              <div className="w-2 h-2 bg-slate-700 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-6">
              Install once. <span className="text-amber-600">Use forever.</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Three-step installation. Three-minute hitching. Every time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <StepCard
              number="1"
              title="Install the System"
              description="Insert the linear actuator assembly through your A-frame jack opening. Fasten the mounting plate. Connect power cables to your trailer battery. System auto-connects to the remote. One-time setup in under 60 minutes."
            />
            <StepCard
              number="2"
              title="Position Your Trailer"
              description="Use the Bluetooth remote to drive your trailer laterally. Full 360° steering and differential drive give you precise control. Move up to 10 feet to align your coupler with the hitch ball."
            />
            <StepCard
              number="3"
              title="Hitch and Go"
              description="Press a button to raise or lower the powered jack. Coupler drops onto the ball. Secure the latch, attach safety chains and wiring. You're road-ready in under 3 minutes."
            />
          </div>

          <div className="bg-amber-50 rounded-2xl p-8 border-2 border-amber-200 text-center">
            <p className="text-slate-800 text-lg font-semibold mb-2">
              Tested at Georgia Tech Capstone Expo
            </p>
            <p className="text-slate-600">
              20 participants with no prior exposure completed full hitching procedures. Average time: consistently under 3 minutes. Feedback: intuitive, responsive, and simple.
            </p>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section id="who" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-6">
              Designed for owners who value <span className="text-amber-600">independence.</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our primary customers are elderly travel trailer owners who want to hitch independently—especially those with higher-value rigs who refuse to let physical limitations end their adventures.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <AudienceCard
              title="Elderly RV Owners"
              description="If arthritis, reduced grip strength, or back problems make manual hitching exhausting or impossible, TowBotics lets you maintain your independence. Hitch without assistance, physical strain, or injury risk."
            />
            <AudienceCard
              title="Premium Trailer Owners"
              description="Owners of travel trailers valued over $50,000 want to protect their investment. Eliminate damage from misalignment, tight-space maneuvering, and tongue-weight mishaps."
            />
            <AudienceCard
              title="Solo Travelers"
              description="No spotter? No problem. Position your trailer, raise the jack, and hitch—all from the remote. No more walking back and forth between truck and trailer."
            />
            <AudienceCard
              title="Frequent Hitchers"
              description="If you move between home, storage, and campsites regularly, every hitch/unhitch cycle adds up. Cut your time from 15-30 minutes down to under 3 minutes."
            />
          </div>

          <div className="text-center">
            <p className="text-slate-600 text-sm mb-4">
              Compatible with bumper-pull travel trailers · Standard 2.0-inch ball couplers · 12V trailer battery powered
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            <StatCard number="<3 min" label="Average Hitching Time" />
            <StatCard number="100+" label="Customer Interviews" />
            <StatCard number="Patent" label="Pending IP" />
            <StatCard number="5,000 lb" label="Trailer Capacity" />
          </div>
        </div>
      </section>

      {/* Technical Specs Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-6">
              Engineered for <span className="text-amber-600">real-world use.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SpecCard
              label="Tongue Weight Capacity"
              value="650 lbs"
            />
            <SpecCard
              label="Trailer Weight"
              value="Up to 5,000 lbs"
            />
            <SpecCard
              label="Jack Stroke Length"
              value="22 inches"
            />
            <SpecCard
              label="Lateral Travel"
              value="Up to 10 feet"
            />
            <SpecCard
              label="Grade Capability"
              value="Up to 5% incline"
            />
            <SpecCard
              label="Stopping Distance"
              value="<0.5 inches"
            />
            <SpecCard
              label="Command Latency"
              value="<150ms"
            />
            <SpecCard
              label="Installation Time"
              value="<60 minutes"
            />
            <SpecCard
              label="Environmental Rating"
              value="IP54–IP65"
            />
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600 text-sm">
              Compliant with SAE J684 · UL/CSA listed components · FCC Part 15 certified wireless
            </p>
          </div>
        </div>
      </section>

      {/* Industry Validation Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-6">
              Validated by <span className="text-amber-600">industry leaders.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <TestimonialCard
              quote="Hitching difficulty is a top recurring complaint, especially among older buyers. We'd consider selling this through dealers if it could be offered around a $1,500 price point."
              author="Forest River"
              role="Largest travel trailer manufacturer in the U.S."
            />
            <TestimonialCard
              quote="Travel trailers are the highest-need segment. The lack of a turnkey hitching automation system is a known gap in the market."
              author="Trailers Plus"
              role="$200M manufacturer, 80+ locations"
            />
          </div>

          <div className="bg-white rounded-2xl p-8 border-2 border-slate-200">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Market Opportunity</h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-3xl font-black text-amber-600 mb-2">11.2M</p>
                <p className="text-slate-600 text-sm">U.S. households own a travel trailer</p>
              </div>
              <div>
                <p className="text-3xl font-black text-amber-600 mb-2">80%</p>
                <p className="text-slate-600 text-sm">Are bumper-pull compatible with retrofit</p>
              </div>
              <div>
                <p className="text-3xl font-black text-amber-600 mb-2">$21B</p>
                <p className="text-slate-600 text-sm">Total addressable market</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-800 to-slate-700">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Stop letting hitching<br />
            <span className="text-amber-500">limit your adventures.</span>
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Get early access to TowBotics. Expected retail: $1,500–$3,000. Installation included. One-year warranty.
          </p>
          <button className="px-10 py-5 bg-amber-500 text-slate-800 font-black text-lg rounded-xl hover:bg-amber-400 transition-all transform hover:scale-105 shadow-xl">
            Request Early Access
          </button>
          <p className="text-slate-400 text-sm mt-6">
            Limited production run · Priority given to early registrants
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 border-t border-slate-800 py-12">
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
function PainPointCard({ title, description }) {
  return (
    <div className="bg-slate-50 rounded-2xl p-8 border-2 border-slate-200 hover:border-amber-300 transition-all">
      <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

function FeatureBlock({ title, description }) {
  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-300 leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }) {
  return (
    <div className="relative">
      <div className="bg-amber-500 text-slate-800 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-black mb-6">
        {number}
      </div>
      <h3 className="text-2xl font-bold text-slate-800 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

function AudienceCard({ title, description }) {
  return (
    <div className="bg-white rounded-2xl p-8 border-2 border-slate-200 hover:border-amber-500 transition-all hover:shadow-lg">
      <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

function SpecCard({ label, value }) {
  return (
    <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
      <p className="text-slate-600 text-sm mb-2">{label}</p>
      <p className="text-2xl font-black text-slate-800">{value}</p>
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
        <p className="font-semibold text-slate-800">{author}</p>
        <p className="text-slate-500 text-sm">{role}</p>
      </div>
    </div>
  );
}

export default App;
