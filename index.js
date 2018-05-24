var unimod = require('js-unimod');
var combinations = require('./combinations');

module.exports.modify = function(sequence, mod_list, n_mods) {
  sequence = '['+sequence.toUpperCase()+']';
  fixed_modifications = [];
  variable_modifications = [];

  for(var i=0; i<mod_list.length; i++) {
    var name = mod_list[i]['name'];
    var residues = mod_list[i]['residues'];
    var type = mod_list[i]['type'];
    var mass = mod_list[i]['mass'];
    if(mass === undefined) {
      mass = unimod.getByName(name)['mono_mass'];
    }

    var regex = residues.join('|');
    regex = regex.replace('[', '\\[');
    regex = regex.replace(']', '\\]');

    var mod_positions = indexesOf(sequence, regex);

    Object.keys(mod_positions).forEach(function(key, index){
      var position_list = mod_positions[key];
      for(var i=0; i<position_list.length; i++) {
        var mod = {};
        mod['name'] = name;
        mod['residue'] = key;
        mod['type'] = type;
        mod['mass'] = mass;
        if(key.includes('[')) {
          mod['position'] = position_list[i];
        }
        else {
          if(key === ']') {
            mod['position'] = position_list[i]-2;
          }
          else {
            mod['position'] = position_list[i]-1;
          }
        }
        if(type==='fixed') {
          fixed_modifications.push(mod);
        }
        else {
          variable_modifications.push(mod);
        }
      }
    });
  }


  if(n_mods < 1) {
    return [fixed_modifications];
  }

  var modifications = [];

  for(var i=n_mods; i>0; i--) {
    var combos = combinations.combinations(variable_modifications, i);
    for(var j=0; j<combos.length; j++) {
      var m = fixed_modifications.concat(combos[j]);
      modifications.push(m);
    }
  }
  modifications.push(fixed_modifications);

  return modifications;
};

/* The below code comes from https://stackoverflow.com/questions/10710345/finding-all-indexes-of-a-specified-character-within-a-string*/
function indexesOf(string, regex) {
  var match,
      indexes = {};

  regex = new RegExp(regex, 'g');

  while (match = regex.exec(string)) {
    if (!indexes[match[0]]) indexes[match[0]] = [];
    indexes[match[0]].push(match.index);
  }

  return indexes;
}