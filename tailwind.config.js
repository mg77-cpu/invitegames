/** @type {import('tailwindcss').Config} */ 
 module.exports = { 
   content: [ 
     "./app/**/*.{js,jsx,ts,tsx}",
     "./components/**/*.{js,jsx,ts,tsx}",
     "./src/**/*.{js,jsx,ts,tsx}", 
   ], 
   theme: { 
     extend: { 
       fontFamily: { 
         serif: ['var(--font-cormorant)', 'serif'], 
         sans: ['var(--font-montserrat)', 'sans-serif'], 
       }, 
       colors: { 
         brand: { 
           dark: '#0a1a1a', 
           darker: '#050d0d', 
           green: { 
             900: '#0f4d4d', 
             800: '#125e5e', 
             700: '#1a6e6e', 
             600: '#208a8a', 
             500: '#2a8a8a', 
             400: '#3aa0a0', 
             300: '#5abeb', 
             200: '#8bd9d9', 
             100: '#b4dcdc', 
             50: '#d4f0f0', 
           } 
         } 
       }, 
       backgroundImage: { 
         'hero-gradient': 'linear-gradient(135deg, #0a1a1a 0%, #123030 50%, #0a1a1a 100%)', 
       } 
     } 
   }, 
   plugins: [], 
 }
