# final

## Application dashboard

- `dashboard.html` — displays service cards with icon, description, status and bookmarks.
- `admin.html` — manage cards; data is stored in the browser's localStorage.
- Default icons are located in `images/icons`. The dashboard cycles through six built-in SVG images
  (`default*.svg` and `alt*.svg`) when no custom icon is provided. `favicon.svg` serves as the
  site icon.

## Run with Docker Compose

1. Build and start the container:
   ```bash
   docker compose up --build
   ```
2. Open [http://localhost:8080](http://localhost:8080) to see the dashboard.
   The admin panel is at [http://localhost:8080/admin.html](http://localhost:8080/admin.html).
