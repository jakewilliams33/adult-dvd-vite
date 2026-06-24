import { useRef, useState } from "react";
import * as Yup from "yup";
import "../styles/contact.css";
import { Helmet } from "react-helmet-async";

export const ContactPage = () => {
  const form = useRef();
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const validationSchema = Yup.object({
    name: Yup.string().required(" is required"),
    email: Yup.string().email(" is not valid").required(" is required"),
    message: Yup.string().required(" is required"),
  });

  const validateField = async (name, value) => {
    try {
      await Yup.reach(validationSchema, name).validate(value);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    // Validate the field whenever it changes
    validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched for displaying error messages
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    try {
      await validationSchema.validate(values, { abortEarly: false });
      setErrors({});
      setSent(true);

      const formData = new FormData();
      formData.append("form-name", "contact");
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("subject", values.subject);
      formData.append("message", values.message);

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        console.log("Form submitted successfully!");
      } else {
        console.error("Form submission failed:", response.statusText);
      }
    } catch (validationErrors) {
      const formattedErrors = {};
      validationErrors.inner.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact | ADULT DVD</title>
        <meta
          name="description"
          content="Get in touch with ADULT DVD — bookings, press and general enquiries."
        />
      </Helmet>

      <div className="contact-panel">
        <div className="contact-header">
          <h1 className="contact-title">Contact</h1>
        </div>

        <div className="contact-info">
          <span className="ci-label">UK/EU Bookings:</span>
          <span className="ci-value">
            <a className="email" href="mailto:sarah.joy@atc-live.com">
              sarah.joy@atc-live.com
            </a>{" "}
            &amp;{" "}
            <a className="email" href="mailto:caitlin@atc-live.com">
              caitlin@atc-live.com
            </a>
          </span>

          <span className="ci-label">USA Bookings:</span>
          <span className="ci-value">
            <a className="email" href="mailto:someone@something.com">
              someone@something.com
            </a>
          </span>

          <span className="ci-label">Management:</span>
          <span className="ci-value">
            <a className="email" href="mailto:sarah@sarahbrooksbankmgmt.com">
              sarah@sarahbrooksbankmgmt.com
            </a>
          </span>

          <span className="ci-label">Press:</span>
          <span className="ci-value">
            <a className="email" href="mailto:someone@something.com">
              someone@something.com
            </a>
          </span>

          <span className="ci-label">Other:</span>
          <span className="ci-value">
            <a className="email" href="mailto:adultdvdmenu@gmail.com">
              adultdvdmenu@gmail.com
            </a>
          </span>
        </div>

        {sent ? (
          <div className="contact-sent">
            <p className="contact-sent-text">Message sent!</p>
            <button
              type="button"
              className="contact-send"
              onClick={() => {
                setSent(false);
                setValues({ name: "", email: "", subject: "", message: "" });
              }}
            >
              Send another?
            </button>
          </div>
        ) : (
          <form
            ref={form}
            onSubmit={handleSubmit}
            name="contact"
            method="POST"
            action="/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="contact-form"
          >
            <input type="hidden" name="form-name" value="contact" />
            <div style={{ display: "none" }}>
              <label>
                <input name="bot-field" />
              </label>
            </div>

            <div className="contact-fields">
              <label className="contact-label">Name</label>
              {touched.name && errors.name && (
                <span className="error-messages">{errors.name}</span>
              )}
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                type="text"
                name="name"
                className="contact-input"
              />

              <label className="contact-label">Email</label>
              {touched.email && errors.email && (
                <span className="error-messages">{errors.email}</span>
              )}
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                type="text"
                name="email"
                className="contact-input"
              />

              <label className="contact-label">Subject</label>
              <input
                onChange={handleChange}
                value={values.subject}
                type="text"
                name="subject"
                className="contact-input"
                style={{ marginBottom: 20 }}
              />
            </div>

            <div className="contact-divider"></div>

            <div className="contact-fields">
              <label className="contact-label">Message</label>
              {touched.message && errors.message && (
                <span className="error-messages">{errors.message}</span>
              )}
              <textarea
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message}
                name="message"
                className="contact-message"
              />
            </div>

            <div className="contact-send-wrap">
              <input type="submit" className="contact-send" value="Send" />
            </div>
          </form>
        )}
      </div>
    </>
  );
};
