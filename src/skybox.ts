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
  pointerEventsSystem
} from '@dcl/sdk/ecs'
import { movePlayerTo } from '~system/RestrictedActions'
import { Quaternion, Vector3, Color4 } from '@dcl/sdk/math'

const sceneX = 6 * 16
const sceneY = 6 * 16
const sceneZ = 6 * 16
// const sceneYoffset = sceneY + 1.5 (player eye Height)

export function skyboxSetup() {
  //#region SkyBox
  const folderNumber = '1'

  //root
  let skyboxRoot = engine.addEntity()
  Transform.create(skyboxRoot, { position: Vector3.create(sceneX / 2, sceneY / 2 +1.5, sceneZ / 2) })

  //front
  let skyboxPZ = engine.addEntity()
  Transform.create(skyboxPZ, {
    position: Vector3.create(0, 0, sceneZ / 2),
    scale: Vector3.create(sceneX, sceneY, sceneZ),
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
    position: Vector3.create(0, 0, -sceneZ / 2),
    rotation: Quaternion.fromEulerDegrees(0, 180, 0),
    scale: Vector3.create(sceneX, sceneY, sceneZ),
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
    position: Vector3.create(0, sceneY / 2, 0),
    rotation: Quaternion.fromEulerDegrees(-90, 0, 0),
    scale: Vector3.create(sceneX, sceneY, sceneZ),
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
    position: Vector3.create(0, -sceneY / 2, 0),
    rotation: Quaternion.fromEulerDegrees(90, 0, 0),
    scale: Vector3.create(sceneX, sceneY, sceneZ),
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
    position: Vector3.create(sceneX / 2, 0, 0),
    rotation: Quaternion.fromEulerDegrees(0, 90, 0),
    scale: Vector3.create(sceneX, sceneY, sceneZ),
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
    position: Vector3.create(-sceneX / 2, 0, 0),
    rotation: Quaternion.fromEulerDegrees(0, -90, 0),
    scale: Vector3.create(sceneX, sceneY, sceneZ),
    parent: skyboxRoot
  })
  MeshRenderer.setPlane(skyboxNX)
  Material.setBasicMaterial(skyboxNX, {
    texture: Material.Texture.Common({
      src: 'images/skybox/' + folderNumber + '/nx.png'
    })
  })
  //#endregion

  //Elevated platform 1
  let elevatedPlatform = engine.addEntity()
  Transform.create(elevatedPlatform, {
    position: Vector3.create(sceneX / 2, sceneY / 2-3, sceneZ / 2),
    scale: Vector3.create(sceneX, 1, sceneZ)
  })
  MeshCollider.setCylinder(elevatedPlatform)
  MeshRenderer.setCylinder(elevatedPlatform)
  VisibilityComponent.create(elevatedPlatform, { visible: true })

  //Elevated platform 2
  // let elevatedPlatform2 = engine.addEntity()
  // Transform.create(elevatedPlatform2, {
  //   position: Vector3.create(sceneX / 2, sceneY / 2 - 3 + sceneY, sceneZ / 2),
  //   scale: Vector3.create(sceneX, 1, sceneZ)
  // })
  // MeshCollider.setCylinder(elevatedPlatform2)
  // MeshRenderer.setCylinder(elevatedPlatform2)
  // VisibilityComponent.create(elevatedPlatform2, { visible: true })

  //set transparent color material for testing
  let transparentRed = Color4.create(1, 0, 0, 0.5)
  Material.setPbrMaterial(elevatedPlatform, {
    albedoColor: transparentRed
  })
  // Material.setPbrMaterial(elevatedPlatform2, {
  //   albedoColor: transparentRed
  // })

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
      movePlayerTo({ newRelativePosition: Vector3.create(sceneX / 2, sceneY / 2, sceneZ / 2) })
    }
  )

  const clickableEntity2 = engine.addEntity()
  MeshRenderer.setBox(clickableEntity2)
  MeshCollider.setBox(clickableEntity2)
  Transform.create(clickableEntity2, { position: Vector3.create(sceneX / 2, 1, sceneZ / 2) })

  pointerEventsSystem.onPointerDown(
    {
      entity: clickableEntity2,
      opts: {
        button: InputAction.IA_POINTER,
        hoverText: 'Beam me up'
      }
    },
    function () {
      movePlayerTo({ newRelativePosition: Vector3.create(sceneX / 2, sceneY / 2, sceneZ / 2) })
    }
  )
}

////// Scene 2 skybox

export function skyboxSetup2() {
  //#region SkyBox
  const folderNumber = '2'

  //root
  let skyboxRoot = engine.addEntity()
  Transform.create(skyboxRoot, { position: Vector3.create(sceneX / 2, sceneY / 2 + sceneY + 3, sceneZ / 2) })

  //front
  let skyboxPZ = engine.addEntity()
  Transform.create(skyboxPZ, {
    position: Vector3.create(0, 0, sceneZ / 2),
    scale: Vector3.create(sceneX, sceneY, sceneZ),
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
    position: Vector3.create(0, 0, -sceneZ / 2),
    rotation: Quaternion.fromEulerDegrees(0, 180, 0),
    scale: Vector3.create(sceneX, sceneY, sceneZ),
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
    position: Vector3.create(0, sceneY / 2, 0),
    rotation: Quaternion.fromEulerDegrees(-90, 0, 0),
    scale: Vector3.create(sceneX, sceneY, sceneZ),
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
    position: Vector3.create(0, -sceneY / 2, 0),
    rotation: Quaternion.fromEulerDegrees(90, 0, 0),
    scale: Vector3.create(sceneX, sceneY, sceneZ),
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
    position: Vector3.create(sceneX / 2, 0, 0),
    rotation: Quaternion.fromEulerDegrees(0, 90, 0),
    scale: Vector3.create(sceneX, sceneY, sceneZ),
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
    position: Vector3.create(-sceneX / 2, 0, 0),
    rotation: Quaternion.fromEulerDegrees(0, -90, 0),
    scale: Vector3.create(sceneX, sceneY, sceneZ),
    parent: skyboxRoot
  })
  MeshRenderer.setPlane(skyboxNX)
  Material.setBasicMaterial(skyboxNX, {
    texture: Material.Texture.Common({
      src: 'images/skybox/' + folderNumber + '/nx.png'
    })
  })
  //#endregion


}
