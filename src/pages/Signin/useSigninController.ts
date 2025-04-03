import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/src/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/src/services/authService";

type FormSignInParams = {
  password: string;
  email: string;
};

const schema = z.object({
  email: z.string().email("Email inválido").nonempty("O e-mail é obrigatório"),
  password: z
    .string()
    .nonempty("A senha é obrigatória")
    .min(8, "A senha deve ter pelo menos 8 caracteres"),
});

export function useSigninController() {
  const { signin } = useAuth();

  const {
    register,
    control,
    handleSubmit: hookHandleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
  }>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data: FormSignInParams) => {
      return authService.signIn(data);
    },
  });

  const handleSubmit = hookHandleSubmit(async (data) => {
    try {
      console.log(data);
      const response = await mutateAsync(data);
      console.log(response.data.accesToken, "respo");
      signin(response.data.accesToken);
    } catch (err) {
      console.log(err);
      // toast.error("Erro ao fazer login, tente mais tarde");
    }
  });

  return {
    register,
    control,
    handleSubmit,
    errors,
    isButtonLoading: isPending,
  };
}
