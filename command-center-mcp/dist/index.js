import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { tools } from './tools.js';
class CommandCenterServer extends Server {
    constructor() {
        super({
            name: 'command-center',
            version: '1.0.0'
        });
        this.setRequestHandler(ListToolsRequestSchema, () => {
            return {
                tools: tools.map(tool => ({
                    name: tool.name,
                    description: tool.description,
                    inputSchema: tool.inputSchema
                }))
            };
        });
        this.setRequestHandler(CallToolRequestSchema, async (request) => {
            const name = request.params.name;
            const args = request.params.arguments || {};
            const tool = tools.find(t => t.name === name);
            if (!tool) {
                return {
                    content: [{ type: 'text', text: `Tool '${name}' not found`, isError: true }],
                    isError: true
                };
            }
            try {
                const result = tool.handler(args);
                if (typeof result === 'object' && 'isError' in result) {
                    return {
                        content: [{ type: 'text', text: result.text }],
                        isError: result.isError
                    };
                }
                return {
                    content: [{ type: 'text', text: result }]
                };
            }
            catch (error) {
                return {
                    content: [{ type: 'text', text: `Error: ${error instanceof Error ? error.message : String(error)}` }],
                    isError: true
                };
            }
        });
    }
}
async function main() {
    console.error('Command Center MCP server running on stdio', { stderr: true });
    const server = new CommandCenterServer();
    const transport = new StdioServerTransport();
    await server.connect(transport);
}
main().catch(console.error);
//# sourceMappingURL=index.js.map