module.exports =  class peptide_modifier {
  constructor(options) {
    this.ELECTRON = .00054858;

    this.limit = this.opt(options, 'limit', 1E-10);
    this.customIsotopes = this.opt(options, 'customIsotopes', {});
    this.abundance_decimals = this.opt(options, 'abundanceDecimals', 8);
    this.mass_decimals = this.opt(options, 'massDecimals', 6);
    this.cutoff = this.opt(options, 'cutoff', 0.0001);
  }

  // From here https://stackoverflow.com/questions/23577632/optional-arguments-in-nodejs-functions
  opt(options, name, default_value){
    return options && options[name]!==undefined ? options[name] : default_value;
  }

  
  
}