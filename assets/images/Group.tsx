import * as React from "react"
import Svg, { G, Path, SvgProps } from "react-native-svg"

interface GroupProps extends SvgProps {
  xmlns?: string;
}

function SvgComponent(props: GroupProps) {
  return (
    <Svg
      width={375}
      height={257}
      viewBox="0 0 375 257"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G opacity={0.5}>
        <Path
          d="M-34.515 152.65s87.435 53.482 146.369 29.335c60.217-24.673 11.611-98.603 72.073-122.768 53.615-21.428 86.016 46.758 136.089 19.498 32.656-17.779 51.765-67.985 51.765-67.985"
          stroke="#F2AF1A"
        />
        <Path
          d="M-29.138 169.473s87.434 53.482 146.369 29.335c60.217-24.673 11.611-98.603 72.072-122.767 53.615-21.428 86.017 46.757 136.09 19.497 32.656-17.778 51.764-67.985 51.764-67.985"
          stroke="#48D4A5"
        />
        <Path
          d="M-23.354 187.571s87.434 53.482 146.369 29.335c60.217-24.673 11.611-98.603 72.072-122.767 53.615-21.428 86.017 46.757 136.09 19.497 32.656-17.778 51.764-67.985 51.764-67.985"
          stroke="#326CF9"
        />
      </G>
    </Svg>
  )
}

export default SvgComponent
