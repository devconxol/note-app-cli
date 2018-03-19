const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
  describe: 'Title of the note',
  demand: true,
  alias: 't'
}

const bodyOptions =  {
  describe: 'Body of the note',
  demand: true,
  alias: 'b'
}

const command = yargs
  .command('add', 'Add new notes', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all notes')
  .command('read','Get a single note', {
    title: titleOptions
  })
  .command('remove', 'Delete a note', {
    title: titleOptions
  })
  .help().argv._[0];
const argv = yargs.argv;
const title = argv.title;
const body = argv.body;




if(command === 'add'){
     console.log('Adding new note');
     const note = notes.addNote(title, body);
     if(note !== undefined) {
       console.log('Note successfully saved....');
       notes.logNote(note);
     } else {
       console.log(`Duplicate title: Note ${title} Already exist`);
     }
} else if(command === 'list'){
  const allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} notes`);
  allNotes.forEach((note) => notes.logNote(note));
}  else if(command === 'read'){
    const note = notes.getNote(title);
    if(note){
      console.log('Note Found');
      notes.logNote(note);
    } else {
      console.log('Not not found')
    }
} else if(command === 'remove'){
  const noteDeleted =  notes.removeNote(title);
  const message = noteDeleted ? `${title} successfully deleted` : 'Note not found';
  console.log(message);
}  else {
    console.log('Not recognize')
}
