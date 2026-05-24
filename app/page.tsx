"use client";

import { useState, useRef } from "react";
import { menus, questions } from "./data";

interface Menu {
  name: string;
  category: string;
  reason: string;
  scores: {
    spicy: number;
    comfort: number;
    heavy: number;
    light: number;
  };
}

type ScoreCategory = "spicy" | "comfort" | "heavy" | "light";

// SVG Icons
const ShareIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const RefreshIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const SpicyIcon = () => (
  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>
);

const ComfortIcon = () => (
  <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
    <line x1="6" y1="2" x2="6" y2="4"/>
    <line x1="10" y1="2" x2="10" y2="4"/>
    <line x1="14" y1="2" x2="14" y2="4"/>
  </svg>
);

const HeavyIcon = () => (
  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
    <path d="M7 2v20"/>
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
  </svg>
);

const LightIcon = () => (
  <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
  </svg>
);

const AppLogo = () => (
  <svg className="w-full h-full" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="logoClay" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FB923C" />
        <stop offset="100%" stopColor="#F97316" />
      </radialGradient>
      <filter id="iconShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#9A3412" floodOpacity="0.3"/>
      </filter>
    </defs>
    <rect width="512" height="512" rx="140" fill="url(#logoClay)"/>
    
    <g filter="url(#iconShadow)">
      {/* Bowl/Base */}
      <path d="M120 280H392" stroke="white" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M360 280V304C360 361.438 313.438 408 256 408C198.562 408 152 361.438 152 304V280" stroke="white" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round"/>
      {/* The 3 Fork Tines */}
      <path d="M256 160V224" stroke="white" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M176 176V224" stroke="white" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M336 176V224" stroke="white" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round"/>
    </g>

    {/* Soft 3D Glossy Highlights */}
    <rect x="50" y="50" width="120" height="50" rx="25" fill="white" opacity="0.3"/>
    <circle cx="420" cy="420" r="30" fill="white" opacity="0.1"/>
  </svg>
);

// Large Category Art Components
const KapraoArt = () => (
  <svg className="w-full h-48 md:h-64" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="plateClay" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E2E8F0" />
      </radialGradient>
      <radialGradient id="riceClay" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#F1F5F9" />
      </radialGradient>
      <radialGradient id="meatClay" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#A16207" />
        <stop offset="100%" stopColor="#713F12" />
      </radialGradient>
    </defs>
    {/* Soft Clay Plate */}
    <circle cx="100" cy="105" r="85" fill="#CBD5E1" opacity="0.3" />
    <circle cx="100" cy="100" r="85" fill="url(#plateClay)" />
    {/* Pillowy Rice */}
    <path d="M50 130 C 50 80, 120 70, 130 130 Z" fill="url(#riceClay)" />
    <path d="M60 120 C 60 90, 110 80, 120 120 Z" fill="#FFFFFF" opacity="0.5" />
    {/* Chunky Basil Meat */}
    <path d="M90 145 C 80 110, 150 110, 160 145 Z" fill="url(#meatClay)" />
    <circle cx="110" cy="120" r="8" fill="#15803D" />
    <circle cx="135" cy="130" r="7" fill="#166534" />
    {/* Soft Chili */}
    <rect x="115" y="135" width="20" height="6" rx="3" fill="#EF4444" transform="rotate(-20 115 135)" />
    {/* Soft Egg */}
    <circle cx="65" cy="120" r="22" fill="#FFFFFF" />
    <circle cx="65" cy="118" r="10" fill="#F59E0B" />
    <circle cx="62" cy="115" r="3" fill="#FFFFFF" opacity="0.4" />
  </svg>
);

const PorridgeArt = () => (
  <svg className="w-full h-48 md:h-64" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bowlClay" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#2563EB" />
      </radialGradient>
      <radialGradient id="soupClay" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#F8FAFC" />
        <stop offset="100%" stopColor="#E2E8F0" />
      </radialGradient>
    </defs>
    {/* 3D Bowl */}
    <path d="M40 100 C 40 160, 160 160, 160 100" fill="#1E40AF" opacity="0.3" />
    <path d="M40 100 C 40 155, 160 155, 160 100" fill="url(#bowlClay)" />
    <ellipse cx="100" cy="100" rx="60" ry="20" fill="url(#soupClay)" />
    {/* Clay Meatballs */}
    <circle cx="85" cy="110" r="8" fill="#CBD5E1" />
    <circle cx="110" cy="115" r="10" fill="#CBD5E1" />
    <circle cx="100" cy="100" r="7" fill="#CBD5E1" />
    {/* Highlights */}
    <ellipse cx="100" cy="88" rx="30" ry="5" fill="#FFFFFF" opacity="0.3" />
    <path d="M80 60 Q 85 40 80 25 M 120 65 Q 125 45 120 30" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" opacity="0.4" />
  </svg>
);

