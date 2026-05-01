import blessed from 'blessed';
import { createTabBar } from './components/tab-bar.js';
import { createStatusBar, updateStatusBar } from './components/status-bar.js';
import { state, switchTab, toggleTheme, refreshTracker } from './store.js';
let screen;
let tabBar;
let statusBar;
let viewArea;
let currentView = null;
let viewFactories;
export function getViewArea() {
    return viewArea;
}
export function initDashboard(blessedScreen, factories) {
    screen = blessedScreen;
    viewFactories = factories;
    tabBar = createTabBar(screen, state.activeTab);
    viewArea = blessed.box({
        parent: screen,
        top: 1, left: 0, right: 0, bottom: 1,
    });
    statusBar = createStatusBar(screen);
    renderActiveView();
}
export function renderDashboard() {
    // Rebuild tab bar
    if (tabBar)
        tabBar.detach();
    tabBar = createTabBar(screen, state.activeTab);
    updateStatusBar(statusBar);
    renderActiveView();
    screen.render();
}
export function renderActiveView() {
    if (currentView) {
        currentView.detach();
        currentView = null;
    }
    if (viewArea && viewFactories && viewFactories[state.activeTab]) {
        currentView = viewFactories[state.activeTab](viewArea);
        screen.render();
    }
}
export function setupKeys(blessedScreen) {
    blessedScreen.key(['q', 'C-c'], () => process.exit(0));
    blessedScreen.key(['1'], () => switchTab('swim-lane'));
    blessedScreen.key(['2'], () => switchTab('task-board'));
    blessedScreen.key(['3'], () => switchTab('agent-hub'));
    blessedScreen.key(['4'], () => switchTab('calendar'));
    blessedScreen.key(['t'], () => { toggleTheme(); renderDashboard(); });
    blessedScreen.key(['r'], () => { refreshTracker(); renderDashboard(); });
    blessedScreen.key(['escape'], () => { renderDashboard(); });
}
//# sourceMappingURL=dashboard.js.map