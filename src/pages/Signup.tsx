import { Title, Paper, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../config/firebase";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

export default function Signup() {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [addUserLoading, setAddUserLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      gymName: "",
      email: "",
      password: "",
    },

    validate: {
      name: (value) => (value.length === 0 ? "Your name is required" : null),
      gymName: (value) =>
        value.length === 0 ? "Your gym name is required" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8
          ? "Your password need to be at least 8 characters"
          : null,
    },
  });

  const registerSubmited = form.onSubmit(
    async ({ email, password, name, gymName }) => {
      const userCredential = await createUserWithEmailAndPassword(
        email,
        password
      );
      if (error) {
        toast.error("Registration failed!");
      }
      if (userCredential) {
        try {
          setAddUserLoading(true);
          await setDoc(doc(firestore, "users", userCredential.user.uid), {
            userData: {
              name,
              gymName,
            },
          });
          toast.success("Registration successfull!");
        } catch (e) {
          toast.error("Adding user to database failed!");
        } finally {
          setAddUserLoading(false);
        }
      }
    }
  );

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
          Signup to MyGym
        </Title>
        <form onSubmit={registerSubmited}>
          <TextInput
            label="Your name"
            withAsterisk
            placeholder="John doe"
            mb={12}
            {...form.getInputProps("name")}
          />

          <TextInput
            label="Your gym name"
            withAsterisk
            placeholder="California Gym"
            mb={12}
            {...form.getInputProps("gymName")}
          />

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
            disabled={loading || addUserLoading}
            variant="filled"
            size="md"
            type="submit"
            mt={16}
          >
            Signup
          </Button>
        </form>
      </Paper>
    </div>
  );
}
