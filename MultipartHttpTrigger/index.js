
var multipart = require("parse-multipart");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    var boundary = multipart.getBoundary(req.headers['content-type']);
    // parse the body
    var buff = Buffer.from(req.body);
    var parts = multipart.Parse(buff, boundary);
    context.res = { body : { name : parts[0].filename, type: parts[0].type, data: parts[0].data.length}}; 
    context.done();  
}