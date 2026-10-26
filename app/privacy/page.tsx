import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import { business } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How CM MainWorks uses the details and photos you send through the quote form.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <>
      <PageHead title="Privacy policy" lede="How your details and photos are used when you ask for a quote." />
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap prose">
          {/* DRAFT: needs Connor's legal trading name and contact email before launch. */}
          <p>This website is run by {business.name}, a carpentry and construction business based in {business.base}. If you have any questions about this policy, call {business.phoneDisplay}.</p>

          <h2>What we collect</h2>
          <p>When you use the quote form, we collect:</p>
          <ul>
            <li>your name, phone number and the postcode of the job</li>
            <li>the type of work and anything you tell us about the job</li>
            <li>any photos you choose to send</li>
          </ul>

          <h2>How we use it</h2>
          <p>Only to reply to you about your job: to call you back, visit if needed and give you a quote. We rely on your request for a quote as the lawful basis for using your details.</p>
          <p>We don’t sell your details, add you to a mailing list or share them with anyone else, except the email service that delivers your request to Connor.</p>

          <h2>How it’s sent and stored</h2>
          <p>Your request is sent by email to Connor using Resend, an email delivery service. It isn’t stored in a database on this website. Emails are kept for as long as needed to quote for and carry out the job, then deleted.</p>

          <h2>Cookies</h2>
          <p>This site doesn’t use advertising or tracking cookies. Your browser remembers that you’ve seen the opening animation for the rest of your visit, and nothing else.</p>

          <h2>Your rights</h2>
          <p>You can ask to see the details we hold about you, have them corrected or have them deleted. Call {business.phoneDisplay} to ask. If you’re unhappy with how your details have been handled, you can complain to the Information Commissioner’s Office at ico.org.uk.</p>

          <p className="draft">Draft. Last updated October 2026.</p>
        </div>
      </section>
    </>
  );
}
