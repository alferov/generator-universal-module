import { expect } from 'chai';
import <%= camelizedModuleName %> from '../src/<%= moduleName %>.js';

describe('<%= camelizedModuleName %>', () => {
  it('should be runing without any problems', () => {
    expect(<%= camelizedModuleName %>).to.not.throw();
  });
});
