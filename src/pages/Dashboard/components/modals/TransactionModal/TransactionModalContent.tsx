import { InputCurrency } from "@/src/components/InputCurrency";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNewTransactionModalController } from "./useNewTransactionModalController";
import { Button } from "@/src/components/Button";
import { Controller } from "react-hook-form";
import { Input } from "@/src/components/Input";
import { Select } from "@/src/components/Select";
import { format } from "date-fns";
import { maskDate } from "@/src/utils/maskDate";
import { BlurView } from "expo-blur";
import { useDashboard } from "../../../useDashboard";

export function TransactionModalContent() {
  const {
    control,
    handleSubmit,
    errors,
    categories,
    fetchingCategories,
    fetchingBankAccounts,
    accounts,
    isPending,
  } = useNewTransactionModalController();
  const { closeNewTransactionModal, newTransactionType } = useDashboard();

  return (
    <KeyboardAvoidingView
      style={{ height: "100%" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <Pressable
            className="absolute top-0 bottom-0 left-0 right-0 z-0"
            onPress={closeNewTransactionModal}
          >
            <BlurView
              intensity={20}
              tint="dark"
              className="absolute top-0 bottom-0 left-0 right-0"
            />
          </Pressable>
          <View className="w-full bg-slate-50 p-4 absolute bottom-10 rounded-lg pb-4">
            <Text className="text-lg text-center font-bold">
              {newTransactionType == "INCOME" ? "Nova Receita" : "Nova Despesa"}
            </Text>

            <View className="mt-10 items-center">
              <Controller
                control={control}
                name="value"
                defaultValue={0}
                render={({ field: { onChange, value } }) => {
                  return (
                    <InputCurrency
                      value={value}
                      onChange={onChange}
                      error={errors.value?.message}
                    />
                  );
                }}
              />

              <View className="mt-10 w-full">
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      label="Nome da despesa"
                      error={errors?.name?.message}
                      onChangeText={onChange} // Passando o onChangeText
                      value={value} // Passando o value para o campo
                    />
                  )}
                />
              </View>

              {!fetchingCategories && (
                <View className="mt-10 w-full">
                  <Controller
                    control={control}
                    defaultValue=""
                    name="categoryId"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        onChange={onChange}
                        value={value}
                        label="Categoria"
                        error={errors.categoryId?.message}
                        options={categories.map((category) => ({
                          label: category.name,
                          value: category.id,
                          icon: category.icon,
                        }))}
                      />
                    )}
                  />
                </View>
              )}

              {!fetchingBankAccounts && (
                <View className="mt-10 w-full">
                  <Controller
                    control={control}
                    defaultValue=""
                    name="bankAccountId"
                    render={({ field: { onChange, value } }) => (
                      <Select
                        onChange={onChange}
                        value={value}
                        error={errors.bankAccountId?.message}
                        label="Pagar com"
                        options={accounts.map((bankAccount) => ({
                          label: bankAccount.name,
                          value: bankAccount.id,
                          icon: "",
                        }))}
                      />
                    )}
                  />
                </View>
              )}

              <View className="mt-10 w-full">
                <Controller
                  name="date"
                  control={control}
                  defaultValue={format(new Date(), "dd/MM/yyyy")}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      label="Data"
                      onChangeText={(text) => {
                        onChange(maskDate(text));
                      }}
                      value={value}
                      placeholder="dd/mm/aaaa"
                      keyboardType="numeric"
                      error={errors.date?.message}
                      maxLength={10}
                    />
                  )}
                />
              </View>

              <View className="mt-10 w-full"></View>

              <View className="w-full mt-10">
                <Button
                  isLoading={isPending}
                  label="Salvar"
                  disable={Object.keys(errors).length > 0}
                  onPress={handleSubmit}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
