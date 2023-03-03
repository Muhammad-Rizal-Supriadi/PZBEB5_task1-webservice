const dbAtk = require('./../database/atk');
const path = require('path');
const fs = require('fs');

function fetch(req, res) {
  const data = dbAtk.fetch();
  res.send(data);
}
function get(req, res) {
  const atkName = req.params.name; // ambil parameter :name
  const selectedAtk = dbAtk.getOne(atkName);
  let data = {},
    responseStatus = 200;
  if (selectedAtk) {
    data = selectedAtk;
  } else {
    data = { message: 'atk tidak ditemukan' };
    responseStatus = 404;
  }
  // outputkan
  res.status(responseStatus).send(data);
}
function create(req, res) {
  const body = req.body;
  const result = dbAtk.create(body);
  res.send(result);
}
function update(req, res) {
  const atkName = req.params.name;
  const body = req.body;
  const result = dbAtk.update(body, atkName);
  res.send(result);
}
function destroy(req, res) {
  const AtkName = req.params.name;
  dbAtk.destroy(atkName);
  res.sendStatus(204);
}

module.exports = {
  fetch,
  get,
  create,
  update,
  destroy,
};
