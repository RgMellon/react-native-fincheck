import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

export function IncomeIcon() {
  return (
    <Svg width={44} height={44} viewBox="0 0 44 44" fill="none">
      <Rect x={1} y={1} width={42} height={42} rx={21} fill="#EBFBEE" />
      <Path
        d="M23.2591 28.3475H16.4218C14.5341 28.3475 13.36 27.0156 13.36 25.1307V18.0282C13.36 16.1432 14.5341 14.8113 16.4209 14.8113H27.5791C29.4602 14.8113 30.64 16.1432 30.64 18.0282V19.9467"
        stroke="#2B8A3E"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M26.5377 25.5511L28.5889 23.5L30.6391 25.5511"
        stroke="#2B8A3E"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M28.5889 23.5L28.5892 28.3477"
        stroke="#2B8A3E"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.4442 18.1731H17.7911"
        stroke="#2B8A3E"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.8027 21.5803C19.8027 20.3671 20.7863 19.3844 21.9987 19.3844C23.212 19.3844 24.1956 20.3671 24.1956 21.5803C24.1956 22.7937 23.212 23.7763 21.9987 23.7763C20.7863 23.7763 19.8027 22.7937 19.8027 21.5803Z"
        stroke="#2B8A3E"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Rect
        x={1}
        y={1}
        width={42}
        height={42}
        rx={21}
        stroke="white"
        strokeWidth={2}
      />
    </Svg>
  );
}
