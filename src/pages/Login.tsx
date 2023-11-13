import { Title, Paper, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import toast from "react-hot-toast";

export default function Login() {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8
          ? "Your password need to be at least 8 characters"
          : null,
    },
  });

  const loginSubmited = form.onSubmit(async ({ email, password }) => {
    const userCredential = await signInWithEmailAndPassword(email, password);
    if (error) {
      toast.error("Error occured when logging in!");
    }
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        backgroundImage: "linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)",
      }}
    >
      <Paper shadow="sm" p="xl" miw={550}>
        <Title order={1} mb={12}>
          Login to MyGym
        </Title>
        <form onSubmit={loginSubmited}>
          <TextInput
            label="Your email"
            withAsterisk
            placeholder="john@example.com"
            mb={12}
            {...form.getInputProps("email")}
          />

          <TextInput
            label="Your password"
            withAsterisk
            placeholder="********"
            type="password"
            {...form.getInputProps("password")}
          />

          <Button
            variant="filled"
            size="md"
            type="submit"
            mt={16}
            disabled={loading}
          >
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
}
