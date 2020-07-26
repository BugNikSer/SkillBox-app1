export const indexTemplate = (content) => `
<!DOCTYPE html>
<html lang="eng">
    <head>
        <title>First App</title>
        <script src="/static/client.js" typr="application/javascript"></script>
    </head>
    <body>
        <div id="react-root">${content}</div>
</html>
`;
