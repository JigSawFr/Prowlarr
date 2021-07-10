import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import EnhancedSelectInput from './EnhancedSelectInput';

function createMapStateToProps() {
  return createSelector(
    (state) => state.settings.appProfiles.items,
    (appProfiles) => {
      const values = [];

      appProfiles.forEach((appProfile) => {
        values.push({
          key: appProfile.id,
          value: appProfile.name
        });
      });

      return {
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
  appProfileIds: PropTypes.arrayOf(PropTypes.number),
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired
};

AppProfileSelectInputConnector.defaultProps = {
  includeNoChange: false
};

export default connect(createMapStateToProps)(AppProfileSelectInputConnector);
