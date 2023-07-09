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
  GltfContainer,
  VideoPlayer,
  Entity
} from '@dcl/sdk/ecs'
import { movePlayerTo } from '~system/RestrictedActions'
import { Quaternion, Vector3, Color4 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'
import { timers } from '@dcl-sdk/utils'

export function platformSetup() {
  //Elevated platform 1 @ 49-1.5m height
  // Import models
  const platform1Entity = engine.addEntity()
  GltfContainer.create(platform1Entity, {
    src: 'models/PlatformColliderWall.glb'
  })
  Transform.create(platform1Entity, {
    position: { x: 48, y: 57, z: 48 }
  })

  //Teleport to the platform w/ pointer click
  // setup teleport portal
  const teleportEntity = engine.addEntity()
  MeshRenderer.setSphere(teleportEntity)
  MeshCollider.setSphere(teleportEntity)
  Transform.create(teleportEntity, {
    position: Vector3.create(48, 49, 48),
    scale: Vector3.create(2, 2, 2)
  })

  VideoPlayer.create(teleportEntity, {
    src: 'videos/supernova.mp4',
    playing: true,
    loop: true,
    volume: 0.3,
    playbackRate: 0.5
  })
  const videoTexture = Material.Texture.Video({ videoPlayerEntity: teleportEntity })

  Material.setPbrMaterial(teleportEntity, {
    albedoColor: { r: 15, g: 0, b: 0, a: 1 },
    emissiveColor: { r: 0, g: 0, b: 15 },
    // reflectivityColor: {r: 0, g: 0, b: 1},
    texture: videoTexture,
    emissiveTexture: videoTexture
  })
  // move teleport portal
  startPath(teleportEntity, [Vector3.create(48, 96, 48), Vector3.create(48, 49, 48)], 50, false, false)
  // function to make path following recursive
  function startPath(entity: Entity, path: Vector3[], duration: number, facePath?: boolean, loop?: boolean) {
    utils.paths.startStraightPath(entity, path, duration, false, function () {
      if (loop) startPath(entity, path, duration, facePath, loop)
    })
  }

  utils.timers.setTimeout(() => {
    pointerEventsSystem.onPointerDown(
      {
        entity: teleportEntity,
        opts: {
          button: InputAction.IA_POINTER,
          hoverText: 'Take me away!'
        }
      },
      function () {
        movePlayerTo({ newRelativePosition: Vector3.create(48, 152, 48) })
      }
    )
  }, 100000) //millisecond delay

  // timer to move player to scene 2
  utils.timers.setTimeout(() => {
    movePlayerTo({ newRelativePosition: Vector3.create(48, 152, 48) })
  }, 120000) //millisecond delay

  //Elevated platform 2 @ 49-1.5m height

  //#region

  //set transparent color material for testing
  // let transparentRed = Color4.create(1, 0, 0, 0.5)
  // let transparentGreen = Color4.create(0, 1, 0, 0.5)
  // let transparentBlue = Color4.create(0, 0, 1, 0.5)
  // let transparentCyan = Color4.create(0, 1, 1, 0.5)
  // let transparentPurple = Color4.create(1, 0, 1, 0.5)
  // let transparentYellow = Color4.create(1, 1, 0, 0.5)

  //root
  let colliderRoot = engine.addEntity()
  Transform.create(colliderRoot, { position: Vector3.create(48, 48 + 1.5 + 97.5, 48) })

  //front
  const wallFront = engine.addEntity()
  Transform.create(wallFront, {
    position: Vector3.create(0, 12, 24),
    scale: Vector3.create(48, 24, 48),
    parent: colliderRoot
  })
  MeshCollider.setPlane(wallFront)
  // MeshRenderer.setPlane(wallFront)
  // Material.setPbrMaterial(wallFront, {
  // albedoColor: transparentRed
  // })

  //back
  const wallBack = engine.addEntity()
  Transform.create(wallBack, {
    position: Vector3.create(0, 12, -24),
    scale: Vector3.create(48, 24, 48),
    rotation: Quaternion.fromEulerDegrees(0, 180, 0),
    parent: colliderRoot
  })
  MeshCollider.setPlane(wallBack)
  // MeshRenderer.setPlane(wallBack)
  // Material.setPbrMaterial(wallBack, {
  // albedoColor: transparentBlue
  // })

  //Top
  const wallTop = engine.addEntity()
  Transform.create(wallTop, {
    position: Vector3.create(0, 24, 0),
    scale: Vector3.create(48, 48, 48),
    rotation: Quaternion.fromEulerDegrees(-90, 0, 0),
    parent: colliderRoot
  })
  MeshCollider.setPlane(wallTop)
  // MeshRenderer.setPlane(wallTop)
  // Material.setPbrMaterial(wallTop, {
  // albedoColor: transparentGreen
  // })

  //Bottom
  const wallBottom = engine.addEntity()
  Transform.create(wallBottom, {
    position: Vector3.create(0, 0, 0),
    scale: Vector3.create(48, 48, 48),
    rotation: Quaternion.fromEulerDegrees(90, 0, 0),
    parent: colliderRoot
  })
  MeshCollider.setPlane(wallBottom)
  // MeshRenderer.setPlane(wallBottom)
  // Material.setPbrMaterial(wallBottom, {
  // albedoColor: transparentCyan
  // })

  //Right
  const wallRight = engine.addEntity()
  Transform.create(wallRight, {
    position: Vector3.create(24, 12, 0),
    scale: Vector3.create(48, 24, 48),
    rotation: Quaternion.fromEulerDegrees(0, 90, 0),
    parent: colliderRoot
  })
  MeshCollider.setPlane(wallRight)
  // MeshRenderer.setPlane(wallRight)
  // Material.setPbrMaterial(wallRight, {
  // albedoColor: transparentYellow
  // })

  //Left
  const wallLeft = engine.addEntity()
  Transform.create(wallLeft, {
    position: Vector3.create(-24, 12, 0),
    scale: Vector3.create(48, 24, 48),
    rotation: Quaternion.fromEulerDegrees(0, -90, 0),
    parent: colliderRoot
  })
  MeshCollider.setPlane(wallLeft)
  // MeshRenderer.setPlane(wallLeft)
  // Material.setPbrMaterial(wallLeft, {
  // albedoColor: transparentPurple
  // })
  //#endregion
}