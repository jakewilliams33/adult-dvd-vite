import React, { useState, useEffect } from "react";
import { useScript } from "../Hooks/useScript";
import "../styles/tour.css";
import "../styles/postage-label.css";
import ad from "../images/adorange.webp";
import envelope from "../images/envelopeorange.webp";
import monkey from "../images/monkeyorange.webp";
import { Helmet } from "react-helmet-async";

export const TourPage = ({ slide }) => {
  const [loading, setLoading] = useState(true);

  useScript("//widgetv3.bandsintown.com/main.min.js");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//widgetv3.bandsintown.com/main.min.js";
    script.async = true;
    script.onload = () => setLoading(false);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Tour</title>
        <meta name="description" content="Tour Dates" />
      </Helmet>
      <section className="widget-parent">
        <div className="widget-container">
          <div style={{ width: "100%" }}>
            <div className="top-banner-tour">
              <div style={{ borderRight: "#fb772b solid 1.4pt" }}>
                <img
                  style={{ width: "50px", marginLeft: "5px" }}
                  src={ad}
                ></img>
              </div>
              <img style={{ width: "76px" }} src={envelope}></img>
              <img style={{ width: "50px" }} src={monkey}></img>
            </div>
          </div>
          <div className="inner-box-scroll-tour custom-scroll">
            <div style={{ height: "14px" }}></div>
            <a
              className="bit-widget-initializer"
              data-artist-name="id_15529882"
              data-background-color="rgba(246,240,240,0)"
              data-separator-color="rgba(249,102,49, 1)"
              data-text-color="rgba(249,102,49, 1)"
              data-font=""
              data-auto-style="true"
              data-button-label-capitalization="uppercase"
              data-header-capitalization=""
              data-location-capitalization="uppercase"
              data-venue-capitalization="uppercase"
              data-display-local-dates="true"
              data-local-dates-position="tab"
              data-display-past-dates="false"
              data-display-details=""
              data-display-lineup="true"
              data-display-start-time=""
              data-social-share-icon="false"
              data-display-limit="all"
              data-date-format="MMMM D, YYYY"
              data-date-orientation="horizontal"
              data-date-border-color="#4A4A4A"
              data-date-border-width="1px"
              data-date-capitalization="uppercase"
              data-date-border-radius="10px"
              data-event-ticket-cta-size="medium"
              data-event-custom-ticket-text=""
              data-event-ticket-text="TICKETS"
              data-event-ticket-icon="true"
              data-event-ticket-cta-text-color="rgba(249,102,49, 1)"
              data-event-ticket-cta-bg-color="rgba(221,221,221,0.9)"
              data-event-ticket-cta-border-color="rgba(74,74,74,0)"
              data-event-ticket-cta-border-width="0px"
              data-event-ticket-cta-border-radius="4px"
              data-sold-out-button-text-color="#FFFFFF"
              data-sold-out-button-background-color="rgba(221,221,221,0.51)"
              data-sold-out-button-border-color="rgba(74,74,74,0)"
              data-sold-out-button-clickable="true"
              data-event-rsvp-position="left"
              data-event-rsvp-cta-size="medium"
              data-event-rsvp-only-show-icon="true"
              data-event-rsvp-text="REMIND ME"
              data-event-rsvp-icon=""
              data-event-rsvp-cta-text-color="rgba(249,102,49, 1)"
              data-event-rsvp-cta-bg-color="rgba(249,102,49, 1)"
              data-event-rsvp-cta-border-color="rgba(74,74,74,0)"
              data-event-rsvp-cta-border-width="1px"
              data-event-rsvp-cta-border-radius="4px"
              data-follow-section-position="hidden"
              data-follow-section-alignment="center"
              data-follow-section-header-text=""
              data-follow-section-cta-size="small"
              data-follow-section-cta-text="FOLLOW"
              data-follow-section-cta-icon="false"
              data-follow-section-cta-text-color="rgba(249,102,49, 1)"
              data-follow-section-cta-bg-color="rgba(221,221,221,0.49)"
              data-follow-section-cta-border-color="rgba(255,255,255,0)"
              data-follow-section-cta-border-width="0px"
              data-follow-section-cta-border-radius="4px"
              data-play-my-city-position="hidden"
              data-play-my-city-alignment="Center"
              data-play-my-city-header-text="Don’t see a show near you?"
              data-play-my-city-cta-size="small"
              data-play-my-city-cta-text="REQUEST A SHOW"
              data-play-my-city-cta-icon="true"
              data-play-my-city-cta-text-color="#FFFFFF"
              data-play-my-city-cta-bg-color="#4A4A4A"
              data-play-my-city-cta-border-color="#4A4A4A"
              data-play-my-city-cta-border-width="0px"
              data-play-my-city-cta-border-radius="4px"
              data-optin-font=""
              data-optin-text-color=""
              data-optin-bg-color=""
              data-optin-cta-text-color=""
              data-optin-cta-bg-color=""
              data-optin-cta-border-width=""
              data-optin-cta-border-radius=""
              data-optin-cta-border-color=""
              data-language="en"
              data-layout-breakpoint="620"
              data-app-id=""
              data-affil-code=""
              data-bit-logo-position="hidden"
              data-bit-logo-color="#CCCCCC"
            ></a>
          </div>
        </div>
      </section>
    </>
  );
};
