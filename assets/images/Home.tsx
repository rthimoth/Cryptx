import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Home({ color }: { color?: string }) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
    >
      <Path
        d="M11 18a1 1 0 01-1-1V9a1 1 0 011-1h6a1 1 0 011 1v8a1 1 0 01-1 1h-6zM1 10a1 1 0 01-1-1V1a1 1 0 011-1h6a1 1 0 011 1v8a1 1 0 01-1 1H1zm4.5-2a.5.5 0 00.5-.5v-5a.5.5 0 00-.5-.5h-3a.5.5 0 00-.5.5v5a.5.5 0 00.5.5h3zM1 18a1 1 0 01-1-1v-4a1 1 0 011-1h6a1 1 0 011 1v4a1 1 0 01-1 1H1zm1-2.5a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-3a.5.5 0 00-.5.5v1zm10 0a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-5a.5.5 0 00-.5-.5h-3a.5.5 0 00-.5.5v5zM10 1a1 1 0 011-1h6a1 1 0 011 1v4a1 1 0 01-1 1h-6a1 1 0 01-1-1V1zm2.5 1a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-3z"
        fill={color || "#fff"}
      />
    </Svg>
  )
}

export default Home