const MookrataArt = () => (
  <svg className="w-full h-48 md:h-64" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="domeClay" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#D97706" />
      </radialGradient>
    </defs>
    {/* Heavy Clay Stove */}
    <path d="M50 130 H 150 L 140 165 H 60 Z" fill="#1E293B" />
    <rect x="70" y="130" width="60" height="12" rx="4" fill="#F97316" />
    {/* Pillowy Brass Dome */}
    <path d="M50 125 C 50 50, 150 50, 150 125" fill="url(#domeClay)" />
    <path d="M70 125 C 70 70, 130 70, 130 125" fill="#FFFFFF" opacity="0.1" />
    {/* Chunky Meat */}
    <rect x="80" y="85" width="25" height="15" rx="6" fill="#EF4444" transform="rotate(-15 80 85)" />
    <rect x="110" y="100" width="22" height="14" rx="6" fill="#991B1B" transform="rotate(10 110 100)" />
    {/* Highlights */}
    <circle cx="95" cy="75" r="5" fill="#FFFFFF" opacity="0.3" />
  </svg>
);

const SomtumArt = () => (
  <svg className="w-full h-48 md:h-64" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="somtumPlateClay" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#F0FDF4" />
        <stop offset="100%" stopColor="#DCFCE7" />
      </radialGradient>
    </defs>
    <circle cx="100" cy="105" r="85" fill="#86EFAC" opacity="0.3" />
    <circle cx="100" cy="100" r="85" fill="url(#somtumPlateClay)" />
    {/* Chunky Papaya Shreds */}
    <path d="M60 110 Q 100 70 140 110" stroke="#4ADE80" strokeWidth="8" strokeLinecap="round" fill="none" />
    <path d="M70 125 Q 100 85 130 125" stroke="#FBBF24" strokeWidth="8" strokeLinecap="round" fill="none" />
    <path d="M65 140 Q 100 100 135 140" stroke="#16A34A" strokeWidth="8" strokeLinecap="round" fill="none" />
    {/* 3D Tomatoes */}
    <circle cx="85" cy="105" r="12" fill="#EF4444" />
    <circle cx="82" cy="102" r="4" fill="#FFFFFF" opacity="0.3" />
    <circle cx="125" cy="125" r="10" fill="#DC2626" />
    {/* Chunky Beans */}
    <rect x="105" y="130" width="25" height="8" rx="4" fill="#15803D" transform="rotate(20 105 130)" />
  </svg>
);

const NoodleArt = () => (
  <svg className="w-full h-48 md:h-64" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="noodleBowlClay" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#F87171" />
        <stop offset="100%" stopColor="#DC2626" />
      </radialGradient>
      <radialGradient id="noodleSoupClay" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="100%" stopColor="#FDE68A" />
      </radialGradient>
    </defs>
    <path d="M40 100 C 40 160, 160 160, 160 100" fill="#991B1B" opacity="0.3" />
    <path d="M40 100 C 40 155, 160 155, 160 100" fill="url(#noodleBowlClay)" />
    <ellipse cx="100" cy="100" rx="60" ry="20" fill="url(#noodleSoupClay)" />
    {/* Pillowy Noodles */}
    <path d="M60 100 Q 80 140 100 100 T 140 100" stroke="#FBBF24" strokeWidth="8" strokeLinecap="round" fill="none" />
    <path d="M70 110 Q 90 150 110 110 T 130 110" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.4" />
    {/* 3D Meatballs */}
    <circle cx="80" cy="100" r="10" fill="#78350F" />
    <circle cx="120" cy="105" r="10" fill="#78350F" />
    <circle cx="77" cy="97" r="3" fill="#FFFFFF" opacity="0.2" />
  </svg>
);

