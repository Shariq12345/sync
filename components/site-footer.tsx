import { siteConfig } from "@/config/site";
import { Mail, Send } from "lucide-react";
import { Icons } from "./icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-semibold text-white">
                Stay in the Loop
              </h3>
              <p className="text-sm text-gray-400">
                Subscribe to receive the latest updates in tech, design, and
                development.
              </p>
            </div>
            <div className="w-full md:w-1/2 max-w-md">
              <form className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-gray-800 border-gray-700 focus:border-purple-500 text-gray-300 placeholder-gray-500"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-10 bg-gradient-to-r from-purple-600 to-purple-500 text-white"
                >
                  <Send className="h-5 w-5 mr-1" />
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">About Us</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              {siteConfig.description ||
                "Sharing expert insights and latest trends in technology, design, and development."}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {["Home", "Blog", "About", "Projects", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`/${item.toLowerCase()}`}
                    className="hover:text-purple-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Categories</h4>
            <ul className="space-y-2 text-sm">
              {[
                "Technology",
                "Design",
                "Development",
                "Tutorials",
                "Resources",
              ].map((item) => (
                <li key={item}>
                  <a
                    href={`/category/${item.toLowerCase()}`}
                    className="hover:text-purple-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="mailto:hello@example.com"
                className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only">Mail</span>
                <Mail className="h-5 w-5 text-gray-400" />
              </a>
              <a
                href={siteConfig.links.twitter}
                className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only">Twitter</span>
                <Icons.twitter className="h-5 w-5 text-gray-400" />
              </a>
              <a
                href={siteConfig.links.github}
                className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only">GitHub</span>
                <Icons.gitHub className="h-5 w-5 text-gray-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} {siteConfig.name}. All rights
              reserved.
            </p>
            <div className="flex space-x-4 text-sm">
              <a
                href="/privacy"
                className="hover:text-purple-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="hover:text-purple-400 transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
