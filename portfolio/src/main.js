import './style.css'
import data from './data.json';


function loadName(){
  let name = document.getElementById("name")
  name.innerText = data['basic-info'].name
}

loadName();

function loadProjects(){
  let projectContainer = document.getElementById("project-container");

  data.projects.forEach(project => {
    //console.log(project)
    let projectCard = document.createElement("div")
    
    projectCard.className = "border-1 border-slate-300/80 rounded-md bg-white max-w-[800px] min-h-48 p-[20px] text-shadow-xs mb-3"
    projectCard.innerHTML = 
    `<h1 class="text-xl font-semibold mb-1">${project.title}</h1>
    <p class="mb-2 text-slate-500 text-lg font-light">${project.desc}</p>`

    let techContainer = document.createElement("div");

    project.tech.forEach(technology => {
      console.log(technology);
    })

    project.tech.forEach(item => {
      let tech = document.createElement("span")
      tech.className = "inline-flex items-center rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-500 mr-2";
      tech.innerText = `${item}`

      techContainer.appendChild(tech);

    })

    projectCard.appendChild(techContainer);

    let linkContainer = document.createElement("div");
    linkContainer.className = "flex flex-row mt-3 text-xl"
    
    if (project.live.length > 0){
      let liveLink = document.createElement("a")
      liveLink.target = "_blank"
      liveLink.href = `${project.live}`
  
    let liveIcon = document.createElement("i")
    liveIcon.className = "bi bi-box-arrow-up-right mr-4"

    liveLink.appendChild(liveIcon)

    linkContainer.appendChild(liveLink)
      
    }
    

    if (project.github.length > 0) {
      let gitLink = document.createElement("a")
      gitLink.target = "_blank"
      gitLink.href = `${project.github}`

      let gitIcon = document.createElement("i")
      gitIcon.className = "bi bi-github"

      gitLink.appendChild(gitIcon)

      linkContainer.appendChild(gitLink)
      projectCard.appendChild(linkContainer)
      projectContainer.appendChild(projectCard)
    }

    projectCard.appendChild(linkContainer)
    projectContainer.appendChild(projectCard)
  
  })

  projectSection.appendChild(projectContainer)


}

loadProjects();





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



  


