export const chatWithAi = (sessionId: string) => {
  const es = new EventSource(`/api/?sessionId=${sessionId}`, {
    withCredentials: true,
  });

  return es;
};
