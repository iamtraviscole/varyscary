// if unlockable monster features are implemented in the future then fetch these
//  from user's unlocked features instead of importing and creating array
import * as MonsterBodies from '../components/MonsterFeatures/MonsterBodies'
import * as MonsterFaces from '../components/MonsterFeatures/MonsterFaces'
import * as MonsterHeadwear from '../components/MonsterFeatures/MonsterHeadwear'
import * as MonsterEyes from '../components/MonsterFeatures/MonsterEyes'
import * as MonsterMouths from '../components/MonsterFeatures/MonsterMouths'
import * as MonsterLeftArms from '../components/MonsterFeatures/MonsterLeftArms'
import * as MonsterRightArms from '../components/MonsterFeatures/MonsterRightArms'
import * as MonsterLegs from '../components/MonsterFeatures/MonsterLegs'

const createFeaturesArray = (feature, collection) => {
  let featuresArray = []
  for (const feature in collection) {featuresArray.push(feature)}
  return featuresArray
}

export default {
  bodies: createFeaturesArray('body', MonsterBodies),
  faces: createFeaturesArray('face', MonsterFaces),
  headwear: createFeaturesArray('headwear', MonsterHeadwear),
  eyes: createFeaturesArray('eyes', MonsterEyes),
  mouths: createFeaturesArray('mouth', MonsterMouths),
  leftArms: createFeaturesArray('leftArm', MonsterLeftArms),
  rightArms: createFeaturesArray('rightArm', MonsterRightArms),
  legs: createFeaturesArray('legs', MonsterLegs),
  colors: ['#80f0ff', '#2e7bed', '#034887', '#01ff70', '#32cd32', '#136b48',
  '#fffc00', '#ff9900', '#af5a03', '#f29090', '#fa3232', '#a20303',
  '#f892fa', '#d808eb', '#7d0496', '#aaaaaa', '#000000']
}
