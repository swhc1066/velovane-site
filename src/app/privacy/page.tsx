import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — VeloVane",
  description: "How VeloVane collects, uses, and protects your data.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium text-white">{title}</h2>
      {children}
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-light leading-relaxed text-n-400">{children}</p>;
}

function Li({ children }: { children: React.ReactNode }) {
  return <li className="text-sm font-light leading-relaxed text-n-400">{children}</li>;
}

export default function PrivacyPage() {
  return (
    <section className="relative bg-surface-dark">
      <div className="mx-auto max-w-[1200px] px-5 py-20 md:py-32">
        {/* Header */}
        <a
          href="/"
          className="mb-12 inline-flex items-center gap-1.5 text-xs tracking-wider text-n-500 transition-colors hover:text-vv-blue"
        >
          &larr; Back to home
        </a>

        <h1 className="mb-3 font-mono text-3xl font-light text-white md:text-4xl">
          Privacy Policy
        </h1>
        <p className="mb-16 text-xs tracking-wider text-n-500">
          Last updated: April 6, 2026
        </p>

        {/* Content */}
        <div className="space-y-12">
          <Section title="1. Introduction">
            <P>
              VeloVane (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is a cycling weather
              advisory application that helps riders decide when and whether to ride. This Privacy
              Policy explains how we collect, use, store, and share your information when you use our
              mobile application, website, and related services (collectively, the
              &quot;Service&quot;).
            </P>
            <P>
              By using VeloVane, you agree to the collection and use of information in accordance
              with this policy. If you do not agree, please do not use the Service.
            </P>
          </Section>

          <Section title="2. Information We Collect">
            <P>We collect the following categories of information:</P>
            <ul className="list-inside list-disc space-y-2 pl-2">
              <Li>
                <span className="text-white/60">Account information:</span> Email address, name, and
                authentication data when you sign up via email, Apple, or Google.
              </Li>
              <Li>
                <span className="text-white/60">Location data:</span> Your approximate location to
                provide relevant weather data for your area. Location is used only to fetch forecasts
                and is not continuously tracked in the background unless you opt in to ride detection.
              </Li>
              <Li>
                <span className="text-white/60">Ride preferences:</span> Your stated preferences such
                as wind tolerance, preferred ride times, temperature thresholds, and riding style.
                These are provided by you during onboarding and can be updated at any time.
              </Li>
              <Li>
                <span className="text-white/60">Usage data:</span> How you interact with the app,
                including which features you use, recommendation responses, and session duration.
              </Li>
              <Li>
                <span className="text-white/60">Ride behavior (optional):</span> If you enable ride
                detection, we collect GPS data during detected rides to learn your actual riding
                patterns. This data is processed to infer preferences and is not shared with third
                parties.
              </Li>
              <Li>
                <span className="text-white/60">Device information:</span> Device type, operating
                system version, and push notification tokens for delivering ride recommendations.
              </Li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <P>We use the information we collect to:</P>
            <ul className="list-inside list-disc space-y-2 pl-2">
              <Li>Provide personalized go, wait, or skip ride recommendations.</Li>
              <Li>Fetch and display accurate weather data for your location.</Li>
              <Li>Send push notifications with ride window alerts and morning forecasts.</Li>
              <Li>Improve our recommendation engine by learning from your ride patterns.</Li>
              <Li>Maintain and improve the Service, including debugging and performance monitoring.</Li>
              <Li>Communicate with you about your account, updates, and support requests.</Li>
            </ul>
          </Section>

          <Section title="4. Data Sharing">
            <P>We do not sell your personal information. We share data only in these limited cases:</P>
            <ul className="list-inside list-disc space-y-2 pl-2">
              <Li>
                <span className="text-white/60">Weather providers:</span> Your approximate location
                is sent to Open-Meteo (our weather data provider) to retrieve forecasts. Open-Meteo
                is an open-source weather API and does not receive your identity or account
                information.
              </Li>
              <Li>
                <span className="text-white/60">Infrastructure providers:</span> We use Supabase for
                authentication and database services, and Vercel for hosting. These providers process
                data on our behalf under strict data processing agreements.
              </Li>
              <Li>
                <span className="text-white/60">Legal requirements:</span> We may disclose
                information if required by law, regulation, or legal process.
              </Li>
            </ul>
          </Section>

          <Section title="5. Data Storage & Security">
            <P>
              Your data is stored in a PostgreSQL database hosted by Supabase with encryption at rest
              and in transit. Authentication tokens are managed through Supabase Auth with
              industry-standard JWT security. We implement appropriate technical and organizational
              measures to protect your data against unauthorized access, alteration, or destruction.
            </P>
            <P>
              We retain your data for as long as your account is active. If you delete your account,
              we remove your personal data within 30 days, except where retention is required by law.
            </P>
          </Section>

          <Section title="6. Your Rights">
            <P>You have the right to:</P>
            <ul className="list-inside list-disc space-y-2 pl-2">
              <Li>
                <span className="text-white/60">Access</span> the personal data we hold about you.
              </Li>
              <Li>
                <span className="text-white/60">Correct</span> inaccurate or incomplete data.
              </Li>
              <Li>
                <span className="text-white/60">Delete</span> your account and associated data at
                any time from within the app.
              </Li>
              <Li>
                <span className="text-white/60">Export</span> your data in a portable format.
              </Li>
              <Li>
                <span className="text-white/60">Opt out</span> of ride detection and behavioral
                learning at any time without affecting core functionality.
              </Li>
            </ul>
            <P>
              To exercise any of these rights, use the settings within the app or contact us at the
              address below.
            </P>
          </Section>

          <Section title="7. Children's Privacy">
            <P>
              VeloVane is not intended for use by children under the age of 13. We do not knowingly
              collect personal information from children. If we learn that we have collected data from
              a child under 13, we will delete it promptly.
            </P>
          </Section>

          <Section title="8. Changes to This Policy">
            <P>
              We may update this Privacy Policy from time to time. If we make material changes, we
              will notify you through the app or by email. Your continued use of the Service after
              changes take effect constitutes acceptance of the updated policy.
            </P>
          </Section>

          <Section title="9. Contact">
            <P>
              If you have questions about this Privacy Policy or your data, contact us at:
            </P>
            <P>
              <span className="text-white/60">Email:</span> privacy@velovane.com
            </P>
          </Section>
        </div>
      </div>
    </section>
  );
}
