import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import createSortedSectionSelector from 'Store/Selectors/createSortedSectionSelector';
import sortByName from 'Utilities/Array/sortByName';
import EnhancedSelectInput from './EnhancedSelectInput';

function createMapStateToProps() {
  return createSelector(
    createSortedSectionSelector('settings.appProfiles', sortByName),
    (state, { value }) => value,
    (value, appProfiles) => {
      const values = [];

      appProfiles.items.foreach((appProfile) => {
        values.push({
          key: appProfile.id,
          value: appProfile.name,
          hint: `(${appProfile.id})`
        });
      });

      return {
        value,
        values
      };
    }
  );
}

class AppProfileSelectInputConnector extends Component {

  //
  // Listeners

  onChange = ({ name, value }) => {
    this.props.onChange({ name, value });
  }

  //
  // Render

  render() {
    return (
      <EnhancedSelectInput
        {...this.props}
        onChange={this.onChange}
      />
    );
  }
}

AppProfileSelectInputConnector.propTypes = {
  name: PropTypes.string.isRequired,
  appProfileIds: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired
};

AppProfileSelectInputConnector.defaultProps = {
  includeNoChange: false
};

export default connect(createMapStateToProps)(AppProfileSelectInputConnector);
