import * as React from "react"
import Svg, {
  ForeignObject,
  Rect,
  Path,
  Defs,
  ClipPath,
  SvgProps
} from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: div */

interface EthLogoProps extends SvgProps {
  xmlns?: string;
}

function EthIcon(props: EthLogoProps) {
  return (
    <Svg
      width={48}
      height={45}
      viewBox="0 0 48 45"
      fill="none"
      xmlns={props.xmlns || "http://www.w3.org/2000/svg"}
      {...props}
    >
      <ForeignObject x={-13} y={-13} width={74} height={71}></ForeignObject>
      <Rect
        data-figma-bg-blur-radius={13}
        width={48}
        height={45}
        rx={6}
        fill="#fff"
        fillOpacity={0.1}
      />
      <Path
        d="M24.166 11.446l-.147.471v13.659l.147.138 6.763-3.748-6.763-10.52z"
        fill="#fff"
      />
      <Path
        d="M24.166 11.446l-6.763 10.52 6.763 3.748V11.446zM24.166 27.777l-.083.095v4.865l.083.228 3.384-4.467 3.383-4.467-6.767 3.746z"
        fill="#fff"
      />
      <Path
        d="M24.166 32.965v-5.188l-6.762-3.746 6.762 8.934zM24.166 25.714l6.763-3.748-6.763-2.882v6.63z"
        fill="#fff"
      />
      <Path d="M17.404 21.966l6.762 3.748v-6.63l-6.762 2.882z" fill="#fff" />
      <Defs>
        <ClipPath id="bgblur_0_1_79_clip_path">
          <Rect width={48} height={45} rx={6} x={13} y={13} />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default EthIcon
