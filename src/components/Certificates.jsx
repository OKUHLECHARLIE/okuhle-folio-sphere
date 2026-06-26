import React, { useState } from 'react';
import certificates from '../lib/certificates';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import '../styles/certificates.css';

const CERT_CATEGORIES = [
  {
    name: 'Candidate Professional Development',
    issuer: 'CAPACITI',
    items: [
      { title: 'Write Professional Emails in English', asset: 'Write Professional Emails in English.pdf' },
      { title: 'Verbal Communications and Presentation Skills', asset: 'Verbal Communications and Presentation Skills.pdf' },
      { title: 'Active Listening: Enhancing Communication Skills', asset: 'Active Listening Enhancing Communication Skills.pdf' },
      { title: 'Developing Interpersonal Skills', asset: 'Developing Interpersonal Skills.pdf' },
      { title: 'Work Smarter, Not Harder: Time Management for Personal & Professional Productivity', asset: 'Work Smarter, Not Harder Time Management for Personal & Professional Productivity.pdf' },
      { title: 'Emotional Intelligence in the Workplace', asset: 'Emotional Intelligence in the Workplace.pdf' },
      { title: 'Finding Your Professional Voice: Confidence & Impact', asset: 'Finding Your Professional Voice Confidence & Impact.pdf' },
      { title: 'Introduction to Personal Branding', asset: 'Introduction to Personal Branding.pdf' },
      { title: 'Leading with Impact: Team Dynamics, Strategy and Ethics', asset: 'Leading with Impact Team Dynamics, Strategy and Ethics.pdf' },
      { title: 'Financial Planning for Young Adults', asset: 'Financial Planning for Young Adults.pdf' },
    ],
  },
  {
    name: 'AI Bootcamp',
    issuer: 'CAPACITI / Coursera',
    items: [
      { title: 'Generative AI: Prompt Engineering Basics', asset: 'Generative AI_Prompt Engineering Basics.pdf' },
      { title: 'AI For Everyone', asset: 'AI For Everyone.pdf' },
      {
        title: 'Introduction to Artificial Intelligence',
        externalLink: 'https://coursera.org/share/ff275a8253c2bafdccbd5fef479c3258',
      },
      { title: 'Introduction to Generative AI', asset: 'Introduction to Generative AI.pdf' },
      { title: 'AI Essentials', asset: 'AI Essentials.pdf' },
      { title: 'Generative AI with Large Language Models', asset: 'Generative AI with Large Language Models.pdf' },
      { title: 'AI Foundations: Prompt Engineering with ChatGPT', asset: 'AI Foundations Prompt Engineering with ChatGPT.pdf' },
      {
        title: 'Python for Data Science, AI and Development',
        externalLink: 'https://coursera.org/share/ff275a8253c2bafdccbd5fef479c3258',
      },
      { title: 'Supervised Machine Learning: Regression and Classification', asset: 'Supervised Machine Learning Regression and Classification.pdf' },
      { title: 'Advanced Learning Algorithms', asset: 'Advanced Learning Algorithms.pdf' },
      { title: 'Unsupervised Learning, Recommenders, Reinforcement Learning', asset: 'Unsupervised Learning, Recommenders, Reinforcement Learning.pdf' },
      { title: 'Trustworthy AI: Managing Bias, Ethics and Accountability', asset: 'Trustworthy AI Managing Bias, Ethics, and Accountability.pdf' },
      { title: 'Introduction to Responsible AI', asset: 'Introduction to Responsible AI.pdf' },
    ],
  },
  {
    name: 'Google AI Essentials Specializations',
    issuer: 'Google',
    items: [
      { title: 'Introduction to AI', asset: 'Introduction to AI.pdf' },
      { title: 'Maximize Productivity with AI Tools', asset: 'Maximize Productivity With AI Tools.pdf' },
      { title: 'Discover the Art of Prompting', asset: 'Discover the Art of Prompting.pdf' },
      { title: 'Use AI Responsibly', asset: 'Use AI Responsibly.pdf' },
      { title: 'Stay Ahead of the AI Curve', asset: 'Stay Ahead of the AI Curve.pdf' },
      { title: 'Google AI Essentials', asset: 'Google AI Essentials.pdf' },
    ],
  },
  {
    name: 'School Certificate',
    issuer: 'Nelson Mandela University',
    items: [
      { title: 'Diploma in Information Technology', asset: 'Diploma in Information Technology.pdf' },
    ],
  },
  {
    name: 'CCNA',
    issuer: 'Cisco Networking Academy',
    items: [
      { title: 'Enterprise Networking, Security and Automation', asset: 'Enterprise Networking Security and Automation.pdf' },
      { title: 'Switching, Routing and Wireless Essentials', asset: 'Switching Routing and Wireless Essentials.pdf' },
      { title: 'Introduction to Networks', asset: 'Introduction to Networks.pdf' },
      { title: 'Introduction to Cybersecurity', asset: 'Introduction to Cybersecurity.pdf' },
    ],
  },
];

