"use client";
import {
  Button,
  Card,
  Group,
  Table,
  Box,
  Pagination,
  Select,
  Tooltip
} from "@mantine/core";
import { IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { fetchCate, DeleteCate } from "@/store/slices/cate/cateAction";

import Breadcrumbst from "@/component/Breadcrumbs/Breadcrumbst";
import Add_Nhomktcn_Dialog from "./addDialog";
import Edit_Nhomktcn_Dialog from "./editDialog";
import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";
import openCustomConfirmModal from "@/component/deleteConfirmModal/deleteConfirmModal";
import { notifications } from "@mantine/notifications";

interface ActiveUser {
  id: string;
  ten: string;
  moTa: string
}
const arr = [
  { title: "Trang chủ", href: "/manage" },
  { title: "Quản lý", href: "/manage" },
  { title: "Danh mục", href: ""},
];
export default function PagePage() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { items, loading } = useSelector((state: any) => state.cate);

  const [activePage, setPage] = useState<number | any>(1);
  const [dialogOpened, setDialogOpened] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [activeUuser, setActiveUser] = useState<ActiveUser | undefined>(
    undefined
  );
  const [rowpage, setRowpage] = useState<number | any>(5);
  const [searchValue, setSearchValue] = useState<string | undefined>("5");
  const [totalElements, setTotalElements] = useState<number | undefined>();

  useEffect(() => {
    if (items?.pageable?.pageSize) {
      setRowpage(items?.pageable?.pageSize);
      setTotalElements(items?.totalElements);
    }
  }, [items]);

  const startIndex = useMemo(() => {
    return rowpage ? (activePage - 1) * rowpage : 0;
  }, [activePage, rowpage]);

  const handlerDelete = async (id: string) => {
    try {
      await dispatch(DeleteCate(id));
      await dispatch(fetchCate({ activePage, searchValue }));
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Xóa thất bại",
        message: "Có lỗi xảy ra khi xóa danh mục!",
        color: "red",
        autoClose: 3000,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    dispatch(fetchCate({ activePage, searchValue }));
  }, [dispatch, activePage, searchValue]);


  const rows = items.content?.map(
    (item: string | any, index: number) => (
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
        <Tooltip label={item?.ten} position="top" withArrow multiline
          style={{ maxWidth: 400, whiteSpace: 'normal' }}>
          <Table.Td
            className="p-3 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {item?.ten}
          </Table.Td>
        </Tooltip>
        <Tooltip label={item?.moTa} position="top" withArrow multiline
          style={{ maxWidth: 400, whiteSpace: 'normal' }}>
          <Table.Td
            className="p-3 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {item?.moTa}
          </Table.Td>
        </Tooltip>
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
              onClick={() => {
                setEditDialogOpen(true);
                setActiveUser({
                  id: item.id,
                  ten: item.ten,
                  moTa: item.moTa
                });
              }}
            >
              <IconEdit size={20} />
            </Button>

            <Button
              variant="subtle"
              color="red"
              onClick={() => {
                openCustomConfirmModal({
                  id: item.id,
                  onConfirmAction: async (id: string) => {
                    await handlerDelete(id);
                  },
                });
              }}
            >
              <IconTrash size={20} />
            </Button>
          </Group>
        </Table.Td>
      </Table.Tr>
    )
  );

  return (
    <>
      <FullScreenLoader visible={loading} />
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
              (e.currentTarget.style.transform =
                "scale(1.05)")
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
          <Table.ScrollContainer minWidth={500}>
            <Table
              highlightOnHover
              verticalSpacing="md"
              horizontalSpacing="lg"
              striped
              style={{
                borderCollapse: "separate",
                borderSpacing: "0 10px",
                fontSize: "18px",
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
                    style={{
                      padding: "12px",
                      borderRadius: "12px 0 0 12px",
                    }}
                  >
                    STT
                  </Table.Th>
                  <Table.Th>Tên</Table.Th>
                  <Table.Th>Mô tả</Table.Th>
                  <Table.Th
                    style={{
                      borderRadius: "0 12px 12px 0",
                    }}
                  >
                    Hành động
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody
                style={{
                  backgroundColor: "white",
                  boxShadow:
                    "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  borderRadius: "12px",
                }}
              >
                {rows}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
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
                value={rowpage.toString()}
                data={["5", "10", "15", "20"]}
                onChange={(value) => {
                  const newPageSize: string | any = value;
                  setSearchValue(newPageSize);

                  if (
                    totalElements &&
                    (activePage - 1) * newPageSize >=
                    totalElements
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
              total={items?.totalPages}
            />
          </Group>
        </Card>

        <Add_Nhomktcn_Dialog
          opened={dialogOpened}
          onClose={() => setDialogOpened(false)}
          activePage={activePage}
          searchValue={searchValue}
        />

        <Edit_Nhomktcn_Dialog
          opened={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          Data={activeUuser}
          activePage={activePage}
          searchValue={searchValue}
        />
      </Box>
    </>
  );
}
