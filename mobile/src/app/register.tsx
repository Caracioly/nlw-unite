import { View, Image, StatusBar, Alert } from "react-native";
import { Link, router } from "expo-router";

import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";

import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  function HandleRegister() {
    if (!name.trim() || !email.trim()) {
      return Alert.alert("Inscrição", "Preencha todos os campos!")
    }
    router.push("/ticket")
  }

  return (
    <View className="flex-1 items-center justify-center bg-green-500">
      <StatusBar barStyle="light-content" />
      <Image
        source={require("@/assets/logo.png")}
        className="h-16"
        resizeMode="contain"
      />

      <View className="mt-12 gap-3 w-full">
        <Input>
          <FontAwesome6
            name="user-circle"
            size={20}
            color={colors.green[200]}
          />
          <Input.Field 
          onChangeText={setName}
          placeholder="Nome Completo" />
        </Input>

        <Input>
          <MaterialIcons
            name="alternate-email"
            size={20}
            color={colors.green[200]}
          />
          <Input.Field 
          onChangeText={setEmail}
          placeholder="E-mail" keyboardType="email-address" />
        </Input>

        <Button onPress={HandleRegister} title="Realizar inscrição" />
        <Link
          className="text-gray-100 text-base font-bold text-center mt-8"
          href="/"
        >
          Já possui o ingresso ?
        </Link>
      </View>
    </View>
  );
}
