export function findById<T extends { id: string }>(
  entities: Array<T>,
  id: string
) {
  return entities.find((anEntity) => anEntity.id === id);
}
