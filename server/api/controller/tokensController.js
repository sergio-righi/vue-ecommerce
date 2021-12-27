const Token = require("../model/token");

exports.findByUser = (req, res) => {
  try {
    Token.findOne(
      {
        user: req.params.id,
        done: { $eq: null },
        expires: { $gte: new Date() }
      },
      function(err, resp) {
        if (err) throw err;
        res.status(200).json(resp);
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.findByToken = (req, res) => {
  try {
    Token.findOne(
      {
        number: req.params.number,
        done: { $eq: null },
        expires: { $gte: new Date() }
      },
      function(err, resp) {
        if (err) throw err;
        res.status(200).json(resp);
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.findByCode = (req, res) => {
  try {
    Token.findOne(
      {
        code: req.params.code,
        done: { $eq: null },
        expires: { $gte: new Date() }
      },
      function(err, resp) {
        if (err) throw err;
        res.status(200).json(resp);
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.insert = (req, res) => {
  try {
    Token.create(req.body, function(err, resp) {
      if (err) throw err;
      res.status(200).json(resp);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.update = (req, res) => {
  try {
    Token.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(
      err,
      resp
    ) {
      if (err) throw err;
      res.status(200).json(resp);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.done = (req, res) => {
  try {
    Token.findByIdAndUpdate(
      req.params.id,
      { done: new Date() },
      { new: true },
      function(err, resp) {
        if (err) throw err;
        res.status(200).json(resp);
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};
