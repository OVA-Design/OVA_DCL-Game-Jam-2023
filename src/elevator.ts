import { Entity, GltfContainer, Transform, engine } from "@dcl/sdk/ecs"
import { Vector3 } from "@dcl/sdk/math"
import * as utils from '@dcl-sdk/utils'
import { movePlayerTo } from "~system/RestrictedActions"

export function elevatorSetup() {
//Set Elevator
const elevatorEntity = engine.addEntity()
GltfContainer.create(elevatorEntity, {
  src: 'models/Elevator.glb'
})
// only vertical
Transform.create(elevatorEntity, {
  position: Vector3.create(48, 48-1.5, 48)
})
startPath(elevatorEntity, [
    Vector3.create(48, 4, 48), 
    Vector3.create(48, 148.5, 48), 
    ],
     8, false, false)


// function to make path following recursive
function startPath(entity: Entity, path: Vector3[], duration: number, facePath?: boolean, loop?: boolean) {
  utils.paths.startStraightPath(entity, path, duration, false, function () {
    if (loop) startPath(entity, path, duration, facePath, loop)
  })
}

//   //Teleport to the next scene platform
//   const portalEntity = engine.addEntity()
//   MeshRenderer.setBox(portalEntity)
//   Transform.create(portalEntity, { position: Vector3.create(6, 1, 6) })

//   pointerEventsSystem.onPointerDown(
//     {
//       entity: portalEntity,
//       opts: {
//         button: InputAction.IA_POINTER,
//         hoverText: 'Beam me up'
//       }
//     },
//     function () {
//       movePlayerTo({ newRelativePosition: Vector3.create(sceneX / 2, sceneY / 2 + 2, sceneZ / 2) })
//     }
//   )

}
 

