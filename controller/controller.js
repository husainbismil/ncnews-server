const model = require("../model/model");

// TODO: find out how error catching is meant to be, repeating .catch here seems not very DRY
// TODO: set up routers to make this stuff look cleaner

// /api/topics Endpoints
exports.getApiTopics = (request, response) => {
    model.selectTopics().then((selectTopicsResponseObject) => {
        response.status(200).send(selectTopicsResponseObject);
    }).catch((err) => {
        console.log(err);
    });
};

// /api/articles Endpoints
exports.getApiArticles = (request, response) => {
    model.selectArticles().then((responseObject) => {

        response.status(200).send(responseObject);

    });
};

// /api/articles/:article_id Endpoints
exports.getArticleById = (request, response) => {
    const articleId = request.params["article_id"];

    model.selectArticleByArticleId(articleId).then((selectArticleByArticleIdResult) => {
        const responseObject = {};
        responseObject.article = selectArticleByArticleIdResult.rows[0];

        response.status(200).send(responseObject);
    });

};

// 6. GET /api/articles/:article_id/comments
exports.getCommentsByArticleId = (request, response) => {
    const articleId = request.params["article_id"];

    model.selectCommentsByArticleId(articleId).then((selectCommentsByArticleIdOutput) => {
        const feCommentRemoveArticleId = function (element, index) {
            delete returnedCommentsArray[index]["article_id"];
        };

        const responseObject = {};
        const returnedCommentsArray = selectCommentsByArticleIdOutput.rows;

        // for each comment, remove article_id before responding
        returnedCommentsArray.forEach(feCommentRemoveArticleId);
        responseObject.comments = returnedCommentsArray;
        response.status(200).send(responseObject);
    });

};

// 7. POST /api/articles/:article_id/comments
exports.postCommentToArticle = (request, response) => {
    const articleId = request.params["article_id"];
    const commentObject = request.body;

    model.insertCommentByArticleId(articleId, commentObject).then((insertCommentByArticleIdResult) => {
        
        const responseObject = {comment: insertCommentByArticleIdResult.rows[0]};
        response.status(201).send(responseObject);

    }).catch((err) => {
        console.log(err);
    });
};


// TODO: find out how error catching is meant to be, repeating .catch here seems not very DRY
    
