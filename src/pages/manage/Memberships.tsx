import { Text, Button, Drawer, TextInput, Select } from "@mantine/core";
import styles from "./styles/memberships.module.css";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";

export default function Memberships() {
  const [drawerOpened, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);
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

  return (
    <div className={styles.container}>
      <div className={styles.addbar}>
        <Text>Manage ￫ Memberships</Text>
        <Button onClick={openDrawer} leftSection={<IconPlus size={14} />}>
          Add membership
        </Button>
      </div>

      <div></div>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        title="Add membership"
        position="right"
        size="33%"
      >
        <form onSubmit={() => console.log("submitted")} className={styles.form}>
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
          >
            Create
          </Button>
        </form>
      </Drawer>
    </div>
  );
}
