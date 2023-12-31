/*
  IMPORTANT: The tsconfig.json has been configured to include "node_modules/cannon/build/cannon.js"
*/
import { GltfContainer, Material, MeshCollider, MeshRenderer, Transform, engine } from '@dcl/sdk/ecs'
import { Ball } from './ball'
import { loadColliders } from './wallCollidersSetup'
import {} from '@dcl-sdk/utils'
import { Quaternion, Vector3 } from '@dcl/sdk/math'
import * as CANNON from 'cannon/build/cannon'
import * as utils from '@dcl-sdk/utils'


export function ballGameSetup() {

  // Ball shapes
  const ballShapes = [
    'models/BalloonCollider.glb',
    'models/Balloon_GlowingTrans.glb',
    'models/BalloonCollider.glb',
    'models/Balloon_GlowingTransM.glb',
    'models/BalloonCollider.glb',
  ]
  const ballCount = 150 // Total number of balls
  const balls: Ball[] = [] // Store balls
  const ballBodies: CANNON.Body[] = [] // Store ball bodies
  let ballHeight = 147 // Start height for the balls

  // Setup our world
  const world: CANNON.World = new CANNON.World()
  world.gravity.set(0, -29.82, 0) // m/s²

  // Add invisible colliders
  loadColliders(world)

  const groundPhysicsMaterial = new CANNON.Material('groundMaterial')
  const groundPhysicsContactMaterial = new CANNON.ContactMaterial(groundPhysicsMaterial, groundPhysicsMaterial, {
    friction: 0.8,
    restitution: 0.33
  })
  world.addContactMaterial(groundPhysicsContactMaterial)

  // Create a ground plane and apply physics material
  const groundBody: CANNON.Body = new CANNON.Body({
    mass: 0, // mass === 0 makes the body static
    position: new CANNON.Vec3(0, 147, 0)
  })
  groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2) // Reorient ground plane to be in the y-axis

  const groundShape: CANNON.Plane = new CANNON.Plane()
  groundBody.addShape(groundShape)
  groundBody.material = groundPhysicsMaterial
  world.addBody(groundBody)

  const ballPhysicsMaterial: CANNON.Material = new CANNON.Material('ballMaterial')
  const ballPhysicsContactMaterial = new CANNON.ContactMaterial(groundPhysicsMaterial, ballPhysicsMaterial, {
    friction: 0.8,
    restitution: 0.3
  })
  world.addContactMaterial(ballPhysicsContactMaterial)

  // Create random balls and positions

  for (let i = 0; i < ballCount; i++) {
    const x: number = Math.floor(Math.random() * 3) + 46
    const y: number = ballHeight
    const z: number = Math.floor(Math.random() * 3) + 46
    const r: number = Math.random() * 3 + 1
    const ball = new Ball(ballShapes[i % ballShapes.length], r, {
      position: { x, y, z },
      scale: { x: r, y: r, z: r }
    })
    balls.push(ball)
    ballHeight += r * 2 // To ensure the colliders aren't intersecting when the simulation starts

    // const ballTransform: Transform = balls[i].getComponent(Transform)
    // Create bodies to represent each of the balls
    const ballBody: CANNON.Body = new CANNON.Body({
      mass: 5, // kg
      position: new CANNON.Vec3(x, y, z), // m
      shape: new CANNON.Sphere(r) // m (Create sphere shaped body with a radius of 1)
    })
    ball.setBody(ballBody)
    ball.setWorld(world)
    ballBody.material = ballPhysicsMaterial // Add bouncy material to ball body
    ballBody.linearDamping = 0.2 // Round will keep translating even with friction so you need linearDamping
    ballBody.angularDamping = 0.2 // Round bodies will keep rotating even with friction so you need angularDamping

    world.addBody(ballBody) // Add body to the world
    ballBodies.push(ballBody)
  }

  // Sync Physics System
  const fixedTimeStep: number = 1.0 / 60.0 // seconds
  const maxSubSteps: number = 3

  engine.addSystem((dt: number) => {
    // Instruct the world to perform a single step of simulation.
    // It is generally best to keep the time step and iterations fixed.
    world.step(fixedTimeStep, dt, maxSubSteps)

    // Position and rotate the balls in the scene to match their cannon world counterparts
    for (let i = 0; i < balls.length; i++) {
      if (balls[i].sync()) balls.splice(i, 1)
    }
  })
}
