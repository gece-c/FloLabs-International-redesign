"use client";

import { useEffect, useId } from "react";

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: {
          region: string;
          portalId: string;
          formId: string;
          target: string;
        }) => void;
      };
    };
  }
}

let hubspotScriptPromise: Promise<void> | null = null;

function loadHubSpotScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.hbspt) return Promise.resolve();
  if (hubspotScriptPromise) return hubspotScriptPromise;

  hubspotScriptPromise = new Promise((resolve, reject) => {
    const src = "https://js.hsforms.net/forms/embed/v2.js";
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("HubSpot script")), {
        once: true,
      });
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("HubSpot script failed to load"));
    document.body.appendChild(s);
  });

  return hubspotScriptPromise;
}

type HubSpotFormProps = {
  formId: string;
};

/**
 * Embedded HubSpot form. Requires NEXT_PUBLIC_HUBSPOT_PORTAL_ID.
 * Optional: NEXT_PUBLIC_HUBSPOT_REGION (default "na1", use "eu1" when applicable).
 */
export function HubSpotForm({ formId }: HubSpotFormProps) {
  const reactId = useId().replace(/:/g, "");
  const targetId = `hubspot-embed-${reactId}`;
  const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID?.trim();
  const region = process.env.NEXT_PUBLIC_HUBSPOT_REGION?.trim() || "na1";

  useEffect(() => {
    if (!portalId || !formId) return;

    let cancelled = false;

    void (async () => {
      try {
        await loadHubSpotScript();
        if (cancelled || !window.hbspt) return;
        window.hbspt.forms.create({
          region,
          portalId,
          formId,
          target: `#${targetId}`,
        });
      } catch {
        /* ignore — UI still shows container */
      }
    })();

    return () => {
      cancelled = true;
      const el = document.getElementById(targetId);
      if (el) el.innerHTML = "";
    };
  }, [formId, portalId, region, targetId]);

  if (!portalId) {
    return (
      <p className="text-sm text-muted">
        Set NEXT_PUBLIC_HUBSPOT_PORTAL_ID to enable the application form.
      </p>
    );
  }

  return <div id={targetId} className="min-h-[12rem] w-full" />;
}
