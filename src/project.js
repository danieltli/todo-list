import { Note } from "./note";
import { setCurrentProject,projContent,saveProjects,content } from ".";

export class Project {
    constructor(name){
    this.name = name;
    this.notes = [];
    }

    addNote(note){
        this.notes.push(note);
        this.displayProject();
        saveProjects();
    }

    displayProject(){
        
       projContent.innerHTML = '';
        
        for(const note of this.notes) {
            const cardToAdd = note.makeCard();
            projContent.append(cardToAdd);
        }
        setCurrentProject(this.name);
        content.append(projContent);
    }
}