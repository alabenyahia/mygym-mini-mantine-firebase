import styles from "./styles/appdesktoplayout.module.css";
import { UnstyledButton, Text, rem } from "@mantine/core";
import {
  IconHome,
  IconTableOptions,
  IconChartBar,
  IconSend,
} from "@tabler/icons-react";
import ManageDesktopLayout from "./ManageDesktopLayout";

export default function AppDesktopLayout() {
  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <UnstyledButton className={styles.sidebarbtn}>
          <IconHome style={{ width: rem(36), height: rem(36) }} />
          <Text size="xs">Dashboard</Text>
        </UnstyledButton>

        <UnstyledButton className={styles.sidebarbtn}>
          <IconTableOptions style={{ width: rem(36), height: rem(36) }} />
          <Text size="xs">Manage</Text>
        </UnstyledButton>

        <UnstyledButton className={styles.sidebarbtn}>
          <IconChartBar style={{ width: rem(36), height: rem(36) }} />
          <Text size="xs">Reports</Text>
        </UnstyledButton>

        <UnstyledButton className={styles.sidebarbtn}>
          <IconSend style={{ width: rem(36), height: rem(36) }} />
          <Text size="xs">Communicate</Text>
        </UnstyledButton>
      </nav>

      <ManageDesktopLayout />
    </main>
  );
}
