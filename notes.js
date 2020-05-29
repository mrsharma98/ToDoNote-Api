const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
  return "Your notes...";
};

// Adding a note
const addNote = (title, body) => {
  const notes = loadNotes();

  //   const duplicateNotes = notes.filter(function (note) {
  //     return note.title === title;
  //   });
  //
  // const duplicateNotes = notes.filter((note) => note.title === title);
  // returns array of matches
  // As this aboves cods will loop through every item
  // it will not stop when it finds the match
  // so to over come this, we are using find()

  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    //console.log(notes);
    saveNotes(notes);
    console.log("New note added.");
  } else {
    console.log("Note title taken!");
  }
};

// Removing a note
const removeNote = (title) => {
  const notes = loadNotes();

  // making newArray thata doesnot contain the removed note
  const newArray = notes.filter((note) => note.title !== title);

  if (notes.length > newArray.length) {
    console.log(chalk.green.inverse("Note removed."));
    saveNotes(newArray);
  } else {
    console.log(chalk.red.inverse("No node found."));
  }
};

// Listing Notes
const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse("Your notes:"));

  notes.forEach((note) => console.log(note.title));
};

// Reading Notes
const readNote = (title) => {
  const notes = loadNotes();
  const data = notes.find((note) => note.title === title);

  if (data) {
    console.log(chalk.inverse(data.title) + ": " + data.body);
  } else {
    console.log(chalk.red.inverse("No note found.."));
  }
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

//module.exports = getNotes;
module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
