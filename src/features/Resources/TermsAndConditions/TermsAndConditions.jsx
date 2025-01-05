import React from "react";
import "./TermsAndConditions.css"; // Optional for styling

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <header className="terms-header">
        <h1>Terms and Conditions</h1>
        <p>Effective Date: November 2024</p>
      </header>

      <section className="terms-content">
        <p>
          Welcome to Techverse! By accessing and using our platform, you agree
          to comply with the following Terms and Conditions. Please read them
          carefully.
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By using this website and our services, you confirm your acceptance of
          these terms. If you do not agree with these terms, you must
          discontinue use of the site.
        </p>

        <h2>2. User Account</h2>
        <p>
          You are responsible for maintaining the confidentiality of your
          account credentials and for all activities under your account. You
          agree to notify us immediately if you suspect any unauthorized access
          to your account.
        </p>

        <h2>3. Use of Services</h2>
        <p>
          You may use our services only for lawful purposes. You agree not to
          use the platform for any activity that may harm or interfere with its
          functioning, or that violates any laws or regulations.
        </p>

        <h2>4. Intellectual Property</h2>
        <p>
          All content on Techverse, including text, graphics, logos, images, and
          software, is the property of Techverse or its licensors and is
          protected by intellectual property laws. You may not reproduce,
          distribute, or modify any content without prior written consent.
        </p>

        <h2>5. Payment Terms</h2>
        <p>
          All payments for courses, services, and other offerings must be made
          via the available payment methods on the platform. All fees are
          non-refundable unless otherwise specified.
        </p>

        <h2>6. User-Generated Content</h2>
        <p>
          You are solely responsible for any content you post or upload on
          Techverse. By submitting content, you grant Techverse a non-exclusive,
          royalty-free, worldwide license to use, modify, and display your
          content as part of the services.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>
          Techverse will not be liable for any indirect, incidental, or
          consequential damages arising from the use of the platform. We provide
          the platform "as is" and make no warranties regarding the accuracy,
          reliability, or availability of services.
        </p>

        <h2>8. Privacy and Data Protection</h2>
        <p>
          Your use of our platform is subject to our Privacy Policy, which
          governs the collection and use of personal data. By using our
          services, you consent to our data practices as outlined in the Privacy
          Policy.
        </p>

        <h2>9. Modifications to Terms</h2>
        <p>
          We may update or modify these Terms and Conditions at any time. Any
          changes will be posted on this page with an updated effective date. It
          is your responsibility to review these terms regularly.
        </p>

        <h2>10. Governing Law</h2>
        <p>
          These Terms and Conditions are governed by and construed in accordance
          with the laws of [Your Country]. Any disputes arising from these terms
          will be resolved in the competent courts of [Your Jurisdiction].
        </p>

        <footer className="terms-footer">
          <p>
            If you have any questions, please contact us at{" "}
            <a href="mailto:erfanmasoudiba@gmail.com">
              erfanmasoudiba@gmail.com
            </a>
            .
          </p>
        </footer>
      </section>
    </div>
  );
};

export default TermsAndConditions;
