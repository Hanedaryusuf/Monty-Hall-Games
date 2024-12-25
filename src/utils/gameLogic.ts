export function generateDoors(count: number): boolean[] {
  const doors = new Array(count).fill(false);
  const prizeIndex = Math.floor(Math.random() * count);
  doors[prizeIndex] = true;
  return doors;
}

export function getRevealableDoors(doors: boolean[], selectedDoor: number): number[] {
  return doors
    .map((hasPrize, i) => !hasPrize && i !== selectedDoor ? i : -1)
    .filter(i => i !== -1);
}