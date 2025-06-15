// lib/fetchGroqInsight.ts
export const fetchGroqInsight = async (topic: string): Promise<string> => {
  const response = await fetch('http://localhost:5000/api/actionable-insight', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title:topic }),
  });

  const data = await response.json();
  return data.insight || 'No actionable insight available.';
};
