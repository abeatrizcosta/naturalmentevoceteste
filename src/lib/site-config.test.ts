import { describe, expect, it } from "vitest";
import { whatsappUrl } from "./site-config";

describe("WhatsApp conversion", () => {
  it("uses the requested phone number", () => {
    expect(new URL(whatsappUrl()).pathname).toBe("/61981018687");
  });
  it("pre-fills the exact requested message", () => {
    expect(new URL(whatsappUrl()).searchParams.get("text")).toBe("Olá, Edineide! Vi seu site e gostaria de agendar uma consulta.");
  });
});