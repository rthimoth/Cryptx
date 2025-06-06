import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent() {
  return (
    <Svg
      width={60}
      height={60}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M10.467 10.244L13.497 20 9 17.112l1.467-6.868L13.497 6v2.977L9 17.112h9l-4.498-8.135V6l3.031 4.244L18 17.112 13.502 20l3.031-9.756"
        stroke="#fff"
        strokeWidth={0.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