const ShabuArt = () => (
  <svg className="w-full h-48 md:h-64" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="shabuPotClay" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#94A3B8" />
        <stop offset="100%" stopColor="#475569" />
      </radialGradient>
    </defs>
    <path d="M35 100 C 35 160, 165 160, 165 100" fill="#334155" opacity="0.3" />
    <path d="M35 100 C 35 155, 165 155, 165 100" fill="url(#shabuPotClay)" />
    {/* Split Soup */}
    <path d="M40 100 C 40 140, 100 140, 100 100" fill="#EF4444" />
    <path d="M100 100 C 100 140, 160 140, 160 100" fill="#FBBF24" />
    {/* Chunky Ingredients */}
    <circle cx="70" cy="115" r="10" fill="#16A34A" />
    <circle cx="130" cy="115" r="12" fill="#FCA5A5" />
    {/* Pot Handles */}
    <rect x="20" y="100" width="25" height="10" rx="5" fill="#475569" />
    <rect x="155" y="100" width="25" height="10" rx="5" fill="#475569" />
  </svg>
);

const SaladArt = () => (
  <svg className="w-full h-48 md:h-64" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="saladBowlClay" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#A7F3D0" />
        <stop offset="100%" stopColor="#10B981" />
      </radialGradient>
    </defs>
    <path d="M35 100 C 35 160, 165 160, 165 100" fill="#065F46" opacity="0.3" />
    <path d="M35 100 C 35 155, 165 155, 165 100" fill="url(#saladBowlClay)" />
    <ellipse cx="100" cy="100" rx="65" ry="20" fill="#F0FDF4" />
    {/* Pillowy Lettuce */}
    <circle cx="80" cy="95" r="18" fill="#22C55E" />
    <circle cx="120" cy="95" r="18" fill="#16A34A" />
    <circle cx="100" cy="85" r="15" fill="#15803D" />
    {/* 3D Toppings */}
    <circle cx="75" cy="110" r="8" fill="#EF4444" />
    <circle cx="125" cy="110" r="8" fill="#EF4444" />
    <circle cx="100" cy="110" r="12" fill="#FFFFFF" />
    <circle cx="100" cy="110" r="5" fill="#F59E0B" />
  </svg>
);

const KhaoKhaMooArt = () => (
  <svg className="w-full h-48 md:h-64" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="porkClay" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#92400E" />
        <stop offset="100%" stopColor="#451A03" />
      </radialGradient>
    </defs>
    <circle cx="100" cy="105" r="85" fill="#CBD5E1" opacity="0.3" />
    <circle cx="100" cy="100" r="85" fill="#FFFFFF" />
    {/* Soft Rice */}
    <path d="M50 130 C 50 80, 120 70, 130 130 Z" fill="#F1F5F9" />
    {/* Pillowy Stewed Pork */}
    <path d="M90 145 C 90 110, 160 110, 160 145 Z" fill="url(#porkClay)" />
    <rect x="100" y="125" width="45" height="8" rx="4" fill="#FFFFFF" opacity="0.1" />
    {/* 3D Egg */}
    <path d="M135 110 A 12 15 0 1 0 160 110 Z" fill="#FFFFFF" />
    <circle cx="147" cy="115" r="5" fill="#F59E0B" />
  </svg>
);

const YumArt = () => (
  <svg className="w-full h-48 md:h-64" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="yumMixClay" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#F8FAFC" />
        <stop offset="100%" stopColor="#E2E8F0" />
      </radialGradient>
    </defs>
    <circle cx="100" cy="105" r="85" fill="#CBD5E1" opacity="0.3" />
    <circle cx="100" cy="100" r="85" fill="#FFFFFF" />
    {/* Chunky Yum Elements */}
    <circle cx="85" cy="110" r="18" fill="url(#yumMixClay)" />
    <circle cx="115" cy="115" r="15" fill="url(#yumMixClay)" />
    <path d="M70 120 Q 100 80 130 120" stroke="#9333EA" strokeWidth="10" strokeLinecap="round" fill="none" />
    <circle cx="95" cy="95" r="8" fill="#EF4444" />
    <circle cx="120" cy="105" r="7" fill="#EF4444" />
    <circle cx="65" cy="105" r="9" fill="#A3E635" />
    <circle cx="62" cy="102" r="3" fill="#FFFFFF" opacity="0.3" />
  </svg>
);

