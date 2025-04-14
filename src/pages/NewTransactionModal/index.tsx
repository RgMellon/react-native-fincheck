import { InputCurrency } from "@/src/components/InputCurrency";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useNewTransactionModalController } from "./useNewTransactionModalController";
import { Button } from "@/src/components/Button";
import { Controller } from "react-hook-form";
import { Input } from "@/src/components/Input";
import { Select } from "@/src/components/Select";

export function NewTransactionModal() {
  const { control, handleSubmit, errors, categories, fetchingCategories } =
    useNewTransactionModalController();

  return (
    <View className=" flex-1 bg-slate-50 p-4">
      <View className="w-full">
        <Text className="text-lg text-center font-bold"> Novas despesas </Text>

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
            <Input label="Nome da despesa" />
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

          {/* <View className="mt-10 w-full">
            <Select error="" label="Pagar com" options={[1, 2, 3, 4]} />
          </View> */}

          <View className="mt-10 w-full">
            <Input label="Data" />
          </View>

          <View className="w-full mt-10">
            <Button
              label="Entrar"
              disable={Object.keys(errors).length > 0}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
