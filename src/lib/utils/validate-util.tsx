export const isErrorResponse = (
  response: any
): response is { success: boolean; message: string } => {
  return (
    response &&
    typeof response === "object" &&
    "success" in response &&
    "message" in response
  );
};

export const isEmptyId = (id: any): id is undefined => {
  return id !== undefined || id !== null || id !== "";
};