const TomYumArt = () => (
  <svg className="w-full h-48 md:h-64" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="tomyumBowlClay" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#EA580C" />
        <stop offset="100%" stopColor="#9A3412" />
      </radialGradient>
    </defs>
    <path d="M40 100 C 40 160, 160 160, 160 100" fill="#7C2D12" opacity="0.3" />
    <path d="M40 100 C 40 155, 160 155, 160 100" fill="url(#tomyumBowlClay)" />
    <ellipse cx="100" cy="100" rx="60" ry="20" fill="#FB923C" />
    {/* Chunky Shrimp */}
    <path d="M80 110 Q 100 80 120 110" stroke="#EF4444" strokeWidth="12" strokeLinecap="round" fill="none" />
    <circle cx="75" cy="115" r="6" fill="#DC2626" />
    <circle cx="125" cy="115" r="6" fill="#DC2626" />
    {/* Soft Steam */}
    <path d="M90 60 Q 95 40 90 25 M 110 65 Q 115 45 110 30" stroke="#FDBA74" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
  </svg>
);

const OmeletArt = () => (
  <svg className="w-full h-48 md:h-64" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="omeletClay" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#D97706" />
      </radialGradient>
    </defs>
    <circle cx="100" cy="105" r="85" fill="#CBD5E1" opacity="0.3" />
    <circle cx="100" cy="100" r="85" fill="#FFFFFF" />
    {/* Soft Rice */}
    <path d="M50 130 C 50 80, 120 70, 130 130 Z" fill="#F1F5F9" />
    {/* Pillowy Omelet */}
    <path d="M45 130 C 45 100, 155 100, 155 130 C 155 145, 45 145, 45 130 Z" fill="url(#omeletClay)" />
    <path d="M60 120 Q 100 110 140 120" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.2" fill="none" />
    {/* Chunky Ketchup */}
    <path d="M70 115 Q 100 105 130 115" stroke="#EF4444" strokeWidth="8" strokeLinecap="round" fill="none" />
  </svg>
);

const LarbArt = () => (
  <svg className="w-full h-48 md:h-64" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="larbMeatClay" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#A16207" />
        <stop offset="100%" stopColor="#713F12" />
      </radialGradient>
    </defs>
    <circle cx="100" cy="105" r="85" fill="#86EFAC" opacity="0.3" />
    <circle cx="100" cy="100" r="85" fill="#FFFFFF" />
    {/* Chunky Larb Meat */}
    <circle cx="100" cy="115" r="35" fill="url(#larbMeatClay)" />
    <circle cx="85" cy="105" r="28" fill="url(#larbMeatClay)" />
    <circle cx="115" cy="105" r="28" fill="url(#larbMeatClay)" />
    {/* Pillowy Mint Leaves */}
    <circle cx="95" cy="90" r="10" fill="#22C55E" />
    <circle cx="110" cy="85" r="8" fill="#16A34A" />
    {/* Toppings */}
    <circle cx="120" cy="110" r="4" fill="#DC2626" />
    <circle cx="80" cy="115" r="4" fill="#DC2626" />
  </svg>
);

const MooDaengArt = () => (
  <svg className="w-full h-48 md:h-64" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="redPorkClay" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#991B1B" />
      </radialGradient>
    </defs>
    <circle cx="100" cy="105" r="85" fill="#CBD5E1" opacity="0.3" />
    <circle cx="100" cy="100" r="85" fill="#FFFFFF" />
    {/* Soft Rice */}
    <path d="M50 130 C 50 80, 120 70, 130 130 Z" fill="#F1F5F9" />
    {/* Chunky Red Pork Slices */}
    <rect x="80" y="105" width="22" height="35" rx="8" fill="url(#redPorkClay)" transform="rotate(-10 80 105)" />
    <rect x="105" y="110" width="22" height="35" rx="8" fill="url(#redPorkClay)" transform="rotate(5 105 110)" />
    {/* Highlights */}
    <rect x="85" y="110" width="10" height="15" rx="5" fill="#FFFFFF" opacity="0.2" transform="rotate(-10 85 110)" />
    {/* Chunky Cucumber */}
    <rect x="55" y="125" width="15" height="8" rx="4" fill="#A3E635" transform="rotate(-30 55 125)" />
  </svg>
);

