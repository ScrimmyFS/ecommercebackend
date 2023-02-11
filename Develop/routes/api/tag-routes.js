const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll(
    {include: {
        model: Product
      }
    }
  )
    .then(tagdata => res.json(tagdata))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product
    }
  })
    .then(tagdata => res.json(tagdata))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(tagdata => res.json(tagdata))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Tag.update(
    { tag_name: req.body.tag_name
    },
    { where: {
        id: req.params.id
      }
    })
    .then(tagdata => {
      if (!tagdata) {
        res.status(404).json({ message: 'No Tag found with that id!' });
        return;
      }
      res.json(tagdata);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Tag.destroy({ where: {
      id: req.params.id
    }
  })
    .then(tagdata => {
      if (!tagdata) {
        res.status(404).json({ message: 'No Tag found by that id!' });
        return;
      }
      res.json(tagdata);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
