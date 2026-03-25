import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FaGithub, FaLinkedin, FaTwitter,
  FaEnvelope, FaMapMarkerAlt, FaClock,
} from 'react-icons/fa';
import { personal, socials } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';

const iconMap = { FaGithub, FaLinkedin, FaTwitter };
import emailjs from '@emailjs/browser';

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

/* ── Info pill ── */
const InfoPill = ({ icon: Icon, label, value, href, isDark, color }) => {
  const content = (
    <div
      className={`flex items-center gap-4 rounded-2xl border transition-all duration-300
        ${isDark
          ? 'bg-white/[0.04] border-white/[0.08] hover:border-purple-500/40 hover:bg-white/[0.08]'
          : 'bg-white border-purple-100 shadow-sm hover:shadow-md hover:border-purple-300'
        }`}
      style={{ padding: '1rem 1.25rem' }}        /* 16px top/bottom, 20px sides — inline guaranteed */
    >
      <div
        className="rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
        style={{ width: 44, height: 44, background: color + '20', color }}
      >
        <Icon />
      </div>
      <div className="min-w-0">
        <p className={`text-xs uppercase tracking-widest font-bold
          ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
          style={{ marginBottom: 4 }}
        >
          {label}
        </p>
        <p className={`text-sm font-semibold truncate
          ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
          {value}
        </p>
      </div>
    </div>
  );
  return href ? <a href={href} className="block">{content}</a> : <div>{content}</div>;
};

/* ══════════════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════════════ */
const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [focus, setFocus] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();

    // 2. GET KEYS FROM .ENV
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // 3. PREPARE THE DATA (names must match your EmailJS Template)
    const templateParams = {
      name: form.name,
      email: form.email,
      message: form.message,
    };

    // 4. SEND THE EMAIL
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setSent(true);
        setForm({ name: '', email: '', message: '' }); // Clear form
        setTimeout(() => setSent(false), 4000);
      })
      .catch((err) => {
        console.error('FAILED TO SEND:', err);
        alert("Something went wrong, please try again.");
      });
  };

  /* Shared input style — all inline to bypass Tailwind v4 JIT dropping */
  const inputStyle = (field) => ({
    width: '100%',
    borderRadius: 12,
    padding: '14px 16px',
    fontSize: 15,
    border: `2px solid ${focus === field ? '#7c3aed' : isDark ? 'rgba(255,255,255,0.1)' : '#ede9fe'}`,
    background: isDark ? 'rgba(255,255,255,0.05)' : '#f9fafb',
    color: isDark ? '#fff' : '#111',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxShadow: focus === field ? '0 0 0 3px rgba(124,58,237,0.15)' : 'none',
  });

  return (
    <section
      id="contact"
      className={`relative min-h-screen flex items-center transition-colors duration-300
        ${isDark
          ? 'bg-[#0d0d1a] border-t border-purple-900/40'
          : 'bg-[#faf8ff] border-t border-purple-100'
        }`}
      style={{ padding: '5rem 0' }}
    >
      {/* ── Ambient blobs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }} />
        <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full blur-3xl opacity-15"
          style={{ background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)' }} />
      </div>

      <div className="page-container relative z-10 w-full" ref={ref}>

        {/* ── Heading ── */}
        <motion.div
          variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-center"
          style={{ marginBottom: '3rem' }}
        >
          <p className={`text-xs sm:text-sm uppercase font-semibold
            ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
            style={{ letterSpacing: '0.22em', marginBottom: 12 }}
          >
            Let&apos;s work together
          </p>
          <h2
            className={`font-black leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}
            style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}
          >
            Get In{' '}
            <span style={{
              background: 'linear-gradient(135deg, #7c3aed, #a855f7 50%, #ec4899)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>Touch</span>
          </h2>
          <motion.div
            initial={{ width: 0 }} animate={inView ? { width: '4rem' } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="h-1 bg-[var(--purple)] rounded-full mx-auto"
            style={{ marginTop: 16 }}
          />
        </motion.div>

        {/* ── 3-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr_1fr]"
          style={{ gap: '1.75rem' }}>

          {/* ══ LEFT ══ */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}
            className="flex flex-col"
            style={{ gap: '1rem' }}
          >
            {/* Ghibli card */}
            <div
              className={`relative rounded-3xl overflow-hidden border
                ${isDark ? 'border-purple-900/40 bg-purple-950/30' : 'border-purple-100 bg-purple-50/60'}`}
            >
              <div className="absolute inset-0 z-10" style={{
                background: isDark
                  ? 'linear-gradient(to top, #0d0d1a 0%, transparent 60%)'
                  : 'linear-gradient(to top, #faf8ff 0%, transparent 60%)',
              }} />
              <img
                src="/images/ghibli_coder01.png"
                alt="Ghibli coder"
                className="w-full object-contain object-bottom"
                style={{ height: 220 }}
              />
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full border backdrop-blur-md font-bold"
                style={{
                  padding: '6px 14px', fontSize: 12,
                  background: 'rgba(74,222,128,0.15)',
                  borderColor: 'rgba(74,222,128,0.4)',
                  color: '#4ade80',
                }}>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Open to Work
              </div>
              <div className="absolute bottom-3 left-0 right-0 z-20 text-center" style={{ padding: '0 1rem' }}>
                <p style={{ fontSize: 11, fontStyle: 'italic', color: isDark ? 'rgba(196,181,253,0.8)' : 'rgba(124,58,237,0.8)' }}>
                  "Let&apos;s build something amazing together"
                </p>
              </div>
            </div>

            {/* Info pills */}
            <InfoPill icon={FaEnvelope} label="Email" value={personal.email} href={`mailto:${personal.email}`} isDark={isDark} color="#7c3aed" />
            <InfoPill icon={FaMapMarkerAlt} label="Location" value={personal.location} isDark={isDark} color="#10b981" />
            <InfoPill icon={FaClock} label="Response" value="Within 24 hours" isDark={isDark} color="#f59e0b" />

            {/* Socials */}
            <div className="flex" style={{ gap: 12 }}>
              {socials.map((s) => {
                const Icon = iconMap[s.icon];
                return (
                  <motion.a key={s.label} href={s.url} target="_blank" rel="noreferrer"
                    aria-label={s.label} whileHover={{ y: -4, scale: 1.1 }}
                    className={`rounded-xl flex items-center justify-center text-lg border transition-all duration-300
                      ${isDark
                        ? 'bg-white/[0.05] border-white/[0.08] text-gray-400 hover:text-purple-400 hover:border-purple-500/50'
                        : 'bg-white border-purple-100 text-gray-500 hover:text-purple-600 hover:border-purple-300 shadow-sm'
                      }`}
                    style={{ width: 44, height: 44 }}
                  >
                    {Icon && <Icon />}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* ══ CENTRE — Form ══ */}
          <motion.form
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2}
            onSubmit={handleSubmit}
            className={`relative rounded-3xl border
              ${isDark
                ? 'bg-white/[0.03] border-white/[0.08] backdrop-blur-xl'
                : 'bg-white border-purple-100 shadow-xl shadow-purple-100/30'
              }`}
            style={{ padding: '2.25rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            {/* Header */}
            <div>
              <h3 className={`font-black ${isDark ? 'text-white' : 'text-gray-900'}`}
                style={{ fontSize: 22, marginBottom: 6 }}>
                Send a Message
              </h3>
              <p style={{ fontSize: 14, color: isDark ? '#9ca3af' : '#6b7280' }}>
                Fill out the form and I&apos;ll get back to you shortly.
              </p>
            </div>

            {/* Name */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{
                fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
                color: isDark ? '#9ca3af' : '#6b7280'
              }}>
                Your Name
              </label>
              <input type="text" name="name" placeholder="Satish Raut"
                value={form.name} onChange={handleChange} required
                onFocus={() => setFocus('name')} onBlur={() => setFocus('')}
                style={inputStyle('name')} />
            </div>

            {/* Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{
                fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
                color: isDark ? '#9ca3af' : '#6b7280'
              }}>
                Your Email
              </label>
              <input type="email" name="email" placeholder="satish@example.com"
                value={form.email} onChange={handleChange} required
                onFocus={() => setFocus('email')} onBlur={() => setFocus('')}
                style={inputStyle('email')} />
            </div>

            {/* Message */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{
                fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
                color: isDark ? '#9ca3af' : '#6b7280'
              }}>
                Your Message
              </label>
              <textarea name="message" placeholder="Hi Satish, I'd love to collaborate on..."
                value={form.message} onChange={handleChange} required rows={5}
                onFocus={() => setFocus('message')} onBlur={() => setFocus('')}
                style={{ ...inputStyle('message'), resize: 'none' }} />
            </div>

            {/* Submit */}
            <motion.button type="submit"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full font-bold text-white relative overflow-hidden rounded-xl"
              style={{
                padding: '15px 0', fontSize: 15,
                background: sent ? '#10b981' : 'linear-gradient(135deg, #7c3aed, #a855f7)',
              }}
            >
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(105deg,transparent 30%,rgba(255,255,255,0.2) 50%,transparent 70%)' }}
              />
              <span className="relative z-10">{sent ? '✅ Message Sent!' : '📨 Send Message'}</span>
            </motion.button>
          </motion.form>

          {/* ══ RIGHT ══ */}
          <motion.div
            variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={3}
            className="flex flex-col"
            style={{ gap: '1rem' }}
          >
            {/* Why work with me */}
            <div
              className={`rounded-2xl border
                ${isDark ? 'bg-white/[0.03] border-white/[0.08]' : 'bg-white border-purple-100 shadow-sm'}`}
              style={{ padding: '1.5rem 1.5rem' }}
            >
              <h4 className={`font-black ${isDark ? 'text-white' : 'text-gray-900'}`}
                style={{ fontSize: 16, marginBottom: 16 }}>
                Why Work With Me?
              </h4>
              {[
                { icon: '⚡', text: 'Fast delivery & clean code' },
                { icon: '🎨', text: 'Beautiful, responsive UIs' },
                { icon: '🤖', text: 'ML/AI integration expertise' },
                { icon: '🔗', text: 'Full-stack MERN developer' },
                { icon: '📊', text: 'Data-driven decision making' },
              ].map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className={`flex items-center border-b last:border-0
                    ${isDark ? 'border-white/5' : 'border-purple-50'}`}
                  style={{ gap: 12, padding: '10px 0' }}
                >
                  <span style={{ fontSize: 18 }}>{item.icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 500, color: isDark ? '#d1d5db' : '#374151' }}>
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Availability */}
            <div
              className="rounded-2xl border relative overflow-hidden"
              style={{
                padding: '1.5rem',
                background: isDark
                  ? 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(168,85,247,0.08))'
                  : 'linear-gradient(135deg, rgba(124,58,237,0.06), rgba(168,85,247,0.04))',
                borderColor: isDark ? 'rgba(124,58,237,0.3)' : 'rgba(124,58,237,0.15)',
              }}
            >
              <div className="flex items-center" style={{ gap: 8, marginBottom: 10 }}>
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span style={{
                  fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.1em', color: isDark ? '#4ade80' : '#16a34a'
                }}>
                  Available Now
                </span>
              </div>
              <p style={{ fontSize: 15, fontWeight: 600, color: isDark ? '#fff' : '#111', marginBottom: 6 }}>
                Open to internship opportunities &amp; continuous learning.
              </p>
              <p style={{ fontSize: 13, color: isDark ? '#9ca3af' : '#6b7280' }}>
                Ready to start immediately on exciting projects.
              </p>
            </div>

            {/* Stats grid */}
            <div
              className={`rounded-2xl border grid grid-cols-2
                ${isDark ? 'bg-white/[0.03] border-white/[0.08]' : 'bg-white border-purple-100 shadow-sm'}`}
              style={{ padding: '1.5rem', gap: '1.25rem' }}
            >
              {[
                { num: '10+', label: 'Projects' },
                { num: '<24h', label: 'Response' },
                { num: '600+', label: 'LeetCode' },
                { num: '100%', label: 'Committed' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div style={{
                    fontSize: 22, fontWeight: 900,
                    background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>
                    {s.num}
                  </div>
                  <div style={{
                    fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em',
                    fontWeight: 600, marginTop: 4,
                    color: isDark ? '#6b7280' : '#9ca3af',
                  }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;