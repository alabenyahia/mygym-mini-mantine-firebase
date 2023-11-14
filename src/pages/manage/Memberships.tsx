import { Text, Button, Drawer, TextInput, Select } from "@mantine/core";
import styles from "./styles/memberships.module.css";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { auth, firestore } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";

export default function Memberships() {
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [user, loading, error] = useAuthState(auth);
  const [addMembershipLoading, setAddMembershipLoading] = useState(false);
  const form = useForm({
    initialValues: {
      name: "",
      price: "",
      durationType: "month",
      duration: "",
    },

    validate: {
      name: (value) =>
        value.length === 0 ? "Membership name is required" : null,
      price: (value) =>
        Number(value) <= 0
          ? "Membership price should be greater than 0TND"
          : null,
      durationType: (value) =>
        value.length === 0 ? "Please select a duration type" : null,
      duration: (value) =>
        Number(value) <= 0 ? "Duration should be greated than 0" : null,
    },
  });

  const addMembership = form.onSubmit(
    ({ name, price, durationType, duration }) => {
      if (user) {
        setAddMembershipLoading(true);
        updateDoc(doc(firestore, "users", user.uid), {
          "manage.memberships": arrayUnion({
            name,
            price,
            durationType,
            duration,
          }),
        })
          .then((value) => {
            toast.success("Membership created");
            console.log("membership", value);
          })
          .catch((e) => {
            toast.error("Creating membership failed!");
          })
          .finally(() => {
            setAddMembershipLoading(false);
          });
      }
    }
  );

  return (
    <div className={styles.container}>
      <div className={styles.addbar}>
        <Text>Manage ￫ Memberships</Text>
        <Button onClick={openDrawer} leftSection={<IconPlus size={14} />}>
          Add membership
        </Button>
      </div>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        title="Add membership"
        position="right"
        size="33%"
      >
        <form onSubmit={addMembership} className={styles.form}>
          <TextInput
            label="Membership name"
            withAsterisk
            placeholder="Pro, Gold, Diamond, etc..."
            mb={12}
            {...form.getInputProps("name")}
          />

          <TextInput
            label="Membership price"
            withAsterisk
            placeholder="price in (TND)"
            type="number"
            mb={12}
            {...form.getInputProps("price")}
          />

          <Select
            label="Membership duration type"
            withAsterisk
            placeholder="Monthly | Daily"
            data={[
              { value: "month", label: "Month" },
              { value: "day", label: "Day" },
            ]}
            mb={12}
            {...form.getInputProps("durationType")}
          />

          <TextInput
            label="Membership duration"
            withAsterisk
            placeholder="1, 2, 30, etc..."
            type="number"
            {...form.getInputProps("duration")}
          />
          <Button
            variant="filled"
            size="md"
            type="submit"
            mt={16}
            rightSection={<IconPlus size={22} />}
            className={styles.formbtn}
            disabled={addMembershipLoading || loading}
          >
            Create
          </Button>
        </form>
      </Drawer>
    </div>
  );
}
