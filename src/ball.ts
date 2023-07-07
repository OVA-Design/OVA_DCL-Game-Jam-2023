import { timers } from "@dcl-sdk/utils";
import { AudioSource, Entity, GltfContainer, InputAction, PBPointerEventsResult, Transform, TransformType, engine, pointerEventsSystem } from "@dcl/sdk/ecs";
import { playSound } from "./factory";
import { Vector3 } from "@dcl/sdk/math";

export class Ball {
  private _e: Entity;
  private _world: CANNON.World | undefined;
  private _body: CANNON.Body | undefined;

  setBody(ballBody: CANNON.Body) {
    this._body = ballBody;
  }
  setWorld(world: CANNON.World) {
    this._world = world;
  }

  removeSelf() {
    timers.setInterval(() => {
      let size = Math.random()
      Transform.getMutable(this._e).scale = Vector3.create(size, size, size)
    }, 50)

    // play sound clicked
    playSound('sounds/pop.mp3')

    // replace a component
    GltfContainer.createOrReplace(this._e, {src: "models/Balloon pop.glb"})

    // remove model
    timers.setInterval(() => {
      engine.removeEntity(this._e)
    }, 500);
    if (this._body) {
    this._world?.remove(this._body);
    } else throw new Error('Should not happened.')
  }

  constructor(src: string, public radius: number = 1, transform?: Partial<TransformType>) {
    this._e = engine.addEntity();
    GltfContainer.create(this._e, {src});
    Transform.create(this._e, transform);
    pointerEventsSystem.onPointerDown(
      {
        entity: this._e,
        opts: {
          button: InputAction.IA_POINTER,
          showFeedback: true,
          hoverText: 'Pop Balloon'
        }
      },
      (event: PBPointerEventsResult) => {
        this.removeSelf()
      }
    )
  }

  sync() {
    const mutableTransform = Transform.getMutable(this._e)
    mutableTransform.position = this._body?.position as TransformType['position']
    mutableTransform.rotation = this._body?.quaternion as TransformType['rotation']
  }
}
