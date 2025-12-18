const weeks=[
{id:"w1",label:"Week 1",range:"Oct 21–24",title:"Pilot Launch & Foundational Validation",tagClass:"launch",tagLabel:"Launch",
metrics:[{label:"GMV",value:"GHC 379"},{label:"Transactions",value:"13 (12 successful)"}],
highlight:"First live end-to-end validation of ordering, payments and cashback with one cafeteria merchant and core Telecel project staff.",
detail:"Two active pilot days established that the core marketplace flows worked as expected and surfaced the first set of bugs and UX frictions to address in the next release."},
{id:"w2",label:"Week 2",range:"Oct 27–30",title:"Stability Release & Zero-Failure Week",tagClass:"stability",tagLabel:"Stability",
metrics:[{label:"GMV",value:"GHC 202"},{label:"Transactions",value:"10 (100% success)"}],
highlight:"Updated merchant and consumer APKs eliminated early issues and delivered a 100% transaction success rate.",
detail:"This week demonstrated the speed of iteration between Flood and Telecel teams, confirming that identified bugs could be resolved quickly without impacting the merchant experience."},
{id:"w3",label:"Week 3",range:"Nov 3–7",title:"Real User Engagement & GMV Uplift",tagClass:"growth",tagLabel:"Growth",
metrics:[{label:"GMV",value:"GHC 1,774"},{label:"Transactions",value:"45 (39 successful)"},{label:"Peak Order",value:"GHC 200"}],
highlight:"First phase of real user activity as non-project Telecel staff started adopting the service.",
detail:"On-field Flood support at the HQ cafeteria helped drive onboarding and build confidence with both users and merchant staff, resulting in a strong uplift in GMV and the highest single order to date."},
{id:"w4",label:"Week 4",range:"Nov 10–14",title:"Operational Maturity with Minimal Support",tagClass:"growth",tagLabel:"Adoption",
metrics:[{label:"GMV",value:"GHC 2,178"},{label:"Transactions",value:"47 (45 successful)"},{label:"AOV",value:"~40% ↑ vs prior"}],
highlight:"Merchant operated with almost zero on-ground support while still growing GMV and AOV.",
detail:"Despite Telecel security-related delays in rolling out the test app to a larger staff base, the cafeteria team comfortably handled digital orders, proving that the merchant app can be run independently at scale."},
{id:"w5",label:"Week 5",range:"Nov 17–20",title:"Highest GMV & Merchant Evangelism",tagClass:"peak",tagLabel:"Peak",
metrics:[{label:"GMV",value:"GHC 3,493"},{label:"Transactions",value:"69 successful"},{label:"Cashback",value:"Highest volume to date"}],
highlight:"Strongest commercial week of the pilot, with the merchant actively evangelising the product and converting new Telecel staff.",
detail:"Even though customers could still pay with cash, the merchant encouraged staff to order through the marketplace to access cashback and receipts—signalling strong merchant belief in the product’s value proposition."},
{id:"w6",label:"Week 6",range:"Nov 24–28",title:"Peak Daily Orders & Resilience",tagClass:"resilience",tagLabel:"Resilience",
metrics:[{label:"GMV",value:"GHC 2,760"},{label:"Transactions",value:"76 total (71 successful)"},{label:"Highlight",value:"Highest single-day volume"}],
highlight:"Despite network challenges and a cashback mis-credit incident, Week 6 recorded the highest number of successful transactions in a single day.",
detail:"Adding breakfast items opened earlier-day demand, proving catalog expansion can drive incremental volume even when the platform is under stress."},
{id:"w7",label:"Week 7",range:"Dec 1–5",title:"Throughput Breakout: Highest Weekly Volume",tagClass:"throughput",tagLabel:"Throughput",
metrics:[{label:"GMV",value:"GHC 3,155"},{label:"Transactions",value:"78 (76 successful)"},{label:"Run-rate",value:"26 orders/day (3 pilot days)"}],
highlight:"Week 7 delivered the highest combined weekly transaction volume, demonstrating sustained demand and operational confidence.",
detail:"With an average of 26 orders per active pilot day, this week validated that the marketplace can consistently handle higher throughput. It signals readiness for a broader staff cohort rollout and additional merchant onboarding without proportional increases in field support."},
{id:"w8",label:"Week 8",range:"Dec 8–12",title:"Sustained Demand at High GMV Levels",tagClass:"growth",tagLabel:"Sustain",
metrics:[{label:"GMV",value:"GHC 3,072"},{label:"Transactions",value:"70 (67 successful)"},{label:"Rank",value:"4th highest GMV"}],
highlight:"Week 8 reinforced repeatable performance—remaining among the top weeks for both GMV and volume.",
detail:"After the Week 7 peak, Week 8 maintained strong transactional momentum. This consistency is an important signal for investors and leadership: growth is not purely ‘event-driven’ but can be sustained through routine usage once users and merchants internalize the flow."},
{id:"w9",label:"Week 9",range:"Dec 15–19",title:"Pilot Closeout: Rewards, Resilience & Highest GMV",tagClass:"closeout",tagLabel:"Closeout",
metrics:[{label:"GMV",value:"GHC 3,561"},{label:"Transactions",value:"77 (75 successful)"},{label:"Milestone",value:"Top 10 users rewarded (Dec 16)"}],
highlight:"Closing week reinforced engagement via recognition, while still delivering perfect success rates despite reduced staff presence.",
detail:"Top users were rewarded on Dec 16, strengthening goodwill and encouraging future retention. Even with many staff on annual leave and fewer departments on-site, the pilot still recorded highest GMV completed—an encouraging end-state for the pilot phase."}
];

