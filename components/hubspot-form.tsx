"use client";

import { useEffect, useId, useState } from "react";

/** Matches Bootcamp University default when `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` is unset (Strapi form IDs from that portal). */
const DEFAULT_PORTAL_ID = "45023159";

type HubSpotFormProps = {
  readonly formId: string;
  readonly portalId?: string;
  readonly region?: string;
  readonly targetId?: string;
};

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (config: {
          portalId: string;
          formId: string;
          region: string;
          target: string;
          onFormReady?: () => void;
        }) => void;
      };
    };
  }
}

/**
 * HubSpot embedded form (same flow as ceren-bootcamp: `forms/v2.js` + `hbspt.forms.create` into a target div;
 * HubSpot injects the form iframe inside that node).
 *
 * Portal: `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`, or optional `portalId` prop, or default `45023159`.
 * Region: `NEXT_PUBLIC_HUBSPOT_REGION` or optional `region` prop (default `na1`).
 */
export function HubSpotForm({
  formId,
  portalId: portalIdProp,
  region: regionProp,
  targetId: targetIdProp,
}: HubSpotFormProps) {
  const reactId = useId().replace(/:/g, "");
  const targetId = targetIdProp ?? `hubspot-form-${reactId}`;
  const portalId =
    portalIdProp?.trim() ||
    process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID?.trim() ||
    DEFAULT_PORTAL_ID;
  const region = regionProp?.trim() || process.env.NEXT_PUBLIC_HUBSPOT_REGION?.trim() || "na1";

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 50;
    let cancelled = false;

    const loadScript = () => {
      if (document.getElementById("hubspot-script")) return;
      const script = document.createElement("script");
      script.id = "hubspot-script";
      script.src = "https://js.hsforms.net/forms/v2.js";
      script.async = true;
      document.body.appendChild(script);
    };

    const checkAndCreateForm = () => {
      if (cancelled) return;
      if (window.hbspt?.forms) {
        try {
          window.hbspt.forms.create({
            portalId,
            formId,
            region,
            target: `#${targetId}`,
            onFormReady: () => {
              if (!cancelled) setLoaded(true);
            },
          });
        } catch (error) {
          console.error("Error creating HubSpot form:", error);
        }
      } else if (attempts < maxAttempts) {
        attempts += 1;
        setTimeout(checkAndCreateForm, 100);
      } else {
        console.error("HubSpot script failed to load.");
      }
    };

    loadScript();
    const timer = setTimeout(checkAndCreateForm, 100);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      const formContainer = document.getElementById(targetId);
      if (formContainer) {
        formContainer.innerHTML = "";
      }
    };
  }, [portalId, formId, region, targetId]);

  return (
    <div className="hubspot-form-wrapper">
      <div id={targetId} />
      {!loaded ? (
        <div className="py-8 text-center">
          <p className="text-sm text-muted">Loading application form...</p>
        </div>
      ) : null}
    </div>
  );
}
