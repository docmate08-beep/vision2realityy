import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleV2RClick = () => {
    navigate('/v2r');
  };

  return (
    <footer className="relative border-t border-white/[0.06]">
      <div className="section-container py-10 sm:py-14 md:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-12 gap-8 sm:gap-10 md:gap-8">
          {/* Brand Column */}
          <div className="col-span-2 sm:col-span-2 md:col-span-5">
            <span className="text-[1rem] sm:text-[1.125rem] font-sans font-semibold tracking-[0.04em] text-white">
              TheMate
            </span>
            <p className="text-mate-text2 mt-3 max-w-[320px] leading-relaxed"
              style={{ fontSize: 'clamp(0.8125rem, 0.9vw, 0.9375rem)' }}
            >
              Building Companies That Shape Tomorrow.
            </p>
          </div>

          {/* Services */}
          <div className="col-span-1 md:col-span-3">
            <span className="text-caption font-sans font-medium tracking-[0.12em] uppercase text-mate-text2 block mb-3 sm:mb-4">
              Services
            </span>
            <button
              onClick={handleV2RClick}
              className="text-[0.8125rem] sm:text-[0.875rem] font-sans text-white/70 hover:text-white transition-colors duration-300 block text-left"
            >
              Vision2Reality
            </button>
          </div>

          {/* Connect */}
          <div className="col-span-1 md:col-span-4">
            <span className="text-caption font-sans font-medium tracking-[0.12em] uppercase text-mate-text2 block mb-3 sm:mb-4">
              Connect
            </span>
            <div className="flex flex-col gap-2 sm:gap-3">
              <a
                href="mailto:hello@themate.in"
                className="text-[0.8125rem] sm:text-[0.875rem] font-sans text-white/70 hover:text-white transition-colors duration-300"
              >
                hello@themate.in
              </a>
              <a
                href="https://linkedin.com/company/themate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.8125rem] sm:text-[0.875rem] font-sans text-white/70 hover:text-white transition-colors duration-300"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 sm:mt-10 md:mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
          <p className="text-[0.6875rem] sm:text-[0.75rem] text-mate-text2/40 font-sans">
            © {currentYear} TheMate. All rights reserved.
          </p>
          <p className="text-[0.6875rem] sm:text-[0.75rem] text-mate-text2/30 font-sans">
            A global holding company.
          </p>
        </div>
      </div>
    </footer>
  );
}
