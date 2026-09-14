"use strict";
const projectData = {
  longpass: {
    kicker: "Longpass / Product systems",
    title: "Connecting company decisions to an employee experience that makes sense.",
    summary:
      "Longpass needed a coherent incentive journey across two sides of the product: company administrators making decisions and employees understanding what those decisions meant.",
    challenge:
      "Stakeholder feedback covered KPI baselines, targets, review dates, pending units, awards, claims, vesting, carry-forward, and performance history. Each element had value, but the experience needed one connected model.",
    contribution:
      "I translated feedback into linked workflows, clarified the relationship between admin and employee actions, documented decisions, and shaped a review-ready product story for stakeholder demos.",
    outcome:
      "The work established a coherent admin-to-employee journey and made the platform easier to discuss, validate, and move toward a pilot-ready experience.",
    tags: ["Product workflow", "Delivery coordination", "Stakeholder demos", "Experience logic"],
    link: "https://www.longpass.co/",
  },
  inscape: {
    kicker: "InScape / Platform strategy",
    title: "A build-ready foundation for membership, campaigns, rewards, and trust.",
    summary:
      "InScape brought together membership, Campaign Credits, live campaigns, Partner Offers, admin operations, and a mobile experience. Delivery needed one shared source of product truth.",
    challenge:
      "The platform combined commercial, operational, experience, data, and go-live decisions across several connected journeys. Ambiguity risked entering delivery as an unapproved assumption.",
    contribution:
      "I developed an integrated BRD, FRD, and SRS; defined the mobile-first MVP; documented journeys, states, APIs, traceability, security, analytics, tests, open decisions, and phased delivery.",
    outcome:
      "The team gained a structured requirements baseline, clearer launch priorities, and explicit go-live gates around terminology, ledger integrity, trust, and unresolved stakeholder decisions.",
    tags: ["MVP strategy", "BRD / FRD / SRS", "Traceability", "Go-live controls"],
    link: "https://inscapedls.com/",
  },
  microleague: {
    kicker: "MicroLeague Sports / Release readiness",
    title: "Testing a connected sports ecosystem—not a collection of isolated screens.",
    summary:
      "MicroLeague spans simulations, predictions, brackets, survivor pools, challenges, profiles, balances, and wallet behaviour. Product quality depends on the state moving correctly between them.",
    challenge:
      "Issues could appear local while originating in shared authentication, state management, data synchronisation, economic logic, or an adjacent product surface.",
    contribution:
      "I tested critical journeys end to end, documented expected and actual behaviour, grouped findings by module, assigned severity and priority, and separated launch blockers from later polish.",
    outcome:
      "Stakeholders received a clearer picture of release risk and the team could prioritise the defects that most affected workflow integrity, customer trust, and launch readiness.",
    tags: ["Cross-platform QA", "UAT", "Severity triage", "Release decisions"],
    link: "https://www.microleaguesports.com/",
  },
  verity: {
    kicker: "Verityn Index / Conversational AI",
    title: "Giving a real-time AI agent structure, control, and safer behaviour.",
    summary:
      "A real-time calling experience has to listen, respond, recover, execute tools, and handle interruption without losing the purpose or boundaries of the conversation.",
    challenge:
      "Natural conversations are unpredictable. The agent needed explicit control logic for turn-taking, interruption handling, recovery paths, tool execution, and adversarial behaviour.",
    contribution:
      "I architected system prompts and dialogue-state trees, prepared conversational datasets, supported fine-tuning workflows, and designed repeatable jailbreak and prompt-injection evaluations.",
    outcome:
      "The resulting architecture created a clearer control model for agent behaviour and a repeatable basis for prompt hardening, evaluation, and regression testing.",
    tags: ["System prompts", "Dialogue states", "Dataset preparation", "AI security"],
    link: "https://verityn.vercel.app/",
  },
};


const header = document.querySelector("[data-header]");
const progressBar = document.querySelector(".scroll-progress span");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");
const navLinks = [...document.querySelectorAll("[data-nav-link]")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const mobileLayout = window.matchMedia("(max-width: 760px)");

let framePending = false;
function updateScrollUI() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  header?.classList.toggle("is-scrolled", window.scrollY > 16);
  if (progressBar) progressBar.style.width = `${scrollable > 0 ? Math.min(100, window.scrollY / scrollable * 100) : 0}%`;
  framePending = false;
}
function requestScrollUpdate() {
  if (!framePending) { framePending = true; requestAnimationFrame(updateScrollUI); }
}
window.addEventListener("scroll", requestScrollUpdate, { passive: true });
window.addEventListener("resize", requestScrollUpdate, { passive: true });
updateScrollUI();

