import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import { business } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Privacy policy",
  description: "What I do with the details and photos you send through the quote form, and what I don’t.",
  path: "/privacy",
});

export default function Privacy() {
  return (
    <>
      <PageHead crumbs={[{ href: "/privacy", label: "Privacy" }]} title="Privacy policy" lede="What happens to your details and photos when you ask me for a quote." />
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap prose">
          {/* DRAFT: needs Connor's legal trading name and contact email before launch. */}
          <p>This website is run by me, Connor, trading as {business.name}, a carpentry and construction business based in {business.base}. If you’ve got any questions about this policy, ring me on {business.phoneDisplay}.</p>

          <h2>What I collect</h2>
          <p>When you use the quote form, I collect:</p>
          <ul>
            <li>your name, phone number and the postcode of the job</li>
            <li>the type of work and anything you tell me about the job</li>
            <li>any photos you choose to send</li>
          </ul>

          <h2>How I use it</h2>
          <p>Only to reply to you about your job: to ring you back, visit if I need to, and give you a quote. The lawful basis is your request for a quote.</p>
          <p>I don’t sell your details, add you to a mailing list or share them with anyone else, apart from the email service that delivers your request to me.</p>

          <h2>How it’s sent and stored</h2>
          <p>Your request comes to me by email through Resend, an email delivery service. It isn’t stored in a database on this website. I keep emails for as long as I need them to quote for and do the job, then delete them.</p>

          <h2>Cookies</h2>
          <p>This site doesn’t use advertising or tracking cookies. Your browser remembers that you’ve seen the opening animation for the rest of your visit, and that’s it.</p>

          <h2>Your rights</h2>
          <p>You can ask to see the details I hold about you, have them corrected or have them deleted. Ring me on {business.phoneDisplay} to ask. If you’re unhappy with how your details have been handled, you can complain to the Information Commissioner’s Office at ico.org.uk.</p>

          <p className="draft">Draft. Last updated October 2026.</p>
        </div>
      </section>
    </>
  );
}
