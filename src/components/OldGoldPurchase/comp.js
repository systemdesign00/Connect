import React ,{useEffect} from 'react'

import MobileComponent from "./MobileComponent";
import DesktopComponent from "./DesktopComponent";

export default function Comp() {
 const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 620;

   useEffect(() => {
    /* Inside of a "useEffect" hook add an event listener that updates
       the "width" state variable when the window size changes */
    window.addEventListener("resize", () => setWidth(window.innerWidth));

    /* passing an empty array as the dependencies of the effect will cause this
       effect to only run when the component mounts, and not each time it updates.
       We only want the listener to be added once */
  }, []);
  return width < breakpoint ? <MobileComponent /> : <DesktopComponent />;
}


