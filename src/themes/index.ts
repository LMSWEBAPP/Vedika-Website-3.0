import { ThemeId, VedikaTheme } from './types';
import { midnightCyan } from './midnightCyan';
import { warmEspresso } from './warmEspresso';
import { maroonIvory } from './maroonIvory';

export * from './types';
export { midnightCyan } from './midnightCyan';
export { warmEspresso } from './warmEspresso';
export { maroonIvory } from './maroonIvory';

export const themes: Record<ThemeId, VedikaTheme> = {
  'midnight-cyan': midnightCyan,
  'warm-espresso': warmEspresso,
  'maroon-ivory': maroonIvory,
};

/**
 * Global default active theme.
 * Changing this configuration value changes the initial active theme across the application.
 */
export const ACTIVE_THEME: ThemeId = 'midnight-cyan';

export function getTheme(id: ThemeId): VedikaTheme {
  return themes[id] ?? themes[ACTIVE_THEME];
}
