import React from 'react'
import "./Spinner.css";
export default function ProgressBar(props) {
    let {
        size = 5000,
        progress = 0,
        trackWidth = 150,
        trackColor = `#ddd`,
        indicatorWidth = 150,
        indicatorColor = `#07c`,
        indicatorCap = `round`,
        label = {label},
        labelColor = `#333`,
        spinnerMode = false,
        spinnerSpeed = 1
      } = props
    
      const center = size / 2,
            radius = center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth),
            dashArray = 2 * Math.PI * radius,
            dashOffset = dashArray * ((100 - progress) / 100)
    
     // let hideLabel = (size < 50 || !label.length || spinnerMode) ? true : false
    
  return (
    <>
 <div
          className="svg-pi-wrapper"
          style={{ width: size, height: size }}
        >
          <svg
            className="svg-pi" 
            style={{ width: size, height: size }}
          >
            <circle
              className="svg-pi-track"
              cx={center}
              cy={center}
              fill="transparent"
              r={50}
              stroke={trackColor}
              strokeWidth={trackWidth}
            />
            <circle
              className={`svg-pi-indicator ${
                spinnerMode ? "svg-pi-indicator--spinner" : ""
              }`}
              style={{ animationDuration: spinnerSpeed * 1000 }}
              cx={center}
              cy={center}
              fill="transparent"
              r={radius}
              stroke={indicatorColor}
              strokeWidth={indicatorWidth}
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              strokeLinecap={indicatorCap}
            />
          </svg>
  
         
            <div 
              className="svg-pi-label" 
              style={{ color: labelColor }}
            >
              <span className="svg-pi-label__loading">
                {label}
              </span>
  
              
            </div>
          
        </div>
    </>
  )
}
