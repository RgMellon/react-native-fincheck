import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
  const {
    register,
    control,
    handleSubmit: hookHandleSubmit,
    formState: { errors },
    watch,
  } = useForm<{
    email: string;
    password: string;
  }>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = hookHandleSubmit(async (data) => {
    alert("i");
    try {
      console.log(data);
      // const response = await mutateAsync(data);
      // signIn(response.data.accesToken);
    } catch (err) {
      console.log(err);
      // toast.error("Erro ao fazer login, tente mais tarde");
    }
  });

  return { register, control, handleSubmit, errors, watch };
}
