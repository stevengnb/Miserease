export const isErrorResponse = (response: any): response is { success: boolean; message: string; } => {
    return response && typeof response === 'object' && 'success' in response && 'message' in response;
};