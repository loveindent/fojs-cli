/* eslint-disable quotes */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import {{name}} from './{{name}}';

describe("{{name}}", function() {
  it("should be like that", function() {
    expect(shallow(<{{name}}>test</{{name}}>).matchesElement(
      <div className="{{name}}"></div>
    )).to.equal(true)
  });
});
