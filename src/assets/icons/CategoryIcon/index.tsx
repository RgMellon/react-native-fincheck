import { iconsMap } from "./categories/iconsMap";

interface CategoryIconProps {
  type: "income" | "expense";
  category?: string;
}

export function CategoryIcon({ type, category }: CategoryIconProps) {
  const Icon =
    iconsMap[type][
      (category as keyof (typeof iconsMap.expense | typeof iconsMap.income)) ??
        "default"
    ] ?? iconsMap[type].default;

  return <Icon />;
}
