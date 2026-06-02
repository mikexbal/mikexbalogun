import './style.css'
import data from './data.json';


function loadName(){
  let name = document.getElementById("name")
  name.innerText = data['basic-info'].name
}

function loadFooterYear() {
  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

loadName();
loadFooterYear();
initNavMenu();

function initNavMenu() {
  const navbar = document.getElementById("navbar");
  const toggle = document.getElementById("nav-toggle");
  const mobilePanel = document.getElementById("nav-menu-mobile");
  const mobileLinks = document.querySelectorAll(".nav-mobile-link");

  if (!navbar || !toggle || !mobilePanel) return;

  const setMenuOpen = (open) => {
    navbar.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("nav-menu-open", open);
  };

  toggle.addEventListener("click", () => {
    setMenuOpen(!navbar.classList.contains("is-open"));
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) setMenuOpen(false);
  });
}

function loadProjects() {
  const projectContainer = document.getElementById("project-container");

  data.projects.forEach((project, index) => {
    const projectNumber = String(index + 1).padStart(2, "0");
    const row = document.createElement("article");
    row.className =
      "project-row group grid grid-cols-1 gap-6 border-b border-slate-200 py-10 last:border-b-0 md:grid-cols-[3.5rem_1fr] md:gap-x-8 lg:grid-cols-[3.5rem_1fr_minmax(14rem,auto)] lg:gap-x-12";

    const indexEl = document.createElement("span");
    indexEl.className =
      "project-index font-['Funnel_Sans'] text-sm font-light text-slate-400 lg:pt-1";
    indexEl.textContent = projectNumber;

    const mainCol = document.createElement("div");
    mainCol.className = "project-main min-w-0";

    const title = document.createElement("h2");
    title.className =
      "project-title font-['Lexend_Deca'] text-2xl font-bold text-slate-900 transition-colors duration-500 ease-in-out group-hover:text-blue-500 md:text-3xl lg:text-4xl";
    title.textContent = project.title;

    const desc = document.createElement("p");
    desc.className =
      "mt-3 font-['Funnel_Sans'] text-base font-light leading-relaxed text-slate-600 md:text-lg";
    desc.textContent = project.desc;

    mainCol.appendChild(title);
    mainCol.appendChild(desc);

    const asideCol = document.createElement("div");
    asideCol.className =
      "project-aside flex flex-col gap-5 md:col-span-2 lg:col-span-1 lg:col-start-3 lg:items-end lg:pt-1";

    const techContainer = document.createElement("div");
    techContainer.className = "flex flex-wrap gap-2 lg:justify-end";

    project.tech.forEach((item) => {
      const tech = document.createElement("span");
      tech.className =
        "inline-flex items-center rounded-md bg-white px-2.5 py-1 font-['Funnel_Sans'] text-[0.65rem] font-medium uppercase tracking-wide text-slate-900 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)]";
      tech.textContent = item;
      techContainer.appendChild(tech);
    });

    asideCol.appendChild(techContainer);

    if (project.github.length > 0) {
      const repoLink = document.createElement("a");
      repoLink.href = project.github;
      repoLink.target = "_blank";
      repoLink.rel = "noopener noreferrer";
      repoLink.className =
        "inline-flex items-center gap-2 font-['Funnel_Sans'] text-xs font-semibold uppercase tracking-wide text-slate-900 transition-colors hover:text-blue-500";
      repoLink.innerHTML = `
        <i class="bi bi-github text-sm" aria-hidden="true"></i>
        <span>View Repository</span>
        <i class="bi bi-arrow-right text-sm" aria-hidden="true"></i>`;
      asideCol.appendChild(repoLink);
    }

    if (project.live.length > 0) {
      const liveLink = document.createElement("a");
      liveLink.href = project.live;
      liveLink.target = "_blank";
      liveLink.rel = "noopener noreferrer";
      liveLink.className =
        "inline-flex items-center gap-2 font-['Funnel_Sans'] text-xs font-semibold uppercase tracking-wide text-slate-900 transition-colors hover:text-blue-500";
      liveLink.innerHTML = `
        <i class="bi bi-box-arrow-up-right text-sm" aria-hidden="true"></i>
        <span>View Live</span>
        <i class="bi bi-arrow-right text-sm" aria-hidden="true"></i>`;
      asideCol.appendChild(liveLink);
    }

    row.appendChild(indexEl);
    row.appendChild(mainCol);
    row.appendChild(asideCol);
    projectContainer.appendChild(row);
  });
}

