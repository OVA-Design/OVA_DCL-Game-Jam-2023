import { GltfContainer, Material, MeshRenderer, Transform, VideoPlayer, engine } from "@dcl/sdk/ecs"
import { Color3, Color4, Vector3 } from "@dcl/sdk/math"

export function skyVideoSetup() {
    
// screen GLB (can't add material components to glTF models)
// const skySphereEntity = engine.addEntity()
// GltfContainer.create(skySphereEntity, {
//   src: 'models/SkySphere.glb'
// })
// Transform.create(skySphereEntity, {
//   position: { x: 0, y: 0, z: 0 }
// })

//   //apply video texture onto sphere mesh
  const sphereScreen = engine.addEntity()
  Transform.create(sphereScreen, {
  	position: Vector3.create(24, 24, 24),
  	scale: Vector3.create(48, 48, 48)
  })
  
  MeshRenderer.setSphere(sphereScreen)
  
  VideoPlayer.create(sphereScreen, {
      src: 'videos/scene1.mp4',
      playing: true,
      loop: true,
      volume: 0.3,
      playbackRate: 0.5
  })
  
  const videoTexture = Material.Texture.Video({ videoPlayerEntity: sphereScreen })
  
  Material.setBasicMaterial(sphereScreen, {
    texture: videoTexture,
    // emissiveTexture: videoTexture,
    // // bumpTexture: Material.Texture.Common({
    //     src: 'images/sky_normal.jpg',
    // }),
    // emissiveIntensity: 2,
    // emissiveColor: Color3.White(),
    // roughness: 1.0,
    // specularIntensity: 0,
    // metallic: 0,
  })

}