export interface UndoEntry {
    timestamp: string;
    tool: string;
    before: string;
    after: string;
}
export declare function backupTracker(trackerPath: string): void;
export declare function appendUndoEntry(entry: UndoEntry): void;
export declare function readUndoLog(): UndoEntry[];
export declare function getBackupDir(): string;
export declare function getUndoLogPath(): string;
