
import { useState } from "react";
import "./ContactUs.css";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const newRequest = {
      id: Date.now(),
      name,
      email,
      subject,
      message,
    };

    const savedRequests = JSON.parse(
      localStorage.getItem("glowupRequests") || "[]"
    );

    localStorage.setItem(
      "glowupRequests",
      JSON.stringify([...savedRequests, newRequest])
    );

    setSubmitted(true);
    setName("");
    setEmail("");
    setSubject("General Inquiry");
    setMessage("");
  }

  return (
    <div className="contact-page">
      <div className="contact-header">
        <p>WE ARE HERE FOR YOU</p>
        <h1>Contact Us</h1>
        <p>We would love to hear from you.</p>
      </div>

      <div className="contact-card">
        <h2>Get in Touch ♡</h2>
        <p>Send us your questions or skincare consultation requests.</p>

        {submitted && (
          <p className="success-message">
            Your message has been received successfully!
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <label>Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Subject</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option>General Inquiry</option>
            <option>Skincare Consultation</option>
            <option>Product Question</option>
          </select>

          <label>Your Message</label>
          <textarea
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
