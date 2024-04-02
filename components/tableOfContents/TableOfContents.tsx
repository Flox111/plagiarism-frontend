import { useState, useRef, useEffect } from "react";

interface Section {
  idLinkedElement: string;
  title: string;
}

interface TableOfContentsProps {
  sections: Section[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const linkedSections: HTMLElement[] = Array.from(
      document.querySelectorAll('[id*="section-"]')
    );

    const handleScroll = () => {
      let currentSection = "";

      linkedSections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 120) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    const headerElement = document.querySelector("header");
    if (element && headerElement) {
      const offset = -(headerElement.offsetHeight + 20);
      const elementPosition = element.offsetTop + offset;
      window.scrollTo({ behavior: "smooth", top: elementPosition });
    }
  };

  return (
    <div className="flex flex-col sticky top-20 self-start text-[14px] text-ds-gray-600 gap-1 -z-10">
      <div className="text-ds-gray-1000 font-medium">On this page</div>
      {sections.map((section, index) => (
        <div
          onClick={() => handleScrollTo(section.idLinkedElement)}
          key={index}
          className={
            "cursor-pointer " +
            (section.idLinkedElement == activeSection ? "text-ds-blue-700" : "")
          }
        >
          {section.title}
        </div>
      ))}
    </div>
  );
};

export default TableOfContents;
