import { View, Text, Image } from "react-native";
import { Input } from "../components/Input";
import logo from "../assets/icons/logo.png";
import { Button } from "../components/Button";

export function SignInPage() {
  return (
    <View className="flex flex-1 p-8 justify-center items-center">
      <Image source={logo} className="w-[120px] h-[25px]" resizeMode="cover" />

      <Text className="text-[24px] font-bold text-gray-900 mt-16">
        Entre em sua conta
      </Text>

      <View className="flex flex-row gap-2 items-center mt-4">
        <Text className="text-md text-gray-900">Novo por aqui ?</Text>
        <Text className="text-md text-teal-900">Crie uma conta</Text>
      </View>

      <View className="mt-12 w-full gap-5">
        <Input label="E-mail" onChange={() => {}} />
        <Input label="Senha" secureTextEntry onChange={() => {}} />

        <Button label="Entrar" disable={false} />
      </View>
    </View>
  );
}
