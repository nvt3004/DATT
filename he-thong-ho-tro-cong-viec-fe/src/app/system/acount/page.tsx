"use client";
import { Text, Paper, Grid, Tabs, Avatar, Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

import Profile from "./components/profile/page";
import Changespass from "./components/changespass/changespass";

function Acount() {
  const icon = <IconInfoCircle />;
  return (
    <>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6, lg: 5 }}>
          {" "}
          <Paper shadow="md" radius="md" p="xl" withBorder>
            <div className="flex items-center mb-3">
              <div>
                <Avatar radius="xl" />
              </div>
              <div className="ml-2 ">
                <Text size="md">KIM THANH LOI</Text>
                <Text size="xs">Khách hàng</Text>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <Text tt="capitalize">ID: </Text>
                <Text c="dimmed">05314</Text>
              </div>
              <div className="flex justify-between mb-2">
                <Text tt="capitalize">Email: </Text>
                <Text c="dimmed">loiktpc05314@fpt.edu.vn</Text>
              </div>
              <div className="flex justify-between mb-2">
                <Text tt="capitalize">Số điện thoại:</Text>
                <Text c="dimmed">0975033680</Text>
              </div>
              <div className="flex justify-between mb-2">
                <Text tt="capitalize">Fax:</Text>
                <Text c="dimmed">024.62739359</Text>
              </div>
            </div>
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6, lg: 7 }}>
          {" "}
          <Paper shadow="md" radius="md" p="xl" withBorder>
            <Alert
              variant="light"
              color="blue"
              title="Thông tin cá nhân"
              icon={icon}
            ></Alert>
            <Tabs defaultValue="gallery">
              <Tabs defaultValue="first">
                <Tabs.List>
                  <Tabs.Tab value="first">Thông tin</Tabs.Tab>
                  <Tabs.Tab value="second">Đổi mật khẩu</Tabs.Tab>
                </Tabs.List>
                {/* Page profile */}
                <Tabs.Panel value="first">
                  <Profile />
                </Tabs.Panel>
                {/* Page changes password */}
                <Tabs.Panel value="second">
                  <Changespass />
                </Tabs.Panel>
              </Tabs>
            </Tabs>
          </Paper>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default Acount;
