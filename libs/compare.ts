import { Identifiable } from '@libs/types/Identifiable';

export function compareIdentifiable(
  a: Identifiable | null,
  b: Identifiable | null
): boolean {
  if (a === null && b === null) {
    return true;
  }
  return a?.id === b?.id;
}

export function compareIdentifiableArray(
  a: Identifiable[] | null,
  b: Identifiable[] | null
): boolean {
  if (a === null && b === null) {
    return true;
  } else if (a === null || b === null) {
    return false;
  }

  if (a.length !== b.length) return false;
  a.sort((aa, ab) => aa.id.localeCompare(ab.id));
  b.sort((ba, bb) => ba.id.localeCompare(bb.id));

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}
