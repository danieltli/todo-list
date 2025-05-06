import { format, compareAsc } from "date-fns";
import { currentProject, dialog,projects,saveProjects } from ".";
import { deleteNote } from "./btnClick";
import { renderMoveMenu } from "./dom";

export class Note {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.date = Date();
    this.done = false;
    this.id = crypto.randomUUID();
  }

  makeCard() {
    const card = document.createElement("div");
    card.className = "note-card";
    card.innerHTML = `<h4 class = note-title>${this.title}</h4><br>
    <p class = "description">${this.description} </p><br>
    <p class = "due-date">Finish by ${this.dueDate}</p>
    `;
    const moveBtn = document.createElement("button");
    moveBtn.textContent = "Move to another project";
    moveBtn.dataset.noteId = this.id;
    moveBtn.addEventListener("click", () => {
      renderMoveMenu(currentProject, this.id);
    });
    card.append(moveBtn);
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove Note";
    removeBtn.dataset.noteId = this.id;
    removeBtn.addEventListener("click", deleteNote);
    card.append(removeBtn);
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => this.editNote());
    card.append(editBtn);
    const doneCheckbox = document.createElement("input");
doneCheckbox.type = "checkbox";
const checkboxLabel = document.createElement("label");
const checkSection = document.createElement("div");
checkSection.className = "check-section";
checkboxLabel.textContent = "Done";
doneCheckbox.className = "done-check";
checkSection.appendChild(checkboxLabel);
checkSection.appendChild(doneCheckbox);
card.append(checkSection);
    return card;
  }

  markDone() {
    this.done = true;
  }

  editNote() {
    dialog.innerHTML = `<p> Edit a Reminder</p>
<button id="closeBtn">&times;</button>
<form id = "noteField">
    <fieldset>
        <div class="note-form">
            <label for="title"> Title</label>
            <input type="text" id="title" required>
            <label for="description">Description</label>
            <input type= "text" id="description" required>
            <label for="due-date" required>Due Date</label>
            <input type="date" id="due-date">
            <label for="priority">Priority</label>
            <select id="priority" required>
                <option value="high"> High</option>
                <option value="medium"> Medium</option>
                <option value="low"> Low</option>
            </select>
            <button type="submit" id="note-submit">Submit</button>
        </div>
    </fieldset>
</form>`;
    dialog.showModal();
    document.getElementById("title").value = this.title;
    document.getElementById("description").value = this.description;
    document.getElementById("due-date").value = this.dueDate;
    document.getElementById("priority").value = this.priority;
    const form = document.getElementById("noteField");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.title = document.getElementById("title").value;
      this.description = document.getElementById("description").value;
      this.dueDate = document.getElementById("due-date").value;
      this.priority = document.getElementById("priority").value;

      dialog.close();
      projects.get(currentProject).displayProject(); // re-render to reflect changes
    });
    document
      .getElementById("closeBtn")
      .addEventListener("click", () => dialog.close());
    saveProjects();
  }
}
