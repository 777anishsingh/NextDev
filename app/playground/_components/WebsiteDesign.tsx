import React, { useEffect, useRef, useState } from "react";
import WebPageTools from "./WebPageTools";
import ElementSettingSection from "./ElementSettingSection";
import ImageSettingSection from "./ImageSettingSection";

type Prop = {
  generatedCode: string
}

function WebsiteDesign({ generatedCode }: Prop) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [selectedScreenSize, setSelectedScreenSize] = useState('web')
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>()
  const HTML_CODE = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="AI Website Builder - Modern TailwindCSS + Flowbite Template">
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>  
  </head>


      </head>
      <body id="root"></body>
      </html>
    `

  // Initialize iframe shell once
  useEffect(() => {
    if (!iframeRef.current) return;
    const doc = iframeRef.current.contentDocument;
    if (!doc) return;

    doc.open();
    doc.write(HTML_CODE);
    doc.close();

    let hoverEl: HTMLElement | null = null;
    let selectedEl: HTMLElement | null = null;



    const handleMouseOver = (e: MouseEvent) => {
      if (selectedEl) return;
      const target = e.target as HTMLElement;
      if (hoverEl && hoverEl !== target) {
        hoverEl.style.outline = "";
      }
      hoverEl = target;
      hoverEl.style.outline = "3px dashed red";
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (selectedEl) return;
      if (hoverEl) {
        hoverEl.style.outline = "";
        hoverEl = null;
      }
    };

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const target = e.target as HTMLElement;

      if (selectedEl && selectedEl !== target) {
        selectedEl.style.outline = "";
        selectedEl.removeAttribute("contenteditable");
      }

      selectedEl = target;
      selectedEl.style.outline = "2px solid blue";
      selectedEl.setAttribute("contenteditable", "true");
      selectedEl.focus();
      console.log("Selected element:", selectedEl);
      setSelectedElement(selectedEl)

    };

    const handleBlur = () => {
      if (selectedEl) {
        console.log("Final edited element:", selectedEl.outerHTML);
      }
    };


    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedEl) {
        selectedEl.style.outline = "";
        selectedEl.removeAttribute("contenteditable");
        selectedEl.removeEventListener("blur", handleBlur);
        selectedEl = null;
      }
    };

    doc.body?.addEventListener("mouseover", handleMouseOver);
    doc.body?.addEventListener("mouseout", handleMouseOut);
    doc.body?.addEventListener("click", handleClick);
    // key events on the iframe window are more reliable
    iframeRef.current.contentWindow?.addEventListener("keydown", handleKeyDown);

    // Cleanup on unmount
    return () => {
      doc.body?.removeEventListener("mouseover", handleMouseOver);
      doc.body?.removeEventListener("mouseout", handleMouseOut);
      doc.body?.removeEventListener("click", handleClick);
      iframeRef.current?.contentWindow?.removeEventListener("keydown", handleKeyDown);
    };
  }, [generatedCode]);



  // Update body only when code changes
  useEffect(() => {
    if (!iframeRef.current) return;
    const doc = iframeRef.current.contentDocument;
    if (!doc) return;

    const root = doc.getElementById("root");
    if (root) {
      root.innerHTML =
        (generatedCode || '')
          ?.replace(/```html/gi, "")
          .replace(/```/g, "")
          .replace(/<\/?html.*?>/gi, "")
          .replace(/<\/?head.*?>/gi, "")
          .replace(/<\/?body.*?>/gi, "")
          .replace(/<meta[^>]*>/gi, "")
          .replace(/<title[^>]*>.*?<\/title>/gi, "") ?? "";
    }
  }, [generatedCode]);

  return (

    <div className="flex gap-2 w-full">
      <div className="p-2 w-full flex items-center flex-col">

        <iframe
          ref={iframeRef}
          className={`${selectedScreenSize == 'web' ? 'w-full h-[560px] border-2 rounded-2xl bg-[#1B1D1D] ' : 'w-[430px] h-[560px] border-2 rounded-2xl bg-[#1B1D1D]'}`}
          sandbox="allow-scripts allow-same-origin"
        />
        <WebPageTools selectedScreenSize={selectedScreenSize}
          setSelectedScreenSize={(e: string) => setSelectedScreenSize(e)}
          generatedCode={generatedCode}
        />
      </div>
      {/* <ElementSettingSection selectedEl={selectedElement} clearSelection={() => setSelectedElement(null)} /> */}


      {/* @ts-ignore */}
      {selectedElement?.tagName === "IMG" ? (<ImageSettingSection selectedEl={selectedElement} />
      ) : selectedElement ? (
        <ElementSettingSection
          selectedEl={selectedElement}
          clearSelection={() => setSelectedElement(null)}
        />
      ) : null}

    </div>
  );
}

export default WebsiteDesign