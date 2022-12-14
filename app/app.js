const express = require("express");
const controller = require("../controller/controller.js");
const app = express();
const cors = require("cors");

// Parse JSON by default
app.use(express.json());

// Format JSON so that it is readable even without a JSON viewer like in Firefox Desktop
app.set("json spaces", 2);

// Enable Cross Origin Resource Sharing
app.use(cors());

// Endpoints
app.get("/", controller.ptApiEndpoints);
app.get("/api/endpoints", controller.ptApiEndpoints);
app.get("/api", controller.getApiEndpoints);

// Topics
app.get("/api/topics", controller.topics.getApiTopics);

// Articles
app.get("/api/articles", controller.articles.getApiArticles);
app.get("/api/articles/:article_id", controller.articles.getArticleById);
app.patch(
  "/api/articles/:article_id",
  controller.articles.patchArticleVotesByArticleId
);

// Comments
app.get(
  "/api/articles/:article_id/comments",
  controller.comments.getCommentsByArticleId
);
app.post(
  "/api/articles/:article_id/comments",
  controller.comments.postCommentToArticle
);
app.delete(
  "/api/comments/:comment_id",
  controller.comments.deleteCommentByCommentId
);

// Users
app.get("/api/users", controller.users.getUsers);

// Error Handling
app.all("*", controller.errors.fileNotFound);
app.use(controller.errors.psqlErrorHandling);
app.use(controller.errors.testNext404);
app.use(controller.errors.testNext400);

// Exports
module.exports = app;
