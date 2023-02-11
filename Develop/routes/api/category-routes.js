const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll(
    {
      include: {
        model: Product,
        attributes: ['product_name']
      }
    }
  )
    .then(categorydata => res.json(categorydata))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['category_id']
    }
  })
    .then(categorydata => res.json(categorydata))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then(categorydata => res.json(categorydata))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(categorydata => {
      if (!categorydata) {
        res.status(404).json({ message: 'No Category found with that id!' });
        return;
      }
      res.json(categorydata);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(categorydata => {
      if (!categorydata) {
        res.status(404).json({ message: 'No Category found with that id!' });
        return;
      }
      res.json(categorydata);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
