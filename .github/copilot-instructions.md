# Copilot Instructions for TaskTrek

## Project Overview
- **TaskTrek** is a minimal Node.js project using Express (see `package.json`).
- The main entry point is `index.js`, which starts an Express server and defines a single route (`/`).
- The server listens on port 3000 and responds with "Hey Buddy" at the root URL.

## Architecture & Patterns
- **Single-file structure:** All logic currently resides in `index.js`.
- **Express usage:** Follows standard Express patterns for route definition and server setup.
- **CommonJS modules:** Uses `require`/`module.exports` (see `package.json` type).

## Developer Workflows
- **Start server:** Run `node index.js` from the project root.
- **Testing:** No tests are defined. The `npm test` script is a placeholder and will always fail.
- **Dependencies:** Only `express` is required. Install with `npm install` if needed.

## Conventions
- **Route handlers:** Use arrow functions with `(req, res)` signature.
- **Port:** Default is 3000; update `app.listen` if you need a different port.
- **Responses:** Use `res.send()` for simple string responses.

## Integration & Extensibility
- **Add routes:** Use `app.get('/path', handler)` for new endpoints.
- **Middleware:** Add with `app.use()` as needed.
- **External dependencies:** Add to `package.json` and run `npm install`.

## Examples
```js
// Add a new route
app.get('/hello', (req, res) => {
  res.send('Hello World!');
});
```

## Key Files
- `index.js`: Main application logic
- `package.json`: Project metadata and dependencies

---

**For AI agents:**
- Follow the single-file, minimalistic structure unless refactoring for complexity.
- Use standard Express and Node.js idioms.
- Document any new routes or major changes in this file or a new `README.md`.