function createTimelineAxis(){
  const axis=document.querySelector(".timeline-axis");
  const line=document.createElement("div");line.className="timeline-line";axis.appendChild(line);
  const container=document.createElement("div");container.className="timeline-points";
  weeks.forEach((week,i)=>{
    const point=document.createElement("button");
    point.type="button";point.className="timeline-point";point.dataset.weekId=week.id;
    if(i===0) point.classList.add("active");
    const dot=document.createElement("div");dot.className="timeline-dot";
    const label=document.createElement("div");label.className="timeline-label";label.textContent=week.label;
    const range=document.createElement("div");range.className="timeline-range";range.textContent=week.range;
    point.appendChild(dot);point.appendChild(label);point.appendChild(range);
    point.addEventListener("click",()=>setActiveWeek(week.id));
    container.appendChild(point);
  });
  axis.appendChild(container);
}

function renderCards(week){
  const root=document.getElementById("timelineCards");
  root.innerHTML="";
  const metricsCard=document.createElement("article");metricsCard.className="timeline-card";
  const metricsTag=document.createElement("div");metricsTag.className=`timeline-tag ${week.tagClass}`;metricsTag.textContent=week.tagLabel;
  metricsCard.appendChild(metricsTag);
  const h3=document.createElement("h3");h3.textContent=week.title;metricsCard.appendChild(h3);
  const meta=document.createElement("p");meta.className="timeline-meta";meta.textContent=`${week.label} • ${week.range}`;metricsCard.appendChild(meta);
  const pillRow=document.createElement("div");pillRow.className="pill-row";
  week.metrics.forEach(m=>{
    const pill=document.createElement("div");pill.className="metric-pill";
    const l=document.createElement("span");l.textContent=m.label;
    const v=document.createElement("span");v.className="value";v.textContent=m.value;
    pill.appendChild(l);pill.appendChild(v);pillRow.appendChild(pill);
  });
  metricsCard.appendChild(pillRow);
  const highlight=document.createElement("p");highlight.textContent=week.highlight;metricsCard.appendChild(highlight);

  const narrativeCard=document.createElement("article");narrativeCard.className="timeline-card";
  const nTag=document.createElement("div");nTag.className="timeline-tag";nTag.textContent="Narrative";narrativeCard.appendChild(nTag);
  const nh3=document.createElement("h3");nh3.textContent="Executive Narrative";narrativeCard.appendChild(nh3);
  const nmeta=document.createElement("p");nmeta.className="timeline-meta";nmeta.textContent="What this week contributed to confidence, learning and go-to-market readiness.";narrativeCard.appendChild(nmeta);
  const detail=document.createElement("p");detail.textContent=week.detail;narrativeCard.appendChild(detail);

  root.appendChild(metricsCard);
  root.appendChild(narrativeCard);
}

function setActiveWeek(weekId){
  const week=weeks.find(w=>w.id===weekId); if(!week) return;
  document.querySelectorAll(".timeline-point").forEach(el=>el.classList.remove("active"));
  const active=document.querySelector(`.timeline-point[data-week-id="${weekId}"]`);
  if(active){
    active.classList.add("active");
    const container=document.querySelector(".timeline-axis");
    const rect=active.getBoundingClientRect();
    const cRect=container.getBoundingClientRect();
    container.scrollLeft += (rect.left - cRect.left - cRect.width/2 + rect.width/2);
  }
  renderCards(week);
}

document.addEventListener("DOMContentLoaded",()=>{
  createTimelineAxis();
  renderCards(weeks[0]);
});
