const models = require('../models');
const DomoModel = require('../models/Domo');

const { Domo } = models;

const makerPage = (req, res) => {
    return res.render('app');
};

const makeDomo = async (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({ error: 'Both name and age are required!' });
  }

  const domoData = {
    name: req.body.name,
    age: req.body.age,
    color: req.body.color,
    owner: req.session.account._id,
  };

  try {
    const newDomo = new Domo(domoData);
    await newDomo.save();
    return res.status(201).json({ name: newDomo.name, age: newDomo.age, color: newDomo.color });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Domo already exists' });
    }
    return res.status(400).json({ error: 'An error occurred' });
  }
};

const getDomos = (req, res) => {
  return DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred!' }); 
    }

    return res.json({ domos: docs });
  });
};
/* 
const clearDomos = (req, res) => {
     return res.json({ message: "All your domos have been removed." });

    // to do
     DomoModel.findByOwner(req.session.account._id, (docs) => {
    for (const doc in docs) {
      doc.remove();
    } 
}; */

module.exports = {
  makerPage,
  makeDomo,
  getDomos,
/*   clearDomos, */
};
