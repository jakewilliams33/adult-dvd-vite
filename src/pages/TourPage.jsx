import { useState, useEffect } from "react";
import { useScript } from "../Hooks/useScript";
import "../styles/tour.css";
import { Helmet } from "react-helmet-async";
import bandBanner from "../images/band-banner.webp";
import pinkObjects from "../images/pink-objects.webp";

// The Bandsintown widget rewrites its own DOM node when its script loads,
// which conflicts with hydration of prerendered HTML. So it's mounted on the
// client only — the rest of the page (banner, heading, nav) still prerenders.
const BandsintownWidget = () => {
  useScript("//widgetv3.bandsintown.com/main.min.js");

  return (
    <div className="inner-box-scroll-tour">
      <a
        className="bit-widget-initializer"
        data-artist-name="id_15529882"
        data-background-color="rgba(0,0,0,0)"
        data-separator-color="rgba(255,255,255,0.12)"
        data-text-color="#ffffff"
        data-font="Instrument Serif"
        data-auto-style="true"
        data-button-label-capitalization="uppercase"
        data-header-capitalization=""
        data-display-local-dates="true"
        data-local-dates-position="tab"
        data-display-past-dates="false"
        data-display-details=""
        data-display-lineup="false"
        data-display-start-time=""
        data-social-share-icon="false"
        data-display-limit="all"
        data-date-format="MMM D, YYYY"
        data-date-orientation="horizontal"
        data-date-border-color="rgba(255,255,255,0.35)"
        data-date-border-width="0px"
        data-date-border-radius="0px"
        data-event-ticket-cta-size="medium"
        data-event-custom-ticket-text=""
        data-event-ticket-text="TICKETS"
        data-event-ticket-icon="false"
        data-event-ticket-cta-text-color="#ffffff"
        data-event-ticket-cta-bg-color="rgba(0,0,0,0)"
        data-event-ticket-cta-border-color="rgba(0,0,0,0)"
        data-event-ticket-cta-border-width="0px"
        data-event-ticket-cta-border-radius="0px"
        data-sold-out-button-text-color="#FFFFFF"
        data-sold-out-button-background-color="rgba(0,0,0,0)"
        data-sold-out-button-border-color="rgba(0,0,0,0)"
        data-sold-out-button-clickable="true"
        data-event-rsvp-position="left"
        data-event-rsvp-cta-size="medium"
        data-event-rsvp-only-show-icon="false"
        data-event-rsvp-text="NOTIFY ME"
        data-event-rsvp-icon=""
        data-event-rsvp-cta-text-color="#ffffff"
        data-event-rsvp-cta-bg-color="rgba(0,0,0,0)"
        data-event-rsvp-cta-border-color="rgba(0,0,0,0)"
        data-event-rsvp-cta-border-width="0px"
        data-event-rsvp-cta-border-radius="0px"
        data-follow-section-position="bottom"
        data-follow-section-alignment="center"
        data-follow-section-header-text="Get notified when new events are announced in your area"
        data-follow-section-cta-size="medium"
        data-follow-section-cta-text="FOLLOW ADULT DVD"
        data-follow-section-cta-icon="false"
        data-follow-section-cta-text-color="#ffffff"
        data-follow-section-cta-bg-color="#ec1c94"
        data-follow-section-cta-border-color="rgba(0,0,0,0)"
        data-follow-section-cta-border-width="0px"
        data-follow-section-cta-border-radius="0px"
        data-play-my-city-position="hidden"
        data-play-my-city-alignment="Center"
        data-play-my-city-header-text="Don’t see a show near you?"
        data-play-my-city-cta-size="small"
        data-play-my-city-cta-text="REQUEST A SHOW"
        data-play-my-city-cta-icon="true"
        data-play-my-city-cta-text-color="#FFFFFF"
        data-play-my-city-cta-bg-color="#ec1c94"
        data-play-my-city-cta-border-color="rgba(255,255,255,0)"
        data-play-my-city-cta-border-width="0px"
        data-play-my-city-cta-border-radius="0px"
        data-optin-font=""
        data-optin-text-color=""
        data-optin-bg-color=""
        data-optin-cta-text-color=""
        data-optin-cta-bg-color=""
        data-optin-cta-border-width=""
        data-optin-cta-border-radius=""
        data-optin-cta-border-color=""
        data-language="en"
        data-app-id="js_adultdvd.band"
        data-affil-code=""
        data-bit-logo-position="hidden"
        data-bit-logo-color="#CCCCCC"
      ></a>
    </div>
  );
};

export const TourPage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // The widget marks the active tab with a heavier font-weight (no class), so
  // mirror that onto our own .is-selected class to drive the pink rectangle.
  useEffect(() => {
    const sync = () => {
      const up = document.querySelector(".bit-show-upcoming");
      const loc = document.querySelector(".bit-show-local");
      if (!up || !loc) return;
      const upInner = up.querySelector("span") || up;
      const upActive =
        parseInt(getComputedStyle(upInner).fontWeight, 10) >= 600;
      up.classList.toggle("is-selected", upActive);
      loc.classList.toggle("is-selected", !upActive);
    };
    const interval = setInterval(sync, 350);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>Tour | ADULT DVD</title>
        <meta name="description" content="Upcoming ADULT DVD tour dates and tickets." />
        <meta property="og:title" content="Tour | ADULT DVD" />
        <meta property="og:description" content="Upcoming ADULT DVD tour dates and tickets." />
      </Helmet>
      <img src={pinkObjects} alt="" aria-hidden="true" className="objects-bg" />

      <section className="widget-parent">
        <div className="widget-container">
          {/* Band photo banner with the TOUR DATES overlay */}
          <div className="tour-banner">
            <img src={bandBanner} alt="Adult DVD" className="tour-banner-img" />
            <h1 className="tour-heading">Tour Dates</h1>
          </div>

          {mounted && <BandsintownWidget />}
        </div>
      </section>
    </>
  );
};
