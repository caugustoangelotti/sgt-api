import type { TurmaModel } from '../models'

export interface LoadTurma {
  load: () => Promise<LoadTurma.Result>
}

export namespace LoadTurma {
  export type Result = TurmaModel[]
}
