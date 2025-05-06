import { Note } from "./note";
import { Project } from "./project";
import { projects, currentProject, dialog, saveProjects } from ".";
import { renderSidebar } from "./dom";

const noteMsg = `<p> Create a Reminder</p>
<button id="closeBtn">&times;</button>
<form id = "noteField">
    <fieldset>
        <div class="note-form">
            <label for="title"> Title</label>
            <input type="text" id="title" required>
            <label for="description">Description</label>
            <input type=text" id="description" required>
            <label for="due-date" required>Due Date</label>
            <input type=text" id="due-date">
            <label for="priority">Priority</label>
            <select id="priority" required>
                <option value="high"> High</option>
                <option value="medium"> Medium</option>
                <option value="high"> Low</option>
            </select>
            <button type="submit" id="note-submit">Submit</button>
        </div>
    </fieldset>
</form>`;


export function createNote() {
  dialog.innerHTML = `${noteMsg}`;
  const closeBtn = document.getElementById("closeBtn");
  closeBtn.addEventListener("click", () => closeDialog(dialog));
  container.append(dialog);
  dialog.showModal();
  const noteSubmit = document.getElementById("noteField");
  noteSubmit.addEventListener("submit",submitNote);
}

export function closeDialog(dialog) {
  dialog.close();
}

export function submitNote(e){
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("due-date").value;
    const priority = document.getElementById("priority").value;
    let noteToAdd = new Note(title, description, dueDate, priority);
    projects.get(currentProject).addNote(noteToAdd);
    console.log(dueDate);
    dialog.close();
}

export function createProject(){
    dialog.innerHTML = `
    <button id="closeBtn">&times;</button>
    <form id = "projectField">
    <label for = "project-name">Name of project</label>
    <input type = "text" id = "project-name" required>
    <button type = "submit" id = "project-submit">Submit</button>
    </form>`;
    const closeBtn = document.getElementById("closeBtn");
    closeBtn.addEventListener("click", () => closeDialog(dialog));
    container.append(dialog);
    dialog.showModal();
    const submitProject = document.getElementById("projectField");
    submitProject.addEventListener("submit",projectSubmit);
}


export function projectSubmit(e){
    e.preventDefault();
    const name = document.getElementById("project-name").value;
    projects.set(name,new Project(`${name}`));
    renderSidebar();
    dialog.close();
}

export function deleteNote(e){
    const noteId = e.target.dataset.noteId;
    console.log(noteId);
    console.log(e.target.dataset.noteId)
    const project = projects.get(currentProject);
    project.notes = project.notes.filter(note => note.id !== noteId);
    projects.get(currentProject).displayProject();
    saveProjects();
    
}