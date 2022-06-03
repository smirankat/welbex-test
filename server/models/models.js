const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Post = sequelize.define("post", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.STRING },
  text: { type: DataTypes.STRING },
  img: { type: DataTypes.STRING },
  video: { type: DataTypes.STRING },
  author: { type: DataTypes.STRING },
  userId: { type: DataTypes.INTEGER },
});

User.hasMany(Post);
Post.belongsTo(User);

module.exports = {
  User,
  Post,
};
