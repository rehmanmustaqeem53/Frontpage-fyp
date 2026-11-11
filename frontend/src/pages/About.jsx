
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">

      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-blue-600">Frontpage</span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Frontpage is a modern blogging platform where people can
            share their knowledge, express their ideas, and explore
            interesting content. Our goal is to connect writers and
            readers through meaningful articles and discussions.
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-center">

        <div>
          <h2 className="text-3xl font-bold mb-5">
            Our Mission
          </h2>

          <p className="text-gray-600 dark:text-gray-300 leading-8">
            Our mission is to provide a simple and user-friendly
            platform where authors can publish their thoughts and
            readers can discover valuable information. We believe
            everyone has a story worth sharing.
          </p>
        </div>

        <div className="bg-blue-600 text-white rounded-2xl p-10 shadow-xl">
          <h2 className="text-3xl font-bold mb-4">
            Share Your Ideas
          </h2>
          <p className="leading-7">
            Write articles, share knowledge, explore different
            perspectives, and become part of a growing blogging
            community.
          </p>
        </div>

      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white dark:bg-gray-800">

        <h2 className="text-3xl font-bold text-center mb-12">
          What We Offer
        </h2>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {[
            {
              title: "Author Dashboard",
              description: "Authors can create, edit, and delete their blog posts."
            },
            {
              title: "Explore Blogs",
              description: "Readers can discover and read interesting blog articles."
            },
            {
              title: "Comments",
              description: "Readers can share their thoughts and participate in discussions."
            },
            {
              title: "User Authentication",
              description: "Secure registration and login for authors and readers."
            },
            {
              title: "Easy Publishing",
              description: "A simple interface makes writing and publishing blogs easier."
            },
            
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-7 rounded-xl bg-gray-100 dark:bg-gray-900 shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold mb-3 text-blue-600">
                {feature.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 leading-7">
                {feature.description}
              </p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* Closing Section */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-5">
          Be Part of Our Community
        </h2>

        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mb-8">
          Whether you want to write your first article or explore
          new ideas, Frontpage welcomes you.
        </p>
      </section>

    </div>
  );
}
