export function buildPlannerPrompt(
  topicTitle: string,
  overallScore: number,
  recentPostsSummary: string
): { systemPrompt: string; userPrompt: string } {
  const systemPrompt = `You are an Autonomous Strategic Planner for Axiom. Your job is to decide the action for an accepted topic.`;
  const userPrompt = `Topic: "${topicTitle}"
Editorial Score: ${overallScore}
Recent Publishing History: ${recentPostsSummary}

Select action from: ["publish_now", "queue", "monitor", "merge", "skip"]

Return JSON matching:
{
  "action": "publish_now" | "queue" | "monitor" | "merge" | "skip",
  "reason": string
}`;
  return { systemPrompt, userPrompt };
}
