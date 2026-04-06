import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — VeloVane",
  description: "Terms and conditions for using the VeloVane cycling weather app.",
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

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p className="mb-16 text-xs tracking-wider text-n-500">
          Last updated: April 6, 2026
        </p>

        {/* Content */}
        <div className="space-y-12">
          <Section title="1. Agreement to Terms">
            <P>
              By accessing or using VeloVane (the &quot;Service&quot;), you agree to be bound by
              these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, do not
              use the Service. These Terms constitute a legally binding agreement between you and
              VeloVane (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;).
            </P>
          </Section>

          <Section title="2. Description of Service">
            <P>
              VeloVane is a cycling weather advisory application that provides personalized ride
              recommendations based on weather forecasts and your stated preferences. The Service
              includes a mobile application, website, push notifications, and related features.
            </P>
            <P>
              VeloVane is an informational tool designed to help you make ride decisions. It is not a
              safety system, navigation tool, or replacement for your own judgment about weather
              conditions and riding safety.
            </P>
          </Section>

          <Section title="3. Account Registration">
            <P>
              To use certain features, you must create an account using your email address or a
              supported social login provider (Apple, Google). You are responsible for maintaining the
              security of your account credentials and for all activity that occurs under your
              account.
            </P>
            <P>
              You agree to provide accurate, current, and complete information during registration
              and to update it as necessary. We reserve the right to suspend or terminate accounts
              that contain false or misleading information.
            </P>
          </Section>

          <Section title="4. Acceptable Use">
            <P>You agree not to:</P>
            <ul className="list-inside list-disc space-y-2 pl-2">
              <Li>Use the Service for any unlawful purpose or in violation of these Terms.</Li>
              <Li>
                Attempt to gain unauthorized access to any part of the Service, other accounts, or
                systems connected to the Service.
              </Li>
              <Li>
                Interfere with or disrupt the Service, servers, or networks connected to the
                Service.
              </Li>
              <Li>
                Reverse engineer, decompile, or disassemble any part of the Service.
              </Li>
              <Li>
                Use automated scripts, bots, or scrapers to access the Service or extract data.
              </Li>
              <Li>
                Resell, redistribute, or sublicense any part of the Service without our written
                consent.
              </Li>
            </ul>
          </Section>

          <Section title="5. Intellectual Property">
            <P>
              The Service, including its design, code, content, graphics, and branding, is owned by
              VeloVane and protected by copyright, trademark, and other intellectual property laws.
              You are granted a limited, non-exclusive, non-transferable license to use the Service
              for personal, non-commercial purposes.
            </P>
            <P>
              You retain ownership of any content you provide to the Service, such as ride
              preferences and feedback. By providing content, you grant us a license to use it to
              operate and improve the Service.
            </P>
          </Section>

          <Section title="6. Weather Data & Accuracy">
            <P>
              Weather data displayed in VeloVane is sourced from third-party providers, including
              Open-Meteo. While we strive for accuracy, weather forecasts are inherently uncertain
              and may not reflect actual conditions.
            </P>
            <P>
              VeloVane&apos;s ride recommendations (go, wait, or skip) are suggestions based on
              forecast data and your preferences. They are not guarantees of safe or favorable riding
              conditions. Always use your own judgment and check current conditions before riding.
            </P>
            <P>
              We are not responsible for decisions you make based on information provided by the
              Service, including decisions to ride or not ride in specific weather conditions.
            </P>
          </Section>

          <Section title="7. Subscriptions & Payments">
            <P>
              Certain features of the Service may require a paid subscription. Subscription pricing,
              billing cycles, and included features are described within the app at the time of
              purchase.
            </P>
            <P>
              Subscriptions are billed through Apple&apos;s App Store. Payment processing, renewals,
              and cancellations are governed by Apple&apos;s terms. You can manage or cancel your
              subscription at any time through your device&apos;s subscription settings.
            </P>
            <P>
              We may offer a free trial period. If you do not cancel before the trial ends, your
              subscription will begin and you will be charged.
            </P>
          </Section>

          <Section title="8. Disclaimers">
            <P>
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT
              WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </P>
            <P>
              We do not warrant that the Service will be uninterrupted, error-free, or free of
              harmful components. We do not warrant the accuracy, completeness, or reliability of any
              weather data, recommendations, or other content provided through the Service.
            </P>
          </Section>

          <Section title="9. Limitation of Liability">
            <P>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, VELOVANE SHALL NOT BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO
              LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE
              SERVICE.
            </P>
            <P>
              OUR TOTAL LIABILITY FOR ALL CLAIMS RELATED TO THE SERVICE SHALL NOT EXCEED THE AMOUNT
              YOU PAID TO US IN THE TWELVE MONTHS PRECEDING THE CLAIM, OR $50, WHICHEVER IS GREATER.
            </P>
          </Section>

          <Section title="10. Termination">
            <P>
              You may stop using the Service and delete your account at any time from within the app.
              We may suspend or terminate your access to the Service at any time, with or without
              cause, with or without notice.
            </P>
            <P>
              Upon termination, your right to use the Service ceases immediately. Provisions of these
              Terms that by their nature should survive termination will survive, including ownership,
              warranty disclaimers, and limitations of liability.
            </P>
          </Section>

          <Section title="11. Governing Law">
            <P>
              These Terms are governed by and construed in accordance with the laws of the United
              States, without regard to conflict of law principles. Any disputes arising from these
              Terms or the Service shall be resolved in the courts of competent jurisdiction.
            </P>
          </Section>

          <Section title="12. Changes to These Terms">
            <P>
              We may revise these Terms at any time by posting the updated version on this page. If
              we make material changes, we will notify you through the app or by email. Your
              continued use of the Service after changes take effect constitutes acceptance of the
              revised Terms.
            </P>
          </Section>

          <Section title="13. Contact">
            <P>
              If you have questions about these Terms, contact us at:
            </P>
            <P>
              <span className="text-white/60">Email:</span> legal@velovane.com
            </P>
          </Section>
        </div>
      </div>
    </section>
  );
}
