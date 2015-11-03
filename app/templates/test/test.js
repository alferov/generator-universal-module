import { expect as expect } from 'chai';
import packageName from '../src/module.js';

describe('packageName', () => {
  it('should be runing without any problems', () => {
    expect(packageName).to.not.throw();
  });
});
