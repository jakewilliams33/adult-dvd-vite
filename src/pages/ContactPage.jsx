import React, { useRef, useState } from "react";
import * as Yup from "yup";
import "../styles/contact.css";
import "../styles/postage-label.css";

import { motion } from "framer-motion";
import ad from "../images/adorange.png";
import envelope from "../images/envelopeorange.png";
import monkey from "../images/monkeyorange.png";
import border from "../images/border.jpg";
import barcode from "../images/barcode.png";

export const ContactPage = ({ opacity }) => {
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
      setSent(true); // Assuming you want to show a success message after submission

      // Construct FormData object
      const formData = new FormData();
      formData.append("form-name", "contact");
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("subject", values.subject);
      formData.append("message", values.message);

      // Submit FormData to Netlify
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      // Handle response (optional)
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
      <div>
        <div className={sent ? "sent" : "form-container"}>
          <div className="inner-box inner-box-scroll-contact custom-scroll">
            <div className="top-banner">
              <div style={{ borderRight: "#fb772b solid 1.4pt" }}>
                <img
                  style={{ width: "60px", marginLeft: "5px" }}
                  src={ad}
                ></img>
              </div>
              <img style={{ width: "88px" }} src={envelope}></img>
              <img style={{ width: "60px" }} src={monkey}></img>
            </div>
            <div className="information">
              <p>
                <span style={{ fontWeight: "bold" }}>EU BOOKINGS:</span>{" "}
                <a className="email" href="mailto:Ben@trustychordsagency.nl">
                  Ben@trustychordsagency.nl
                </a>
              </p>
            </div>
            <div className="information">
              <p>
                <span style={{ fontWeight: "bold" }}>
                  UK BOOKINGS/ANYTHING ELSE:{" "}
                </span>{" "}
                <a className="email" href="mailto:Adultdvdmenu@gmail.com">
                  Adultdvdmenu@gmail.com
                </a>{" "}
                - or use the form below.
              </p>
            </div>
            {sent && (
              <div>
                <div className="divider-sent"></div>
                <h3 style={{ marginTop: "10px" }}>Message sent!</h3>
                <div className="divider-sent"></div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img style={{ width: "80%" }} src={barcode}></img>
                </div>
                <div className="divider-sent"></div>

                <button
                  onClick={() => {
                    setSent(false);
                    setValues({
                      name: "",
                      email: "",
                      subject: "",
                      message: "",
                    });
                  }}
                >
                  send another?
                </button>
              </div>
            )}

            <form
              ref={form}
              onSubmit={handleSubmit}
              name="contact"
              method="POST"
              netlify
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="contact" />
              <div style={{ display: "none" }}>
                <label>
                  Don’t fill this out: <input name="bot-field" />
                </label>
              </div>
              <div
                style={{
                  width: "94%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "1vh",
                }}
              >
                <label>Name</label>
                {touched.name && errors.name && (
                  <span className="error-messages">{errors.name}</span>
                )}
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  type="text"
                  name="name"
                  className="feedback-input"
                />

                <label>Email</label>
                {touched.email && errors.email && (
                  <span className="error-messages">{errors.email}</span>
                )}
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  type="text"
                  name="email"
                  className="feedback-input"
                />

                <label>Subject</label>
                <input
                  onChange={handleChange}
                  value={values.subject}
                  type="text"
                  name="subject"
                  className="feedback-input"
                />
              </div>
              <div
                style={{
                  width: "100%",
                  height: "15px",
                  marginBottom: "13px",
                }}
                className="dividers"
              ></div>
              <div
                style={{
                  width: "94%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <label>Message</label>
                {touched.message && errors.message && (
                  <span className="error-messages">{errors.message}</span>
                )}
              </div>

              <div
                style={{
                  width: "94%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  height: "100%",
                  display: "flex",
                  flexGrow: 1, // Allow the container to grow
                  flexDirection: "column",
                  marginBottom: "2vh",
                }}
              >
                <textarea
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.message}
                  name="message"
                  className="message"
                />
              </div>
              <div
                className="dividers"
                style={{
                  width: "100%",
                  height: "15px",
                }}
              ></div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <input type="submit" value="Send" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
