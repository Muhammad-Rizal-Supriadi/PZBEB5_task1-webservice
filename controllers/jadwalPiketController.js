const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../database/jadwal_piket/data.json');

const getJadwalPiket = () => {
  const data = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(data);
};

const saveJadwalPiket = (jadwalPiket) => {
  const data = getJadwalPiket();
  data.push(jadwalPiket);
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

const updateJadwalPiket = (jadwalPiket) => {
  const data = getJadwalPiket();
  const jadwalToUpdateIndex = data.findIndex(
    (item) =>
      item.nama === jadwalPiket.nama && item.tanggal === jadwalPiket.tanggal
  );
  if (jadwalToUpdateIndex !== -1) {
    data[jadwalToUpdateIndex] = jadwalPiket;
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    return true;
  }
  return false;
};

const deleteJadwalPiket = (nama, tanggal) => {
  const data = getJadwalPiket();
  const newData = data.filter(
    (item) => item.nama !== nama || item.tanggal !== tanggal
  );
  if (newData.length !== data.length) {
    fs.writeFileSync(dataFilePath, JSON.stringify(newData, null, 2));
    return true;
  }
  return false;
};

module.exports = {
  getJadwalPiket,
  saveJadwalPiket,
  updateJadwalPiket,
  deleteJadwalPiket,
};
