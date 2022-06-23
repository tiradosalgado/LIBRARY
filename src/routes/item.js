const itemRoutes = require('express').Router();

// Requerir el modelo Item en nuestro módulo de rutas
var Item = require('../models/Item');

// Ruta de la tienda definida
itemRoutes.route('/add').post((req, res, next) => {
    var item = new Item(req.body);
    item.save()
    .then(item => {
      res.status(200).json({'item': 'Item added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
  });

// Ruta definida para obtener datos (índice o listado)
itemRoutes.route('/').get(function (req, res) {
  Item.find(function (err, items){
    if(err){
      console.log(err);
    }
    else {
      res.json(items);
    }
  });
});

// Ruta de edición definida
itemRoutes.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  Item.findById(id, function (err, item){
      res.json(item);
  });
});

// Ruta de actualización definida
itemRoutes.route('/update/:id').post(function (req, res) {
  Item.findById(req.params.id, function(err, item) {
    if (!item)
      return next(new Error('Could not load Document'));
    else {
      item.name = req.body.name;
      item.price = req.body.price;

      item.save().then(item => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Definida la ruta de borrar | eliminar | destruir
itemRoutes.route('/delete/:id').get(function (req, res) {
  Item.findByIdAndRemove({_id: req.params.id}, function(err, item){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = itemRoutes;
