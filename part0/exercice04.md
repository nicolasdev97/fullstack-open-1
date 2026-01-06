sequenceDiagram
    participant browser
    participant server

    - User writes a note and clicks "Save" -

    browser->server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    - Server saves the new note -
    server->browser: HTTP 302 Redirect
    deactivate server

    browser->server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server->browser: HTML document
    deactivate server

    browser->server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server->browser: Updated notes list in JSON
    deactivate server

    - Browser renders the updated list of notes -
