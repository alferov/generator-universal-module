import <%= camelizedModuleName %> from '../<% if (isSeparated) { %>../<% } %>src/<%= moduleName %>.js';

describe('<%= camelizedModuleName %>', () => {
  it('should be runing without any problems', () => {
    expect(<%= camelizedModuleName %>).to.not.throw();
  });
});