const KhaoManGaiArt = () => (
  <svg className="w-full h-48 md:h-64" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="chickenClay" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#F1F5F9" />
      </radialGradient>
    </defs>
    <circle cx="100" cy="105" r="85" fill="#CBD5E1" opacity="0.3" />
    <circle cx="100" cy="100" r="85" fill="#FFFFFF" />
    {/* Oily Rice */}
    <path d="M50 130 C 50 80, 120 70, 130 130 Z" fill="#FEF3C7" />
    {/* Pillowy Chicken */}
    <path d="M85 140 C 85 110, 145 110, 145 140 Z" fill="url(#chickenClay)" />
    <path d="M95 125 L 135 125" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
    {/* Chunky Soup Bowl */}
    <circle cx="145" cy="100" r="15" fill="#EFF6FF" stroke="#93C5FD" strokeWidth="2" />
    <circle cx="145" cy="100" r="3" fill="#16A34A" />
  </svg>
);

const CurryArt = () => (
  <svg className="w-full h-48 md:h-64" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="curryClay" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#F97316" />
        <stop offset="100%" stopColor="#C2410C" />
      </radialGradient>
    </defs>
    <path d="M40 100 C 40 160, 160 160, 160 100" fill="#9A3412" opacity="0.3" />
    <path d="M40 100 C 40 155, 160 155, 160 100" fill="url(#curryClay)" />
    <ellipse cx="100" cy="100" rx="60" ry="20" fill="#FDBA74" />
    {/* Chunky Ingredients */}
    <circle cx="85" cy="105" r="10" fill="#78350F" />
    <circle cx="115" cy="110" r="8" fill="#B45309" />
    {/* Creamy Swirl */}
    <path d="M70 100 Q 100 120 130 100" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.3" />
  </svg>
);

const FriedRiceArt = () => (
  <svg className="w-full h-48 md:h-64" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="friedRiceClay" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#F59E0B" />
      </radialGradient>
    </defs>
    <circle cx="100" cy="105" r="85" fill="#CBD5E1" opacity="0.3" />
    <circle cx="100" cy="100" r="85" fill="#FFFFFF" />
    {/* Pillowy Fried Rice Heap */}
    <path d="M50 130 C 50 80, 150 80, 150 130 C 150 145, 50 145, 50 130 Z" fill="url(#friedRiceClay)" />
    <path d="M60 110 Q 100 90 140 110" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.2" fill="none" />
    {/* Chunky Ingredients */}
    <circle cx="80" cy="115" r="4" fill="#22C55E" />
    <circle cx="110" cy="120" r="4" fill="#F97316" />
    <circle cx="95" cy="105" r="4" fill="#EF4444" />
    <circle cx="130" cy="115" r="4" fill="#22C55E" />
    {/* Chunky Lime */}
    <circle cx="145" cy="135" r="12" fill="#A3E635" />
    <circle cx="142" cy="132" r="3" fill="#FFFFFF" opacity="0.3" />
  </svg>
);

const PadThaiArt = () => (
  <svg className="w-full h-48 md:h-64" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="padThaiClay" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </radialGradient>
    </defs>
    <circle cx="100" cy="105" r="85" fill="#CBD5E1" opacity="0.3" />
    <circle cx="100" cy="100" r="85" fill="#FFFFFF" />
    {/* Pillowy Pad Thai Noodles */}
    <path d="M55 125 Q 100 80 145 125" stroke="url(#padThaiClay)" strokeWidth="15" strokeLinecap="round" fill="none" />
    <path d="M65 115 Q 100 70 135 115" stroke="#FFFFFF" strokeWidth="15" strokeLinecap="round" opacity="0.2" fill="none" />
    {/* Chunky Tofu/Shrimp */}
    <rect x="80" y="95" width="18" height="18" rx="6" fill="#F97316" transform="rotate(15 80 95)" />
    <rect x="115" y="105" width="20" height="14" rx="6" fill="#EA580C" transform="rotate(-10 115 105)" />
    {/* Chunky Chives */}
    <path d="M130 135 L 155 120" stroke="#16A34A" strokeWidth="8" strokeLinecap="round" />
    <path d="M135 142 L 160 127" stroke="#15803D" strokeWidth="8" strokeLinecap="round" />
  </svg>
);

