"use client";
import { Button, Card, Group, Table, Box } from "@mantine/core";
import {
  IconEdit,
  IconTrash,
  IconPlus,
} from "@tabler/icons-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Breadcrumbst from "@/component/Breadcrumbs/Breadcrumbst";
import Add_ContentType_Dialog from "./addDialong";
import Edit_ContentType_Dialog from "./editDialong";

export default function Content_type() {
  const router = useRouter();
  const [activePage, setPage] = useState(1);
  const [dialogOpened, setDialogOpened] = useState(false);
  const [editdialogOpen, setEditdialogOpen] = useState(false);

  const arr = [
    { title: "Trang chủ", href: "/manage" },
    { title: "Quản lý", href: "/manage" },
    { title: "Loại nội dung", href: "/manage/content-type" },
  ];

  const data = [
    {
      id: 1,
      tieuDe: "Tiêu đề 1",
      moTa: "Mô tả cho tiêu đề 1",
    },
    {
      id: 2,
      tieuDe: "Tiêu đề 2",
      moTa: "Mô tả cho tiêu đề 2",
    },
  ];

  const rows = data.map((item, index) => (
    <Table.Tr
      key={item.id}
      style={{
        transition: "background-color 0.2s ease",
        fontSize: "16px",
        height: "60px",
        borderCollapse: "separate",
        marginBottom: "10px",
      }}
    >
      <Table.Td
        style={{
          borderTopLeftRadius: "10px",
          borderBottomLeftRadius: "10px",
          padding: "10px",
        }}
      >
        {index + 1}
      </Table.Td>
      <Table.Td style={{ padding: "10px" }}>{item.tieuDe}</Table.Td>
      <Table.Td style={{ padding: "10px" }}>{item.moTa}</Table.Td>
      <Table.Td
        style={{
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "10px",
          padding: "10px",
        }}
      >
        <Group>
          <Button
            variant="subtle"
            color="blue"
            onClick={() => setEditdialogOpen(true)}
          >
            <IconEdit size={20} />
          </Button>

          <Button variant="subtle" color="red">
            <IconTrash size={20} />
          </Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Box style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
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
              rightSection={<IconPlus size={16} />}
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
              onClick={() => setDialogOpened(true)}
            >
              Thêm
            </Button>
          </Box>
        </Group>

        <Card
          withBorder
          shadow="md"
          style={{ borderRadius: "12px", overflow: "hidden" }}
        >
          <Table
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
                height: "50px",
              }}
            >
              <Table.Tr>
                <Table.Th
                  style={{ padding: "12px", borderRadius: "12px 0 0 12px" }}
                >
                  #
                </Table.Th>
                <Table.Th>Tiêu đề</Table.Th>
                <Table.Th>Mô tả</Table.Th>
                <Table.Th
                  style={{ borderRadius: "0 12px 12px 0" }}
                >
                  Hành động
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody
              style={{
                backgroundColor: "white",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "12px",
              }}
            >
              {rows}
            </Table.Tbody>
          </Table>
          <Group
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            {/* <Pagination page={activePage} onChange={setPage} total={10} /> */}
          </Group>
        </Card>

        <Add_ContentType_Dialog
          opened={dialogOpened}
          onClose={() => setDialogOpened(false)}
        />

        <Edit_ContentType_Dialog
          opened={editdialogOpen}
          onClose={() => setEditdialogOpen(false)}
        />
      </Box>
    </>
  );
}
