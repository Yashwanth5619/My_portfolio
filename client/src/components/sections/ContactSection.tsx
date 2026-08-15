import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import confetti from 'canvas-confetti';
import { MapPin, Mail, Phone, Send, Loader2, Sparkles } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  subject: z.string().min(5, 'Subject must be at least 5 characters.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactProps {
  personalInfo: {
    email: string;
    phone: string;
    location: string;
  };
}

export default function ContactSection({ personalInfo }: ContactProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const res = await response.json();

      if (res.success) {
        setSubmitStatus('success');
        reset();
        
        // Ring up confetti!
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (e) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#030712] relative overflow-hidden">
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-mono">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-title text-white">
            Contact Me & Feedback
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-panel border border-gray-850 rounded-xl p-6 md:p-8 space-y-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-100 font-title border-b border-gray-850 pb-3">
                Contact Directory
              </h3>
              
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="h-9 w-9 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email</h4>
                    <a href={`mailto:${personalInfo.email}`} className="text-sm font-semibold text-gray-200 hover:text-cyan-400 break-all transition-all">
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="h-9 w-9 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Phone</h4>
                    <p className="text-sm font-semibold text-gray-200">{personalInfo.phone}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="h-9 w-9 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Location</h4>
                    <p className="text-sm font-semibold text-gray-200">{personalInfo.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel border border-gray-850 rounded-xl p-6 md:p-8 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-cyan-950/40 border border-cyan-500/10 flex items-center justify-center text-sm">
                💬
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Recruiters: Messages sent here are logged securely to the dashboard for quick reviews.
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <form 
              onSubmit={handleSubmit(onSubmit)} 
              className="glass-panel border border-gray-850 rounded-xl p-6 md:p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Full Name</label>
                  <input
                    type="text"
                    {...register('name')}
                    placeholder="Enter name"
                    className="w-full rounded-lg border border-gray-800 bg-gray-950 px-4 py-2.5 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-cyan-500/40"
                  />
                  {errors.name && <p className="text-xs text-rose-400">{errors.name.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Email Address</label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="Enter email"
                    className="w-full rounded-lg border border-gray-800 bg-gray-950 px-4 py-2.5 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-cyan-500/40"
                  />
                  {errors.email && <p className="text-xs text-rose-400">{errors.email.message}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Subject</label>
                <input
                  type="text"
                  {...register('subject')}
                  placeholder="Enter message header"
                  className="w-full rounded-lg border border-gray-800 bg-gray-950 px-4 py-2.5 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-cyan-500/40"
                />
                {errors.subject && <p className="text-xs text-rose-400">{errors.subject.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Message Payload</label>
                <textarea
                  rows={5}
                  {...register('message')}
                  placeholder="Describe internship scope, project specifications or role details..."
                  className="w-full rounded-lg border border-gray-800 bg-gray-950 px-4 py-2.5 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-cyan-500/40 resize-none"
                />
                {errors.message && <p className="text-xs text-rose-400">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white py-3 text-sm font-semibold transition-all shadow-md cursor-pointer select-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Dispatching...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Send Message
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 p-4 text-xs font-mono flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> Message dispatched successfully! Yashwanth will review it shortly.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="rounded-lg bg-rose-950/40 border border-rose-500/20 text-rose-400 p-4 text-xs font-mono">
                  ⚠️ Transmission failed. Please try again or email directly.
                </div>
              )}

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
