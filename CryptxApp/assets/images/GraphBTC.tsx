import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

interface GraphBtcProps extends SvgProps {
  xmlns?: string;
}

function SvgComponent(props: GraphBtcProps) {
  return (
    <Svg
      width={69}
      height={21}
      viewBox="0 0 69 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M.5 4.607l4.457 10.394a1 1 0 00.919.606H9.167a1 1 0 00.97-.755l.745-2.952c.208-.824 1.302-.998 1.755-.28v0c.177.281.485.451.817.451h3.775a1 1 0 00.75-.338l.725-.82a1 1 0 011.672.277l1.517 3.641c.368.885 1.648.795 1.89-.131l2.14-8.198a1 1 0 01.347-.531l2.34-1.855a1 1 0 01.836-.192l2.498.55a1 1 0 01.756.737l1.514 6.159c.221.902 1.446 1.04 1.864.21l2.665-5.294a.998.998 0 00.081-.225l.97-4.199c.255-1.1 1.854-1 1.97.123l1.159 11.285c.12 1.175 1.822 1.206 1.985.035l.972-6.99c.16-1.143 1.806-1.153 1.98-.013l1.477 9.745c.177 1.169 1.88 1.117 1.985-.06l.48-5.362a1 1 0 01.996-.91h4.803a1 1 0 01.985.827l1.244 7.11c.152.873 1.282 1.13 1.798.41l1.086-1.518a1 1 0 011.504-.142L67.988 20"
        stroke="#FF8266"
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default SvgComponent
