import Link from "next/link";
import { BadgeCheck, Clock, DownloadCloud, Headphones, LockKeyhole, Zap } from "lucide-react";
import { Footer, SiteNav } from "@/components/SiteNav";
import { featuredPlans } from "@/lib/plans";
import { socialLinks } from "@/lib/socials";

const features = [
  { title: "Secure Key", text: "Activation keys are shared only after admin approval.", icon: LockKeyhole },
  { title: "Fast Approval", text: "Submit payment proof and get verified quickly.", icon: Clock },
  { title: "Instant APK Download After Approval", text: "Approved orders unlock APK access from status page.", icon: DownloadCloud },
  { title: "24/7 Support", text: "WhatsApp-first support for active customers.", icon: Headphones },
];

export default function Home() {
  return (
    <main className="shell">
      <SiteNav />
      <section className="hero">
        <div className="hero-inner">
          <div>
            <p className="eyebrow">Premium APK subscriptions</p>
            <h1>DEVIL DON OFFICIAL</h1>
            <p>
              Secure access. Fast approval. Premium experience.
            </p>
            <div className="hero-actions">
              <Link className="button" href="/buy">
                <Zap size={18} />
                Buy Now
              </Link>
              <Link className="button secondary" href="/status">
                <BadgeCheck size={18} />
                Check Status
              </Link>
            </div>
            <div className="social-links hero-socials" aria-label="Customer social links">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a key={social.label} className="social-link" href={social.href} target="_blank" rel="noreferrer">
                    <Icon size={18} />
                    {social.label}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="hero-poster" aria-label="BGMI Devil Don poster">
            <img src="/images/bgmi-devil-don-poster.png" alt="BGMI Devil Don team poster" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <h2>Featured Plans</h2>
            <p className="muted">Simple entry plans with fast manual verification.</p>
          </div>
          <Link className="button secondary" href="/buy">
            View All Plans
          </Link>
        </div>
        <div className="grid two">
          {featuredPlans.map((plan) => (
            <article className="card" key={plan.title}>
              <h3>{plan.title}</h3>
              <p className="muted">{plan.label}</p>
              <div className="price">₹{plan.price}</div>
              <Link className="button" href={plan.href}>
                Buy Now
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <h2>Why Customers Choose Us</h2>
            <p className="muted">Clean payment verification and controlled APK delivery.</p>
          </div>
        </div>
        <div className="grid four">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article className="card feature" key={feature.title}>
                <Icon size={24} />
                <div>
                  <h3>{feature.title}</h3>
                  <p className="muted">{feature.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <Footer />
    </main>
  );
}
