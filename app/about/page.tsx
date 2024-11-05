import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export const metadata: Metadata = {
  title: "About Me",
  description: "Information about me",
};

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "TailwindCSS",
  "GraphQL",
  "AWS",
  "Docker",
];

const experiences = [
  {
    title: "Senior Software Developer",
    company: "Tech Company",
    period: "2020 - Present",
    description:
      "Leading development of scalable web applications using modern technologies.",
  },
  {
    title: "Software Developer",
    company: "Digital Agency",
    period: "2018 - 2020",
    description: "Developed and maintained client websites and applications.",
  },
];

export default async function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container px-4 sm:px-6 py-8 lg:py-20">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-16">
          <h1 className="text-4xl font-bold mb-4 mt-10 sm:mt-0">
            About{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Me
            </span>
          </h1>
          {/* <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 md:mb-8"></div> */}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <Card className="p-4 sm:p-6 text-center border-none shadow-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardContent className="space-y-4 sm:space-y-6 p-0">
                <Avatar className="h-32 w-32 sm:h-48 sm:w-48 mx-auto ring-4 ring-blue-500/20">
                  <AvatarImage
                    src="/avatar.png"
                    alt={siteConfig.author}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-xl sm:text-2xl">
                    JC
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
                    {siteConfig.author}
                  </h2>
                  <p className="text-blue-600 dark:text-blue-400 font-medium text-sm sm:text-base">
                    Software Developer
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-3 sm:gap-4">
                  {[
                    { icon: Mail, href: "mailto:hello@example.com" },
                    { icon: Github, href: siteConfig.links.github },
                    { icon: Twitter, href: siteConfig.links.twitter },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                    >
                      <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bio and Experience Section */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Bio */}
            <Card className="p-4 sm:p-6 border-none shadow-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                  Biography
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                  I'm a passionate software developer with over 5 years of
                  experience in building modern web applications. I specialize
                  in JavaScript technologies and have a strong focus on creating
                  performant, scalable, and user-friendly applications. When I'm
                  not coding, you can find me contributing to open-source
                  projects or writing technical articles on my blog.
                </p>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="p-4 sm:p-6 border-none shadow-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs sm:text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-800"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card className="p-4 sm:p-6 border-none shadow-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                  Experience
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  {experiences.map((exp, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-blue-500 pl-3 sm:pl-4"
                    >
                      <h4 className="text-base sm:text-lg font-semibold">
                        {exp.title}
                      </h4>
                      <p className="text-blue-600 dark:text-blue-400 text-sm sm:text-base">
                        {exp.company}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1 sm:mb-2">
                        {exp.period}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
