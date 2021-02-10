'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('configs', [{
      id: '1',
      contextType: "AgriProductType",
      contextMapping: '[{"set": ["price"]}]',
      metadata: '{"contractAddress": "0xBca0fDc68d9b21b5bfB16D784389807017B2bbbc", "abi": [{ "name": "set", "type": "function", "inputs": [{ "name": "x", "type": "uint256"}], "outputs": [], "payable": false, "constant": false, "stateMutability": "nonpayable"}]}',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('configs', null, {});
  }
};
