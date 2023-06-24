import PdfViewerComponent from './PdfViewerComponent';
import Navbar from './Navbar';
import { useState } from 'react';
const SignComponent=()=> {
        const [isSigned, setIsSigned] = useState(false);
        const [buffer, setBuffer] = useState(null);
        const props={document:"document.pdf",setIsSigned:setIsSigned,setBuffer:setBuffer};
	return (
        <>
        <Navbar isAuthenticated={true}/>
        <div>
			<PdfViewerComponent {...props}/>
	</div>
        <div></div>
        <button disabled={!isSigned} onClick={()=>{if(buffer!=null) console.log(buffer);}}>Submit</button>
        </>
		
	);
}
export default SignComponent;