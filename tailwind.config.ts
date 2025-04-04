
import type { Config } from "tailwind-css";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				note: {
					DEFAULT: 'hsl(var(--note-background))',
					foreground: 'hsl(var(--note-foreground))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' }
				},
				'fade-out': {
					from: { opacity: '1' },
					to: { opacity: '0' }
				},
				'slide-in': {
					from: { transform: 'translateY(20px)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-out': {
					from: { transform: 'translateY(0)', opacity: '1' },
					to: { transform: 'translateY(20px)', opacity: '0' }
				},
				'scale-in': {
					from: { transform: 'scale(0.95)', opacity: '0' },
					to: { transform: 'scale(1)', opacity: '1' }
				},
				'hover-lift': {
					from: { transform: 'translateY(0)' },
					to: { transform: 'translateY(-4px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.2s ease-in',
				'slide-in': 'slide-in 0.3s ease-out',
				'slide-out': 'slide-out 0.2s ease-in',
				'scale-in': 'scale-in 0.2s ease-out',
				'hover-lift': 'hover-lift 0.2s ease-out forwards'
			},
			transitionTimingFunction: {
				'apple-easing': 'cubic-bezier(0.16, 1, 0.3, 1)'
			},
			boxShadow: {
				'soft': '0 6px 14px -6px rgba(0,0,0,0.05), 0 10px 32px -4px rgba(0,0,0,0.025)',
				'hover': '0 8px 22px -6px rgba(0,0,0,0.07), 0 16px 44px -8px rgba(0,0,0,0.06)',
				'neo': '6px 6px 10px rgba(0,0,0,0.03), -6px -6px 10px rgba(255,255,255,0.8)',
				'neo-inset': 'inset 4px 4px 8px rgba(0,0,0,0.03), inset -4px -4px 8px rgba(255,255,255,0.8)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
