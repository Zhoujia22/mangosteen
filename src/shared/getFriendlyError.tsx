const map: Record<string, string> = {
  "is invalid": "邮箱格式不正确",
};

export const getFriendlyError = (error: string) => {
  return map[error] || error;
};
