import React from "react";
import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-backgroundGray py-12 text-textDark dark:bg-backgroundDark dark:text-textLight">
      <div className="container mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-4 gap-8 px-8 md:px-12">
        {/* Company Info */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">@ Blog System</h2>
          <p className="text-sm leading-relaxed">
            Donec nec ante nisi. Vestibulum tincidunt lectus sed magna fringilla
            sagittis.
          </p>
          <p className="text-xs">© 2024 Blog System. All rights reserved.</p>
          <div className="text-xs">
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
        <div className="space-y-3">
          <h3 className="text-xl font-semibold">Tags</h3>
          <div className="flex flex-wrap gap-2">
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
                className="bg-inputGray text-textDark px-3 py-1 rounded-md text-xs font-medium"
              >
                {tag.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        {/* Social */}
        <div className="space-y-3 ml-16">
          <h3 className="text-xl font-semibold">Social</h3>
          <ul className="space-y-3">
            <li>
              <a
                href="#"
                className="flex items-center gap-3 hover:text-primary transition"
              >
                <FaTwitter size={20} /> <span className="text-sm">Twitter</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 hover:text-primary transition"
              >
                <FaFacebookF size={20} />{" "}
                <span className="text-sm">Facebook</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 hover:text-primary transition"
              >
                <FaInstagram size={20} />{" "}
                <span className="text-sm">Instagram</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 hover:text-primary transition"
              >
                <FaYoutube size={20} /> <span className="text-sm">YouTube</span>
              </a>
            </li>
          </ul>
        </div>

        {/* About */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold">About</h3>
          <ul className="space-y-2">
            {["Shop", "Authors", "Sitemap", "About us", "Contact"].map(
              (link) => (
                <li key={link}>
                  <a href="#" className="text-sm hover:underline">
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
