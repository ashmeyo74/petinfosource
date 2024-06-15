const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Pet = sequelize.define(
  'Pets',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vetOfficeUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    groomerUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    petImageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Pets',
  }
);

module.exports = Pet;