const getMenuArt = (menu: Menu) => {
  const name = menu.name;
  
  if (name.includes("กะเพรา") || name.includes("ผัดพริกแกง")) return <KapraoArt />;
  if (name.includes("ส้มตำ") || name.includes("ตำ")) return <SomtumArt />;
  if (name.includes("ต้มยำ")) return <TomYumArt />;
  if (name.includes("ยำ")) return <YumArt />;
  if (name.includes("ลาบ")) return <LarbArt />;
  if (name.includes("ก๋วยเตี๋ยว") || name.includes("บะหมี่") || name.includes("มาม่า") || name.includes("เส้น") || name.includes("ราดหน้า") || name.includes("ซอย")) return <NoodleArt />;
  if (name.includes("ไข่เจียว")) return <OmeletArt />;
  if (name.includes("ข้าวต้ม") || name.includes("โจ๊ก") || name.includes("ซุป") || name.includes("ต้มจืด") || name.includes("แกงจืด")) return <PorridgeArt />;
  if (name.includes("ต้มข่า") || name.includes("มัสมั่น")) return <CurryArt />;
  if (name.includes("หมูกระทะ") || name.includes("ปิ้งย่าง")) return <MookrataArt />;
  if (name.includes("หมูแดง")) return <MooDaengArt />;
  if (name.includes("ข้าวมันไก่")) return <KhaoManGaiArt />;
  if (name.includes("ชาบู") || name.includes("สุกี้") || name.includes("จิ้มจุ่ม") || name.includes("หม้อไฟ")) return <ShabuArt />;
  if (name.includes("ผัดไทย") || name.includes("ผัดซีอิ๊ว")) return <PadThaiArt />;
  if (name.includes("ข้าวผัด")) return <FriedRiceArt />;
  if (name.includes("ขาหมู")) return <KhaoKhaMooArt />;
  if (name.includes("สลัด")) return <SaladArt />;

  switch(menu.category) {
    case "spicy": return <KapraoArt />;
    case "comfort": return <PorridgeArt />;
    case "heavy": return <MookrataArt />;
    case "light": return <SaladArt />;
    default: return <KapraoArt />;
  }
};

const getCategoryName = (category: string) => {
  const nameMap: { [key: string]: string } = {
    spicy: "อยากให้จัดเต็ด",
    comfort: "อยากให้อบอุ่น",
    heavy: "อยากให้หิวจัดหนัก",
    light: "อยากให้เบาๆ"
  };
  return nameMap[category] || "ไม่ทราบ";
};

