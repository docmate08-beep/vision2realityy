import { getWhatsAppLink } from '../lib/utils';
import { ArrowRight, Code, MessageSquare, Briefcase } from 'lucide-react';

export default function Footer() {
  const defaultWhatsAppMsg = "Hi V2R Team, I'd like to discuss a project.";

  return (
    <footer className="pt-24 pb-12 border-t border-white/10 bg-background relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Final CTA Section */}
        <div className="mb-24 flex flex-col md:flex-row items-center justify-between gap-8 glass-panel p-10 md:p-16 rounded-3xl border-primary/20 bg-gradient-to-br from-white/5 to-primary/10">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">Ready to build?</h2>
            <p className="text-gray-400 text-lg">
              Let's turn your vision into reality. We handle everything from concept to production.
            </p>
          </div>
          <a
            href={getWhatsAppLink(defaultWhatsAppMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-8 py-4 bg-white text-background rounded-full font-bold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors shrink-0"
          >
            Talk to Us <ArrowRight size={18} />
          </a>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-6 group inline-flex hover:opacity-80 transition-opacity">
              <img src="/v2r-logo-horizontal-light.svg" alt="V2R - Vision To Reality" className="h-12 md:h-14 w-auto" />
            </a>
            <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
              An engineering-led software agency founded by IIT graduates. We build and manage high-performance digital products.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-white hover:border-primary transition-colors">
                <MessageSquare size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-white hover:border-primary transition-colors">
                <Briefcase size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-white hover:border-primary transition-colors">
                <Code size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-6">Services</h4>
            <ul className="space-y-3">
              <li><a href="#services" className="text-gray-400 hover:text-primary transition-colors">AI Automation</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-primary transition-colors">Web Development</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-primary transition-colors">App Development</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-primary transition-colors">Custom Software</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-6">Company</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-gray-400 hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#process" className="text-gray-400 hover:text-primary transition-colors">Our Process</a></li>
              <li><a href="#work" className="text-gray-400 hover:text-primary transition-colors">Work</a></li>
              <li><a href={getWhatsAppLink(defaultWhatsAppMsg)} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} V2R (Vision to Reality). All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
