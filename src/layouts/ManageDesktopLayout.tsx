import { Tabs, rem } from "@mantine/core";
import {
  IconCreditCard,
  IconUsers,
  IconBallBasketball,
  IconStretching,
} from "@tabler/icons-react";
import styles from "./styles/managedesktoplayout.module.css";
import Memberships from "../pages/manage/Memberships";

export default function ManageDesktopLayout() {
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <div className={styles.container}>
      <Tabs variant="outline" defaultValue="gallery" w="100%">
        <Tabs.List grow>
          <Tabs.Tab
            value="memberships"
            leftSection={<IconCreditCard style={iconStyle} />}
          >
            Memberships
          </Tabs.Tab>
          <Tabs.Tab
            value="members"
            leftSection={<IconUsers style={iconStyle} />}
          >
            Members
          </Tabs.Tab>
          <Tabs.Tab
            value="programs"
            leftSection={<IconBallBasketball style={iconStyle} />}
          >
            Programs
          </Tabs.Tab>
          <Tabs.Tab
            value="classes"
            leftSection={<IconStretching style={iconStyle} />}
          >
            Classes
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="memberships">
          <Memberships />
        </Tabs.Panel>

        <Tabs.Panel value="members">Members</Tabs.Panel>

        <Tabs.Panel value="programs">Programs</Tabs.Panel>

        <Tabs.Panel value="classes">Classes</Tabs.Panel>
      </Tabs>
    </div>
  );
}
