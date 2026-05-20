import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
import { CONTACT } from "@/data/portfolio";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "Alternance · M2 ESET", message: "" });
  const [sent, setSent] = useState(false);

  function buildMailto() {
    const subject = encodeURIComponent(form.subject || "Contact via portfolio");
    const body = encodeURIComponent(
      `${form.message}\n\n—\nDe : ${form.name}\nEmail : ${form.email}`
    );
    return `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    window.location.href = buildMailto();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <div className="pt-32 md:pt-40 pb-24">
      <section className="mx-auto max-w-[1400px] w-full px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-6 mb-16 md:mb-24">
          <div className="col-span-12 md:col-span-9">
            <SectionTitle index="04" kicker="Open channel" emphasis="channel.">
              Let's open a channel.
            </SectionTitle>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-8 gap-y-16">
          {/* Direct contact list */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 md:col-span-5"
          >
            <div className="mono-label text-signal-red mb-4">§ Direct</div>
            <ul className="space-y-1">
              {[
                { l: "Email", v: CONTACT.email, h: `mailto:${CONTACT.email}` },
                { l: "Phone", v: CONTACT.phone, h: `tel:${CONTACT.phone.replace(/\s/g, "")}` },
                { l: "LinkedIn", v: CONTACT.linkedinLabel, h: CONTACT.linkedin },
              ].map((c) => (
                <li key={c.l}>
                  <a
                    href={c.h}
                    target={c.h.startsWith("http") ? "_blank" : undefined}
                    rel={c.h.startsWith("http") ? "noreferrer" : undefined}
                    className="group flex items-baseline justify-between gap-4 py-5 border-b hairline transition-all hover:px-2"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="mono-label text-ink-500 dark:text-ink-400">{c.l}</div>
                      <div className="font-mono text-base md:text-lg mt-1 truncate group-hover:text-signal-red transition-colors">
                        {c.v}
                      </div>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-ink-500 dark:text-ink-400 transition-all duration-500 group-hover:text-signal-red group-hover:-translate-y-1 group-hover:translate-x-1 flex-shrink-0"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mono-label text-signal-red mb-4 mt-12">§ Status</div>
            <div className="border hairline p-5 space-y-3">
              <div className="flex items-baseline justify-between gap-2">
                <span className="mono-label text-ink-500 dark:text-ink-400">Disponibilité</span>
                <span className="font-mono text-signal-red">{CONTACT.available}</span>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <span className="mono-label text-ink-500 dark:text-ink-400">Zones</span>
                <span className="font-mono text-sm text-right">{CONTACT.zones}</span>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <span className="mono-label text-ink-500 dark:text-ink-400">Format</span>
                <span className="font-mono text-sm">Alternance · CDI</span>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <span className="mono-label text-ink-500 dark:text-ink-400">Délai réponse</span>
                <span className="font-mono text-sm">&lt; 24h</span>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 md:col-span-7"
          >
            <div className="mono-label text-signal-red mb-4">§ Compose</div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Field label="Name" name="name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
              <Field label="Email" type="email" name="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
              <Field label="Subject" name="subject" value={form.subject} onChange={(v) => setForm({ ...form, subject: v })} />
              <FieldArea
                label="Message"
                name="message"
                value={form.message}
                onChange={(v) => setForm({ ...form, message: v })}
                required
              />

              <button
                type="submit"
                className="group inline-flex items-center gap-3 px-6 py-4 bg-signal-red text-signal-cream mono-label hover:bg-ink dark:hover:bg-signal-cream dark:hover:text-ink transition-colors w-full sm:w-auto justify-center"
              >
                {sent ? (
                  <>
                    <Check size={16} /> Email client ouvert
                  </>
                ) : (
                  <>
                    Send transmission <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </>
                )}
              </button>
              <p className="mono-label text-ink-500 dark:text-ink-400">
                Ce formulaire ouvre votre client mail avec le message pré-rempli.
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block group">
      <div className="flex items-baseline justify-between mb-2">
        <span className="mono-label text-ink-500 dark:text-ink-400 group-focus-within:text-signal-red transition-colors">
          {label}
        </span>
        {required && <span className="mono-label text-signal-red">*</span>}
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full bg-transparent border-b hairline focus:border-signal-red outline-none py-3 text-base md:text-lg font-mono transition-colors"
      />
    </label>
  );
}

function FieldArea({
  label,
  name,
  value,
  onChange,
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block group">
      <div className="flex items-baseline justify-between mb-2">
        <span className="mono-label text-ink-500 dark:text-ink-400 group-focus-within:text-signal-red transition-colors">
          {label}
        </span>
        {required && <span className="mono-label text-signal-red">*</span>}
      </div>
      <textarea
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        rows={6}
        className="w-full bg-transparent border-b hairline focus:border-signal-red outline-none py-3 text-base md:text-lg font-mono resize-none transition-colors"
      />
    </label>
  );
}
