var pepMod = require("./index");

var modList = [
  {
    'name': 'carb',
    'residues': ['C'],
    'type': 'fixed',
    'mass': 57.02
  },
  {
    'name': 'oxidation',
    'residues': ['M'],
    'type': 'variable',
  },
  {
    'name': 'n-terminal acetyl',
    'residues': ['[A'],
    'type': 'variable',
    'mass': 10.5
  },
  {
    'name': 'oxidation',
    'residues': [']'],
    'type': 'variable'
  }

];

var mods = pepMod.modify('ACMAALMNP', modList, 2);
console.log(mods);



