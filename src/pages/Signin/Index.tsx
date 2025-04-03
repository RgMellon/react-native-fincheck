import React from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Input } from "../../components/Input";
import logo from "../../assets/icons/logo.png";
import { Button } from "../../components/Button";
import { useSigninController } from "./useSigninController";
import { Controller } from "react-hook-form";

export default function SignInPage() {
  const { handleSubmit, errors, control } = useSigninController();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 32,
          }}
        >
          <Image
            source={logo}
            className="w-[120px] h-[25px]"
            resizeMode="cover"
          />
          <Text className="text-[24px] font-bold text-gray-900 mt-16">
            Entre em sua conta
          </Text>

          <View className="flex flex-row gap-2 items-center mt-4">
            <Text className="text-md text-gray-900">Novo por aqui ?</Text>
            <Text className="text-md text-teal-900">Crie uma conta</Text>
          </View>

          <View className="mt-12 w-full gap-5">
            <Controller
              control={control}
              name="email"
              defaultValue=""
              render={({ field: { onChange, value } }) => {
                return (
                  <Input
                    keyboardType="email-address"
                    label="Email"
                    error={errors.email?.message}
                    onChangeText={onChange}
                    value={value}
                  />
                );
              }}
            />

            <Controller
              control={control}
              name="password"
              defaultValue=""
              render={({ field: { onChange, value } }) => {
                return (
                  <Input
                    label="Senha"
                    error={errors.password?.message}
                    onChangeText={onChange}
                    value={value}
                  />
                );
              }}
            />

            <Button
              label="Entrar"
              disable={Object.keys(errors).length > 0}
              onPress={handleSubmit}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
