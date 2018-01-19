'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Users',
      'resetPasswordToken',
      {
        type: Sequelize.STRING
      }
    );
  },

  down (queryInterface) {
    return queryInterface.removeColumn(
      'Users',
      'resetPasswordToken'
    );
  }
}

