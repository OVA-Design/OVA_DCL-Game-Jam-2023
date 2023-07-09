import {
  engine,
} from '@dcl/sdk/ecs'
import { setupUi } from './ui'
import { playSound } from './factory'
import { skyboxSetup, skyboxSetup2 } from './skybox'
import { skyVideoSetup } from './videoMaterials'
import { elevatorSetup } from './elevator'
import { platformSetup } from './platformSetup'
import { ballGameSetup } from './ballGame'
import * as utils from '@dcl-sdk/utils'
import { orbitPlanetSetup } from './orbitPlanets'
import { movePlayerTo } from '~system/RestrictedActions'
import { Vector3 } from '@dcl/sdk/math'


export function main() {
  // draw UI
  // setupUi()

  // play background music
  playSound('sounds/bgMusic.mp3', 2)

  // add walkable models
  platformSetup()
  orbitPlanetSetup()

  // Setup skybox
  skyboxSetup()
  
  utils.timers.setTimeout(() => {
    skyboxSetup2()
  }, 30000) //millisecond delay 1s = 1000ms

  utils.timers.setTimeout(() => {
    // Import balloon game at scene 2
    ballGameSetup()
  }, 32000) //millisecond delay 1s = 1000ms

  // Import models
  // scene 1 collider
}
