import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="mb-4 text-7xl font-black text-primary">404</h1>
        <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
          Page Not Found
        </h2>
        <p className="mb-6 text-muted-foreground">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-primary px-6 py-2 font-semibold text-white shadow transition hover:bg-primary/90"
        >
          Go to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
