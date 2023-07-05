import { Material, MeshCollider, MeshRenderer, Transform, engine } from '@dcl/sdk/ecs'
import { Color4, Quaternion, Vector3 } from '@dcl/sdk/math'

export function colliderWallsSetup() {
  // Invisible walls
  //#region

  //set transparent color material for testing
  let transparentRed = Color4.create(1, 0, 0, 0.5)
  let transparentGreen = Color4.create(0, 1, 0, 0.5)
  let transparentBlue = Color4.create(0, 0, 1, 0.5)
  let transparentCyan = Color4.create(0, 1, 1, 0.5)
  let transparentPurple = Color4.create(1, 0, 1, 0.5)
  let transparentYellow = Color4.create(1, 1, 0, 0.5)

  //root
  let colliderRoot = engine.addEntity()
  Transform.create(colliderRoot, { position: Vector3.create(48, 48 +1.5 +97.5, 48) })

  //front
  const wallFront = engine.addEntity()
  Transform.create(wallFront, {
    position: Vector3.create(0, 0, 24),
    scale: Vector3.create(48, 48, 48),
    parent: colliderRoot
  })
  MeshCollider.setPlane(wallFront)
  MeshRenderer.setPlane(wallFront)
  Material.setPbrMaterial(wallFront, {
    albedoColor: transparentRed
  })

  //back
  const wallBack = engine.addEntity()
  Transform.create(wallBack, {
    position: Vector3.create(0, 0, -24),
    scale: Vector3.create(48, 48, 48),
    rotation: Quaternion.fromEulerDegrees(0, 180, 0),
    parent: colliderRoot
  })
  MeshCollider.setPlane(wallBack)
  MeshRenderer.setPlane(wallBack)
  Material.setPbrMaterial(wallBack, {
    albedoColor: transparentBlue
  })

  //Top
  const wallTop = engine.addEntity()
  Transform.create(wallTop, {
    position: Vector3.create(0, 24, 0),
    scale: Vector3.create(48, 48, 48),
    rotation: Quaternion.fromEulerDegrees(-90, 0, 0),
    parent: colliderRoot
  })
  MeshCollider.setPlane(wallTop)
  MeshRenderer.setPlane(wallTop)
  Material.setPbrMaterial(wallTop, {
    albedoColor: transparentGreen
  })

  //Bottom
  const wallBottom = engine.addEntity()
  Transform.create(wallBottom, {
    position: Vector3.create(0, -24, 0),
    scale: Vector3.create(48, 48, 48),
    rotation: Quaternion.fromEulerDegrees(90, 0, 0),
    parent: colliderRoot
  })
  MeshCollider.setPlane(wallBottom)
  MeshRenderer.setPlane(wallBottom)
  Material.setPbrMaterial(wallBottom, {
    albedoColor: transparentCyan
  })

  //Right
  const wallRight = engine.addEntity()
  Transform.create(wallRight, {
    position: Vector3.create(24, 0, 0),
    scale: Vector3.create(48, 48, 48),
    rotation: Quaternion.fromEulerDegrees(0, 90, 0),
    parent: colliderRoot
  })
  MeshCollider.setPlane(wallRight)
  MeshRenderer.setPlane(wallRight)
  Material.setPbrMaterial(wallRight, {
    albedoColor: transparentYellow
  })

  //Left
  const wallLeft = engine.addEntity()
  Transform.create(wallLeft, {
    position: Vector3.create(-24, 0, 0),
    scale: Vector3.create(48, 48, 48),
    rotation: Quaternion.fromEulerDegrees(0, -90, 0),
    parent: colliderRoot
  })
  MeshCollider.setPlane(wallLeft)
  MeshRenderer.setPlane(wallLeft)
  Material.setPbrMaterial(wallLeft, {
    albedoColor: transparentPurple
  })
  //#endregion
}
