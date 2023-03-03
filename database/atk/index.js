const fs = require('fs');
const path = require('path');
const dbPath = path.resolve(__dirname, './data.json');

function getDataFromDatabase() {
  let data = fs.readFileSync(dbPath);
  data = data.toString('utf-8');
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data), { encoding: 'utf-8' });
}

function fetch() {
  let data = getDataFromDatabase();
  return data;
}

function getOne(atkName) {
  let data = getDataFromDatabase();
  return data.find((d) => d.name == atkName);
}

function create(bodyData) {
  let data = getDataFromDatabase();
  data.push(bodyData);
  writeData(bodyData);
  return bodyData;
}

function update(bodyData, atkName) {
  let data = getOne(atkName); // todo: nanti throw juga
  let allData = fetch();
  data = { ...data, ...bodyData }; // object spread
  const index = allData.findIndex((d) => d.name == atkName);
  if (!index || !data) {
    throw Error('data atk tidak ditemukan');
  }
  allData[index] = data;
  writeData(allData);
  return data;
}

function destroy(atkName) {
  let data = fetch();
  data = data.filter((d) => d.name != atkName);
  writeData(data);
}

module.exports = {
  fetch,
  create,
  getOne,
  update,
  destroy,
};
