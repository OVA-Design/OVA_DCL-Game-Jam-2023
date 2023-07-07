import { engine, GltfContainer, InputAction, inputSystem, Material, MeshCollider, pointerEventsSystem, Transform } from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'

import { BounceScaling, bounceScalingSystem, circularSystem } from './systems'

import { setupUi } from './ui'
import { Spinner } from './components'
import { createCube } from './factory'
import { skyboxSetup, skyboxSetup2 } from './skybox'
import { skyVideoSetup } from './videoMaterials'
import { elevatorSetup } from './elevator'
import { colliderWallsSetup } from './colliderSetup'
import { teleportSetup } from './teleport'
import { ballGameSetup } from './ballGame'

// Defining behavior. See `src/systems.ts` file.
engine.addSystem(circularSystem)
engine.addSystem(bounceScalingSystem)

export function main() {
  // draw UI
  // setupUi()
  teleportSetup()
  // Setup skybox
  skyboxSetup()
  skyboxSetup2()

  // skyVideoSetup()

  // elevator transition from scene 1 to scene 2
  elevatorSetup()

  colliderWallsSetup()


  // Import balloon game at scene 2
  ballGameSetup()


  // Import models
  // scene 1 collider





  // fetch cube from Inspector
  // const cube = engine.getEntityOrNullByName('Magic Cube')
  // if (cube) {
  //   // Give the cube a color
  //   Material.setPbrMaterial(cube, { albedoColor: Color4.Blue() })

  //   // Make the cube spin, with the circularSystem
  //   Spinner.create(cube, { speed: 10 })

  //   // Give the cube a collider, to make it clickable
  //   MeshCollider.setBox(cube)

  //   // Add a click behavior to the cube, spawning new cubes in random places, and adding a bouncy effect for feedback
  //   pointerEventsSystem.onPointerDown(
  //     { entity: cube, opts: { button: InputAction.IA_POINTER, hoverText: 'spawn' } },
  //     () => {
  //       createCube(1 + Math.random() * 8, Math.random() * 8, 1 + Math.random() * 8, false)
  //       BounceScaling.createOrReplace(cube)
  //     }
  //   )
  // }
}


