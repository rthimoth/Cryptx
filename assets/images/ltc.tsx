import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props:any) {
  return (
    <Svg
      width={70}
      height={70}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12.546 15.176l.58-2.185 1.373-.501.342-1.284-.011-.032-1.353.494L14.452 8h-2.763l-1.274 4.787-1.064.388L9 14.5l1.063-.389-.751 2.822h7.352l.472-1.756h-4.59z"
        fill="#E4E4E4"
      />
    </Svg>
  )
}

export default SvgComponent