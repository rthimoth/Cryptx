import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Account({color}: { color?: string }) {
  return (
    <Svg
      width={16}
      height={21}
      viewBox="0 0 16 21"
      fill="none"
    >
      <Path
        d="M16 21h-2v-2a3 3 0 00-3-3H5a3 3 0 00-3 3v2H0v-2a5 5 0 015-5h6a5 5 0 015 5v2zm-8-9A6 6 0 118-.001 6 6 0 018 12zm0-2a4 4 0 100-8 4 4 0 000 8z"
        fill={color || "#fff"}
      />
    </Svg>
  )
}

export default Account
