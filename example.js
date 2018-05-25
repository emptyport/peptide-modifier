var pepMod = require("./index");

var modList = [
  {
    'name': 'Carbamidomethylation',
    'residues': ['C'],
    'type': 'fixed',
    'mass': 57.02
  },
  {
    'name': 'oxidation',
    'residues': ['M'],
    'type': 'variable'
  },
  {
    'name': 'n-terminal acetyl',
    'residues': ['[K'],
    'type': 'variable',
    'mass': 42
  }
];

var mods = pepMod.modify('KARATECAMPKID', modList, 2);
console.log(mods);



