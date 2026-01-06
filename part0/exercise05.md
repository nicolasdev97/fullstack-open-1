sequenceDiagram
    participant browser
    participant server

    browser->server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server->browser: HTML document
    deactivate server

    browser->server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server->browser: JavaScript file
    deactivate server

    - Browser starts executing the SPA JavaScript code -

    browser->server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server->browser: Notes data in JSON format
    deactivate server

    - JavaScript renders the notes without reloading the page -
    - This is the main difference between a traditional web application and a Single Page Application (SPA) -
