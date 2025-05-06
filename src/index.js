import { Note } from "./note";

import { Project } from "./project";

import { createHome,addButtons,renderSidebar} from "./dom";

import './style.css';


export function setCurrentProject(name) {
    currentProject = name;
}
function loadProjects() {
    const data = localStorage.getItem("projects");
if (data) {
  const parsed = new Map(JSON.parse(data)); // string → array → Map
  parsed.forEach((projectData, name) => {
    // rehydrate Project instance
    const restoredProject = Object.assign(new Project(), projectData);

    // rehydrate Note instances
    restoredProject.notes = projectData.notes.map(n =>
      Object.assign(new Note(), n)
    );

    projects.set(name, restoredProject);
  });
}
  }

export function saveProjects() {
    const serialized = JSON.stringify(Array.from(projects.entries()));
    localStorage.setItem("projects", serialized);
  }


export const dialog = document.createElement("dialog");
export const projects = new Map();
loadProjects();
projects.set("default", new Project("default"));
export let currentProject = "default";
export const content = document.createElement("div");
content.id = "content-container";
export const projContent = document.createElement("div");
projContent.id = "projContent";
projects.get(currentProject).displayProject();
createHome();
addButtons();  
renderSidebar();

