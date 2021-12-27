const User = require("../model/user");

exports.login = async (req, res) => {
  const params = req.body;
  try {
    User.findOne(
      {
        username: params.username,
        password: params.password,
      },
      function (err, resp) {
        if (err) throw err;
        res.status(200).json(resp);
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.exists = async (req, res) => {
  const params = req.body;
  const id = params.id;
  delete params.id;
  try {
    User.findOne(
      Object.assign({}, params, { deleted: false }),
      function (err, resp) {
        if (err) throw err;
        let response = false;
        if (resp && id) {
          response = id !== String(resp._id);
        }
        res.status(200).json(response);
      }
    );
  } catch (err) {
    res.status(500).json(true);
  }
};

exports.all = (req, res) => {
  try {
    User.find({ deleted: false }, function (err, resp) {
      if (err) throw err;
      res.status(200).json(resp);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.find = (req, res) => {
  try {
    User.findById(req.params.id, function (err, resp) {
      if (err) throw err;
      res.status(200).json(resp);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.findByEmail = (req, res) => {
  try {
    User.findOne(
      { email: req.params.email, deleted: false },
      function (err, resp) {
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
    User.create(req.body, function (err, resp) {
      if (err) throw err;
      res.status(200).json(resp);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.update = (req, res) => {
  try {
    User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      function (err, resp) {
        if (err) throw err;
        res.status(200).json(resp);
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.delete = (req, res) => {
  try {
    User.findByIdAndUpdate(
      req.params.id,
      {
        deleted: true,
        new: true,
      },
      function (err, resp) {
        if (err) throw err;
        res.status(200).json(resp);
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.recover = (req, res) => {
  try {
    User.findByIdAndUpdate(
      req.params.id,
      {
        deleted: false,
        new: true,
      },
      function (err, resp) {
        if (err) throw err;
        res.status(200).json(resp);
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.lock = (req, res) => {
  try {
    User.findByIdAndUpdate(
      req.params.id,
      {
        locked: true,
        new: true,
      },
      function (err, resp) {
        if (err) throw err;
        res.status(200).json(resp);
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.release = (req, res) => {
  try {
    User.findByIdAndUpdate(
      req.params.id,
      {
        locked: false,
        new: true,
      },
      function (err, resp) {
        if (err) throw err;
        res.status(200).json(resp);
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};
