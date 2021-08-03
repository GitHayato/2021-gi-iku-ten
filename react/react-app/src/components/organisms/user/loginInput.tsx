import { Box, Button, FormControl, FormLabel, Input, Stack, Text } from "@chakra-ui/react";
import { push } from "connected-react-router";
import { memo, VFC } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { useMessage } from "../../../hooks/useMessage";

type IFormInput = {
  email: string;
  password: string;
}

export const LoginInput: VFC = memo(() => {
  const { formState: { errors }, register, handleSubmit } = useForm<IFormInput>();
  const { showMessage } = useMessage();
　const dispatch = useDispatch();

  const onSubmit = (data: IFormInput) => {
    console.log(data)
    dispatch(push("/"));
    showMessage({title: "正常にログインできました。", status: "success"});
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <FormControl isRequired>
          <FormLabel>メールアドレス</FormLabel>
          <Input
            placeholder={"メールアドレスを入力してください"}
            size="lg"
            borderRadius="0"
            {...register("email", {
              required: "メールアドレスは必須です。",
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "メールアドレス形式で入力してください。",
              },
            })}
          />
          {
            errors.email && errors.email.type === "required" ?
            <Text fontSize="xs" color="red.500">※メールアドレスは必須です。</Text> : errors.email && errors.email.message === "メールアドレス形式で入力してください。" ?
            <Text fontSize="xs" color="red.500">※メールアドレス形式で入力してください。</Text> :<Box h="1rem"></Box>
          }
        </FormControl>
        <FormControl isRequired>
          <FormLabel>パスワード</FormLabel>
          <Input
            placeholder={"パスワードを入力してください"}
            size="lg"
            borderRadius="0"
            {...register("password", {
              required: true
            })}
          />
          {errors.password ? <Text fontSize="xs" color="red.500">※パスワードは必須です。</Text> : <Box h="1rem"></Box>}
        </FormControl>
      </Stack>
      <Button
        mt="3"
        bg="#406B15"
        color="white"
        type="submit"
        borderRadius="0"
        _hover={{opacity: 0.8}}
        isFullWidth
      >登録</Button>
    </form>
  )
})