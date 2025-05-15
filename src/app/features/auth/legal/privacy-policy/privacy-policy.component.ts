import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-privacy-policy",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="legal-container">
      <div class="legal-header">
        <h1>Privacy Policy</h1>
        <p class="last-updated">Last updated: May 15, 2025</p>
      </div>

      <div class="legal-content">
        <section>
          <h2>1. Introduction</h2>
          <p>
            Your privacy is important to us. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you use
            our image sharing service. Please read this privacy policy
            carefully.
          </p>
          <p>
            By accessing or using the Service, you consent to the collection,
            use, and storage of your information as outlined in this Privacy
            Policy.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <p>
            We collect several types of information for various purposes to
            provide and improve our Service:
          </p>
          <h3>Personal Data</h3>
          <ul>
            <li>Account information (name, email, username)</li>
            <li>Profile information that you provide</li>
            <li>Usage data and analytics</li>
          </ul>
          <h3>Image Data</h3>
          <ul>
            <li>Images you upload to our Service</li>
            <li>Metadata associated with these images (if present)</li>
            <li>Derived data such as thumbnails or optimized versions</li>
          </ul>
        </section>

        <section>
          <h2>3. Data Storage</h2>
          <ul>
            <li>User account information</li>
            <li>Uploaded images (stored as binary data)</li>
            <li>Image metadata</li>
          </ul>
          <p>
            Our databases are protected by industry-standard security measures,
            including:
          </p>
          <ul>
            <li>Data encryption at rest and in transit</li>
            <li>Access controls and authentication requirements</li>
            <li>Regular security audits and updates</li>
          </ul>
        </section>

        <section>
          <h2>4. How We Use Your Information</h2>
          <p>
            We use the collected information for various purposes, including:
          </p>
          <ul>
            <li>Providing and maintaining our Service</li>
            <li>Notifying you about changes to our Service</li>
            <li>Allowing you to participate in interactive features</li>
            <li>Providing customer support</li>
            <li>Gathering analysis to improve our Service</li>
            <li>Monitoring the usage of our Service</li>
            <li>Detecting, preventing, and addressing technical issues</li>
          </ul>
        </section>

        <section>
          <h2>5. Data Retention</h2>
          <p>
            We retain your personal information and uploaded images as long as
            your account is active or as needed to provide you services. You can
            delete your data or request account deletion at any time.
          </p>
        </section>

        <section>
          <h2>6. Data Sharing and Disclosure</h2>
          <p>
            We do not sell your personal information or your uploaded images. We
            may share information in the following situations:
          </p>
        </section>

        <section>
          <h2>7. Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding
            your personal information, including:
          </p>
          <ul>
            <li>
              The right to access the personal information we have about you
            </li>
            <li>The right to request correction of inaccurate information</li>
            <li>The right to request deletion of your personal information</li>
            <li>The right to request restriction of processing</li>
            <li>The right to data portability</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information
            provided in the "Contact Us" section.
          </p>
        </section>

        <section>
          <h2>8. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last updated" date.
          </p>
        </section>

        <section>
          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at gogalleryteam&#64;gmail.com.
          </p>
        </section>
      </div>

      <div class="legal-footer">
        <a routerLink="/terms-of-use">View our Terms of Use</a>
        <a routerLink="/">Return to Home Page</a>
      </div>
    </div>
  `,
  styles: [
    `
      .legal-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 40px 20px;
        color: var(--text-primary, #333);
      }

      .legal-header {
        text-align: center;
        margin-bottom: 40px;
        border-bottom: 1px solid var(--border, #eee);
        padding-bottom: 20px;
      }

      .legal-header h1 {
        color: var(--primary, #3b82f6);
        margin-bottom: 8px;
        font-size: 32px;
      }

      .last-updated {
        color: var(--text-secondary, #666);
        font-size: 14px;
      }

      .legal-content {
        line-height: 1.6;
      }

      section {
        margin-bottom: 30px;
      }

      h2 {
        color: var(--primary, #3b82f6);
        margin-bottom: 16px;
        font-size: 24px;
        font-weight: 600;
      }

      h3 {
        color: var(--primary-dark, #2563eb);
        margin: 16px 0 8px;
        font-size: 18px;
        font-weight: 500;
      }

      p {
        margin-bottom: 16px;
      }

      ul {
        margin-bottom: 16px;
        padding-left: 24px;
      }

      li {
        margin-bottom: 8px;
      }

      .legal-footer {
        margin-top: 40px;
        padding-top: 20px;
        border-top: 1px solid var(--border, #eee);
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 16px;
      }

      .legal-footer a {
        color: var(--primary, #3b82f6);
        text-decoration: none;
        font-weight: 500;
        transition: color 0.2s;
      }

      .legal-footer a:hover {
        text-decoration: underline;
      }

      @media (max-width: 576px) {
        .legal-container {
          padding: 20px 16px;
        }

        .legal-header h1 {
          font-size: 28px;
        }

        h2 {
          font-size: 20px;
        }

        h3 {
          font-size: 16px;
        }

        .legal-footer {
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
      }
    `,
  ],
})
export class PrivacyPolicyComponent {}
