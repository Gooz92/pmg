export default data =>
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PMG</title>
  <style>
    #canv {
      outline: 1px solid #aaa;
    }

    input:invalid {
      background-color: #f66161;
    }

    .error {
      color: red;
    }

    #version {
      position: fixed;
      bottom: 0;
      right: 0;
      margin: 8px;
    }
  </style>
</head>
<body>
<div id="app-container"></div>
<span id="version">${data.versionInfo}</span>
<script src="index.js"></script>
</body>
</html>`;
