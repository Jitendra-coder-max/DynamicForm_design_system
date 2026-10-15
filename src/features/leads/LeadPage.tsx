import { LeadForm } from "./LeadForm";
import { leadFormConfig } from "./leadForm.config";
import "./lead-form.css";

export function LeadPage() {
  return (
    <main className="page-shell">
      <div className="page-container">
        <header className="page-header">
          <div className="brand-mark" aria-hidden="true">L</div>
          <span className="eyebrow">LET'S CONNECT</span>
          <h1>Tell us a little about yourself.</h1>
          <p className="page-intro">
            Share a few details and our team will get back to you with the right information.
          </p>
        </header>

        <section className="form-card" aria-labelledby="form-title">
          <div className="card-heading">
            <div>
              <h2 id="form-title">Your details</h2>
              <p>Fields marked with an asterisk are required.</p>
            </div>
            <span className="secure-label"><span aria-hidden="true">●</span> Your details stay private</span>
          </div>
          <LeadForm config={leadFormConfig} />
        </section>

        <footer className="page-footer">Thoughtful conversations start here.</footer>
      </div>
    </main>
  );
}
