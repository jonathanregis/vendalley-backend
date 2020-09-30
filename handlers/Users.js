const {read, create, del, update} = require('../helpers/Database');

exports.getUser = async (req, res) => {
  const allUsers = await read('users', req.params);
  res.send(allUsers);
};

exports.createUser = async (req, res) => {
  const result = await create('users', req.body);
  res.send(result);
};

exports.updateUser = async (req, res) => {
  const result = await update('users', req.params.filter, req.params.data);
  res.send(result);
};

exports.deleteUser = async (req, res) => {
  const result = await del('users', req.params);
  res.send(result);
};
