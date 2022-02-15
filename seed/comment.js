const { Comment } = require("../models");

const commentArry = [
  {
    id: 1,
    user_id: 1,
    body: "It's hot!",
    zip_code: 92058,
  },
  {
    id: 2,
    user_id: 2,
    body: "It's cold!",
    zip_code: 92058,
  },
  {
    id: 3,
    user_id: 3,
    body: "It's spicy!",
    zip_code: 92058,
  },
  {
    id: 4,
    user_id: 3,
    body: "It's sucks!",
    zip_code: 91914,
  },
  {
    id: 5,
    user_id: 3,
    body: "It's cool!",
    zip_code: 91914,
  },
];

const seedComment = () => Comment.bulkCreate(commentArry);
module.exports = seedComment;