loadProjects();

const CAREER_ICONS = {
  work: "bi-briefcase",
  education: "bi-mortarboard",
};

function loadExperience() {
  const timeline = document.getElementById("experience-timeline");
  const careers = data.careers ?? [];

  careers.forEach((entry, index) => {
    const isLast = index === careers.length - 1;
    const iconClass = CAREER_ICONS[entry.type] ?? CAREER_ICONS.work;

    const row = document.createElement("div");
    row.className = "timeline-row flex gap-5 items-stretch";

    const axis = document.createElement("div");
    axis.className = "timeline-axis relative w-9 shrink-0 self-stretch";

    const icon = document.createElement("div");
    icon.className =
      "timeline-icon absolute top-6 left-1/2 z-10 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-lg border border-slate-200 bg-slate-50";
    icon.innerHTML = `<i class="bi ${iconClass} text-blue-500 text-base"></i>`;
    axis.appendChild(icon);

    if (!isLast) {
      const connector = document.createElement("div");
      connector.className =
        "timeline-connector absolute left-1/2 top-[2.625rem] -bottom-[4.125rem] w-px -translate-x-1/2 bg-slate-300";
      connector.setAttribute("aria-hidden", "true");
      axis.appendChild(connector);
    }

    const card = document.createElement("div");
    card.className =
      "experience-card flex-1 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] p-6";

    const header = document.createElement("div");
    header.className =
      "flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4";
    header.innerHTML = `
      <div>
        <h3 class="text-lg font-semibold text-slate-900">${entry.title}</h3>
        <p class="text-slate-500 font-light">${entry.organization}</p>
      </div>
      <p class="text-slate-500 text-sm font-light shrink-0 sm:text-right">${entry.timeline}</p>`;
    card.appendChild(header);

    if (entry.desc?.length > 0) {
      const descBlock = document.createElement("div");
      descBlock.className = "mt-4 border-t border-slate-200 pt-4";
      descBlock.innerHTML = `<p class="text-slate-500 text-sm font-light leading-relaxed">${entry.desc}</p>`;
      card.appendChild(descBlock);
    }

    row.appendChild(axis);
    row.appendChild(card);
    timeline.appendChild(row);
  });
}

loadExperience();

// async function loadData () {
//   try {
//     const res = await fetch('./data.json');
//     const data = await res.json();

//     console.log(data);

//     let projectContainer = getElementById("project-container");

//     data.projects.forEach(project => {
//       let div = document.createElement('div');
//       div.className = 'project-card';
//       div.innerHTML = 
//       `<div class="border-1 border-slate-300/80 rounded-md bg-white max-w-[800px] min-h-48 p-[20px] text-shadow-xs">
//                 <h1 class="text-xl font-semibold mb-1">${project.title}</h1>
//                 <p class="mb-2 text-slate-500 text-lg font-light">${project.desc}</p>
//                 <div class="technologies-container">
//                   <span
//                     class="inline-flex items-center rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-500"
//                     >Badge</span
//                   >
//                 </div>
//                 <div class="link-container flex flex-row mt-3 text-xl">
//                   <a href=""><i class="bi bi-box-arrow-up-right mr-4"></i></a>

//                   <a href=""><i class="bi bi-github"></i></a>
//                 </div>
//               </div>`
//     })

//     projectContainer.appendChild(div);


//   } catch (error) {
//     console.log(error);
//   }
// }

// loadData();



  


