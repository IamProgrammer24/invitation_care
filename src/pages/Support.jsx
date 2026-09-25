import { useState } from "react";
import brand from "../data/brand";
import "./Support.css";

export default function Support() {
  const [copied, setCopied] = useState(false);

  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(brand.upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked, ignore
    }
  };

  return (
    <div className="support-page">
      <div className="support-card">
        <p className="support-emoji">🙏</p>
        <h1>Support this creator</h1>
        <p className="support-sub">
          This Navratri invite is free to use and share. If it made your
          celebration a little brighter, a small contribution helps keep it
          going.
        </p>

        <img className="support-qr" src={brand.qrImage} alt="UPI QR code" />

        <button className="support-upi" onClick={copyUpi}>
          {brand.upiId}
          <span>{copied ? "Copied!" : "Tap to copy"}</span>
        </button>

        <a className="support-back" href="/">
          ← Back to the invitation
        </a>
      </div>
    </div>
  );
}
