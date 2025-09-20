🌟 KIERU - Temporary Email Service



<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
</div>



<div align="center">
  <h3>消える (Kieru) - "To Disappear" in Japanese</h3>
  <p><em>Advanced Temporary Email Service for Ultimate Privacy Protection</em></p>
</div>






🚀 Overview



KIERU is a cutting-edge temporary email service built with Next.js 14 and TypeScript, designed to protect your privacy in the digital age. It provides instant, disposable email addresses that shield your real identity from spam, marketing campaigns, and potential data breaches.



✨ Key Features



🔒 100% Anonymous - No registration or personal information required

⚡ Instant Generation - Create temporary email addresses in milliseconds

🌐 Multiple Domains - Choose from 11+ available domains

🔄 Real-time Updates - Auto-refresh inbox with configurable intervals (3-30 seconds)

🎨 Modern UI/UX - Beautiful, responsive interface with animations

📱 Mobile Friendly - Fully responsive design for all devices

🗑️ Auto-cleanup - Emails automatically deleted for privacy

⚙️ Custom Usernames - Set your preferred email prefix



🎯 Perfect For



🛒 Online shopping without spam

🧪 Testing website registrations

📥 Downloading resources safely

🚫 Avoiding marketing emails

🛡️ Protecting personal inbox

🕵️ Anonymous communications



🛠️ Tech Stack



Framework: Next.js 14 with App Router

Language: TypeScript

Styling: CSS-in-JS with custom animations

Icons: Lucide React

API: RESTful API with Guerrilla Mail integration

HTTP Client: Axios

Deployment: Vercel-ready



📦 Installation



# Clone the repository
git clone https://github.com/yourusername/kieru-temp-mail.git

# Navigate to project directory
cd kieru-temp-mail

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Run development server
npm run dev
# or
yarn dev
# or
pnpm dev



Open http://localhost:3000 to view the application.



🏗️ Project Structure



kieru-temp-mail/
├── app/
│   ├── api/email/          # Email API endpoints
│   ├── about/              # About page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── EmailClient.tsx     # Main email client component
│   ├── Footer.tsx          # Footer component
│   ├── KieruIcon.tsx       # Custom icon component
│   └── Navbar.tsx          # Navigation component
├── lib/
│   ├── domains.ts          # Available email domains
│   └── guerrillamail.ts    # Guerrilla Mail API client
└── types/
    └── email.ts            # TypeScript interfaces



🔧 Configuration



Environment Variables



Create a .env.local file in the root directory:



# Optional: Add any environment-specific configurations
NEXT_PUBLIC_APP_URL=http://localhost:3000



Domain Configuration



Modify lib/domains.ts to customize available email domains:



export const EMAIL_DOMAINS: EmailDomain[] = [
  {
    value: 'grr.la',
    label: 'grr.la',
    description: 'Short and simple'
  },
  // Add more domains...
];



🎨 Features Showcase



🔄 Auto-Refresh System

Configurable refresh intervals (3, 5, 10, 15, 30 seconds)

Real-time inbox updates

Visual refresh status indicators

Manual refresh option



🎯 Custom Email Generation

// Generate random email
GET /api/email?action=get_new_address&domain=grr.la

// Set custom username
POST /api/email
{
  "action": "set_user",
  "email_user": "mycustom",
  "domain": "grr.la"
}



📧 Email Management

View email content with HTML rendering

Delete individual or multiple emails

Email metadata display (sender, timestamp, subject)

Responsive email list with smooth animations



🌟 UI/UX Highlights



Glassmorphism Design - Modern blur effects and transparency

Smooth Animations - CSS keyframes and transitions

Particle Effects - Dynamic background animations

Responsive Layout - Mobile-first design approach

Accessibility - WCAG compliant interface

Dark Theme - Eye-friendly dark color scheme



📱 Responsive Design



The application is fully responsive with breakpoints for:

📱 Mobile (< 768px)

📊 Tablet (768px - 1024px)

🖥️ Desktop (> 1024px)



🔒 Privacy & Security



Zero Data Retention - No personal information stored

SSL Encryption - Secure HTTPS connections

No Tracking - Minimal cookies and analytics

Auto-deletion - Temporary email storage

Anonymous Usage - No registration required



🚀 Deployment



Vercel (Recommended)



# Install Vercel CLI
npm i -g vercel

# Deploy
vercel



Manual Deployment



# Build the application
npm run build

# Start production server
npm start



🤝 Contributing



Contributions are welcome! Please follow these steps:



Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request



Development Guidelines



Use TypeScript for type safety

Follow ESLint and Prettier configurations

Write meaningful commit messages

Add JSDoc comments for complex functions

Test responsive design on multiple devices



📄 API Documentation



Endpoints



 Method 

 Endpoint 

 Description 

 GET 

 /api/email?action=get_address 

 Get existing email address 

 GET 

 /api/email?action=get_new_address 

 Generate new email address 

 GET 

 /api/email?action=check_email&seq=0 

 Check for new emails 

 GET 

 /api/email?action=get_list&offset=0 

 Get email list 

 GET 

 /api/email?action=fetch_email&email_id=123 

 Get email content 

 POST 

 /api/email 

 Set custom username or delete emails 



Response Format



interface APIResponse<T = any> {
  success: boolean;
  error?: string;
  data?: T;
}



🎯 Performance Optimizations



Next.js App Router - Server-side rendering and routing

Code Splitting - Automatic bundle optimization

Image Optimization - Next.js Image component

Lazy Loading - Component-level code splitting

Caching - API response caching strategies



🔮 Future Enhancements



Email forwarding functionality

Multiple email addresses management

Email search and filtering

PWA (Progressive Web App) support

Email attachments support

Bulk email operations

Email templates

Advanced privacy features



🐛 Known Issues



Email content may take a few seconds to load for large emails

Some email providers may block temporary email domains

Auto-refresh may consume more bandwidth on slower connections



📊 Browser Support



✅ Chrome 90+

✅ Firefox 88+

✅ Safari 14+

✅ Edge 90+

✅ Opera 76+



📞 Support



If you encounter any issues or have questions:



Check the Issues page

Create a new issue with detailed information

Join our Discussions



📜 License



This project is licensed under the MIT License - see the LICENSE file for details.



🙏 Acknowledgments



Guerrilla Mail for the email service API

Lucide for beautiful icons

Next.js team for the amazing framework

Vercel for hosting platform






<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/yourusername">ThorfInShine</a></p>
  <p><strong>KIERU</strong> - Protecting your privacy, one temporary email at a time</p>
</div>



⭐ Star History



If you find this project useful, please consider giving it a star! ⭐



[!Star History Chart](https://api.star-history.com/svg?repos=yourusername/kieru-temp-mail&type=Date)






🔗 Quick Links:

Live Demo

Documentation

Changelog

Contributing Guidelines