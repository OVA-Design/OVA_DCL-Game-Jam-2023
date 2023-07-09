import {
  MeshCollider,
  Transform,
  engine,
  InputAction,
  Material,
  MeshRenderer,
  VisibilityComponent,
  VideoPlayer,
  PointerEventType,
  inputSystem,
  pointerEventsSystem
} from '@dcl/sdk/ecs'
import { Quaternion, Vector3, Color4, Color3 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'

const sceneX = 6 * 16
const sceneY = 6 * 16
const sceneZ = 6 * 16
// const sceneYoffset = sceneY + 1.5 (player eye Height)

export function skyboxSetup() {
  //#region SkyBox
  const folderNumber = '1'

  //root
  let skyboxRoot = engine.addEntity()
  Transform.create(skyboxRoot, { position: Vector3.create(sceneX / 2, sceneY / 2 + 1.5, sceneZ / 2) })

  //front
  let skyboxPZ = engine.addEntity()
  Transform.create(skyboxPZ, {
    position: Vector3.create(0, 0, sceneZ / 2),
    scale: Vector3.create(sceneX, sceneY, sceneZ),
    parent: skyboxRoot
  })
  MeshRenderer.setPlane(skyboxPZ)
  // Material.setBasicMaterial(skyboxPZ, {
  //   texture: Material.Texture.Common({
  //     src: 'images/skybox/' + folderNumber + '/pz.png'
  //   })
  // })
  // import videos as texture maps
  VideoPlayer.create(skyboxPZ, {
    src: 'videos/1/PZ.mp4',
    playing: true,
    loop: true,
    volume: 0.3,
    playbackRate: 1
  })
  const videoTextureFront = Material.Texture.Video({ videoPlayerEntity: skyboxPZ })
  Material.setBasicMaterial(skyboxPZ, {
    texture: videoTextureFront
    // emissiveTexture: videoTextureFront
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
  // Material.setBasicMaterial(skyboxNZ, {
  //   texture: Material.Texture.Common({
  //     src: 'images/skybox/' + folderNumber + '/nz.png'
  //   })
  // })
  // import videos as texture maps
  VideoPlayer.create(skyboxNZ, {
    src: 'videos/1/NZ.mp4',
    playing: true,
    loop: true,
    volume: 0.3,
    playbackRate: 1
  })
  const videoTextureBack = Material.Texture.Video({ videoPlayerEntity: skyboxNZ })
  Material.setBasicMaterial(skyboxNZ, {
    texture: videoTextureBack
    // emissiveTexture: videoTextureBack
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
  // Material.setBasicMaterial(skyboxPY, {
  //   texture: Material.Texture.Common({
  //     src: 'images/skybox/' + folderNumber + '/py.png'
  //   })
  // })
  // import videos as texture maps
  VideoPlayer.create(skyboxPY, {
    src: 'videos/1/PY.mp4',
    playing: true,
    loop: true,
    volume: 0.3,
    playbackRate: 1
  })
  const videoTextureTop = Material.Texture.Video({ videoPlayerEntity: skyboxPY })
  Material.setBasicMaterial(skyboxPY, {
    texture: videoTextureTop
    // emissiveTexture: videoTextureTop
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
  // Material.setBasicMaterial(skyboxNY, {
  //   texture: Material.Texture.Common({
  //     src: 'images/skybox/' + folderNumber + '/ny.png'
  //   })
  // })
  // import videos as texture maps
  VideoPlayer.create(skyboxNY, {
    src: 'videos/1/NY.mp4',
    playing: true,
    loop: true,
    volume: 0.3,
    playbackRate: 1
  })
  const videoTextureBottom = Material.Texture.Video({ videoPlayerEntity: skyboxNY })
  Material.setBasicMaterial(skyboxNY, {
    texture: videoTextureBottom
    // emissiveTexture: videoTextureBottom
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
  // Material.setBasicMaterial(skyboxPX, {
  //   texture: Material.Texture.Common({
  //     src: 'images/skybox/' + folderNumber + '/px.png'
  //   })
  // })
  // import videos as texture maps
  VideoPlayer.create(skyboxPX, {
    src: 'videos/1/PX.mp4',
    playing: true,
    loop: true,
    volume: 0.3,
    playbackRate: 1
  })
  const videoTextureRight = Material.Texture.Video({ videoPlayerEntity: skyboxPX })
  Material.setBasicMaterial(skyboxPX, {
    texture: videoTextureRight
    // emissiveTexture: videoTextureRight
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
  // Material.setBasicMaterial(skyboxNX, {
  //   texture: Material.Texture.Common({
  //     src: 'images/skybox/' + folderNumber + '/nx.png'
  //   })
  // })
  // import videos as texture maps
  VideoPlayer.create(skyboxNX, {
    src: 'videos/1/NX.mp4',
    playing: true,
    loop: true,
    volume: 0.3,
    playbackRate: 1
  })
  const videoTextureLeft = Material.Texture.Video({ videoPlayerEntity: skyboxNX })
  Material.setBasicMaterial(skyboxNX, {
    texture: videoTextureLeft
    // emissiveTexture: videoTextureLeft,
    // emissiveIntensity: 1,
    // emissiveColor: Color3.White(),
  })

  utils.timers.setTimeout(() => {
    VideoPlayer.deleteFrom(skyboxPZ)
    VideoPlayer.deleteFrom(skyboxNZ)
    VideoPlayer.deleteFrom(skyboxPY)
    VideoPlayer.deleteFrom(skyboxNY)
    VideoPlayer.deleteFrom(skyboxPX)
    VideoPlayer.deleteFrom(skyboxNX)
  }, 29000) //millisecond delay 1s = 1000ms

  //#endregion
}

////// Scene 2 skybox

export function skyboxSetup2() {
  //#region SkyBox
  const folderNumber = '2'

  //root
  let skyboxRoot = engine.addEntity()
  Transform.create(skyboxRoot, { position: Vector3.create(sceneX / 2, sceneY / 2 + sceneY + 3, sceneZ / 2) })

  // timer to move player to scene 2


    //front
    let skyboxPZ = engine.addEntity()
    Transform.create(skyboxPZ, {
      position: Vector3.create(0, 0, sceneZ / 2),
      scale: Vector3.create(sceneX, sceneY, sceneZ),
      parent: skyboxRoot
    })
    MeshRenderer.setPlane(skyboxPZ)
    // Material.setBasicMaterial(skyboxPZ, {
    //   texture: Material.Texture.Common({
    //     src: 'images/skybox/' + folderNumber + '/pz.png'
    //   })
    // })
      // import videos as texture maps
  VideoPlayer.create(skyboxPZ, {
    src: 'videos/2/PZ.mp4',
    playing: true,
    loop: true,
    volume: 0.3,
    playbackRate: 1
  })
  const videoTextureFront = Material.Texture.Video({ videoPlayerEntity: skyboxPZ })
  Material.setBasicMaterial(skyboxPZ, {
    texture: videoTextureFront
    // emissiveTexture: videoTextureFront
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
    // Material.setBasicMaterial(skyboxNZ, {
    //   texture: Material.Texture.Common({
    //     src: 'images/skybox/' + folderNumber + '/nz.png'
    //   })
    // })
  // import videos as texture maps
  VideoPlayer.create(skyboxNZ, {
    src: 'videos/2/NZ.mp4',
    playing: true,
    loop: true,
    volume: 0.3,
    playbackRate: 1
  })
  const videoTextureBack = Material.Texture.Video({ videoPlayerEntity: skyboxNZ })
  Material.setBasicMaterial(skyboxNZ, {
    texture: videoTextureBack
    // emissiveTexture: videoTextureBack
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
    // Material.setBasicMaterial(skyboxPY, {
    //   texture: Material.Texture.Common({
    //     src: 'images/skybox/' + folderNumber + '/py.png'
    //   })
    // })
  // import videos as texture maps
  VideoPlayer.create(skyboxPY, {
    src: 'videos/2/PY.mp4',
    playing: true,
    loop: true,
    volume: 0.3,
    playbackRate: 1
  })
  const videoTextureTop = Material.Texture.Video({ videoPlayerEntity: skyboxPY })
  Material.setBasicMaterial(skyboxPY, {
    texture: videoTextureTop
    // emissiveTexture: videoTextureTop
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
    // Material.setBasicMaterial(skyboxNY, {
    //   texture: Material.Texture.Common({
    //     src: 'images/skybox/' + folderNumber + '/ny.png'
    //   })
    // })
  // import videos as texture maps
  VideoPlayer.create(skyboxNY, {
    src: 'videos/2/NY.mp4',
    playing: true,
    loop: true,
    volume: 0.3,
    playbackRate: 1
  })
  const videoTextureBottom = Material.Texture.Video({ videoPlayerEntity: skyboxNY })
  Material.setBasicMaterial(skyboxNY, {
    texture: videoTextureBottom
    // emissiveTexture: videoTextureBottom
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
    // Material.setBasicMaterial(skyboxPX, {
    //   texture: Material.Texture.Common({
    //     src: 'images/skybox/' + folderNumber + '/px.png'
    //   })
    // })
  // import videos as texture maps
  VideoPlayer.create(skyboxPX, {
    src: 'videos/2/PX.mp4',
    playing: true,
    loop: true,
    volume: 0.3,
    playbackRate: 1
  })
  const videoTextureRight = Material.Texture.Video({ videoPlayerEntity: skyboxPX })
  Material.setBasicMaterial(skyboxPX, {
    texture: videoTextureRight
    // emissiveTexture: videoTextureRight
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
    // Material.setBasicMaterial(skyboxNX, {
    //   texture: Material.Texture.Common({
    //     src: 'images/skybox/' + folderNumber + '/nx.png'
    //   })
    // })
      // import videos as texture maps
  VideoPlayer.create(skyboxNX, {
    src: 'videos/2/NX.mp4',
    playing: true,
    loop: true,
    volume: 0.3,
    playbackRate: 1
  })
  const videoTextureLeft = Material.Texture.Video({ videoPlayerEntity: skyboxNX })
  Material.setBasicMaterial(skyboxNX, {
    texture: videoTextureLeft
    // emissiveTexture: videoTextureLeft,
    // emissiveIntensity: 1,
    // emissiveColor: Color3.White(),
  })


  //#endregion
}
