import * as React from "react"
import Svg, { Mask, Path, G } from "react-native-svg"

function SvgComponent() {
  return (
    <Svg
      width={40}
      height={40}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Mask
        id="a"
        style={{
          maskType: "luminance"
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={40}
        height={40}
      >
        <Path
          d="M13 26c7.18 0 13-5.82 13-13S20.18 0 13 0 0 5.82 0 13s5.82 13 13 13z"
          fill="#fff"
        />
      </Mask>
      <G mask="url(#a)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.215 7.786h-3.55V12.5H7.5v1.571h2.166v4.715h3.55c1.873 0 2.276-.197 3.084-.589l.196-.095c.95-.456 1.688-1.097 2.214-1.925.527-.827.79-1.791.79-2.891s-.263-2.064-.79-2.892c-.526-.827-1.264-1.469-2.214-1.925-.95-.455-2.043-.683-3.28-.683zm-.912 6.285v2.625h.782c1.14 0 2.049-.307 2.727-.92.679-.612 1.018-1.443 1.018-2.49 0-1.048-.34-1.878-1.018-2.491-.678-.613-1.587-.92-2.727-.92h-.782V12.5h2.524v1.571h-2.524z"
          fill="#fff"
        />
      </G>
    </Svg>
  )
}

export default SvgComponent
