import { expect as expect } from 'chai';
import <%= moduleName %> from '../src/module.js';

describe('<%= moduleName %>', () => {
  it('should be runing without any problems', () => {
    expect(<%= moduleName %>).to.not.throw();
  });
});
