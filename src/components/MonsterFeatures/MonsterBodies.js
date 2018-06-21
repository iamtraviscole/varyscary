import React from 'react'

const XMLNS = 'http://www.w3.org/2000/svg'

export const BodyCircle = (props) => {
  return (
    <svg xmlns={XMLNS} viewBox='-115.5 -115.5 375 375'>
      <circle fill={props.fillColor}
        stroke={props.strokeColor}
        strokeDasharray={props.strokeDasharray}
        cx='72' cy='72' r='72' />
    </svg>
  )
}

export const BodySquare = (props) => {
  return (
    <svg xmlns={XMLNS} viewBox='-115.5 -115.5 375 375'>
      <path fill={props.fillColor}
        stroke={props.strokeColor}
        strokeDasharray={props.strokeDasharray}
        d='M0,10C0,4.5,4.5,0,10,0h124c5.5,0,10,4.5,10,10v124c0,5.5-4.5,10-10,10H10c-5.5,0-10-4.5-10-10V10z' />
  </svg>
  )
}

export const BodyTrapezoid = (props) => {
  return (
    <svg xmlns={XMLNS} viewBox='-116.421 -115.5 375 375'>
    <path fill={props.fillColor}
      stroke={props.strokeColor}
      strokeDasharray={props.strokeDasharray}
      d='M0.047,9.953C-0.485,4.479,3.579,0,9.079,0h124c5.5,0,9.564,4.479,9.032,9.953l-12.064,124.094	c-0.532,5.475-5.468,9.953-10.968,9.953h-96c-5.5,0-10.436-4.479-10.968-9.953L0.047,9.953z' />
</svg>
  )
}

export const BodySquareRoundTop = (props) => {
  return (
    <svg xmlns={XMLNS} viewBox='-115.999 -116 375 375'>
    <path fill={props.fillColor}
      stroke={props.strokeColor}
      strokeDasharray={props.strokeDasharray}
      d='M134.002,144c5.5,0,10-4.5,10-10V72.004C144.002,32.237,111.766,0,72.001,0S0,32.237,0,72.004V134	c0,5.5,4.5,10,10,10H134.002z' />
</svg>
  )
}

export const BodyGhost = (props) => {
  return (
    <svg xmlns={XMLNS} viewBox='-115.499 -115.5 375 375'>
      <path fill={props.fillColor}
        stroke={props.strokeColor}
        strokeDasharray={props.strokeDasharray}
        d='M72,0C32.236,0,0,32.235,0,72v50.401v15.541c0,0-0.031,5.434,5.771,5.434	c15.223,0,13.58-19.376,24.111-19.376s10.531,20,21.063,20s10.531-20,21.061-20s10.529,20,21.059,20	c10.527,0,10.529-19.997,21.057-20c10.529,0.003,8.889,19.376,24.109,19.376c5.803,0,5.771-5.434,5.771-5.434v-15.541V72	C144.002,32.235,111.766,0,72,0z' />
    </svg>
  )
}

export const BodyJellyfish = (props) => {
  return (
    <svg xmlns={XMLNS} viewBox='0 0 375 375'>
      <path fill={props.fillColor}
        stroke={props.strokeColor}
        strokeDasharray={props.strokeDasharray}
        d='M246.25,245.9c-6.307-25.521,11.184-54.984,12.401-77.275c0.463-4.682,0.251-7.972,0.251-7.972l-0.018-0.001	c-0.094-3.504-1.002-7.399-2.682-11.366c-0.05-0.161-0.091-0.313-0.143-0.477c-0.24-0.509-0.501-1.006-0.759-1.504	c-1.274-2.618-2.876-5.244-4.81-7.791c-4.476-5.895-9.904-10.316-15.217-12.829c-13.227-8.028-30.201-12.145-47.276-12.352v-0.015	c-0.166,0-0.332,0.006-0.5,0.007c-0.166-0.001-0.332-0.007-0.5-0.007v0.015c-17.001,0.206-33.905,4.292-47.107,12.253	c-5.376,2.495-10.886,6.958-15.418,12.927c-2.173,2.862-3.928,5.826-5.266,8.764c-0.087,0.178-0.3,0.643-0.319,0.701	c-1.765,4.073-2.711,8.078-2.807,11.672l-0.018,0.001c0,0-0.243,3.772,0.359,8.986c1.667,21.903,18.292,50.427,12.527,75.374	c-0.408,1.128-0.643,2.335-0.643,3.597c0,6.016,5.049,10.891,11.279,10.891c4.463,0,8.311-2.51,10.139-6.143	c1.217,0,2.436,0,3.652,0c1.828,3.633,5.676,6.143,10.139,6.143c4.465,0,8.311-2.51,10.141-6.143c1.217,0,2.434,0,3.652,0	c1.828,3.633,5.674,6.143,10.139,6.143c4.463,0,8.311-2.51,10.139-6.143c1.217,0,2.436,0,3.652,0	c1.828,3.633,5.676,6.143,10.139,6.143c4.465,0,8.311-2.51,10.141-6.143c1.217,0,2.434,0,3.652,0	c1.828,3.633,5.674,6.143,10.139,6.143c6.229,0,11.279-4.875,11.279-10.891c0-0.907-0.127-1.784-0.346-2.628	C246.248,245.93,246.25,245.9,246.25,245.9z' />
    </svg>
  )
}

export const BodyRoundTriangle = (props) => {
  return (
    <svg xmlns={XMLNS} viewBox='-117.146 -115.5 375 375'>
      <path fill={props.fillColor}
        stroke={props.strokeColor}
        strokeDasharray={props.strokeDasharray}
        d='M140.706,44.508C140.907,7.889,106.945,0.001,70.354,0C33.752-0.001-0.198,7.881,0.001,44.508	C0.203,81.832,26.247,144.001,70.354,144C114.454,143.999,140.5,81.823,140.706,44.508z' />
  </svg>
  )
}

export const BodyShell = (props) => {
  return (
    <svg xmlns={XMLNS} viewBox='-109.603 -115.5 375 375'>
      <path fill={props.fillColor}
        stroke={props.strokeColor}
        strokeDasharray={props.strokeDasharray}
        d='M132.781,143.02c4.088,2.439,9.127,0.204,10.93-5.337c7.416-24.563,11.492-48.693,12.084-74.354	C152.471,19.009,119.223-0.002,77.898,0C36.586,0.002,3.307,19.002,0,63.329c0.588,25.66,4.664,49.793,12.084,74.354	c1.801,5.541,6.842,7.776,10.93,5.337C60.719,122.689,95.076,122.69,132.781,143.02z' />
  </svg>
  )
}
