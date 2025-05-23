import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import { Accounts } from "./components/Accounts";
import { Transactions } from "./components/Transactions";
import { DashBoardProvider } from "./DashboardContext";
import { MenuModal } from "./components/MenuModal";
import { FavIcon } from "./components/FavIcon";
import { Header } from "@/src/components/Header";
import { TransactionModal } from "./components/modals/TransactionModal";

type SectionType = "accounts" | "transactions";

export function Dashboard() {
  const sections: SectionType[] = ["accounts", "transactions"];

  const renderItem = ({ item }: { item: SectionType }) => {
    if (item === "accounts") return <Accounts />;
    if (item === "transactions") return <Transactions />;
    return null;
  };

  return (
    <>
      <Header />
      <View className="relative flex-1">
        <FlatList
          data={sections}
          keyExtractor={(item) => item}
          renderItem={renderItem}
          contentContainerStyle={{
            padding: 0,
            paddingBottom: 100,
            marginTop: 16,
          }}
          showsVerticalScrollIndicator={false}
        />

        <TransactionModal />
        <MenuModal />

        <FavIcon />
      </View>
    </>
  );
}
