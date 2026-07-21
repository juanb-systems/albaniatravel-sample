# Running albania-travel

## Fastest way: double-click a launcher

- **Windows:** `run-demo.bat`
- **Mac:** `run-demo.command`
  - First time only: if it opens in a text editor instead of running, it needs the execute bit. In Terminal, from this folder: `chmod +x run-demo.command stop-demo.command`


## During the build (no CMS needed)

The site reads its content straight from `content/` and builds standalone.

```bash
cd web
npm install
npm run dev    # http://localhost:4328
```

Or double-click `run-demo.bat`.

## At handoff only

Import the settled content into Payload so the client can edit it:

```bash
cd cms
npm install
npm run seed              # imports ../content into Payload
npm run dev               # http://localhost:3465/admin
```

Then set `web/.env` to `CONTENT_SOURCE=payload` and rebuild. The site must render identically to local mode.
