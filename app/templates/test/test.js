import <%= camelizedModuleName %> from '../<% if (isSeparated) { %>../<% } %>src/<%= moduleName %>.js';
import { expect } from 'chai';

describe('<%= camelizedModuleName %>', () => {
  it('should be runing without any problems', () => {
    expect(<%= camelizedModuleName %>).to.not.throw();
  });
});
