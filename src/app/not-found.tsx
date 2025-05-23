// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <html>
      <head>
        <title>404 - Page Not Found</title>
        <style>{`
          body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif; }
          .container { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; text-align: center; background-color: #f8f9fa; color: #343a40; }
          .title { font-size: 3rem; font-weight: bold; margin-bottom: 1rem; }
          .message { font-size: 1.25rem; margin-bottom: 2rem; }
          .link { font-size: 1rem; color: #007bff; text-decoration: none; border: 1px solid #007bff; padding: 0.5rem 1rem; border-radius: 0.25rem; transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out; }
          .link:hover { background-color: #007bff; color: white; }
        `}</style>
      </head>
      <body>
        <div className="container">
          <h1 className="title">404</h1>
          <p className="message">Page Not Found</p>
          <p>Sorry, the page you are looking for could not be found or may have been moved.</p>
          <Link href="/" className="link" prefetch={false}>
            Go back to Home
          </Link>
        </div>
      </body>
    </html>
  );
}
