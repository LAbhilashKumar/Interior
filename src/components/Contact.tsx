import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, MapPin, MessageCircle, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CTA_BG =
  'https://images.pexels.com/photos/16985123/pexels-photo-16985123.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden flex items-center mood-near-black vignette"
    >
      <div
        className="absolute inset-0 graded-img"
        style={{
          backgroundImage: `url(${CTA_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(13,12,10,0.7) 0%, rgba(13,12,10,0.95) 100%)' }} />
      {/* Warm accent light glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 40% 30% at 30% 40%, rgba(212,178,131,0.08) 0%, transparent 70%)' }} />

      <div
        ref={labelRef}
        className="absolute top-8 left-6 md:left-12 z-20 section-label"
      >
        08 · Begin
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div>
          <h2 ref={headingRef} className="display text-cream text-6xl md:text-8xl leading-[0.95] relative">
            Let's design
            <br />
            your next
            <br />
            <span className="italic text-brass-light glow-brass">space.</span>
          </h2>

          <div className="mt-12 space-y-5">
            <a
              href="tel:+919381422231"
              data-cursor="hover"
              className="flex items-center gap-4 text-cream/80 hover:text-brass-light transition-colors duration-300"
            >
              <Phone size={18} className="text-brass-light" />
              <span className="text-sm tracking-wide">+91 93814 22231</span>
            </a>
            <a
              href="https://wa.me/919381422231"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="flex items-center gap-4 text-cream/80 hover:text-brass-light transition-colors duration-300"
            >
              <MessageCircle size={18} className="text-brass-light" />
              <span className="text-sm tracking-wide">WhatsApp us</span>
            </a>
            <div className="flex items-center gap-4 text-cream/80">
              <MapPin size={18} className="text-brass-light" />
              <span className="text-sm tracking-wide">Pragathi Nagar, Nizampet, Hyderabad</span>
            </div>
          </div>
        </div>

        <div>
          {submitted ? (
            <div className="border border-brass/30 p-12 text-center">
              <p className="display text-cream text-3xl mb-3">Thank you.</p>
              <p className="text-cream/60 text-sm">
                We'll be in touch within 24 hours to schedule your consultation.
              </p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  className="field-input"
                />
              </div>
              <div>
                <input
                  type="tel"
                  required
                  placeholder="Phone number"
                  className="field-input"
                />
              </div>
              <div>
                <select required defaultValue="" className="field-input">
                  <option value="" disabled>What do you need?</option>
                  <option value="kitchen">Modular Kitchen</option>
                  <option value="wardrobe">Wardrobes & Storage</option>
                  <option value="fullhome">Full Home Interior</option>
                  <option value="commercial">Commercial Fit-out</option>
                </select>
              </div>
              <div>
                <textarea
                  placeholder="Tell us about your space (optional)"
                  rows={3}
                  className="field-input resize-none"
                />
              </div>
              <button
                type="submit"
                data-cursor="hover"
                className="group flex items-center gap-3 text-brass-light border border-brass/40 px-8 py-4 hover:bg-brass/10 glow-border transition-all duration-300"
              >
                <span className="text-xs tracking-widest uppercase">Send Enquiry</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </form>
          )}
        </div>
      </div>

      <footer className="absolute bottom-0 left-0 right-0 z-10 border-t border-cream/10 py-6 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="display text-cream/60 text-lg">Sri Sana Modular Interior Designers</p>
        <p className="text-cream/30 text-xs tracking-widest uppercase">Hyderabad · Est. 2017</p>
      </footer>
    </section>
  );
}
