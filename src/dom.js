import { createNote, createProject } from "./btnClick";
import { dialog, saveProjects,projContent,content } from ".";
import { projects } from ".";
import { Note } from "./note";
import { Project } from "./project";

export function createHome() {
  const container = document.getElementById("container");
  const header = document.createElement("div");
  header.className = "header";
  header.textContent = "My To-Do List";

  dialog.id = "dialog";
  container.append(header);
  container.append(dialog);
  container.append(content);
}

export function addButtons() {
  const btnContent = document.createElement("div");
  btnContent.id = "btnContent";
  const addNoteBtn = document.createElement("button");
  addNoteBtn.textContent = "Add a Note to this project";
  addNoteBtn.addEventListener("click", createNote);
  btnContent.append(addNoteBtn);
  const addProjectBtn = document.createElement("button");
  addProjectBtn.textContent = "Add a project";
  addProjectBtn.addEventListener("click", createProject);
  btnContent.append(addProjectBtn);
  content.append(btnContent);
}

export function renderSidebar() {
  const sidebar = document.createElement("div");
  sidebar.className = "sidebar";
  projects.forEach((Project, Note) => {
    const btn = document.createElement("button");
    btn.textContent = Project.name;
    btn.addEventListener("click", () => Project.displayProject());
    sidebar.append(btn);
  });
  container.append(sidebar);
}

export function renderMoveMenu(currentProject,noteId) {
  dialog.innerHTML = `<button id="closeBtn">&times;</button>`;
  const closeBtn = document.getElementById("closeBtn");
  closeBtn.addEventListener("click", () => dialog.close());
  projects.forEach((Project, Note) => {
    const btn = document.createElement("button");
    btn.textContent = Project.name;
    btn.addEventListener("click",() => {
        moveProject(currentProject,Project.name,noteId);
        dialog.close();
  });
    dialog.append(btn);
  });
  dialog.showModal();
}

export function moveProject(fromProject,toProject,noteId){
    const from = projects.get(fromProject);
    const to = projects.get(toProject);
    const noteIndex = from.notes.findIndex(note => note.id === noteId);
    if (noteIndex === -1) return;

    const [note] = from.notes.splice(noteIndex, 1);
    to.notes.push(note);
    projects.get(fromProject).displayProject();
    saveProjects();
}

