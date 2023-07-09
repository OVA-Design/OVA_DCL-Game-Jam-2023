import {
  AudioSource,
  engine,
  Transform,
} from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import * as utils from '@dcl-sdk/utils'


// play sound
export function playSound(soundPath: string, volume?: number) {
  const soundEntity = engine.addEntity()
  AudioSource.create(soundEntity, {
    audioClipUrl: soundPath,
    loop: false,
    playing: true,
    volume: 1
  })
  Transform.create(soundEntity, { position: Vector3.create(48, 98, 48) })

  utils.timers.setTimeout(() => {
    const playerPosition = Transform.getMutable(engine.PlayerEntity).position
    Transform.create(soundEntity, { position: playerPosition })
  }, 10000) //millisecond delay
}
