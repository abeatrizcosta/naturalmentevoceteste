// Dados editáveis da profissional e integrações opcionais.
export const siteConfig = {
  name: "Edineide Araújo",
  crn: "CRN-127932",
  city: "Brasília/DF",
  whatsapp: "5561981018687",
  instagram: "natural.mentevoce",
  message: "Olá, Edineide! Vi seu site e gostaria de agendar uma consulta.",
  ga4Id: "", // Insira o ID GA4 e carregue o script somente após consentimento.
  metaPixelId: "", // Insira o ID Meta Pixel e carregue somente após consentimento.
};

export function whatsappUrl() {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.message)}`;
}

export function trackWhatsapp() {
  if (localStorage.getItem("naturalmente-cookies") !== "accepted") return;
  // Marcadores GA4 e Meta Pixel: eventos só são enviados com consentimento.
  const tracking = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  };
  tracking.gtag?.("event", "generate_lead", { method: "WhatsApp" });
  tracking.fbq?.("track", "Contact");
}