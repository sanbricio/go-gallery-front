# Go Gallery Frontend

Frontend for the **Go Gallery** application, built with Angular.

---

## 🚀 Features

- Angular 19
- Dynamic runtime configuration (`env.json`)
- Docker-ready with environment variable injection
- Integrated with the backend: [Go Gallery API](https://github.com/sanbricio/go-gallery)

---

## ⚙️ Configurable Environment Variables

**Used only in Docker (production).** Not needed during development with `npm run start`.

Example `.env`:

```env copy
API_URL=http://localhost:3000/api
WITH_CREDENTIALS=true
```

These are injected at runtime using a generated `env.json` file.

---

## 🔧 Local Development

To run the frontend locally:

1. Clone this repository.
2. Install dependencies:

    ```bash copy
    npm install
    ```

3. Start the development server:

    ```bash copy
    npm run start
    ```

4. Visit [http://localhost:4200](http://localhost:4200).

**Backend Required:**  
The frontend depends on the backend running locally.

- Backend repo: [Go Gallery Backend](https://github.com/sanbricio/go-gallery)
- Start backend at: [http://localhost:3000/api](http://localhost:3000/api)

---

## 📦 Production Build

To generate a production build:

```bash copy
npm run build -- --configuration production
```

The output will be in: `dist/go-gallery-front/browser`

---

## 🐳 Docker Deployment

**Build Docker image:**

```bash copy
docker build -t go-gallery-front:latest .
```

Or tag with version:

```bash copy
docker build -t go-gallery-front:v1.0.0 .
```

**Run Docker container:**

```bash copy
docker run --env-file .env -p 80:80 go-gallery-front:latest
```

App will be available at: [http://localhost](http://localhost)

---

## 📄 Runtime Configuration (`env.json`)

This file is generated automatically in Docker runtime from `.env`:

```json copy
{
  "apiUrl": "https://go-gallery/api",
  "withCredentials": "true"
}
```

This is handled via `entrypoint.sh` using `envsubst`.

---

## ✅ Notes

- In development (`npm run start`), no `env.json` is needed.
- In production (`docker run`), `env.json` is generated dynamically from `.env`.

---

## ✨ Contributing

Pull requests and feedback are welcome!

Developed by [@sanbricio](https://github.com/sanbricio)

