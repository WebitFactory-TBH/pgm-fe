// do not use
export interface ActionWithoutPayload<P> {
  type: keyof P;
}

export interface ActionsWtihPayload<P> {
  type: keyof P;
  payload: P;
}

export type ActionsWithoutPayload<T> = Partial<T>;

export type Action<T> = T extends ActionsWithoutPayload<T>
  ? ActionWithoutPayload<T>
  : ActionsWtihPayload<T>;
