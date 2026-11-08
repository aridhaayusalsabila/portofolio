const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");
const inquiryForm = document.querySelector("#inquiry-form");

if (menuButton && navigation) {
  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
  };

  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    menuButton.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("is-open", !expanded);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuButton.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 681px)").matches) closeMenu();
  });
}

if (inquiryForm instanceof HTMLFormElement) {
  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!inquiryForm.reportValidity()) return;

    const fields = new FormData(inquiryForm);
    const name = String(fields.get("name") ?? "").trim();
    const email = String(fields.get("email") ?? "").trim();
    const intent = String(fields.get("intent") ?? "").trim();
    const message = String(fields.get("message") ?? "").trim();
    const body = `Name: ${name}\nEmail: ${email}\nInquiry: ${intent}\n\n${message}`;
    const subject = `Portfolio inquiry: ${intent}`;
    const status = document.querySelector("#form-status");

    if (status) status.textContent = "Opening your email app with the inquiry details…";
    window.location.href = `mailto:aridhaayusalsabila@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

const year = document.querySelector("#current-year");
if (year) year.textContent = String(new Date().getFullYear());
