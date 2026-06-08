import { BadgeCheck, Clock, DownloadCloud, Headphones, LockKeyhole, Zap } from "lucide-react";
import { Footer, SiteNav } from "@/components/SiteNav";
import {
  FloatingPoster,
  HeroBlock,
  HeroItem,
  MotionCard,
  MotionExternalLink,
  MotionLink,
  MotionMain,
  RevealSection,
  StaggerGrid,
} from "@/components/MotionPrimitives";
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
    <MotionMain className="shell">
      <SiteNav />
      <section className="hero">
        <div className="neon-orbit" aria-hidden="true" />
        <div className="hero-inner">
          <HeroBlock className="hero-copy">
            <HeroItem>
              <p className="eyebrow">Premium APK subscriptions</p>
            </HeroItem>
            <HeroItem>
              <h1>DEVIL DON OFFICIAL</h1>
            </HeroItem>
            <HeroItem>
              <p>Secure access. Fast approval. Premium experience.</p>
            </HeroItem>
            <HeroItem className="hero-actions">
              <MotionLink className="button" href="/buy">
                <Zap size={18} />
                Buy Now
              </MotionLink>
              <MotionLink className="button secondary" href="/status">
                <BadgeCheck size={18} />
                Check Status
              </MotionLink>
            </HeroItem>
            <HeroItem className="social-links hero-socials" aria-label="Customer social links">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <MotionExternalLink key={social.label} className="social-link" href={social.href}>
                    <span className={`social-icon ${social.className}`}>
                      <Icon size={18} />
                    </span>
                    {social.label}
                  </MotionExternalLink>
                );
              })}
            </HeroItem>
          </HeroBlock>
          <FloatingPoster className="hero-poster glass-float" aria-label="BGMI Devil Don poster">
            <img src="/images/bgmi-devil-don-poster.png" alt="BGMI Devil Don team poster" />
          </FloatingPoster>
        </div>
      </section>

      <RevealSection className="section">
        <div className="section-head">
          <div>
            <h2>Featured Plans</h2>
            <p className="muted">Simple entry plans with fast manual verification.</p>
          </div>
          <MotionLink className="button secondary" href="/buy">
            View All Plans
          </MotionLink>
        </div>
        <StaggerGrid className="grid two">
          {featuredPlans.map((plan) => (
            <MotionCard className="card premium-plan-card" key={plan.title}>
              <h3>{plan.title}</h3>
              <p className="muted">{plan.label}</p>
              <div className="price">Rs {plan.price}</div>
              <MotionLink className="button" href={plan.href}>
                Buy Now
              </MotionLink>
            </MotionCard>
          ))}
        </StaggerGrid>
      </RevealSection>

      <RevealSection className="section">
        <div className="section-head">
          <div>
            <h2>Why Customers Choose Us</h2>
            <p className="muted">Clean payment verification and controlled APK delivery.</p>
          </div>
        </div>
        <StaggerGrid className="grid four">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <MotionCard className="card feature glass-card" key={feature.title}>
                <Icon size={24} />
                <div>
                  <h3>{feature.title}</h3>
                  <p className="muted">{feature.text}</p>
                </div>
              </MotionCard>
            );
          })}
        </StaggerGrid>
      </RevealSection>
      <Footer />
    </MotionMain>
  );
}