export default function Certificates() {
  const [viewing, setViewing] = useState(null);

  const normalizeKey = (value) =>
    String(value)
      .replace(/\.pdf$/i, '')
      .replace(/[:.,]/g, '')
      .replace(/[-_]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();

  const fileMap = Object.fromEntries(
    certificates.map((cert) => [normalizeKey(cert.fileName), cert.file])
  );

  const getFileUrl = (asset, title) => {
    const lookupKey = normalizeKey(asset ?? `${title}.pdf`);
    return fileMap[lookupKey];
  };

  return (
    <section id="certifications" className="section-pad bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="certificates-heading">Certificates</h1>
        <div className="cert-categories">
        {CERT_CATEGORIES.map((category) => (
          <div key={category.name} className="cert-category">
            <div className="cert-category-heading">
              <div>
                <h2 className="cert-category-title">{category.name}</h2>
                <p className="cert-category-subtitle">{category.items.length} certificate{category.items.length > 1 ? 's' : ''} · {category.issuer}</p>
              </div>
            </div>
            <div className="cert-carousel">
              {category.items.map((item) => {
                const title = typeof item === 'string' ? item : item.title;
                const asset = typeof item === 'string' ? undefined : item.asset;
                const externalLink = typeof item === 'string' ? undefined : item.externalLink;
                const url = getFileUrl(asset, title);
                return (
                  <article key={title} className="cert-card cert-carousel-card">
                    <h3 className="cert-title">{title}</h3>
                    <div className="cert-actions">
                      <button
                        type="button"
                        className="btn"
                        onClick={() => {
                          if (externalLink) {
                            window.open(externalLink, '_blank', 'noopener,noreferrer');
                            return;
                          }
                          setViewing({ title, issuer: category.issuer, asset, file: url });
                        }}
                      >
                        View Certificate
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        ))}
        </div>
      </div>

      <Dialog open={!!viewing} onOpenChange={(v) => !v && setViewing(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {viewing && (
            <div>
              <div className="flex items-center justify-between gap-4 border-b border-border bg-muted/50 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold">{viewing.title}</p>
                  <p className="truncate text-xs text-slate-700 dark:text-muted-foreground">{viewing.issuer}</p>
                </div>
              </div>
              <div className="grid place-items-center bg-muted/30 p-10 min-h-[60vh]">
                <div className="w-full max-w-xl rounded-xl border-2 border-dashed border-border bg-card p-10 text-center">
                  {viewing.file ? (
                    viewing.file.toLowerCase().endsWith('.pdf') ? (
                      <iframe src={viewing.file} title={viewing.title} className="w-full h-[60vh] rounded" />
                    ) : (
                      <img src={viewing.file} alt={viewing.title} className="mx-auto max-h-[60vh] object-contain" />
                    )
                  ) : (
                    <>
                      <p className="text-sm text-slate-700 dark:text-muted-foreground">
                        Certificate preview placeholder. The asset is not available for this certificate.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
