import { FlatList, View } from "react-native";
import { Accounts } from "./components/Accounts";
import { Transactions } from "./components/Transactions";

type SectionType = "accounts" | "transactions";

export function Dashboard() {
  const sections: SectionType[] = ["accounts", "transactions"];

  const renderItem = ({ item }: { item: SectionType }) => {
    if (item === "accounts") return <Accounts />;
    if (item === "transactions") return <Transactions />;
    return null;
  };

  return (
    <FlatList
      data={sections}
      keyExtractor={(item) => item}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 0, paddingBottom: 100, marginTop: 16 }}
      showsVerticalScrollIndicator={false}
    />
  );
}
