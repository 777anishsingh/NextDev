import React, { useContext, useEffect, useRef, useState } from "react";
import WebPageTools from "./WebPageTools";
import ElementSettingSection from "./ElementSettingSection";
import ImageSettingSection from "./ImageSettingSection";
import { onSaveContext } from "@/context/onSaveContext";
import { log } from "node:console";
import axios from "axios";
import { toast } from "sonner";
import { useParams, useSearchParams } from "next/navigation";

type Prop = {
  generatedCode: string
}

function WebsiteDesign({ generatedCode }: Prop) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [selectedScreenSize, setSelectedScreenSize] = useState('web')
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>()
  const { onSaveData, setOnSaveData } = useContext(onSaveContext)
  const { projectId } = useParams()
  const params = useSearchParams()
  const frameId = params.get('frameId')

  const HTML_CODE = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="AI Website Builder - Modern TailwindCSS + Flowbite Template">
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script> 
    
        <!-- Flowbite CSS & JS -->
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css"
      rel="stylesheet"
    />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>

    <!-- Font Awesome / Lucide -->
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>

    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <!-- AOS -->
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css"
      rel="stylesheet"
    />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>

    <!-- GSAP -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>


    <!-- Swiper -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css"
    />
    <script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>

    <!-- Tippy.js -->
    <link
      rel="stylesheet"
      href="https://unpkg.com/tippy.js@6/dist/tippy.css"
    />
    <script src="https://unpkg.com/@popperjs/core@2"></script>
    <script src="https://unpkg.com/tippy.js@6"></script>
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
      selectedEl.style.outline = "4px solid #00FF00";
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


  useEffect(() => {
    onSaveData && onSaveCode();
  }, [onSaveData])

  const onSaveCode = async () => {
    if (iframeRef.current) {
      try {

        const iframeDoc = iframeRef.current.contentDocument
          || iframeRef.current.contentWindow?.document

        if (iframeDoc) {
          const cloneDoc = iframeDoc.documentElement.cloneNode(true) as HTMLElement
          // remove all outlines
          const AllEls = cloneDoc.querySelectorAll<HTMLElement>("*")
          AllEls.forEach((el) => {
            el.style.outline = '';
            el.style.cursor = ''
          })
          const html = cloneDoc.outerHTML
          console.log("HTML to Save", html);

          const result = await axios.put('/api/frames', {
            designCode: html,
            frameId: frameId,
            projectId: projectId
          })
          console.log(result.data);
          toast.success("Saved!")

        }
      } catch (error) {

      }
    }
  }

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