var emass_lib = require('../index');
var test = require('tape');

test('Default Settings', function(t) {
  var emass = new emass_lib();
  var formula = new molFormula('H2O');
  var isotopes = emass.calculate(formula.composition, 0);

  t.equal(isotopes.length, 3, 'Number of peaks');
  t.equal(isotopes[0].Mass, 18.010565, 'm0 correct');
  t.equal(isotopes[1].Mass, 19.015557, 'm1 correct');
  t.equal(isotopes[2].Mass, 20.014810, 'm2 correct');
  t.equal(isotopes[0].Abundance, 1.00000000, 'i0 correct');
  t.equal(isotopes[1].Abundance, 0.00061095, 'i1 correct');
  t.equal(isotopes[2].Abundance, 0.00205509, 'i2 correct');
  t.end();
});

