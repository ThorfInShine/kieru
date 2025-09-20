# 🌟 KIERU - Temporary Email Service

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

---

## 🚀 Overview

KIERU is a cutting-edge temporary email service built with **Next.js 14** and **TypeScript**, designed to protect your privacy in the digital age. It provides instant, disposable email addresses that shield your real identity from spam, marketing campaigns, and potential data breaches.

---

## ✨ Key Features

* 🔒 **100% Anonymous** — No registration or personal information required
* ⚡ **Instant Generation** — Create disposable emails in milliseconds
* 🌐 **Multiple Domains** — Choose from 11+ available domains
* 🔄 **Real-time Updates** — Auto-refresh inbox (3–30s intervals)
* 🎨 **Modern UI/UX** — Beautiful, responsive design with animations
* 📱 **Mobile Friendly** — Fully responsive on all devices
* 🗑️ **Auto-cleanup** — Emails deleted automatically for privacy
* ⚙️ **Custom Usernames** — Choose your own email prefix

---

## 🎯 Perfect For

* 🛒 Spam-free online shopping
* 🧪 Testing website registrations
* 📥 Safe resource downloads
* 🚫 Avoiding marketing emails
* 🛡️ Protecting personal inbox
* 🕵️ Anonymous communications

---

## 🛠️ Tech Stack

* **Framework**: Next.js 14 (App Router)
* **Language**: TypeScript
* **Styling**: CSS-in-JS + custom animations
* **Icons**: Lucide React
* **API**: Guerrilla Mail REST API
* **HTTP Client**: Axios
* **Deployment**: Vercel-ready

---

## 📦 Installation

```bash
# Clone repo
git clone https://github.com/ThorfInShine/kieru.git
cd kieru

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
```

Visit **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🏗️ Project Structure

```
kieru-temp-mail/
├── app/
│   ├── api/email/          # API endpoints
│   ├── about/              # About page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── EmailClient.tsx     # Main email client
│   ├── Footer.tsx          # Footer
│   ├── KieruIcon.tsx       # Logo component
│   └── Navbar.tsx          # Navigation
├── lib/
│   ├── domains.ts          # Email domains
│   └── guerrillamail.ts    # API client
└── types/
    └── email.ts            # TypeScript interfaces
```

---

## 🔧 Configuration

**Environment Variables**
Create `.env.local`:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Domain List** (edit `lib/domains.ts`):

```ts
export const EMAIL_DOMAINS = [
  { value: "grr.la", label: "grr.la", description: "Short and simple" },
  // Add more domains...
];
```

---

## 📄 API Documentation

| Method | Endpoint                                     | Description                         |
| ------ | -------------------------------------------- | ----------------------------------- |
| GET    | `/api/email?action=get_address`              | Get existing email                  |
| GET    | `/api/email?action=get_new_address`          | Generate new email                  |
| GET    | `/api/email?action=check_email&seq=0`        | Check new emails                    |
| GET    | `/api/email?action=get_list&offset=0`        | Get email list                      |
| GET    | `/api/email?action=fetch_email&email_id=123` | Get email content                   |
| POST   | `/api/email`                                 | Set custom username / delete emails |

**Response format:**

```ts
interface APIResponse<T = any> {
  success: boolean;
  error?: string;
  data?: T;
}
```

---

## 🎯 Roadmap

* 📤 Email forwarding
* 📂 Manage multiple addresses
* 🔍 Search & filter emails
* 📱 PWA support
* 📎 Attachment support
* 🧹 Bulk email actions

---

## 🤝 Contributing

1. Fork the repo
2. Create branch: `git checkout -b feature/amazing-feature`
3. Commit: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open a PR

---

## 📜 License

This project is licensed under the **MIT License**. See [LICENSE](./LICENSE).

---

## 🙏 Acknowledgments

* Guerrilla Mail API
* Lucide Icons
* Next.js team
* Vercel hosting

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/ThorfInShine">ThorfInShine</a></p>
  <p><strong>KIERU</strong> — Protecting your privacy, one temporary email at a time</p>
</div>

---

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=ThorfInShine/kieru\&type=Date)](https://star-history.com/#ThorfInShine/kieru&Date)
