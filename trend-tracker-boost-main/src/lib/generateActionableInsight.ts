export async function fetchActionableInsight(topic: string): Promise<string> {
  const res = await fetch('http://localhost:5000/api/actionable-insight', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ topic }),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch insight');
  }

  const data = await res.json();
  return data.insight;
}
