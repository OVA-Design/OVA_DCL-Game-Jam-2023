import { timers } from '@dcl-sdk/utils'
import {
  Entity,
  GltfContainer,
  InputAction,
  PBPointerEventsResult,
  Transform,
  TransformType,
  engine,
  pointerEventsSystem
} from '@dcl/sdk/ecs'
import { playSound } from './factory'
import { Vector3 } from '@dcl/sdk/math'
import * as CANNON from 'cannon/build/cannon'
export class Ball {
  private _e: Entity
  private _world: CANNON.World | undefined
  private _body: CANNON.Body | undefined
  private _p: boolean = false

  setBody(ballBody: CANNON.Body) {
    this._body = ballBody
  }
  setWorld(world: CANNON.World) {
    this._world = world
  }

  removeSelf() {
    if (this._p) return
    this._p = true

    // const timeID = timers.setInterval(() => {
    //   let size = (Math.random() + 1) * Transform.getMutable(this._e).scale.x
    //   Transform.getMutable(this._e).scale = Vector3.create(size, size, size)
    // }, 200)

    // play sound clicked
    playSound('sounds/pop.mp3', 10)

    // replace a component
    GltfContainer.createOrReplace(this._e, { src: 'models/BalloonPop.glb' })

    // remove model
    timers.setTimeout(() => {
      // timers.clearInterval(timeID)
      engine.removeEntity(this._e)
      // console.log('removeEntity(this._e)', this._e)
    }, 500)

    if (this._body) {
      this._world?.remove(this._body)
    } else throw new Error('Should not happened.')
  }

  constructor(src: string, public radius: number = 1, transform?: Partial<TransformType>) {
    // console.log('src', src)
    this._e = engine.addEntity()
    GltfContainer.create(this._e, { src })
    Transform.create(this._e, transform)
    pointerEventsSystem.onPointerDown(
      {
        entity: this._e,
        opts: {
          button: InputAction.IA_POINTER,
          showFeedback: true,
          hoverText: 'Pop to Clear View'
        }
      },
      (event: PBPointerEventsResult) => {
        this.removeSelf()
      }
    )
  }

  sync() {
    if (this._p) return true
    const mutableTransform = Transform.getMutable(this._e)
    mutableTransform.position = this._body?.position as TransformType['position']
    mutableTransform.rotation = this._body?.quaternion as TransformType['rotation']
    return false
  }
}
