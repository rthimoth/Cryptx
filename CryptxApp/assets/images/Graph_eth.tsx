import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

interface GraphEthProps extends SvgProps {
  xmlns?: string;
}

function SvgComponent(props: GraphEthProps) {
  return (
    <Svg
      width={67}
      height={28}
      viewBox="0 0 67 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M.548 9l5.319-7.442c.533-.746 1.707-.44 1.807.473L9.36 17.395a1 1 0 00.994.89H15.1a1 1 0 00.996-.91l.48-5.361c.106-1.178 1.808-1.23 1.985-.061l1.478 9.745c.173 1.14 1.82 1.13 1.98-.013l.971-6.99c.163-1.17 1.865-1.14 1.986.035l1.159 11.285c.115 1.124 1.715 1.224 1.97.123l.969-4.2c.018-.077.045-.153.081-.224l2.666-5.295c.417-.83 1.642-.691 1.864.211l1.514 6.159a1 1 0 00.756.738l2.497.55a1 1 0 00.837-.193l2.34-1.855a1 1 0 00.346-.531l2.14-8.198c.242-.926 1.523-1.016 1.89-.131l1.517 3.641a1 1 0 001.673.278l.725-.821a1 1 0 01.75-.338h3.774c.332 0 .64.17.818.45v0c.453.719 1.546.545 1.754-.279l.745-2.952a1 1 0 01.97-.755h.838a1 1 0 00.964-.735l1.792-6.508a1 1 0 011.556-.541l1.194.876a1 1 0 01.389.609l.886 4.406"
        stroke="#48D49E"
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default SvgComponent
