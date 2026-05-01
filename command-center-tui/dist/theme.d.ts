export declare const COLORS: {
    readonly accent: {
        readonly hex: "#585CF0";
        readonly ansi: 63;
    };
    readonly accentLt: {
        readonly hex: "#8286FF";
        readonly ansi: 105;
    };
    readonly onTrack: {
        readonly hex: "#22c55e";
        readonly ansi: 35;
    };
    readonly behind: {
        readonly hex: "#ef4444";
        readonly ansi: 196;
    };
    readonly review: {
        readonly hex: "#f59e0b";
        readonly ansi: 214;
    };
    readonly muted: {
        readonly hex: "#9B9BAA";
        readonly ansi: 247;
    };
    readonly surface: {
        readonly hex: "#111118";
        readonly ansi: 233;
    };
    readonly dark: {
        readonly hex: "#0A0A10";
        readonly ansi: 16;
    };
    readonly border: {
        readonly hex: "#1a1a2e";
        readonly ansi: 234;
    };
    readonly white: {
        readonly hex: "#FFFFFF";
        readonly ansi: 255;
    };
    readonly black: {
        readonly hex: "#000000";
        readonly ansi: 0;
    };
    readonly statusTodo: {
        readonly hex: "#9B9BAA";
        readonly ansi: 247;
    };
    readonly statusInProgress: {
        readonly hex: "#585CF0";
        readonly ansi: 63;
    };
    readonly statusReview: {
        readonly hex: "#f59e0b";
        readonly ansi: 214;
    };
    readonly statusDone: {
        readonly hex: "#22c55e";
        readonly ansi: 35;
    };
    readonly statusBlocked: {
        readonly hex: "#ef4444";
        readonly ansi: 196;
    };
    readonly domainPalette: readonly [{
        readonly hex: "#f59e0b";
        readonly ansi: 214;
    }, {
        readonly hex: "#22c55e";
        readonly ansi: 35;
    }, {
        readonly hex: "#8286FF";
        readonly ansi: 105;
    }, {
        readonly hex: "#ef4444";
        readonly ansi: 196;
    }, {
        readonly hex: "#14B8A6";
        readonly ansi: 37;
    }, {
        readonly hex: "#EC4899";
        readonly ansi: 199;
    }, {
        readonly hex: "#F97316";
        readonly ansi: 208;
    }, {
        readonly hex: "#6366F1";
        readonly ansi: 63;
    }, {
        readonly hex: "#06B6D4";
        readonly ansi: 38;
    }, {
        readonly hex: "#9B9BAA";
        readonly ansi: 247;
    }];
};
export declare function domainColor(domain: string, domains: string[]): number;
export declare function getDomains(): string[];
export declare function statusColor(status: string): number;
export declare const WIDGET_STYLES: {
    readonly screen: {
        readonly bg: "#0A0A10";
        readonly fg: "#FFFFFF";
    };
    readonly box: {
        readonly bg: "#111118";
        readonly fg: "#FFFFFF";
        readonly border: {
            readonly fg: "#1a1a2e";
        };
    };
    readonly list: {
        readonly bg: "#111118";
        readonly fg: "#FFFFFF";
        readonly selectedBg: "#585CF0";
        readonly selectedFg: "#FFFFFF";
        readonly border: {
            readonly fg: "#1a1a2e";
        };
        readonly focus: {
            readonly selectedBg: "#8286FF";
        };
    };
    readonly table: {
        readonly bg: "#111118";
        readonly fg: "#FFFFFF";
        readonly selectedBg: "#585CF0";
        readonly selectedFg: "#FFFFFF";
        readonly border: {
            readonly fg: "#1a1a2e";
        };
        readonly headerBg: "#1a1a2e";
        readonly headerFg: "#FFFFFF";
    };
    readonly tabBar: {
        readonly bg: "#0A0A10";
        readonly fg: "#9B9BAA";
        readonly activeBg: "#585CF0";
        readonly activeFg: "#FFFFFF";
    };
    readonly statusBar: {
        readonly bg: "#111118";
        readonly fg: "#9B9BAA";
    };
};
