'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Users',
      'resetPasswordExpires',
      {
        type: Sequelize.DATE
      }
    );
  },

  down (queryInterface) {
    return queryInterface.removeColumn(
      'Users',
      'resetPasswordExpires'
    );
  }
}

