module.exports = (req, res, next) => {
  const auth = req.header('Authorization');
  if (auth) {
    next();
  } else {
    res.status(403).send({ message: 'unauthorized' });
  }
};
