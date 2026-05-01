type ToolHandler = (args: Record<string, unknown>) => string | {
    text: string;
    isError: boolean;
};
export declare const getTaskContextTool: {
    name: string;
    description: string;
    inputSchema: object;
    handler: ToolHandler;
};
export declare const getTaskSummaryTool: {
    name: string;
    description: string;
    inputSchema: object;
    handler: ToolHandler;
};
export declare const getProjectStatusTool: {
    name: string;
    description: string;
    inputSchema: object;
    handler: ToolHandler;
};
export declare const getMilestoneOverviewTool: {
    name: string;
    description: string;
    inputSchema: object;
    handler: ToolHandler;
};
export declare const listTasksTool: {
    name: string;
    description: string;
    inputSchema: object;
    handler: ToolHandler;
};
export declare const getTaskHistoryTool: {
    name: string;
    description: string;
    inputSchema: object;
    handler: ToolHandler;
};
export declare const listAgentsTool: {
    name: string;
    description: string;
    inputSchema: object;
    handler: ToolHandler;
};
export declare const getActivityFeedTool: {
    name: string;
    description: string;
    inputSchema: object;
    handler: ToolHandler;
};
export declare const startTaskTool: {
    name: string;
    description: string;
    inputSchema: object;
    handler: ToolHandler;
};
export declare const completeTaskTool: {
    name: string;
    description: string;
    inputSchema: object;
    handler: ToolHandler;
};
export declare const approveTaskTool: {
    name: string;
    description: string;
    inputSchema: object;
    handler: ToolHandler;
};
export declare const rejectTaskTool: {
    name: string;
    description: string;
    inputSchema: object;
    handler: ToolHandler;
};
export declare const resetTaskTool: {
    name: string;
    description: string;
    inputSchema: object;
    handler: ToolHandler;
};
export declare const blockTaskTool: {
    name: string;
    description: string;
    inputSchema: object;
    handler: ToolHandler;
};
export declare const unblockTaskTool: {
    name: string;
    description: string;
    inputSchema: object;
    handler: ToolHandler;
};
export declare const updateTaskTool: {
    name: string;
    description: string;
    inputSchema: object;
    handler: ToolHandler;
};
export declare const logActionTool: {
    name: string;
    description: string;
    inputSchema: object;
    handler: ToolHandler;
};
export declare const enrichTaskTool: {
    name: string;
    description: string;
    inputSchema: object;
    handler: ToolHandler;
};
export declare const addMilestoneNoteTool: {
    name: string;
    description: string;
    inputSchema: object;
    handler: ToolHandler;
};
export declare const setMilestoneDatesTool: {
    name: string;
    description: string;
    inputSchema: object;
    handler: ToolHandler;
};
export declare const updateDriftTool: {
    name: string;
    description: string;
    inputSchema: object;
    handler: ToolHandler;
};
export declare const createMilestoneTool: {
    name: string;
    description: string;
    inputSchema: object;
    handler: ToolHandler;
};
export declare const addMilestoneTaskTool: {
    name: string;
    description: string;
    inputSchema: object;
    handler: ToolHandler;
};
export declare const registerAgentTool: {
    name: string;
    description: string;
    inputSchema: object;
    handler: ToolHandler;
};
export declare const tools: {
    name: string;
    description: string;
    inputSchema: object;
    handler: ToolHandler;
}[];
export {};
