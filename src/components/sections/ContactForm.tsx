"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get("fullName"),
      company: formData.get("company"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      opportunityType: formData.get("opportunityType"),
      budgetRange: formData.get("budgetRange"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-left">
      {status === "success" ? (
        <div className="bg-green-500/10 border border-green-500/30 p-8 rounded-2xl text-center">
          <h3 className="text-2xl font-display text-accent-gold mb-2">Message Sent!</h3>
          <p className="text-text-secondary">Thank you for reaching out. We will get back to you shortly.</p>
          <button 
            onClick={() => setStatus("idle")}
            className="mt-6 px-6 py-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-sm uppercase tracking-widest"
          >
            Send Another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-xs uppercase tracking-widest text-text-secondary mb-2">Full Name *</label>
              <input required type="text" id="fullName" name="fullName" className="w-full bg-bg-primary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors" placeholder="Ginika Godwin" />
            </div>
            <div>
              <label htmlFor="company" className="block text-xs uppercase tracking-widest text-text-secondary mb-2">Company / Agency</label>
              <input type="text" id="company" name="company" className="w-full bg-bg-primary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors" placeholder="Your Brand" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-xs uppercase tracking-widest text-text-secondary mb-2">Email Address *</label>
              <input required type="email" id="email" name="email" className="w-full bg-bg-primary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors" placeholder="hello@brand.com" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-text-secondary mb-2">Phone Number</label>
              <input type="tel" id="phone" name="phone" className="w-full bg-bg-primary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors" placeholder="+1 (555) 000-0000" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="opportunityType" className="block text-xs uppercase tracking-widest text-text-secondary mb-2">Opportunity Type</label>
              <select id="opportunityType" name="opportunityType" className="w-full bg-bg-primary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors appearance-none">
                <option value="Sponsorship">Brand Sponsorship</option>
                <option value="Collaboration">Collaboration</option>
                <option value="Event Appearance">Event Appearance</option>
                <option value="Music Feature">Music Feature</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="budgetRange" className="block text-xs uppercase tracking-widest text-text-secondary mb-2">Budget Range</label>
              <select id="budgetRange" name="budgetRange" className="w-full bg-bg-primary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors appearance-none">
                <option value="Under $5k">Under $5k</option>
                <option value="$5k - $10k">$5k - $10k</option>
                <option value="$10k - $50k">$10k - $50k</option>
                <option value="$50k+">$50k+</option>
                <option value="To Be Discussed">To Be Discussed</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs uppercase tracking-widest text-text-secondary mb-2">Message *</label>
            <textarea required id="message" name="message" rows={4} className="w-full bg-bg-primary border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-gold transition-colors" placeholder="Tell us about the project..."></textarea>
          </div>

          {status === "error" && (
            <div className="text-red-400 text-sm text-center">Something went wrong. Please try again or email us directly.</div>
          )}

          <div className="text-center pt-4">
            <button 
              disabled={status === "submitting"}
              type="submit" 
              className="px-12 py-5 bg-accent-gold text-bg-secondary font-bold uppercase tracking-widest hover:bg-accent-gold-hover transition-colors rounded-full shadow-lg disabled:opacity-50"
            >
              {status === "submitting" ? "Sending..." : "Submit Enquiry"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}