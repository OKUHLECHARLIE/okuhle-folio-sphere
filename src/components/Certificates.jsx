import React, { useState } from 'react';
import certificates from '../lib/certificates';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import '../styles/certificates.css';

export default function Certificates() {
  const [viewing, setViewing] = useState(null);

  return (
    <section id="certifications" className="certificates">
      <h1 className="certificates-heading">Certificates</h1>
      <div className="cert-grid">
        {certificates.map((cert, idx) => (
          <article className="cert-card" key={cert.fileName || idx}>
            <h2 className="cert-title">{cert.title}</h2>
            <div className="cert-actions">
              <button
                type="button"
                className="btn"
                onClick={() => setViewing(cert)}
              >
                View
              </button>
              <a className="btn btn-outline" href={cert.file} download>
                Download
              </a>
            </div>
          </article>
        ))}
      </div>

      <Dialog open={!!viewing} onOpenChange={(v) => !v && setViewing(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {viewing && (
            <div>
              <div className="flex items-center justify-between gap-4 border-b border-border bg-muted/50 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold">{viewing.title}</p>
                </div>
                <a href={viewing.file} download={viewing.fileName} className="inline-flex h-9 items-center gap-2 rounded-md bg-accent px-3 text-sm font-semibold text-accent-foreground">
                  Download
                </a>
              </div>
              <div className="w-full bg-background">
                {viewing.file.toLowerCase().endsWith('.pdf') ? (
                  <iframe src={viewing.file} title={viewing.title} className="w-full h-[70vh]" />
                ) : (
                  <img src={viewing.file} alt={viewing.title} className="mx-auto max-h-[70vh] object-contain" />
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
