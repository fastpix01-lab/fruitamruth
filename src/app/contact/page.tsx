"use client";

import { useState, type FormEvent } from "react";
import Button from "@/components/Button";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-cream to-orange-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-brand-orange/10 text-brand-orange font-semibold text-sm px-4 py-2 rounded-full mb-4">
            Get in Touch
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-brand-dark mb-4">
            Contact Us
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Have a question, feedback, or want to place a bulk order? We&apos;d
            love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-2xl font-bold text-brand-dark mb-8">
                Reach Out to Us
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: "📍",
                    title: "Visit Us",
                    lines: [
                      "123 Fresh Lane, Koramangala",
                      "Bangalore, Karnataka 560001",
                    ],
                  },
                  {
                    icon: "📞",
                    title: "Call Us",
                    lines: ["+91 98765 43210", "Mon-Sun, 7AM - 9PM"],
                  },
                  {
                    icon: "✉️",
                    title: "Email Us",
                    lines: [
                      "hello@fruitamruth.com",
                      "orders@fruitamruth.com",
                    ],
                  },
                ].map((info) => (
                  <div key={info.title} className="flex gap-4">
                    <span className="text-3xl">{info.icon}</span>
                    <div>
                      <h3 className="font-semibold text-brand-dark mb-1">
                        {info.title}
                      </h3>
                      {info.lines.map((line) => (
                        <p key={line} className="text-gray-500 text-sm">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div className="mt-10 w-full h-64 bg-gradient-to-br from-brand-cream to-orange-50 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <span className="text-5xl block mb-2">🗺️</span>
                  <p className="text-gray-400 text-sm">Map location</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="font-display text-2xl font-bold text-brand-dark mb-8">
                Send a Message
              </h2>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center animate-scale-in">
                  <span className="text-6xl block mb-4">✅</span>
                  <h3 className="font-display text-xl font-bold text-brand-green mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-500">
                    Thank you for reaching out. We&apos;ll get back to you
                    within 24 hours.
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mt-6"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl border border-orange-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all bg-brand-cream/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-orange-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all bg-brand-cream/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1.5">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-orange-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all bg-brand-cream/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-1.5">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 rounded-xl border border-orange-200 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all bg-brand-cream/50 resize-none"
                    />
                  </div>
                  <Button type="submit" variant="primary" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
