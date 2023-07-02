import {
  MeshCollider,
  Transform,
  engine,
  InputAction,
  Material,
  MeshRenderer,
  PointerEventType,
  inputSystem,
  pointerEventsSystem
} from '@dcl/sdk/ecs'
import { movePlayerTo } from '~system/RestrictedActions'
import { Quaternion, Vector3, Color4 } from '@dcl/sdk/math'

const sceneSizeX = 6 * 16
const sceneSizeZ = 6 * 16
const height = 6 * 16
const radiusMultiplier = 0.7

export function skyboxSetup() {

  //#region SkyBox
  const folderNumber = '3'

  //root
  let skyboxRoot = engine.addEntity()
  Transform.create(skyboxRoot, { position: Vector3.create(sceneSizeX / 2, height / 2 - 16, sceneSizeZ / 2) })

  //front
  let skyboxPZ = engine.addEntity()
  Transform.create(skyboxPZ, {
    position: Vector3.create(0, 0, (sceneSizeZ / 2) * radiusMultiplier),
    scale: Vector3.create(sceneSizeX * radiusMultiplier, height * radiusMultiplier, sceneSizeZ * radiusMultiplier),
    parent: skyboxRoot
  })
  MeshRenderer.setPlane(skyboxPZ)
  Material.setBasicMaterial(skyboxPZ, {
    texture: Material.Texture.Common({
      src: 'images/skybox/' + folderNumber + '/pz.png'
    })
  })

  //back
  let skyboxNZ = engine.addEntity()
  Transform.create(skyboxNZ, {
    position: Vector3.create(0, 0, (-sceneSizeZ / 2) * radiusMultiplier),
    rotation: Quaternion.fromEulerDegrees(0, 180, 0),
    scale: Vector3.create(sceneSizeX * radiusMultiplier, height * radiusMultiplier, sceneSizeZ * radiusMultiplier),
    parent: skyboxRoot
  })
  MeshRenderer.setPlane(skyboxNZ)
  Material.setBasicMaterial(skyboxNZ, {
    texture: Material.Texture.Common({
      src: 'images/skybox/' + folderNumber + '/nz.png'
    })
  })

  //Top
  let skyboxPY = engine.addEntity()
  Transform.create(skyboxPY, {
    position: Vector3.create(0, 0 * radiusMultiplier, 0),
    rotation: Quaternion.fromEulerDegrees(-90, 0, 0),
    scale: Vector3.create(sceneSizeX * radiusMultiplier, height * radiusMultiplier, sceneSizeZ * radiusMultiplier),
    parent: skyboxRoot
  })
  MeshRenderer.setPlane(skyboxPY)
  Material.setBasicMaterial(skyboxPY, {
    texture: Material.Texture.Common({
      src: 'images/skybox/' + folderNumber + '/py.png'
    })
  })

  //Bottom
  let skyboxNY = engine.addEntity()
  Transform.create(skyboxNY, {
    position: Vector3.create(0, (-height / 2) * radiusMultiplier, 0),
    rotation: Quaternion.fromEulerDegrees(90, 0, 0),
    scale: Vector3.create(sceneSizeX * radiusMultiplier, height * radiusMultiplier, sceneSizeZ * radiusMultiplier),
    parent: skyboxRoot
  })
  MeshRenderer.setPlane(skyboxNY)
  Material.setBasicMaterial(skyboxNY, {
    texture: Material.Texture.Common({
      src: 'images/skybox/' + folderNumber + '/ny.png'
    })
  })

  //Right
  let skyboxPX = engine.addEntity()
  Transform.create(skyboxPX, {
    position: Vector3.create((sceneSizeX / 2) * radiusMultiplier, 0, 0),
    rotation: Quaternion.fromEulerDegrees(0, 90, 0),
    scale: Vector3.create(sceneSizeX * radiusMultiplier, height * radiusMultiplier, sceneSizeZ * radiusMultiplier),
    parent: skyboxRoot
  })
  MeshRenderer.setPlane(skyboxPX)
  Material.setBasicMaterial(skyboxPX, {
    texture: Material.Texture.Common({
      src: 'images/skybox/' + folderNumber + '/px.png'
    })
  })

  // Left
  let skyboxNX = engine.addEntity()
  Transform.create(skyboxNX, {
    position: Vector3.create((-sceneSizeX / 2) * radiusMultiplier, 0, 0),
    rotation: Quaternion.fromEulerDegrees(0, -90, 0),
    scale: Vector3.create(sceneSizeX * radiusMultiplier, height * radiusMultiplier, sceneSizeZ * radiusMultiplier),
    parent: skyboxRoot
  })
  MeshRenderer.setPlane(skyboxNX)
  Material.setBasicMaterial(skyboxNX, {
    texture: Material.Texture.Common({
      src: 'images/skybox/' + folderNumber + '/nx.png'
    })
  })
  //#endregion

  //Elevated platform
  let elevatedPlatform = engine.addEntity()
  Transform.create(elevatedPlatform, {
    position: Vector3.create(sceneSizeX / 2, height / 2, sceneSizeZ / 2),
    scale: Vector3.create(4, 1, 10)
  })
  MeshCollider.setBox(elevatedPlatform)
  MeshRenderer.setBox(elevatedPlatform)

  //Teleport to the platform
  const clickableEntity = engine.addEntity()
  MeshRenderer.setBox(clickableEntity)
  MeshCollider.setBox(clickableEntity)
  Transform.create(clickableEntity, { position: Vector3.create(6, 1, 6) })

  pointerEventsSystem.onPointerDown(
    {
      entity: clickableEntity,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: 'Beam me up'
      }
    },
    function () {
      movePlayerTo({ newRelativePosition: Vector3.create(sceneSizeX / 2, height / 2 + 2, sceneSizeZ / 2) })
    }
  )

  const clickableEntity2 = engine.addEntity()
  MeshRenderer.setBox(clickableEntity2)
  MeshCollider.setBox(clickableEntity2)
  Transform.create(clickableEntity2, { position: Vector3.create(sceneSizeX / 2, 1, sceneSizeZ / 2) })

  pointerEventsSystem.onPointerDown(
    {
      entity: clickableEntity2,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: 'Beam me up'
      }
    },
    function () {
      movePlayerTo({ newRelativePosition: Vector3.create(sceneSizeX / 2, height / 2 + 2, sceneSizeZ / 2) })
    }
  )
}
