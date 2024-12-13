"use client";
import { useState, useEffect } from "react";
import { Button, Card, Group, Table, Box, Select, Pagination } from "@mantine/core";
import { IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import Breadcrumbst from "@/component/Breadcrumbs/Breadcrumbst";
import Add_Content_Dialog from "./addContentDialog";
import Edit_Content_Dialog from "./editContentDialog";

import { useDispatch, useSelector } from "react-redux";
import { fetchData_Content_new, deletContent_new } from "@/store/slices/content_new/content_newAction";
import { ThunkDispatch } from "redux-thunk";

export default function Content_new() {
  const router = useRouter();
  const [totalElements, setTotalElements] = useState<number>();
  const [activePage, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [rowpage, setRowpage] = useState<number>();
  const [dialogOpened, setDialogOpened] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const arr = [
    { title: "Trang chủ", href: "/manage" },
    { title: "Quản lý", href: "/manage" },
    { title: "Nội dung", href: "/manage/content" },
  ];

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { items } = useSelector((state: any) => state.content_new);

  useEffect(() => {
    dispatch(fetchData_Content_new({ page: activePage, size: pageSize }));
  }, [dispatch, activePage, pageSize]);

  useEffect(() => {
    if (items?.result?.pageable?.pageSize) {
      setRowpage(items.result.pageable.pageSize);
      setTotalElements(items?.result?.totalElements);
    }
  }, [items]);

  const startIndex = rowpage ? (activePage - 1) * rowpage : 0;


  const rows = items?.result?.content?.map((item: any, index: number) => (
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
        {startIndex + index + 1}
      </Table.Td>
      <Table.Td style={{ padding: "10px" }}>{item.ten}</Table.Td>
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
            onClick={() => setEditDialogOpen(true)}
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
                <Table.Th>Tên</Table.Th>
                <Table.Th>Mô tả</Table.Th>
                <Table.Th style={{ borderRadius: "0 12px 12px 0" }}>
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
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <Box className="flex items-center">
              Hiển thị{" "}
              <Select
                value={pageSize.toString()}
                data={["5", "10", "15", "20"]}
                onChange={(value) => {
                  const newPageSize = Number(value);
                  setPageSize(newPageSize);

                  if (
                    totalElements &&
                    (activePage - 1) * newPageSize >= totalElements
                  ) {
                    setPage(1);
                  }
                }}
                className="w-[20%] mx-2"
              />
              Trên tổng số {totalElements}
            </Box>
            <Pagination
              value={activePage}
              onChange={setPage}
              total={items?.result?.totalPages}
            />
          </Group>
        </Card>

        <Add_Content_Dialog
          opened={dialogOpened}
          onClose={() => setDialogOpened(false)}
        />

        <Edit_Content_Dialog
          opened={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
        />
      </Box>
    </>
  );
}
