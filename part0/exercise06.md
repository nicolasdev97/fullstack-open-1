sequenceDiagram
    participant browser
    participant server

    - User writes a note and clicks "Save" -

    browser->server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    - Server saves the new note -
    server->browser: HTTP 200 OK - A JSON response -
    deactivate server

    - JavaScript updates the UI without reloading the page -
