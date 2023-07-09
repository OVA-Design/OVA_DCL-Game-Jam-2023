import {
  engine,
  Transform,
  GltfContainer,
} from '@dcl/sdk/ecs'


export function orbitPlanetSetup() {
  // Import models
  const orbitBallsEntity = engine.addEntity()
  GltfContainer.create(orbitBallsEntity, {
    src: 'models/allPlanetsRotating.glb'
  })
  Transform.create(orbitBallsEntity, {
    position: { x: 48, y: 57, z: 48 }
  })
}
