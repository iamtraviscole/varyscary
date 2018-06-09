import React from 'react'

import * as MonsterBodies from '../components/MonsterFeatures/MonsterBodies'
import * as MonsterFaces from '../components/MonsterFeatures/MonsterFaces'

export const monsterComponents = {
  bodies: {
    body1: <MonsterBodies.Body1 />,
    body2: <MonsterBodies.Body2 />,
    body3: <MonsterBodies.Body3 />,
    body4: <MonsterBodies.Body4 />,
    body5: <MonsterBodies.Body5 />,
    body6: <MonsterBodies.Body6 />,
    body7: <MonsterBodies.Body7 />,
    body8: <MonsterBodies.Body8 />
  },
  faces: {
    face1: <MonsterFaces.Face1 />,
    face2: <MonsterFaces.Face2 />,
    face3: <MonsterFaces.Face3 />,
    face4: <MonsterFaces.Face4 />,
    face5: <MonsterFaces.Face5 />,
    face6: <MonsterFaces.Face6 />
  }
}
