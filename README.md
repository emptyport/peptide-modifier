# peptide-modifier

This module returns all the possible combinations of modifications for a given peptide sequence given a list of modifications and the maximum number of allowed variable modifications.

## Installation
npm install peptide-modifier --save

## Usage
Example usage:
```javascript
var pepMod = require('peptide-modifier');

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
```

Output:
```javascript
[ 
    [ { name: 'Carbamidomethylation',
      residue: 'C',
      type: 'fixed',
      mass: 57.02,
      position: 6 },
    { name: 'oxidation',
      residue: 'M',
      type: 'variable',
      mass: 15.994915,
      position: 8 },
    { name: 'n-terminal acetyl',
      residue: '[K',
      type: 'variable',
      mass: 42,
      position: 0 } ],
      
  [ { name: 'Carbamidomethylation',
      residue: 'C',
      type: 'fixed',
      mass: 57.02,
      position: 6 },
    { name: 'oxidation',
      residue: 'M',
      type: 'variable',
      mass: 15.994915,
      position: 8 } ],

  [ { name: 'Carbamidomethylation',
      residue: 'C',
      type: 'fixed',
      mass: 57.02,
      position: 6 },
    { name: 'n-terminal acetyl',
      residue: '[K',
      type: 'variable',
      mass: 42,
      position: 0 } ],

  [ { name: 'Carbamidomethylation',
      residue: 'C',
      type: 'fixed',
      mass: 57.02,
      position: 6 } ] 
]
```

### Parameters
The first parameter passed to ```peptide-modifier``` is the sequence you want to modify. The module does not check to make sure you only send in valid amino acids.

The second parameter is the list of potential modifications. This is a list of JavaScript objects in the following format:
* ```name``` is the name of the modification
* ```residues``` is a list of the residues on which this modification can occur. Use '[' for the N-terminus and ']' for the C-terminus. Each residue can only be a single character, unless you are modifying a specific terminal residue. For example, '[A' will specify an N-terminal alanine.
* ```type``` can be either 'fixed' (meaning this modification always occurs) or 'variable' (meaning this modification may or may not occur).
* ```mass``` is the mass of the modification and can be either positive or negative. If this value is omitted, the ```name``` parameter will be used to look up the mass from the [js-unimod](https://www.npmjs.com/package/js-unimod) module.

The third parameter is the maximum number of variable modifications to allow. Fixed modifications do not count toward this value.

### Output format
The output of the modify call is a list of lists. The master list is the number of variants when taking into consideration the combinations of modifications.

Each sublist then contains a list of all the modifications for each variant. This will have the name, residue, mass, type, and position (0-based index) of the modification.

If there are no fixed modifications, one of the sublists will be an empty list signifying a variant with no modifications.

## Tests
You can run `npm test` to run the tests after installing the development dependencies.

## Future functionality
I may add in support for non-canonical amino acids e.g. J would modify both I and L (but for now you could pass in ```['L','I']``` for your residues if you want to modify both those residues).

## License
This software is released under the MIT license.