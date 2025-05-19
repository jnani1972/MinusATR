module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('AccessTokens', 'access_token', {
      type: Sequelize.STRING(1000),
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('AccessTokens', 'access_token', {
      type: Sequelize.STRING(255),
      allowNull: false,
    });
  },
};