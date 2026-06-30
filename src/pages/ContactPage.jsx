import { useRef, useState } from "react";
import * as Yup from "yup";
import "../styles/contact.css";
import { Helmet } from "react-helmet-async";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import pinkObjects from "../images/pink-objects.webp";

export const ContactPage = () => {
  const form = useRef();
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState("");
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

    setSubmitError("");

    try {
      await validationSchema.validate(values, { abortEarly: false });
      setErrors({});
    } catch (validationErrors) {
      const formattedErrors = {};
      validationErrors.inner.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
      return;
    }

    try {
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

      // Only show the success screen once Netlify has actually accepted the
      // submission, so a network/server error doesn't silently lose the message.
      if (response.ok) {
        setSent(true);
      } else {
        console.error("Form submission failed:", response.statusText);
        setSubmitError("Something went wrong — please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError("Something went wrong — please try again.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact | ADULT DVD</title>
        <meta
          name="description"
          content="Adult DVD contact page - management, booking, press and licensing enquiries."
        />
        <meta property="og:title" content="Contact | ADULT DVD" />
        <meta
          property="og:description"
          content="Adult DVD contact page - management, booking, press and licensing enquiries."
        />
      </Helmet>
      <img src={pinkObjects} alt="" aria-hidden="true" className="objects-bg" />

      <div className="contact-panel">
        <div className="contact-header">
          <h1 data-nosnippet className="contact-title">
            Contact
          </h1>
        </div>

        <div className="contact-info" data-nosnippet>
          <span className="ci-label">Management:</span>
          <span className="ci-value">
            <a className="email" href="mailto:sarah@sarahbrooksbankmgmt.com">
              sarah@sarahbrooksbankmgmt.com
            </a>
          </span>
          <span className="ci-label">Booking (UK/EU):</span>
          <span className="ci-value">
            <a className="email" href="mailto:sarah.joy@roamartists.com">
              sarah.joy@roamartists.com
            </a>{" "}
            &amp;{" "}
            <a className="email" href="mailto:caitlin.ballard@roamartists.com">
              caitlin.ballard@roamartists.com
            </a>
          </span>

          <span className="ci-label">Booking (N/S America):</span>
          <span className="ci-value">
            <a
              className="email"
              href="mailto:lindsayibberson@groundcontroltouring.com"
            >
              lindsayibberson@groundcontroltouring.com
            </a>
          </span>

          <span className="ci-label">Press:</span>
          <span className="ci-value">
            <a className="email" href="mailto:dan@overheardpr.com">
              dan@overheardpr.com
            </a>
          </span>
          <span className="ci-label">Music licensing Enquiries:</span>
          <span className="ci-value">
            Fat Possum (Master)/Warner Chappell(Publishing)
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
              <label className="contact-label" htmlFor="contact-name">
                Name
              </label>
              {touched.name && errors.name && (
                <span className="error-messages">{errors.name}</span>
              )}
              <input
                id="contact-name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                type="text"
                name="name"
                className="contact-input"
              />

              <label className="contact-label" htmlFor="contact-email">
                Email
              </label>
              {touched.email && errors.email && (
                <span className="error-messages">{errors.email}</span>
              )}
              <input
                id="contact-email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                type="text"
                name="email"
                className="contact-input"
              />

              <label className="contact-label" htmlFor="contact-subject">
                Subject
              </label>
              <input
                id="contact-subject"
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
              <label className="contact-label" htmlFor="contact-message">
                Message
              </label>
              {touched.message && errors.message && (
                <span className="error-messages">{errors.message}</span>
              )}
              <textarea
                id="contact-message"
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

      <AnimatePresence>
        {submitError && (
          <motion.div
            key="contact-error-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="contact-error-overlay"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setSubmitError("");
            }}
          >
            <div className="contact-error-modal" role="alertdialog">
              <button
                type="button"
                className="contact-error-close"
                aria-label="Close"
                onClick={() => setSubmitError("")}
              >
                <IoMdClose size={26} />
              </button>
              <p className="contact-error-text">{submitError}</p>
              <button
                type="button"
                className="contact-send"
                onClick={() => setSubmitError("")}
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
