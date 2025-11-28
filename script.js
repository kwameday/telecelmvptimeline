// Basic timeline data model
const weeks = [
  {
    id: "w1",
    label: "Week 1",
    range: "Oct 21–24",
    title: "Pilot Launch & Foundational Validation",
    tagClass: "launch",
    tagLabel: "Launch",
    metrics: [
      { label: "GMV", value: "GHC 379" },
      { label: "Transactions", value: "13 (12 successful)" }
    ],
    highlight: "First live end-to-end validation of ordering, payments and cashback with one cafeteria merchant and core Telecel project staff.",
    detail:
      "Two active pilot days established that the core marketplace flows worked as expected and surfaced the first set of bugs and UX frictions to address in the next release."
  },
  {
    id: "w2",
    label: "Week 2",
    range: "Oct 27–30",
    title: "Stability Release & Zero-Failure Week",
    tagClass: "stability",
    tagLabel: "Stability",
    metrics: [
      { label: "GMV", value: "GHC 202" },
      { label: "Transactions", value: "10 (100% success)" }
    ],
    highlight:
      "Updated merchant and consumer APKs eliminated early issues and delivered a 100% transaction success rate.",
    detail:
      "This week demonstrated the speed of iteration between Flood and Telecel teams, confirming that identified bugs could be resolved quickly without impacting the merchant experience."
  },
  {
    id: "w3",
    label: "Week 3",
    range: "Nov 3–7",
    title: "Real User Engagement & GMV Uplift",
    tagClass: "growth",
    tagLabel: "Growth",
    metrics: [
      { label: "GMV", value: "GHC 1,774" },
      { label: "Transactions", value: "45 (39 successful)" },
      { label: "Peak Order", value: "GHC 200" }
    ],
    highlight:
      "First phase of real user activity as non-project Telecel staff started adopting the service.",
    detail:
      "On-field Flood support at the HQ cafeteria helped drive onboarding and build confidence with both users and merchant staff, resulting in a strong uplift in GMV and the highest single order to date."
  },
  {
    id: "w4",
    label: "Week 4",
    range: "Nov 10–14",
    title: "Operational Maturity with Minimal Support",
    tagClass: "growth",
    tagLabel: "Adoption",
    metrics: [
      { label: "GMV", value: "GHC 2,178" },
      { label: "Transactions", value: "47 (45 successful)" },
      { label: "AOV", value: "~40% ↑ vs prior" }
    ],
    highlight:
      "Merchant operated with almost zero on-ground support while still growing GMV and AOV.",
    detail:
      "Despite Telecel security-related delays in rolling out the test app to a larger staff base, the cafeteria team comfortably handled digital orders, proving that the merchant app can be run independently at scale."
  },
  {
    id: "w5",
    label: "Week 5",
    range: "Nov 17–20",
    title: "Highest GMV & Merchant Evangelism",
    tagClass: "peak",
    tagLabel: "Peak",
    metrics: [
      { label: "GMV", value: "GHC 3,493" },
      { label: "Transactions", value: "69 successful" },
      { label: "Cashback", value: "Highest volume to date" }
    ],
    highlight:
      "This was the strongest commercial week of the pilot, with the merchant actively evangelising the product.",
    detail:
      "Even though customers could still pay with cash, the merchant encouraged staff to order through the marketplace to access cashback and receipts, signalling strong merchant belief in the product and its benefits."
  },
  {
    id: "w6",
    label: "Week 6",
    range: "Nov 24–28",
    title: "Peak Daily Orders & Resilience",
    tagClass: "resilience",
    tagLabel: "Resilience",
    metrics: [
      { label: "GMV", value: "GHC 2,760" },
      { label: "Transactions", value: "76 total (71 successful)" },
      { label: "Highlight", value: "Highest single-day transactions" }
    ],
    highlight:
      "Despite network challenges and a cashback mis-credit incident, Week 6 recorded the highest number of successful transactions in a single day.",
    detail:
      "Adding breakfast items to the catalog opened a new demand window earlier in the day, proving that assortment expansion can directly drive additional volume and engagement even when the platform is under stress."
  }
];

