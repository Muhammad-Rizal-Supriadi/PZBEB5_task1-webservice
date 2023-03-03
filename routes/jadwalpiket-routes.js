const express = require('express');
const jadwalPiketController = require('../controllers/jadwalPiketController');

const router = express.Router();

router.get('/piket', (req, res) => {
  const data = jadwalPiketController.getJadwalPiket();
  res.json(data);
});

router.post('/piket', (req, res) => {
  const jadwalPiket = req.body;
  const existingJadwalPiket = jadwalPiketController
    .getJadwalPiket()
    .find(
      (item) =>
        item.nama === jadwalPiket.nama && item.tanggal === jadwalPiket.tanggal
    );
  if (existingJadwalPiket) {
    res.status(400).send('Jadwal piket sudah terdaftar');
  } else {
    jadwalPiketController.saveJadwalPiket(jadwalPiket);
    res.json(jadwalPiket);
  }
});

router.put('/piket', (req, res) => {
  const jadwalPiket = req.body;
  const updated = jadwalPiketController.updateJadwalPiket(jadwalPiket);
  if (updated) {
    res.json(jadwalPiket);
  } else {
    res.status(404).send('Jadwal piket tidak ditemukan');
  }
});

router.delete('/piket', (req, res) => {
  const nama = req.body.nama;
  const tanggal = req.body.tanggal;
  const deleted = jadwalPiketController.deleteJadwalPiket(nama, tanggal);
  if (deleted) {
    res.send(`Jadwal piket ${nama} pada tanggal ${tanggal} telah dihapus`);
  } else {
    res.status(404).send('Jadwal piket tidak ditemukan');
  }
});

module.exports = router;
