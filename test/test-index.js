var pepMod = require('../index');
var test = require('tape');

test('Using only fixed modifications works', function(t) {
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

test('Using only variable modifications works', function(t) {
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
  var modList = [
    {
      'name': 'oxidation',
      'residues': ['S'],
      'type': 'variable',
      'mass': 16
    }
  ];

  var mods = pepMod.modify('MASSSPEC', modList, 0);
  t.equal(mods.length, 1, '0 mods works');
  mods = pepMod.modify('MASSSPEC', modList, 1);
  t.equal(mods.length, 4, '1 mod works');
  mods = pepMod.modify('MASSSPEC', modList, 2)
  t.equal(mods.length, 7, '2 mods works');
  mods = pepMod.modify('MASSSPEC', modList, 3);
  t.equal(mods.length, 8, '3 mods works');
  t.end();
});

test('Testing unimod integration', function(t) {
  var modListCustom = [
    {
      'name': 'oxidation',
      'residues': ['M'],
      'type': 'variable',
      'mass': 16
    }
  ];
  var modListUnimod = [
    {
      'name': 'oxidation',
      'residues': ['M'],
      'type': 'variable',
    }
  ];
  var modsCustom = pepMod.modify('MAYBE', modListCustom, 1);
  var modsUnimod = pepMod.modify('MAYBE', modListUnimod, 1);
  t.equal(modsCustom[0][0]['mass'], 16, 'Can set custom masses');
  t.equal(modsUnimod[0][0]['mass'], 15.994915, 'Can use Unimod mass');

  t.end();
});

test('N-terminal modifications', function(t) {
  var modList = [
    {
      'name': 'N-acetyl',
      'residues': ['['],
      'type': 'fixed',
      'mass': 42
    }
  ];
  
  var mods = pepMod.modify('ACETYL', modList, 0);
  t.equal(mods.length, 1, 'Modification added');
  t.equal(mods[0][0]['position'], 0, 'Modification on N-terminus');

  modList = [
    {
      'name': 'N-acetyl of K',
      'residues': ['[K'],
      'type': 'fixed',
      'mass': 42
    }
  ];
  mods = pepMod.modify('KARATEKID', modList, 0);
  t.equal(mods.length, 1, 'Only one modification added');
  t.equal(mods[0][0]['position'], 0, 'Modification on N-terminus');
  t.end();
});

test('C-terminal modifications', function(t) {
  var modList = [
    {
      'name': 'C-oxidation',
      'residues': [']'],
      'type': 'fixed',
      'mass': 16
    }
  ];

  var mods = pepMod.modify('EVILSHERRYPEPPER', modList, 0);
  t.equal(mods.length, 1, 'Modification added');
  t.equal(mods[0][0]['position'], 15, 'Modification on C-terminus');

  modList = [
    {
      'name': 'C-oxidation',
      'residues': ['R]'],
      'type': 'fixed',
      'mass': 16
    }
  ];

  mods = pepMod.modify('EVILSHERRYPEPPER', modList, 0);
  t.equal(mods.length, 1, 'Only one modification added');
  t.equal(mods[0][0]['position'], 15, 'Modification on C-terminus');
  t.end();
});

test('Making sure it works with a mix of everything', function(t) {
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
  t.equal(mods.length, 4, 'Correct number of modifications added');
  t.end();
});


