import React from "react";
import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-backgroundGray py-16 text-textDark dark:bg-backgroundDark dark:text-textLight">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-8">
        {/* Company Info */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">@ Blog System</h2>
          <p className="text-lg leading-relaxed">
            Donec nec ante nisi. Vestibulum tincidunt lectus sed magna fringilla
            sagittis.
          </p>
          <p className="text-sm">© 2024 Blog System. All rights reserved.</p>
          <div className="text-sm">
            <a href="#" className="hover:underline">
              Terms of Service
            </a>{" "}
            •{" "}
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Tags</h3>
          <div className="flex flex-wrap gap-3">
            {[
              "Health",
              "Lifestyle",
              "Social",
              "Entertainment",
              "News",
              "Books",
              "Design",
              "Gadgets",
            ].map((tag) => (
              <span
                key={tag}
                className="bg-inputGray text-textDark px-4 py-2 rounded-md text-sm font-medium"
              >
                {tag.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        {/* Social */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Social</h3>
          <ul className="space-y-4">
            <li>
              <a
                href="#"
                className="flex items-center gap-4 hover:text-primary transition"
              >
                <FaTwitter size={24} /> <span className="text-lg">Twitter</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-4 hover:text-primary transition"
              >
                <FaFacebookF size={24} />{" "}
                <span className="text-lg">Facebook</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-4 hover:text-primary transition"
              >
                <FaInstagram size={24} />{" "}
                <span className="text-lg">Instagram</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-4 hover:text-primary transition"
              >
                <FaYoutube size={24} /> <span className="text-lg">Youtube</span>
              </a>
            </li>
          </ul>
        </div>

        {/* About */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">About</h3>
          <ul className="space-y-3">
            {["Shop", "Authors", "Sitemap", "About us", "Contact"].map(
              (link) => (
                <li key={link}>
                  <a href="#" className="text-lg hover:underline">
                    {link}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
