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

function loadProjects(){
  const projectContainer = document.getElementById("project-container");

  data.projects.forEach((project, index) => {
    const projectNumber = String(index + 1).padStart(2, "0");
    const projectCard = document.createElement("div");

    projectCard.className =
      "rounded-xl bg-white border border-slate-200/90 shadow-sm p-6 flex flex-col";
    projectCard.innerHTML = `
      <span class="text-blue-400 text-xs font-normal mb-3">${projectNumber}</span>
      <h1 class="text-xl font-bold text-slate-900 mb-2">${project.title}</h1>
      <p class="text-slate-500 text-sm leading-relaxed font-light mb-5 flex-grow">${project.desc}</p>`;

    const techContainer = document.createElement("div");
    techContainer.className = "technologies-container flex flex-wrap gap-2";

    project.tech.forEach((item) => {
      const tech = document.createElement("span");
      tech.className =
        "inline-flex items-center rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1 text-xs font-medium text-blue-500";
      tech.innerText = item;
      techContainer.appendChild(tech);
    });

    projectCard.appendChild(techContainer);

    const linkContainer = document.createElement("div");
    linkContainer.className = "link-container flex flex-row mt-3 text-base text-slate-400";

    if (project.live.length > 0) {
      const liveLink = document.createElement("a");
      liveLink.target = "_blank";
      liveLink.href = project.live;

      const liveIcon = document.createElement("i");
      liveIcon.className = "bi bi-box-arrow-up-right mr-4";

      liveLink.appendChild(liveIcon);
      linkContainer.appendChild(liveLink);
    }

    if (project.github.length > 0) {
      const gitLink = document.createElement("a");
      gitLink.target = "_blank";
      gitLink.href = project.github;

      const gitIcon = document.createElement("i");
      gitIcon.className = "bi bi-github";

      gitLink.appendChild(gitIcon);
      linkContainer.appendChild(gitLink);
    }

    if (linkContainer.childElementCount > 0) {
      projectCard.appendChild(linkContainer);
    }

    projectContainer.appendChild(projectCard);
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



  


