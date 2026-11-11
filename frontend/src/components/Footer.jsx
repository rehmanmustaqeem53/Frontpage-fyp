export default function Footer() {
  return (
    <footer className="py-6 mt-10 bg-gray-900 text-white dark:bg-gray-800 dark:text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-xl font-semibold">Frontpage Blog</h2>

        <p className="text-gray-400 mt-2">
          © {new Date().getFullYear()} Frontpage Blog. All rights reserved.
        </p>

        <div className="flex justify-center gap-6 mt-4">
          <a
            href="#"
            className="text-gray-300 hover:text-white transition"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white transition"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}