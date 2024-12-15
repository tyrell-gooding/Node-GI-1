const notes = require("./note.js");
const yargs = require("yargs");
const chalk = require("chalk");
// const { type } = require("os");
// import notes from "./note.js";
// import yargs from "yargs";
// import { hideBin } from "yargs/helpers";
// import chalk from "chalk";

// const greenMsg = chalk.green.bold("success");
// console.log(greenMsg);

yargs.version("1.1.0");

yargs.command({
  command: "add",
  describe: "adding  a note",
  builder: {
    title: {
      describe: "note title",
      demandOption: true,
      type: "string",
    },

    body: {
      describe: "note body",
      demandOption: true,
      type: "string",
    },
  },

  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  builder: {
    title: {
      describe: "title",
      demandOption: true,
      type: "string",
    },
  },
  describe: "remove a note",
  handler(argv) {
    notes.removeNote(argv.title);
  },
});
// notes.addNote("title", "body");
// yargs(hideBin(process.argv))
//   .command(
//     "add <title> <body>", // Define command with arguments
//     "Add a new note",
//     (yargs) => {
//       yargs
//         .positional("title", {
//           describe: "Note title",
//           type: "string",
//         })
//         .positional("body", {
//           describe: "Note body",
//           type: "string",
//         });
//     },
//     (argv) => {
//       notes.addNote(argv.title, argv.body); // Call the addNote function with the arguments
//     }
//   )

// Remove command
// .command(
//   "remove <title>", // Define command with argument
//   "Remove a note",
//   (yargs) => {
//     yargs.positional("title", {
//       describe: "Note title",
//       type: "string",
//     });
//   },
//   (argv) => {
//     notes.removeNote(argv.title); // Call the removeNote function with the title
//   }
// );

yargs.command({
  command: "list",
  // builder: {
  //   title: {
  //     describe: "list notes",
  //     demandOption: true,
  //     type: "string",
  //   },
  // },
  describe: "list note",
  handler(argv) {
    notes.listNotes(argv.title);
  },
});

yargs.command({
  command: "read",
  builder: {
    title: {
      describe: "title",
      demandOption: true,
      type: "string",
    },
  },
  describe: "read note",
  handler(argv) {
    notes.readNotes(argv.title);
  },
});
// console.log(process.argv);
yargs.parse();

// const notesJSON = JSON.stringify(notes);
// fs.writeFileSync("notes.json", notes);
