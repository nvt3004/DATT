"use client";

import {
  AppShell,
  Text,
  Card,
  SimpleGrid,
  Tabs,
  Button,
  Image,
  Grid,
  Title,
  Box
} from "@mantine/core";
export default function Manage() {

  return (
    <>
      <AppShell
        padding="md"
      >
        {/* Banner Section */}
        <Grid style={{ display: 'flex' }}>
          <Grid.Col span={9} style={{ display: 'flex', flexDirection: 'column' }}>
            <Card shadow="sm" radius="md" padding="lg" style={{ display: "flex", gap: "16px", flexDirection: "row-reverse", alignItems: "center", flex: 1 }} withBorder>
              <Image
                src="https://i.pinimg.com/originals/1f/20/f4/1f20f423834bca13c5b4b90558c71977.gif"
                alt="System Dashboard"
                style={{
                  maxWidth: "70%",
                  maxHeight: "100%"
                }}
              />
              <Box style={{ flex: 1 }}>
                <Title order={2}>
                  Xin chào! Chào mừng bạn đến với hệ thống quản trị!
                </Title>
                <Text size="sm" color="dimmed" mt="sm">
                  Quản lý các dịch vụ và theo dõi tiến độ hệ thống.
                </Text>
                <Button variant="gradient" gradient={{ from: "orange", to: "red" }} mt="md">
                  Xem chi tiết dịch vụ
                </Button>
              </Box>
            </Card>
          </Grid.Col>

          <Grid.Col span={3} style={{ display: 'flex', flexDirection: 'column' }}>
            <Card shadow="sm" radius="md" padding="lg" style={{ flex: 1 }} withBorder>
              <Text size="lg">
                Thống kê hệ thống
              </Text>
              <Text size="sm" color="dimmed" mt="sm">
                Tổng số người dùng: 5000
              </Text>
              <Text size="sm" color="dimmed">
                Số lượng yêu cầu xử lý: 1200
              </Text>
              <Text size="sm" color="dimmed">
                Thời gian hoạt động của hệ thống: 99.9%
              </Text>
            </Card>

            <Card shadow="sm" radius="md" padding="lg" style={{ marginTop: "10px", flex: 1 }} withBorder>
              <Text size="lg">
                Thông tin hoạt động gần đây
              </Text>
              <Text size="sm" color="dimmed" mt="sm">
                Số lượng yêu cầu trong tuần qua: 350
              </Text>
              <Text size="sm" color="dimmed">
                Yêu cầu xử lý thành công: 98%
              </Text>
              <Text size="sm" color="dimmed">
                Tốc độ xử lý trung bình: 200 ms
              </Text>
            </Card>
          </Grid.Col>
        </Grid>


        <Grid style={{ marginTop: "24px" }}>
          <Grid.Col span={6}>
            <Card shadow="sm" radius="md" padding="lg" withBorder>
              <Text size="lg">
                Quản lý dịch vụ
              </Text>
              <Text size="sm" color="dimmed" mt="sm">
                Kiểm tra tình trạng các dịch vụ của hệ thống.
              </Text>
              <Button variant="filled" mt="md">
                Kiểm tra
              </Button>
            </Card>
          </Grid.Col>

          <Grid.Col span={6}>
            <Card shadow="sm" radius="md" padding="lg" withBorder>
              <Text size="lg">
                Hoạt động gần đây
              </Text>
              <Text size="sm" color="dimmed" mt="sm">
                Quản lý các sự kiện và hoạt động của hệ thống trong thời gian gần đây.
              </Text>
              <Button variant="filled" mt="md">
                Xem chi tiết
              </Button>
            </Card>
          </Grid.Col>
        </Grid>



        <Tabs defaultValue="in-progress" mt="lg">
          <Tabs.List>
            <Tabs.Tab value="in-progress">Hệ thống</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="in-progress" pt="sm">
            <SimpleGrid cols={3} spacing="lg">
              <Card shadow="sm" radius="md" padding="lg" withBorder>
                <Text size="lg">Giám sát yêu cầu hệ thống</Text>
                <Text size="xs" color="dimmed" mt="sm">
                  60% yêu cầu đang được xử lý
                </Text>
                <Button fullWidth mt="md" variant="filled">
                  Xem chi tiết
                </Button>
              </Card>

              <Card shadow="sm" radius="md" padding="lg" withBorder>
                <Text size="lg">Cập nhật tình trạng hệ thống</Text>
                <Text size="xs" color="dimmed" mt="sm">
                  40% tiến độ hệ thống đang được nâng cấp
                </Text>
                <Button fullWidth mt="md" variant="filled">
                  Cập nhật ngay
                </Button>
              </Card>

              <Card shadow="sm" radius="md" padding="lg" withBorder>
                <Text size="lg">Giám sát hiệu suất hệ thống</Text>
                <Text size="xs" color="dimmed" mt="sm">
                  30% tiến độ đang được theo dõi
                </Text>
                <Button fullWidth mt="md" variant="filled">
                  Xem báo cáo
                </Button>
              </Card>
            </SimpleGrid>
          </Tabs.Panel>
        </Tabs>

      </AppShell>
    </>
  );
}
