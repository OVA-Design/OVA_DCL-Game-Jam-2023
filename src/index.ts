import {
  engine,
  GltfContainer,
  InputAction,
  inputSystem,
  Material,
  MeshCollider,
  MeshRenderer,
  pointerEventsSystem,
  Transform
} from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'

import { BounceScaling, bounceScalingSystem, circularSystem } from './systems'

import { setupUi } from './ui'
import { Spinner } from './components'
import { createCube } from './factory'
import { skyboxSetup, skyboxSetup2 } from './skybox'
import { skyVideoSetup } from './videoMaterials'
import { elevatorSetup } from './elevator'
import { platformSetup } from './platformSetup'
import { ballGameSetup } from './ballGame'

// Defining behavior. See `src/systems.ts` file.
engine.addSystem(circularSystem)
engine.addSystem(bounceScalingSystem)

export function main() {
  // draw UI
  // setupUi()

  platformSetup()

  // Setup skybox
  skyboxSetup()
  skyboxSetup2()

  // skyVideoSetup()

  // elevator transition from scene 1 to scene 2
  // elevatorSetup()

  // Import balloon game at scene 2
  ballGameSetup()

  // Import models
  // scene 1 collider
}
