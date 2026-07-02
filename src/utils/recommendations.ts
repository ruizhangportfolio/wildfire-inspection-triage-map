import type { RecommendedAction, TriageItem } from "../types";

interface RecommendedActionDetails {
  title: RecommendedAction;
  description: string;
}

export const getRecommendedActionDetails = (
  item: TriageItem
): RecommendedActionDetails => {
  if (
    item.recommendedAction === "Flag access constraint" ||
    item.riskFactors.accessRisk === "Critical"
  ) {
    return {
      title: "Flag access constraint",
      description:
        "Confirm road access status before assigning field inspection or routing field teams."
    };
  }

  if (item.priorityLevel === "High") {
    return {
      title: "Assign field inspection",
      description:
        "Dispatch field inspection and verify visible changes with before / after imagery before final clearance."
    };
  }

  if (item.priorityLevel === "Medium") {
    return {
      title: "Verify with imagery first",
      description:
        "Review imagery-change indicators and nearby incident reports before assigning field inspection."
    };
  }

  return {
    title: "Monitor / hold for later review",
    description:
      "Hold for later review unless new incident reports, access constraints, or imagery-change indicators emerge."
  };
};
