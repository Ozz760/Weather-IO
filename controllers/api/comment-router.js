const router = require('express').Router();
const { Comment } = require('../../models'); 
const withAuth = require('../../util/withAuth');

router.post('/', async (req, res) => {
    try {
      const userComment = await Comment.create({
        where: {
          id: req.query.id,
          zip_code: req.session.user.id, 
        },
      });
      
      res.status(200).json(userComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  module.exports = router;