const translations = {
  en: {
    home: "Home",
    about: "About Us",
    employers: "Employers",
    candidates: "Candidates",
    services: "Services",
    contact: "Contact",
    cta: "Start a Conversation",
    servicesCta: "Explore Services"
  },
  bs: {
    home: "Početna",
    about: "O nama",
    employers: "Poslodavci",
    candidates: "Kandidati",
    services: "Usluge",
    contact: "Kontakt",
    cta: "Započnite razgovor",
    servicesCta: "Pogledajte usluge"
  },
  de: {
    home: "Start",
    about: "Über uns",
    employers: "Arbeitgeber",
    candidates: "Kandidaten",
    services: "Leistungen",
    contact: "Kontakt",
    cta: "Gespräch starten",
    servicesCta: "Leistungen ansehen"
  }
};

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navMenu.classList.toggle("is-open", !isOpen);
  });
}

const languageButtons = document.querySelectorAll("[data-lang]");
const translatable = document.querySelectorAll("[data-i18n]");

function applyLanguage(language) {
  const dictionary = translations[language] || translations.en;
  document.documentElement.lang = language === "bs" ? "bs" : language;

  translatable.forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });

  languageButtons.forEach((button) => {
    const active = button.dataset.lang === language;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  localStorage.setItem("talorynex-language", language);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

applyLanguage(localStorage.getItem("talorynex-language") || "en");

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const subject = formData.get("subject") || "Talorynex inquiry";
    const body = [
      `Name: ${formData.get("name") || ""}`,
      `Email: ${formData.get("email") || ""}`,
      `Phone: ${formData.get("phone") || ""}`,
      `Inquiry type: ${formData.get("type") || ""}`,
      "",
      "Message:",
      formData.get("message") || ""
    ].join("\n");

    window.location.href = `mailto:info@talorynex-international-recruiting.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
