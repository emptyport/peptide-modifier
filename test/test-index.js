var pepMod = require('../index');
var test = require('tape');

test('Only fixed modifications works', function(t) {
  var modList = [
    {
      'name': 'carbamidomethylation',
      'residues': ['C'],
      'type': 'fixed',
      'mass': 57.02
    }
  ];
  var mods = pepMod.modify('THECATISMAD', modList, 0);
  t.equal(mods.length, 1, 'Modification length is correct');
  t.equal(mods[0][0]['position'], 3, 'Modification is in correct place');
  t.end();
});

test('Only variable modifications works', function(t) {
  var modList = [
    {
      'name': 'oxidation',
      'residues': ['M'],
      'type': 'variable',
      'mass': 16
    }
  ];
  var mods = pepMod.modify('ILOVEMOM', modList, 2);
  t.equal(mods.length, 4, 'Modification length is correct');
  
  var count = 0;
  for(var i=0; i<mods.length; i++) {
    var modomer = mods[i];
    if(modomer.length === 2) {
      t.equal(modomer[0]['position'], 5, 'First position correct');
      t.equal(modomer[1]['position'], 7, 'Second position correct');
    }
    if(modomer.length === 1) {
      count++;
    }
  }
  t.equal(mods[0][3], undefined, 'Last mod is empty');
  t.equal(count, 2, 'Two entries with single modification site');
  t.end();
});

test('Setting the number of variable modifications works', function(t) {

  t.end();
});

