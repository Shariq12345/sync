"use client";
import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

interface Heading {
  id: string;
  title: string;
  level: number;
}

const OnThisPage = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll("h2, h3")
    ) as HTMLHeadingElement[];

    const headingData = headingElements.map((el) => ({
      id: el.id,
      title: el.innerText,
      level: parseInt(el.tagName.replace("H", "")),
    }));

    setHeadings(headingData);

    // Add scroll spy functionality
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-20 hidden lg:block w-64 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800">
      <h2 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">
        On This Page
      </h2>
      <div className="space-y-1">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;
          return (
            <button
              key={heading.id}
              onClick={() => handleClick(heading.id)}
              className={`group w-full text-left flex items-center gap-2 px-3 py-2 text-sm transition-all duration-200 rounded-lg
                ${
                  heading.level === 3 ? "pl-6 text-sm" : "font-medium text-base"
                }
                ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
            >
              <ChevronRight
                className={`w-4 h-4 transition-transform duration-200 
                  ${isActive ? "text-blue-500" : "text-gray-400"}
                  ${heading.level === 3 ? "opacity-0" : "opacity-100"}
                  group-hover:translate-x-1`}
              />
              <span className="truncate">{heading.title}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default OnThisPage;
