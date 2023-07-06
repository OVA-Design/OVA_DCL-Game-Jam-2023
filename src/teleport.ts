import {
  MeshCollider,
  Transform,
  engine,
  InputAction,
  Material,
  MeshRenderer,
  VisibilityComponent,
  PointerEventType,
  inputSystem,
  pointerEventsSystem,
  GltfContainer
} from '@dcl/sdk/ecs'
import { movePlayerTo } from '~system/RestrictedActions'
import { Quaternion, Vector3, Color4 } from '@dcl/sdk/math'


export function teleportSetup() {


  //Elevated platform 2
  // let elevatedPlatform2 = engine.addEntity()
  // Transform.create(elevatedPlatform2, {
  //   position: Vector3.create(48, 143, 48),
  //   scale: Vector3.create(48, 1, 48)
  // })
  // MeshCollider.setCylinder(elevatedPlatform2)
  // MeshRenderer.setCylinder(elevatedPlatform2)
  // VisibilityComponent.create(elevatedPlatform2, { visible: true })

  ////set transparent color material for testing
  // let transparentRed = Color4.create(1, 0, 1, 0.5)
  // Material.setPbrMaterial(elevatedPlatform2, {
  //   albedoColor: transparentRed
  // })

  // Import models
  const groundEntity = engine.addEntity()
  GltfContainer.create(groundEntity, {
    src: 'models/elevator.glb'
  })
  Transform.create(groundEntity, {
    position: { x: 48, y: 148, z: 48 }
  })

  //Teleport to the platform
  const teleportEntity = engine.addEntity()
  MeshRenderer.setSphere(teleportEntity)
  MeshCollider.setSphere(teleportEntity)
  Transform.create(teleportEntity, { position: Vector3.create(48, 48-1.5, 48) })

  pointerEventsSystem.onPointerDown(
    {
      entity: teleportEntity,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: 'Beam me up'
      }
    },
    function () {
      movePlayerTo({ newRelativePosition: Vector3.create(48, 152, 48) })
    }
  )




}