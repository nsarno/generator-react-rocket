var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var expect = require('expect');
var Dashboard = require('../<%= name %>');

describe('<%= name %>', function () {
  it('renders without problems', function () {
    var <%= name.toLowerCase() %> = TestUtils.renderIntoDocument(<<%= name %>/>);
    expect(<%= name.toLowerCase() %>).toExist();
  });
});
