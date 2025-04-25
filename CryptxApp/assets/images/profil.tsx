import * as React from "react"
import Svg, { Circle, Defs, Pattern, Image, SvgProps } from "react-native-svg"

interface ProfilProps extends SvgProps {
  xmlns?: string;
}

function Profil(props: ProfilProps) {
  return (
    <Svg
      width={48}
      height={48}
      viewBox="0 0 48 48"
      fill="none"
      xmlns={props.xmlns || "http://www.w3.org/2000/svg"}
      {...props}
    >
      <Circle cx={24} cy={24} r={24} fill="#C4C4C4" />
      <Circle cx={24} cy={24} r={24} fill="url(#pattern0_1_60)" />
      <Defs>
        <Pattern
          id="pattern0_1_60"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <Image
            width={48}
            height={48}
            href={require('./profil.svg')}
          />
        </Pattern>
      </Defs>
    </Svg>
  )
}

export default Profil
