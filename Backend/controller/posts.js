const db = require('../db');

function getPosts(req, res) {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
}

function getPost(req, res) {
  const q =
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM admin u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
}

function addPost(req, res) {
  if (!req.session.user) return res.status(401).json("Not authenticated!");

  const q =
    "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.img,
    req.body.cat,
    req.body.date,
    req.session.user.id,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Post has been created.");
  });
}

function deletePost(req, res) {
  if (!req.session.user) return res.status(401).json("Not authenticated!");

  const postId = req.params.id;
  const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

  db.query(q, [postId, req.session.user.id], (err, data) => {
    if (err) return res.status(403).json("You can delete only your post!");

    return res.json("Post has been deleted!");
  });
}

function updatePost(req, res) {
  if (!req.session.user) return res.status(401).json("Not authenticated!");

  const postId = req.params.id;
  const q =
    "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

  const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

  db.query(q, [...values, postId, req.session.user.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Post has been updated.");
  });
}

module.exports = { getPosts, getPost, addPost, deletePost, updatePost };
