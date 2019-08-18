#!/usr/bin/env node
const Pencil = require('./Pencil');

var repl = require("repl");

var replServer = repl.start({
  prompt: "pencil-durability-kata > ",
});

replServer.context.Pencil = Pencil;