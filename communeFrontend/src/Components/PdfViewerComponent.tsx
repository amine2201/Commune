import { useEffect, useRef } from "react";

export default function PdfViewerComponent(props:any) {
const setIsSigned=props.setIsSigned;
const setBuffer=props.setBuffer;
const containerRef = useRef(null);
let instance:any, PSPDFKit: any ;

useEffect(() => {
	const container = containerRef.current;
	
	(async function() {
		PSPDFKit = await import("pspdfkit");
		PSPDFKit.unload(container);
		instance = await PSPDFKit.load({
		// Container where PSPDFKit should be mounted.
		container,
		// The document to open.
		document: props.document,
		// Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
		baseUrl: `${window.location.protocol}//${window.location.host}//`
		});
		instance.addEventListener("inkSignatures.create", () => {setIsSigned(true)});
		instance.addEventListener("inkSignatures.delete", () => {setIsSigned(false)});
		instance.addEventListener("annotations.willChange", () => { 
			instance.exportPDF({flatten:true}).then(function (buffer:any) {
			setBuffer(buffer);
		  });
			
		  });
		  
	})();

	return () => PSPDFKit && PSPDFKit.unload(container);
}, []);

return (
	<div ref={containerRef} style={{ width: "100%", height: "100vh"}}/>
);
}