function setMenu(open) {
  menuToggle?.setAttribute("aria-expanded", String(open));
  menuToggle?.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  navigation?.classList.toggle("is-open", open);
}
menuToggle?.addEventListener("click", () => setMenu(menuToggle.getAttribute("aria-expanded") !== "true"));
navigation?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
    setMenu(false); menuToggle.focus();
  }
});
document.addEventListener("click", event => {
  if (mobileLayout.matches && !header?.contains(event.target)) setMenu(false);
});
mobileLayout.addEventListener("change", () => setMenu(false));

const fileButtons = [...document.querySelectorAll("[data-file-toggle]")];
fileButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const key = button.dataset.fileToggle;
    const open = button.getAttribute("aria-expanded") !== "true";
    fileButtons.forEach(tab => {
      const active = tab === button && open;
      const panel = document.getElementById(tab.getAttribute("aria-controls"));
      tab.setAttribute("aria-expanded", String(active));
      tab.querySelector(".file-number i").textContent = active ? "−" : "+";
      panel.hidden = !active;
      tab.closest(".file-card").classList.toggle("is-active", active);
    });
    document.querySelector("[data-file-status]").textContent =
      open ? button.querySelector("strong").textContent + " project file open." : "Project file closed.";
    if (open && mobileLayout.matches) {
      requestAnimationFrame(() => {
        const card = button.closest(".file-card");
        if (card.getBoundingClientRect().top < header.offsetHeight + 12) {
          card.scrollIntoView({ block: "start", behavior: reducedMotion.matches ? "instant" : "smooth" });
        }
      });
    }
    requestScrollUpdate();
  });
  button.addEventListener("keydown", event => {
    let next;
    if (event.key === "ArrowDown") next = (index + 1) % fileButtons.length;
    if (event.key === "ArrowUp") next = (index + fileButtons.length - 1) % fileButtons.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = fileButtons.length - 1;
    if (next !== undefined) { event.preventDefault(); fileButtons[next].focus(); }
  });
});

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const sectionId = entry.target.id === "projects" ? "work" : entry.target.id;
      navLinks.forEach(link => {
        if (link.getAttribute("href") === "#" + sectionId) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }
  }, { rootMargin: "-15% 0px -65% 0px", threshold: 0 });
  document.querySelectorAll("main > section[id]").forEach(section => sectionObserver.observe(section));
}

const dialog = document.querySelector("#case-dialog");
let caseTrigger = null;
let priorHash = "#work";
function openCase(key, trigger) {
  const item = projectData[key];
  if (!item || !dialog || dialog.open) return;
  caseTrigger = trigger || document.activeElement;
  priorHash = window.location.hash.startsWith("#case-") ? "#work" : window.location.hash || "#work";
  const fields = { kicker: item.kicker, title: item.title, summary: item.summary,
    challenge: item.challenge, contribution: item.contribution, outcome: item.outcome };
  Object.entries(fields).forEach(([field, value]) => {
    document.querySelector("[data-dialog-" + field + "]").textContent = value;
  });
  document.querySelector("[data-dialog-tags]").replaceChildren(...item.tags.map(tag => {
    const li = document.createElement("li"); li.textContent = tag; return li;
  }));
  const link = document.querySelector("[data-dialog-link]");
  link.hidden = !item.link;
  if (item.link) link.href = item.link;
  dialog.showModal();
  document.body.classList.add("dialog-open");
  history.replaceState(null, "", "#case-" + key);
}
function closeCase() { if (dialog?.open) dialog.close(); }
document.querySelectorAll("[data-open-case]").forEach(button => {
  button.addEventListener("click", () => openCase(button.dataset.openCase, button));
});
document.querySelector("[data-close-dialog]")?.addEventListener("click", closeCase);
dialog?.addEventListener("click", event => { if (event.target === dialog) closeCase(); });
dialog?.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
  history.replaceState(null, "", priorHash);
  caseTrigger?.focus({ preventScroll: true });
});
const initialCase = window.location.hash.match(/^#case-(.+)$/)?.[1];
if (initialCase && projectData[initialCase]) openCase(initialCase);

document.querySelector("[data-copy-link]")?.addEventListener("click", async () => {
  const status = document.querySelector("[data-copy-status]");
  try {
    if (!navigator.clipboard) throw new Error("Clipboard unavailable");
    await navigator.clipboard.writeText(window.location.href.split("#")[0]);
    status.textContent = "Portfolio link copied.";
  } catch {
    status.textContent = "Copy the address from your browser to share this portfolio.";
  }
});
document.querySelector("[data-year]").textContent = String(new Date().getFullYear());
