"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AppShell,
  Text,
  Box,
  Grid,
  Card,
  Divider,
  Space,
  Image,
  Button,
  SimpleGrid,
  Title
} from "@mantine/core";
import { IconDeviceImacDollar, IconDatabaseDollar, IconUsers, IconTruckDelivery, IconArrowNarrowRight } from '@tabler/icons-react';
import dynamic from "next/dynamic";
import Tables from "./table";
import DateNow from "./date";
import Breadcrumbst from "@/component/Breadcrumbs/Breadcrumbst";
import Service from "./service";
const PieChartRevenue = dynamic(() => import("./chartDas"), {
  ssr: false, // Chỉ render phía client
});


export default function SystemPage() {
  const router = useRouter();

  const arr = [
    { title: "Trang chủ", href: "/system" },
    { title: "Dasboard", href: "/system" },
  ];

  return (
    <>
      <AppShell>
        <Box style={{ flex: 2, padding: "16px" }}>
          <Grid>
            <Grid.Col span={3}>
              <Card shadow="sm" radius="md" withBorder style={{ cursor: "pointer" }}>
                <IconDeviceImacDollar
                  size={70}
                  style={{
                    color: "#ff3636",
                    padding: "5px",
                    borderRadius: "10px",
                    margin: "20px 10px 0px 10px",
                  }}
                />
                <Box mt="md">
                  <Text size="lg">
                    Lợi nhuận
                  </Text>
                  {/* <Text size="xl">haha</Text> */}
                </Box>
              </Card>
            </Grid.Col>

            <Grid.Col span={3}>
              <Card
                shadow="sm"
                radius="md"
                withBorder
                style={{ cursor: "pointer" }}
              >
                <IconDatabaseDollar
                  size={70}
                  style={{
                    color: "#3676ff",
                    padding: "5px",
                    borderRadius: "10px",
                    margin: "20px 10px 0px 10px",
                  }}
                />
                <Box mt="md">
                  <Text size="lg">
                    Doanh thu
                  </Text>
                  {/* <Text size="xl">{data?.tong_doanh_thu}</Text> */}
                </Box>
              </Card>
            </Grid.Col>

            <Grid.Col span={3}>
              <Card
                shadow="sm"
                radius="md"
                withBorder
                style={{ cursor: "pointer" }}
              >
                <IconUsers
                  size={70}
                  style={{
                    color: "#ffcd36",
                    padding: "5px",
                    borderRadius: "10px",
                    margin: "20px 10px 0px 10px",
                  }}
                />
                <Box mt="md">
                  <Text size="lg">
                    Khách hàng
                  </Text>
                  {/* <Text size="xl">{data?.tong_khach_hang}</Text> */}
                </Box>
              </Card>
            </Grid.Col>

            <Grid.Col span={3}>
              <Card
                shadow="sm"
                radius="md"
                withBorder
                style={{ cursor: "pointer" }}
              >
                <IconTruckDelivery
                  size={70}
                  style={{
                    color: "#36ff68",
                    padding: "5px",
                    borderRadius: "10px",
                    margin: "20px 10px 0px 10px",
                  }}
                />
                <Box mt="md">
                  <Text size="lg">
                    Đơn hàng
                  </Text>
                  {/* <Text size="xl">{data?.tong_don_hang}</Text> */}
                </Box>
              </Card>
            </Grid.Col>
          </Grid>

          <Box mt="lg" style={{ display: "flex", gap: "16px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", marginBottom: "10px", borderRadius: "10px" }}>
            <Box
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                borderRadius: "8px",
                backgroundColor: "white",
              }}
            >
              <Box style={{ padding: "16px", marginTop: "20px", textAlign: "center" }}>
                <Title order={1}>Xin chào!</Title>
                <Text size="sm" mb="lg">
                  Hôm nay chúng ta làm gì?
                </Text>
              </Box>

              <Box
                style={{
                  display: "grid",
                  gap: "16px",
                  padding: "16px",
                }}
              >
                <SimpleGrid cols={2} spacing="sm">
                  <Button
                    leftSection={<IconArrowNarrowRight size={16} />}
                  >Sản phẩm</Button>
                  <Button
                    leftSection={<IconArrowNarrowRight size={16} />}
                  >Doanh thu</Button>
                  <Button
                    leftSection={<IconArrowNarrowRight size={16} />}
                  >Giao dịch</Button>
                  <Button
                    leftSection={<IconArrowNarrowRight size={16} />}
                  >Đối tác</Button>
                </SimpleGrid>
              </Box>
            </Box>

            <Box
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "8px",
                backgroundColor: "white",
              }}
            >
              <Image src="https://i.pinimg.com/originals/c9/63/fa/c963fab6c097cd88b7c76441c2750a87.gif" alt="Placeholder" fit="contain" style={{ width: "100%", maxWidth: "100%" }} />
            </Box>
          </Box>

          <Grid style={{ height: "100%" }}>
            <Grid.Col span={8} style={{ display: "flex", flexDirection: "column" }}>
              <Card shadow="sm" padding="lg" radius="md" withBorder style={{ flex: 1 }}>
                <Text size="xl" color="dark">
                  KẾ TOÁN
                </Text>
                <Divider my="sm" />
                <Text size="lg">Tiến độ công việc</Text>
                <Text size="sm">Năm 2024</Text>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flex: 1, // Chiều cao tự động
                  }}
                >
                  <PieChartRevenue />
                </Box>
              </Card>
            </Grid.Col>

            {/* Phần các nút dịch vụ */}
            <Grid.Col
              span={4}
              style={{ display: "flex", flexDirection: "column", height: "100%" }} // Đảm bảo chiều cao của col bằng với col span 8
            >
              <Service />
            </Grid.Col>
          </Grid>

        </Box>
      </AppShell>
    </>
  );
}
