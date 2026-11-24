import { describe, expect, it } from "vitest";
import {
  isEmailUsername,
  isValidUsername,
  normalizeUsername,
} from "../../src/plugins/username-only/utils/username";

const limits = { maxUsernameLength: 32, minUsernameLength: 3 };

describe("username-only usernames", () => {
  it("still accepts plain handles", () => {
    expect(isValidUsername("ada.lovelace_1", limits)).toBe(true);
    expect(isValidUsername("ab", limits)).toBe(false);
    expect(isValidUsername("no spaces", limits)).toBe(false);
    expect(isValidUsername("a".repeat(33), limits)).toBe(false);
  });

  it("accepts an email address, longer than the handle limit", () => {
    const email = `${"a".repeat(40)}@example.com`;
    expect(isEmailUsername(email)).toBe(true);
    expect(isValidUsername(email, limits)).toBe(true);
    expect(isValidUsername("ada+keeper@example.co.uk", limits)).toBe(true);
  });

  it("rejects something that is neither", () => {
    expect(isValidUsername("ada@", limits)).toBe(false);
    expect(isValidUsername("ada@example", limits)).toBe(false);
  });

  it("lowercases emails so the same address finds the same account, and leaves handles alone", () => {
    expect(normalizeUsername("  Ada@Example.COM ")).toBe("ada@example.com");
    expect(normalizeUsername("AdaLovelace")).toBe("AdaLovelace");
  });
});
