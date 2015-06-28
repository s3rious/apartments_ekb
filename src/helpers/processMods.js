import _ from 'lodash';

export default (mods, moduleName) => {
  return _(mods)
    .pairs()
    .map(function (pair) {
      return `${moduleName}--${pair.join('--')}`;
    })
    .value();
};
