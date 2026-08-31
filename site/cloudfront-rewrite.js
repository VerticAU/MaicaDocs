// CloudFront viewer-request Function.
// S3 + OAC serves objects via the REST API, which (unlike the S3 website
// endpoint) does NOT auto-resolve directory paths to index.html. mkdocs uses
// pretty URLs like /reference/ -> /reference/index.html, so we rewrite at the
// edge.
function handler(event) {
    var request = event.request;
    var uri = request.uri;

    // /foo/  -> /foo/index.html
    if (uri.endsWith('/')) {
        request.uri = uri + 'index.html';
        return request;
    }

    // /foo   -> /foo/index.html  (only when there's no file extension)
    var lastSegment = uri.substring(uri.lastIndexOf('/') + 1);
    if (lastSegment.indexOf('.') === -1) {
        request.uri = uri + '/index.html';
    }

    return request;
}
