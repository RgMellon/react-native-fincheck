import { BlurView } from "expo-blur";
import { View, Text } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { TrashIcon } from "../assets/icons/TrashIcon";
import { useEffect, useState } from "react";
import { dialogEvent } from "../utils/dialog";
import { Button } from "./Button";

export function Dialog() {
  const [showDialog, setShowDialog] = useState(false);
  const [dialogPayload, setDialogPayload] = useState<{
    id: string;
    onConfirm: () => void;
  } | null>(null);

  function onHide() {
    setDialogPayload(null);
    setShowDialog(false);
  }

  function onConfirm() {
    dialogPayload?.onConfirm();
    onHide();
  }

  useEffect(() => {
    function handleShowDialog(payload: { id: string; onConfirm: () => void }) {
      setDialogPayload(payload);
      setShowDialog(true);
    }

    dialogEvent.on({ event: "showDialog", listener: handleShowDialog });

    return () => {
      dialogEvent.removeListener("showDialog", handleShowDialog);
    };
  }, []);

  if (!showDialog) return null;

  return (
    <View className="w-full flex-1 absolute top-0 bottom-0 right-0 left-0 ">
      <View className="w-[90%] z-40 absolute top-[30%] left-[5%] right-0 bottom-0  justify-center items-center bg-slate-50 rounded-lg p-4 h-[400px]">
        <View className="rounded-full w-[60px] h-[60px] bg-red-100 justify-center items-center">
          <TrashIcon />
        </View>

        <Text className="mt-10 font-bold">Tem certeza que deseja excluir?</Text>

        <View className="w-full mt-10">
          <Button
            label="Excluir"
            onPress={onConfirm}
            variant="danger"
            disable={false}
          ></Button>
        </View>

        <View className="w-full mt-10">
          <Button
            label="Cancelar"
            variant="ghost"
            onPress={onHide}
            disable={false}
          />
        </View>
      </View>

      <TouchableWithoutFeedback onPress={onHide}>
        <BlurView
          intensity={50}
          tint="dark"
          className="flex-1 z-10 justify-center items-center"
        ></BlurView>
      </TouchableWithoutFeedback>
    </View>
  );
}
