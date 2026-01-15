"use client";
import React from "react";
import {
  Wrench,
  Clock,
  Rocket,
  Mail,
  Sparkles,
  Cloud,
  Server,
  Zap,
  Shield,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Globe,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function Maintenance() {
  const socialLinks = [
    {
      platform: "Twitter",
      icon: Twitter,
      url: "https://twitter.com/evolveictsummit",
      color: "from-blue-400 to-blue-600",
      hover: "hover:shadow-blue-500/25",
    },
    {
      platform: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/company/evolveictsummit",
      color: "from-blue-600 to-blue-800",
      hover: "hover:shadow-blue-600/25",
    },
    {
      platform: "Facebook",
      icon: Facebook,
      url: "https://facebook.com/evolveictsummit",
      color: "from-blue-500 to-blue-700",
      hover: "hover:shadow-blue-500/25",
    },
    {
      platform: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/evolveictsummit",
      color: "from-purple-500 via-pink-500 to-orange-400",
      hover: "hover:shadow-pink-500/25",
    },
  ];

  const updates = [
    {
      time: "Just now",
      title: "Database optimization in progress",
      status: "in-progress",
      icon: Server,
    },
    {
      time: "5 minutes ago",
      title: "Security updates applied",
      status: "completed",
      icon: Shield,
    },
    {
      time: "15 minutes ago",
      title: "Performance improvements",
      status: "completed",
      icon: Zap,
    },
    {
      time: "30 minutes ago",
      title: "Scheduled maintenance started",
      status: "completed",
      icon: Clock,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a051f] via-[#1a1448] to-[#0f172a] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-[#ffcc00]/5 rounded-full blur-3xl animate-pulse delay-500" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] animate-grid" />

        {/* Floating icons */}
        <div className="absolute top-20 right-20 animate-float">
          <Server className="w-12 h-12 text-blue-400/20" />
        </div>
        <div className="absolute bottom-40 left-20 animate-float delay-1000">
          <Cloud className="w-16 h-16 text-purple-400/20" />
        </div>
        <div className="absolute top-40 left-40 animate-float delay-500">
          <Zap className="w-10 h-10 text-[#ffcc00]/20" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated icon */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-[#ffcc00] to-amber-500 rounded-full blur-xl opacity-50 animate-ping" />
            <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-[#170d43] to-[#2a1b69] rounded-3xl flex items-center justify-center border border-white/10 shadow-2xl">
              <Wrench className="w-16 h-16 text-[#ffcc00]" />
            </div>

            {/* Orbiting elements */}
            <div className="absolute top-1/2 left-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2">
              {[0, 90, 180, 270].map((deg) => (
                <div
                  key={deg}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    transform: `rotate(${deg}deg) translateX(120px) rotate(-${deg}deg)`,
                    animation: `orbit 8s linear infinite`,
                    animationDelay: `${deg * 0.1}s`,
                  }}
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Status badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-pulse">
            <div className="w-2 h-2 bg-[#ffcc00] rounded-full animate-ping" />
            <span className="text-sm font-medium text-white">LIVE UPDATES</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            We&apos;re
            <span className="block text-[#ffcc00] mt-2">Improving</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Exciting updates are underway! We&apos;re enhancing your experience
            with
            <span className="text-[#ffcc00] font-semibold"> new features </span>
            and improved performance.
          </p>

          {/* Progress bar */}
          <div className="max-w-md mx-auto mb-12">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Update Progress</span>
              <span>75%</span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#ffcc00] to-amber-500 rounded-full animate-progress"
                style={{ width: "75%" }}
              />
            </div>
          </div>

          {/* Countdown timer */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-12 max-w-lg mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-[#ffcc00]" />
              <span className="text-white font-medium">
                Estimated Completion
              </span>
            </div>
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">02</div>
                <div className="text-sm text-gray-400">Hours</div>
              </div>
              <div className="text-2xl text-[#ffcc00]">:</div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white">30</div>
                <div className="text-sm text-gray-400">Minutes</div>
              </div>
              <div className="text-2xl text-[#ffcc00]">:</div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white">45</div>
                <div className="text-sm text-gray-400">Seconds</div>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="mb-16">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <Globe className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400">Stay Connected</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div
                      className={`relative overflow-hidden bg-gradient-to-br ${social.color} rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 ${social.hover} hover:shadow-xl`}
                    >
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                      <div className="relative z-10 flex flex-col items-center gap-3">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-white font-medium">
                          {social.platform}
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-400 mb-4">
                Follow us for real-time updates
              </p>
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4 text-[#ffcc00]" />
                <span className="text-sm text-white">#EvolveICT2026</span>
              </div>
            </div>
          </div>

          {/* Email Newsletter */}
          <div className="bg-gradient-to-r from-[#170d43]/50 to-[#2a1b69]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#ffcc00] to-amber-500 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  Get Notified
                </h3>
                <p className="text-gray-300">
                  We&apos;ll email you when we&apos;re back online
                </p>
              </div>
            </div>

            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffcc00] focus:border-transparent"
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-[#ffcc00] to-amber-500 text-black font-bold px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-amber-500/25"
              >
                Notify Me
                <Rocket className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-gray-400 mb-2">
              Made with <Heart className="w-4 h-4 text-red-400 inline" /> by
              Evolve ICT Team
            </p>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Evolve ICT Summit. All rights
              reserved.
            </p>
            <div className="mt-4">
              <Button variant="ghost" size="sm" asChild>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </Button>
              <span className="text-gray-600 mx-2">•</span>
              <Button variant="ghost" size="sm" asChild>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white"
                >
                  Contact Support
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(120px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(120px) rotate(-360deg);
          }
        }

        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 75%;
          }
        }

        @keyframes grid {
          0% {
            background-position: 0px 0px;
          }
          100% {
            background-position: 60px 60px;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-progress {
          animation: progress 2s ease-out forwards;
        }

        .animate-grid {
          animation: grid 20s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default Maintenance;