export default function FoodQuiz() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ spicy: 0, comfort: 0, heavy: 0, light: 0 });
  const [showResult, setShowResult] = useState(false);
  const [resultMenu, setResultMenu] = useState<Menu | null>(null);
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [saving, setSaving] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleAnswer = (type: ScoreCategory) => {
    const newScores = { ...scores, [type]: scores[type] + 1 };
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newScores);
    }
  };

  const calculateResult = (finalScores: typeof scores) => {
    // Calculate similarity score for each menu using dot product
    const menuMatches = menus.map(m => {
      const menu = m as unknown as Menu;
      const ms = menu.scores;
      const similarity = 
        (finalScores.spicy * ms.spicy) +
        (finalScores.comfort * ms.comfort) +
        (finalScores.heavy * ms.heavy) +
        (finalScores.light * ms.light);
      
      return { menu, similarity };
    });

    // Find the highest similarity score
    const maxSimilarity = Math.max(...menuMatches.map(m => m.similarity));

    // Get all menus that match the maximum score
    const winners = menuMatches.filter(m => m.similarity === maxSimilarity);

    // Randomly pick one from the best matches
    const selectedMenu = winners[Math.floor(Math.random() * winners.length)].menu;
    
    setResultMenu(selectedMenu);
    setShowResult(true);
  };

  const handleShare = async () => {
    if (sharing) return;
    setSharing(true);

    const text = `วันนี้ฉันควรกิน: ${resultMenu?.name}\n${getCategoryName(resultMenu?.category || "")}\n\n${resultMenu?.reason}\n\nลองเล่นเกมหา: https://kinraidee.vercel.app`;
    
    try {
      if (typeof navigator !== 'undefined' && resultRef.current) {
        const htmlToImage = await import("html-to-image");
        const blob = await htmlToImage.toBlob(resultRef.current, { 
          pixelRatio: 2, 
          backgroundColor: "#ffffff",
          cacheBust: true,
        });
        
        if (blob) {
          const file = new File([blob], `kinraidee-${resultMenu?.name}.png`, { type: 'image/png' });
          const shareData = { 
            title: "วันนี้กินอะไรดี?", 
            text: text, 
            files: [file] 
          };

          if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            await navigator.share(shareData);
            setSharing(false);
            return;
          }
        }
      }
    } catch (err) {
      console.error("Image share failed, falling back to text", err);
    }

    // Fallback to text or clipboard
    if (navigator.share) {
      try {
        await navigator.share({
          title: "วันนี้กินอะไรดี?",
          text: text
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Clipboard failed", err);
      }
    }
    setSharing(false);
  };

  const handleDownload = async () => {
    if (saving || !resultRef.current) return;
    setSaving(true);

    try {
      const htmlToImage = await import("html-to-image");
      const dataUrl = await htmlToImage.toPng(resultRef.current, { 
        pixelRatio: 2, 
        backgroundColor: "#ffffff",
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `kinraidee-${resultMenu?.name}.png`;
      link.click();
    } catch (err) {
      console.error("Download failed", err);
    }
    setSaving(false);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores({ spicy: 0, comfort: 0, heavy: 0, light: 0 });
    setShowResult(false);
    setResultMenu(null);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex flex-col items-center justify-center lg:p-8 font-sans">
      <div className="w-full max-w-md lg:max-w-5xl bg-white min-h-screen lg:min-h-[700px] lg:h-[700px] lg:rounded-[3rem] shadow-2xl shadow-slate-200 overflow-hidden relative flex flex-col lg:flex-row">
        
        {/* Left Side Panel - Desktop Only */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#F8FAFC] items-center justify-center p-16 border-r border-gray-100 relative overflow-hidden">
          <div className="relative z-10 w-full max-w-sm animate-fade-in transition-all duration-700 ease-in-out">
            {!quizStarted ? (
              <div className="scale-125 hover:scale-[1.3] transition-transform duration-1000">
                <AppLogo />
              </div>
            ) : showResult && resultMenu ? (
              <div className="scale-110 hover:rotate-3 transition-transform duration-1000">
                {getMenuArt(resultMenu)}
              </div>
            ) : (
              <div className="opacity-20 grayscale scale-90">
                <AppLogo />
              </div>
            )}
          </div>
          {/* Ambient Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-orange-100/30 rounded-full blur-[80px]"></div>
        </div>

        {/* Right Side Panel - Main Interactive Area */}
        <div className="flex-1 flex flex-col relative w-full lg:w-1/2">
          
          {!quizStarted ? (
            /* หน้าแรก (Landing Page) */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
              <div className="w-full flex flex-col items-center justify-center mb-12">
                {/* Logo visible on all devices now, but smaller on desktop to complement the large side logo */}
                <div className="w-36 h-36 lg:w-32 lg:h-32 mb-10 drop-shadow-2xl">
                  <AppLogo />
                </div>
                <h1 className="text-6xl lg:text-7xl font-black text-gray-900 tracking-tighter">
                  กินไรดี?
                </h1>
              </div>
              
              <p className="text-xl text-gray-400 mb-16 max-w-[280px] mx-auto leading-relaxed font-bold italic">
                "The most powerful tool to end your lunch dilemma."
              </p>
              
              <button
                onClick={() => setQuizStarted(true)}
                className="w-full px-12 py-6 bg-[#F97316] text-white text-2xl font-black rounded-3xl hover:bg-[#EA580C] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-orange-100"
              >
                เริ่มหาของกิน
              </button>

              <p className="mt-12 text-xs font-bold text-gray-300 uppercase tracking-widest">
                Version 2.0 • Minimalist Edition
              </p>
            </div>
          ) : showResult && resultMenu ? (
          /* หน้าแสดงผลลัพธ์ */
          <div className="flex-1 flex flex-col min-h-0 animate-slide-up">
            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-6 pb-32">
              {/* ส่วนแสดงผล (จะถูก Capture เป็นการ์ด) */}
              <div ref={resultRef} className="bg-white rounded-[2rem] p-8 text-center border border-gray-100 shadow-sm mb-6">
                <div className="mb-4">
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]">Perfect Match</p>
                </div>

                {/* Category Art - Hidden on PC as it's shown in the left panel */}
                <div className="mb-8 flex justify-center lg:hidden">
                  <div className="w-full max-w-[200px]">
                    {getMenuArt(resultMenu)}
                  </div>
                </div>

                {/* Menu Name */}
                <div className="mb-8">
                  <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">
                    {resultMenu.name}
                  </h1>
                  <div className="h-1 w-10 bg-orange-500 mx-auto rounded-full opacity-30"></div>
                </div>

                {/* Reason */}
                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-50 mb-8">
                  <p className="text-gray-900 font-black mb-2 text-sm">Why this dish?</p>
                  <p className="text-gray-500 text-sm leading-relaxed font-bold">{resultMenu.reason}</p>
                </div>

                {/* Simplified Score Summary inside card */}
                <div className="flex justify-between items-center px-2">
                  <div className="flex flex-col items-center">
                    <SpicyIcon /><span className="text-xs font-black mt-1">{scores.spicy}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <ComfortIcon /><span className="text-xs font-black mt-1">{scores.comfort}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <HeavyIcon /><span className="text-xs font-black mt-1">{scores.heavy}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <LightIcon /><span className="text-xs font-black mt-1">{scores.light}</span>
                  </div>
                </div>

                {/* Minimalist Watermark */}
                <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-center gap-2 opacity-30">
                  <div className="w-4 h-4"><AppLogo /></div>
                  <p className="text-[8px] font-black uppercase tracking-widest text-gray-900">Kinraidee App</p>
                </div>
              </div>

              {/* Extra content outside card to encourage scrolling */}
              <div className="px-4 text-center">
                <p className="text-gray-400 text-xs font-bold leading-relaxed">
                  "Don't forget to take a picture of your food and tag us! Enjoy your delicious meal."
                </p>
              </div>
            </div>

            {/* Sticky Bottom Action Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-gray-100 flex gap-3">
              <button
                onClick={handleShare}
                disabled={sharing}
                className="flex-[2] flex items-center justify-center gap-2 py-4 bg-[#F97316] text-white font-black rounded-2xl hover:bg-[#EA580C] transition-all shadow-lg shadow-orange-100 active:scale-95 disabled:opacity-50"
              >
                {sharing ? (
                  <span className="text-sm animate-pulse">SHARING...</span>
                ) : (
                  <>
                    <ShareIcon /> <span className="text-sm">{copied ? 'COPIED!' : 'SHARE'}</span>
                  </>
                )}
              </button>
              <button
                onClick={handleDownload}
                disabled={saving}
                className="flex-1 flex items-center justify-center py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-black transition-all active:scale-95 disabled:opacity-50"
                title="Save Image"
              >
                {saving ? (
                  <span className="text-xs animate-pulse">SAVING...</span>
                ) : (
                  <DownloadIcon />
                )}
              </button>
              <button
                onClick={resetQuiz}
                disabled={sharing || saving}
                className="flex-1 flex items-center justify-center py-4 bg-white text-gray-400 font-black border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all active:scale-95 disabled:opacity-30"
                title="Restart"
              >
                <RefreshIcon />
              </button>
            </div>
          </div>
        ) : (
          /* หน้าควิซคำถาม */
          <div className="flex-1 flex flex-col min-h-0 animate-fade-in relative">
            {/* Pinned Progress Bar */}
            <div className="pt-10 px-8 pb-4 bg-white/50 backdrop-blur-sm z-10">
              <div className="flex justify-between items-end mb-3">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">Question {currentQuestion + 1} of {questions.length}</p>
                <span className="text-xl font-black text-gray-900 leading-none">
                  {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#F97316] h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question & Answers */}
            <div className="flex-1 overflow-y-auto px-8 pb-12 pt-4">
              <h2 className="text-3xl font-black text-gray-900 mb-10 leading-[1.15] tracking-tight">
                {questions[currentQuestion].question}
              </h2>

              <div className="grid gap-3">
                {questions[currentQuestion].answers.map((answer, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(answer.type as ScoreCategory)}
                    className="w-full p-6 bg-gray-50 border border-transparent rounded-[1.5rem] text-left hover:border-orange-500 hover:bg-orange-50 transition-all duration-200 font-bold text-gray-700 active:scale-[0.97] group"
                  >
                    <span className="group-hover:text-orange-600 transition-colors">
                      {answer.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Subtle App Indicator at bottom */}
            <div className="h-2 w-24 bg-gray-100 mx-auto mb-4 rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  </div>
);
}
