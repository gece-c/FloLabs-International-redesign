import { describe, expect, it } from "vitest";
import {
  isParsedInternshipDescriptionEmpty,
  parseInternshipContent,
  splitWhyJoinItem,
} from "./internship-description";

describe("parseInternshipContent", () => {
  it("returns empty sections for undefined", () => {
    const p = parseInternshipContent(undefined);
    expect(isParsedInternshipDescriptionEmpty(p)).toBe(true);
  });

  it("parses overview and responsibilities", () => {
    const raw = `First paragraph in overview.

Second overview line.

Key Responsibilities

- Ship features

- Review code`;

    const p = parseInternshipContent(raw);
    expect(p.overview).toEqual(["First paragraph in overview.", "Second overview line."]);
    expect(p.responsibilities).toEqual(["Ship features", "Review code"]);
    expect(p.qualifications).toEqual([]);
    expect(isParsedInternshipDescriptionEmpty(p)).toBe(false);
  });

  it("accepts Qualifications & Skills heading", () => {
    const raw = `Qualifications & Skills

- TypeScript

- React`;

    const p = parseInternshipContent(raw);
    expect(p.overview).toEqual([]);
    expect(p.qualifications).toEqual(["TypeScript", "React"]);
  });

  it("accepts Qualifications and Skills heading", () => {
    const raw = `Qualifications and Skills

Python`;

    const p = parseInternshipContent(raw);
    expect(p.qualifications).toEqual(["Python"]);
  });

  it("parses Why Join Us section", () => {
    const raw = `Why Join Us?

Culture: Great team.

Flat org.`;

    const p = parseInternshipContent(raw);
    expect(p.whyJoinUs).toHaveLength(2);
    expect(p.whyJoinUs[0]).toContain("Culture");
  });

  it("strips bullet prefixes from items", () => {
    const raw = `Key Responsibilities

• First task

- Second task`;

    const p = parseInternshipContent(raw);
    expect(p.responsibilities).toEqual(["First task", "Second task"]);
  });

  it("treats heading-only description as empty for structured UI", () => {
    const raw = `Overview

Key Responsibilities

Qualifications and Skills`;

    const p = parseInternshipContent(raw);
    expect(isParsedInternshipDescriptionEmpty(p)).toBe(true);
  });
});

describe("splitWhyJoinItem", () => {
  it("splits title and description when colon present", () => {
    const r = splitWhyJoinItem("Mentorship: Weekly 1:1s with seniors.");
    expect(r.title).toBe("Mentorship:");
    expect(r.description).toBe("Weekly 1:1s with seniors.");
  });

  it("returns empty title when no colon pattern", () => {
    const r = splitWhyJoinItem("Just a single sentence.");
    expect(r.title).toBe("");
    expect(r.description).toBe("Just a single sentence.");
  });
});
