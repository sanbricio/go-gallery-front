import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-terms-of-use",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="legal-container">
      <div class="legal-header">
        <h1>Terms of Use</h1>
        <p class="last-updated">Last updated: January 1, 2025</p>
      </div>

      <div class="legal-content">
        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to our GoGallery platform. These Terms of Use govern
            your access to and use of our website, services, and applications
            (collectively, the "Service"). By accessing or using the Service,
            you are agreeing to these Terms and our Privacy Policy. If you do
            not agree with these Terms, you may not access or use the Service.
          </p>
        </section>

        <section>
          <h2>2. Account Registration</h2>
          <p>
            To use certain features of the Service, you may be required to
            register for an account. When you register, you must provide
            accurate and complete information and keep this information updated.
            You are responsible for safeguarding your password and for all
            activities that occur under your account.
          </p>
        </section>

        <section>
          <h2>3. User Content</h2>
          <p>
            Our Service allows you to upload, store and login ("User Content").
          </p>
          <p>
            By uploading User Content to the Service, you represent and warrant
            that:
          </p>
          <ul>
            <li>
              You own the User Content or have the necessary licenses, rights,
              consents, and permissions to use and authorize us to use the User
              Content
            </li>
            <li>
              Your User Content does not violate the privacy rights, publicity
              rights, copyrights, contractual rights, or any other rights of any
              person
            </li>
            <li>
              Your User Content does not contain any material that is harmful,
              defamatory, obscene, indecent, abusive, offensive, harassing, or
              otherwise objectionable
            </li>
          </ul>
        </section>

        <section>
          <h2>4. Image Storage and Processing</h2>
          <p>We may process these images for the purpose of:</p>
          <ul>
            <li>Generating thumbnails and optimizing display</li>
            <li>Creating backups</li>
            <li>Analyzing content for prohibited material</li>
            <li>Indexing for search functionality</li>
          </ul>
          <p>
            We retain all images until you choose to delete them or terminate
            your account. Deleted images can't be restored
          </p>
        </section>

        <section>
          <h2>5. Intellectual Property Rights</h2>
          <p>
            You retain all rights to your User Content. By uploading images, you
            grant us a worldwide, non-exclusive, royalty-free license to use,
            reproduce, process, and display your User Content for the purposes
            of providing and improving the Service.
          </p>
          <p>
            The Service and its original content, features, and functionality
            are owned by us and are protected by international copyright,
            trademark, and other intellectual property laws.
          </p>
        </section>

        <section>
          <h2>6. Prohibited Uses</h2>
          <p>
            You may not use the Service for any purpose that is illegal or
            prohibited by these Terms. Specifically, you may not:
          </p>
          <ul>
            <li>
              Upload images containing illegal content, including but not
              limited to child exploitation material
            </li>
            <li>
              Upload images that infringe on the intellectual property rights of
              others
            </li>
            <li>Use the Service to distribute malware or other harmful code</li>
            <li>
              Attempt to gain unauthorized access to our systems or other users'
              accounts
            </li>
            <li>
              Use the Service in any way that could disable, overburden, or
              impair the Service
            </li>
          </ul>
        </section>

        <section>
          <h2>7. Termination</h2>
          <p>
            We may terminate or suspend your account and access to the Service
            immediately, without prior notice or liability, for any reason,
            including but not limited to a breach of these Terms. Upon
            termination, your right to use the Service will immediately cease.
          </p>
        </section>

        <section>
          <h2>8. Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time.
            We will provide notice of any changes by updating the "Last updated"
            date at the top of these Terms.
          </p>
        </section>

        <section>
          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at gogalleryteam&#64;gmail.com.
          </p>
        </section>
      </div>

      <div class="legal-footer">
        <a routerLink="/privacy-policy">View our Privacy Policy</a>
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

        .legal-footer {
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
      }
    `,
  ],
})
export class TermsOfUseComponent {}
