import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import apiRouter from './server/routes.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON payloads
  app.use(express.json());

  // Request logging middleware for debugging HTTP flow
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(
        `[HTTP] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`
      );
    });
    next();
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.status(200).json({
      status: 'healthy',
      service: 'FairLink Full-Stack Campus Recruiting Server',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // Application records API routes (GET, POST, PUT, bulk-sync)
  app.use('/api', apiRouter);

  // Vite middleware for development, or static file serving for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 FairLink Server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
