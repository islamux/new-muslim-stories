import blessed from 'blessed';
import type { TabId } from './types.js';
export declare function getViewArea(): blessed.Widgets.BoxElement;
export declare function initDashboard(blessedScreen: blessed.Widgets.Screen, factories: Record<TabId, (parent: blessed.Widgets.BoxElement) => blessed.Widgets.BlessedElement>): void;
export declare function renderDashboard(): void;
export declare function renderActiveView(): void;
export declare function setupKeys(blessedScreen: blessed.Widgets.Screen): void;
