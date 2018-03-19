const fs = require('fs');

const fetchNotes = () => {
  let notes = [];
    try {
      const noteString = fs.readFileSync('notes-data.json');
      notes = JSON.parse(noteString);
    } catch(err){
    //  console.error('Errr', err)
    }
    return notes;
}

const saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}


const addNote = (title, body) => {
  const note = {
    title,
    body
  }

  const notes = fetchNotes();
  let duplicateNotes = notes.filter((note) => note.title === title);

  if(duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes)
    return note;
  }

}

const getAll = () => {
  return fetchNotes();
}

const getNote = (title) => {
  const notes = fetchNotes();
  return notes.filter((note) => note.title === title)[0];

}

const removeNote = (title) => {
  const notes = fetchNotes();
  const newNotes = notes.filter((note) => note.title !== title)
  saveNotes(newNotes)
  return notes.length !== newNotes.length;
}

const logNote = (note) => {
  console.log('----')
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
}

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
}
