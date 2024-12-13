"use client";
import {
  Stack,
  Card,
  Table,
  Group,
  Text,
  ActionIcon,
  Box,
  Button,
} from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import EditDialog from "./EditDialog";
import Breadcrumbst from "@/component/Breadcrumbs/Breadcrumbst";
import SystemLayout from "@/app/system/layout";

export default function Category_Detail() {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);

  const arr = [
    { title: "Trang chủ", href: "/system" },
    { title: "Hạng mục", href: "/manage/categorys" },
    { title: "Chi tiết", href: "/manage/categorys/detail" },
  ];

  const data = [
    { label: "Tên phần mềm", value: "Hệ thống quản lý dự án" },
    { label: "Công nghệ và kỹ thuật sử dụng", value: "ReactJS và Node.js" },
    {
      label: "Chức năng",
      value:
        "Quản lý tiến độ dự án, Quản lý tài nguyên, Báo cáo và phân tích dữ liệu",
    },
    { label: "Nhóm chức năng", value: "Quản lý dự án, Báo cáo hiệu suất" },
    {
      label: "Mô tả",
      value:
        "Phần mềm quản lý dự án giúp doanh nghiệp dễ dàng theo dõi tiến độ, quản lý tài nguyên và phân tích dữ liệu hiệu quả.",
    },
  ];

  const handleEditClick = (item: string | any) => {
    const formattedData = {
      [item.label]: item.value,
    };
    setSelectedData(formattedData);
    setOpened(true);
  };

  return (
    <>
    <SystemLayout>
      <Box style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <Stack
          align="stretch"
          justify="center"
          gap="md"
          style={{
            zIndex: 0,
            maxWidth: "100%",
          }}
        >
          <Group
            
            mb="md"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Breadcrumbst ArrBreadcrumb={arr} />
            <Box style={{ flexGrow: 1, textAlign: "right" }}>
              <Button
                style={{
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
                onClick={() => router.push("/manage/categorys")}
              >
                Trở lại
              </Button>
            </Box>
          </Group>

          <Card
            withBorder
            shadow="md"
            style={{ borderRadius: "12px", overflow: "hidden" }}
          >
            <Table
              withColumnBorders
              highlightOnHover
              verticalSpacing="md"
              horizontalSpacing="lg"
              striped
              style={{
                borderCollapse: "separate",
                borderSpacing: "0 10px",
                fontSize: "16px",
              }}
            >
              <Table.Thead
                style={{
                  backgroundColor: "#228be6",
                  color: "white",
                  textAlign: "left",
                  fontSize: "18px",
                }}
              >
                <Table.Tr>
                  <Table.Th
                    style={{ padding: "12px", borderRadius: "12x 0 0 12px" }}
                  >
                    Chi tiết
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
            </Table>
            <Box
              style={{
                backgroundColor: "white",
                borderRadius: "12px",
              }}
            >
              {data.map((item, index) => (
                <Group
                  key={index}
                
                  style={{ marginBottom: 15 }}
                >
                  <Text >
                    {item.label}: {item.value}
                  </Text>
                  <ActionIcon onClick={() => handleEditClick(item)}>
                    <IconPencil size={16} />
                  </ActionIcon>
                </Group>
              ))}
            </Box>
          </Card>
        </Stack>
      </Box>
      <EditDialog
        opened={opened}
        onClose={() => setOpened(false)}
        data={selectedData}
      />
      </SystemLayout>
    </>
  );
}
