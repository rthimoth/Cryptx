import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent() {
  return (
    <Svg
      width={40}
      height={40}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.282 11.883l2.72-2.718 2.72 2.72 1.58-1.582L13.003 6 8.7 10.301l1.582 1.582zM6 13l1.582-1.582L9.164 13l-1.582 1.582L6 13zm7.001 3.836l-2.719-2.719-1.584 1.58.002.003L13 20l4.302-4.303h.001l-1.582-1.58-2.72 2.72zm3.835-3.835l1.582-1.582L20 13l-1.582 1.581-1.582-1.581zm-3.835-1.607l1.605 1.605h.001l-.001.002L13 14.606l-1.604-1.603-.002-.004.002-.002.28-.28.138-.137L13 11.394z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SvgComponent