function createTimelineAxis() {
  const axis = document.querySelector(".timeline-axis");
  const line = document.createElement("div");
  line.className = "timeline-line";
  axis.appendChild(line);

  const container = document.createElement("div");
  container.className = "timeline-points";

  weeks.forEach((week, index) => {
    const point = document.createElement("button");
    point.type = "button";
    point.className = "timeline-point";
    point.dataset.weekId = week.id;

    if (index === 0) {
      point.classList.add("active");
    }

    const dot = document.createElement("div");
    dot.className = "timeline-dot";

    const label = document.createElement("div");
    label.className = "timeline-label";
    label.textContent = week.label;

    const range = document.createElement("div");
    range.className = "timeline-range";
    range.textContent = week.range;

    point.appendChild(dot);
    point.appendChild(label);
    point.appendChild(range);

    point.addEventListener("click", () => setActiveWeek(week.id));

    container.appendChild(point);
  });

  axis.appendChild(container);
}

function renderCards(week) {
  const cardsRoot = document.getElementById("timelineCards");
  cardsRoot.innerHTML = "";

  // Metrics card
  const metricsCard = document.createElement("article");
  metricsCard.className = "timeline-card";

  const metricsTag = document.createElement("div");
  metricsTag.className = `timeline-tag ${week.tagClass}`;
  metricsTag.textContent = week.tagLabel;
  metricsCard.appendChild(metricsTag);

  const h3Metrics = document.createElement("h3");
  h3Metrics.textContent = week.title;
  metricsCard.appendChild(h3Metrics);

  const meta = document.createElement("p");
  meta.className = "timeline-meta";
  meta.textContent = `${week.label} • ${week.range}`;
  metricsCard.appendChild(meta);

  const pillRow = document.createElement("div");
  pillRow.className = "pill-row";

  week.metrics.forEach((m) => {
    const pill = document.createElement("div");
    pill.className = "metric-pill";

    const label = document.createElement("span");
    label.textContent = m.label;

    const value = document.createElement("span");
    value.className = "value";
    value.textContent = m.value;

    pill.appendChild(label);
    pill.appendChild(value);
    pillRow.appendChild(pill);
  });

  metricsCard.appendChild(pillRow);

  const highlight = document.createElement("p");
  highlight.textContent = week.highlight;
  metricsCard.appendChild(highlight);

  // Narrative card
  const narrativeCard = document.createElement("article");
  narrativeCard.className = "timeline-card";

  const narrativeTag = document.createElement("div");
  narrativeTag.className = "timeline-tag";
  narrativeTag.textContent = "Narrative";
  narrativeCard.appendChild(narrativeTag);

  const h3Narrative = document.createElement("h3");
  h3Narrative.textContent = "Executive Narrative";
  narrativeCard.appendChild(h3Narrative);

  const metaNarrative = document.createElement("p");
  metaNarrative.className = "timeline-meta";
  metaNarrative.textContent =
    "What this week contributed to confidence, learning and go-to-market readiness.";
  narrativeCard.appendChild(metaNarrative);

  const detail = document.createElement("p");
  detail.textContent = week.detail;
  narrativeCard.appendChild(detail);

  cardsRoot.appendChild(metricsCard);
  cardsRoot.appendChild(narrativeCard);
}

function setActiveWeek(weekId) {
  const week = weeks.find((w) => w.id === weekId);
  if (!week) return;

  document
    .querySelectorAll(".timeline-point")
    .forEach((el) => el.classList.remove("active"));

  const activePoint = document.querySelector(
    `.timeline-point[data-week-id="${weekId}"]`
  );
  if (activePoint) {
    activePoint.classList.add("active");
    // Ensure visible in scroll container
    const container = document.querySelector(".timeline-axis");
    const rect = activePoint.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const offset = rect.left - containerRect.left - containerRect.width / 2 + rect.width / 2;
    container.scrollLeft += offset;
  }

  renderCards(week);
}

document.addEventListener("DOMContentLoaded", () => {
  createTimelineAxis();
  renderCards(weeks[0]);
});
