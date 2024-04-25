import React, { useRef } from "react";
import ReactToPrint from "react-to-print";


export default function Status  ()  {
  const componentRef = useRef();

const pageStyle = `
  @page {
    size: 100mm 15mm;
  }
`;

  return (
    <div>
      <ReactToPrint
     pageStyle={pageStyle}
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
      <div ref={componentRef}>
        <h4>Hello Print</h4>
      </div>
    </div>
  );
};
