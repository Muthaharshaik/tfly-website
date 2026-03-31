# TFly Engineering — Production Website

> Next.js 15 · Tailwind CSS · Airtable · EmailJS

## Quick Start

```bash
npm install
cp .env.example .env.local   # fill in your keys
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Environment Variables (.env.local)

```env
# Airtable — store leads as CRM records
NEXT_PUBLIC_AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
NEXT_PUBLIC_AIRTABLE_TABLE=Leads
NEXT_PUBLIC_AIRTABLE_API_KEY=patXXXXXXXXXXXXXX

# EmailJS — instant email notifications on new leads
NEXT_PUBLIC_EMAILJS_SERVICE=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_KEY=xxxxxxxxxxxxxxxx
```

### Airtable Setup
1. airtable.com → New Base → "TFly Leads" → Table: "Leads"
2. Fields: First Name, Last Name, Company, Email, Phone, Service, Message, Submitted At, Status
3. airtable.com/developers → Personal access tokens → Create (scope: data.records:write)

### EmailJS Setup
1. emailjs.com → Add Service (Gmail) → Create Template
2. Template variables: {{from_name}} {{from_email}} {{company}} {{phone}} {{service}} {{message}}
3. Copy Service ID, Template ID, Public Key

## Deploy to Vercel (Free)
1. Push repo to GitHub
2. vercel.com → Import repo → Add env vars → Deploy
3. Settings → Domains → Add tflying.com

## Add Real Team Photos
- Add square photos (400x400px) to /public/images/team/
- Update Team.js: add photo field + replace initials div with next/image

## Customization Checklist
- [ ] Phone number in Contact.js + Footer.js
- [ ] Email address in Contact.js
- [ ] Real team names/roles/bios in Team.js
- [ ] Team photos in /public/images/team/
- [ ] Airtable + EmailJS keys in .env.local
- [ ] Stats in Hero.js (real numbers)
- [ ] Social links in Footer.js
