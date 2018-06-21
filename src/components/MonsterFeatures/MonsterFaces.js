import React from 'react'

const XMLNS = 'http://www.w3.org/2000/svg'

export const FaceCircle = (props) => {
  return (
    <svg xmlns={XMLNS} viewBox='-144.288 -133.593 375 375'>
      <circle fill={props.fillColor} cx='43.213' cy='43.212' r='43.213' />
    </svg>
  )
}

export const FaceTrapezoid = (props) => {
  return (
    <svg xmlns={XMLNS} viewBox='-145.329 -143.444 375 375'>
      <path fill={props.fillColor}
        d='M79.102,45.434c-0.787,5.443-5.931,9.897-11.431,9.897H52.654c-5.5,0-14.5,0-20,0H16.671	c-5.5,0-10.644-4.454-11.431-9.897L0.102,9.897C-0.685,4.454,3.171,0,8.671,0h67c5.5,0,9.356,4.454,8.569,9.897L79.102,45.434z'
      />
    </svg>
  )
}

export const FaceOval = (props) => {
  return (
    <svg xmlns={XMLNS} viewBox='-144 -141.976 375 375'>
      <path fill={props.fillColor}
        d='M87,27.666c0,15.217-13.5,27.666-30,27.666H30c-16.5,0-30-12.449-30-27.666	C0,12.45,13.5,0,30,0h27C73.5,0,87,12.45,87,27.666z'
      />
    </svg>
  )
}

export const FaceArcUp = (props) => {
  return (
    <svg xmlns={XMLNS} viewBox='-144 -140.893 375 375'>
      <path fill={props.fillColor}
        d='M87,7.513c0-5.5-4.384-8.539-9.83-7.197c-23.25,4.634-44.089,4.634-67.34,0	C4.383-1.026,0,2.013,0,7.513c0,11.777,0,23.554,0,35.33c0,5.5,4.383,11.461,9.83,12.804c23.251,4.634,44.089,4.634,67.34,0	C82.616,54.304,87,48.343,87,42.843C87,31.066,87,19.29,87,7.513z'
      />
    </svg>
  )
}

export const FaceArcDown = (props) => {
  return (
    <svg xmlns={XMLNS} viewBox='-144 -143.207 375 375'>
      <path fill={props.fillColor}
        d='M87,51.611c0,5.5-4.384,8.536-9.83,7.194c-23.253-4.633-44.088-4.633-67.341,0	C4.383,60.147,0,57.111,0,51.611c0-11.777,0-23.556,0-35.333c0-5.5,4.383-11.462,9.829-12.804c23.252-4.632,44.089-4.632,67.341,0	C82.616,4.815,87,10.778,87,16.278C87,28.056,87,39.834,87,51.611z'
      />
  </svg>
  )
}

export const FaceRectangle = (props) => {
  return (
    <svg xmlns={XMLNS} viewBox='-144 -143.778 375 375'>
      <path fill={props.fillColor}
        d='M87,45.331c0,5.5-4.5,10-10,10H10c-5.5,0-10-4.5-10-10V10C0,4.5,4.5,0,10,0h67	c5.5,0,10,4.5,10,10V45.331z'
      />
    </svg>
  )
}
