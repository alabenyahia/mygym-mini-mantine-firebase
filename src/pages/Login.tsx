import { Title, Text, Paper, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const navigate = useNavigate();

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

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Text size="sm" c="dimmed">
                Need an account?
              </Text>
              <Button
                variant="transparent"
                size="compact-sm"
                onClick={() => navigate("/signup")}
              >
                Signup
              </Button>
            </div>

            <Button
              m={0}
              variant="filled"
              size="md"
              type="submit"
              disabled={loading}
            >
              Login
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
}
