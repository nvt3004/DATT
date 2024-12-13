"use client";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {
  Box,
  Card,
  Group,
  Text,
  Title,
  Select,
  Pagination,
  Table,
  ActionIcon,
  Collapse,
  Stack,
  rem
} from "@mantine/core";
import { IconSettings, IconChevronDown, IconChevronRight, IconClipboardList, IconLayersSubtract } from '@tabler/icons-react';

import Breadcrumbst from "@/component/Breadcrumbs/Breadcrumbst";
import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";
import { fetchPhanMem_TSKT } from "@/store/slices/phanmemtskt/phanmem_tsktAction";

const arr = [
  { title: "Trang chủ", href: "/manage" },
  { title: "Quản lý", href: "/manage" },
  { title: "Phần Mềm TSKT", href: "/manage/phanmem_tskt" },
];

export default function PagePage() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { items, loading, error } = useSelector((state: any) => state.phanmem_tskt);
  const [activePage, setPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("5");
  const [totalElements, setTotalElements] = useState<number>(0);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (expandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  useEffect(() => {
    if (items?.result?.pageable?.pageSize) {
      setTotalElements(items.result.totalElements);
    }
  }, [items]);

  const startIndex = useMemo(() => {
    return searchValue ? (activePage - 1) * parseInt(searchValue) : 0;
  }, [activePage, searchValue]);

  useEffect(() => {
    dispatch(fetchPhanMem_TSKT({ activePage, searchValue }));
  }, [dispatch, activePage, searchValue]);

  return (
    <>
      <FullScreenLoader visible={loading} />
      <Box p="md">
        <Group
          mb="md"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Breadcrumbst ArrBreadcrumb={arr} />
        </Group>

        <Card withBorder radius="lg" shadow="sm" p="lg">

          <Table
            striped
            highlightOnHover
            verticalSpacing="md"
            horizontalSpacing="lg"
            style={{
              borderCollapse: "separate",
              borderSpacing: "0 2px",
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
                <Table.Th style={{
                  width: 60,
                  padding: "12px",
                  borderRadius: "12px 0 0 12px",
                }}>
                  #
                </Table.Th>
                <Table.Th style={{ width: 60 }}>STT</Table.Th>
                <Table.Th style={{
                  borderRadius: "0 12px 12px 0",
                }}>Phần Mềm Thông Số Kỹ Thuật</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {items?.result?.content?.map((item: any, index: number) => (
                <>
                  <Table.Tr key={item.id}>
                    <Table.Td>
                      <ActionIcon
                        variant="subtle"
                        onClick={() => toggleRow(item.id)}
                        color="blue"
                      >
                        {expandedRows.has(item.id) ? (
                          <IconChevronDown size={18} />
                        ) : (
                          <IconChevronRight size={18} />
                        )}
                      </ActionIcon>
                    </Table.Td>
                    <Table.Td>
                      <Box
                        w={28}
                        h={18}
                      >
                        {startIndex + index + 1}
                      </Box>
                    </Table.Td>
                    <Table.Td>
                      <Text fw={500}>{item.giaTri}</Text>
                    </Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td colSpan={4} p={0}>
                      <Collapse in={expandedRows.has(item.id)}>
                        <Box p="xs">
                          <Stack gap="xs">
                            {/* Thông Số Section */}
                            <Box
                              p="xs"
                              style={{
                                backgroundColor: '#f8f9fa',
                                borderRadius: rem(8),
                                border: '1px solid #e9ecef'
                              }}
                            >
                              <Group gap="xs" mb="md">
                                <IconClipboardList size={20} color="#228be6" />
                                <Text fw={700} size="lg">Thông Số</Text>
                              </Group>
                              <Table withColumnBorders>
                                <Table.Tbody>
                                  <Table.Tr>
                                    <Table.Td><Text fw={500}>Tên</Text></Table.Td>
                                    <Table.Td>{item.thongSo.ten}</Table.Td>
                                  </Table.Tr>
                                  <Table.Tr>
                                    <Table.Td><Text fw={500}>Mã</Text></Table.Td>
                                    <Table.Td>{item.thongSo.ma}</Table.Td>
                                  </Table.Tr>
                                  <Table.Tr>
                                    <Table.Td><Text fw={500}>Mô tả</Text></Table.Td>
                                    <Table.Td>{item.thongSo.moTa}</Table.Td>
                                  </Table.Tr>
                                </Table.Tbody>
                              </Table>
                            </Box>

                            {/* Thông Số Group Section */}
                            <Box
                              p="md"
                              style={{
                                backgroundColor: '#f8f9fa',
                                borderRadius: rem(8),
                                border: '1px solid #e9ecef'
                              }}
                            >
                              <Group gap="xs" mb="md">
                                <IconLayersSubtract size={20} color="#228be6" />
                                <Text fw={700} size="lg">Nhóm Thông Số </Text>
                              </Group>
                              <Table withColumnBorders>
                                <Table.Tbody>
                                  <Table.Tr>
                                    <Table.Td style={{ width: '150px' }}><Text fw={500}>Mã</Text></Table.Td>
                                    <Table.Td>{item.thongSoGroup.ma}</Table.Td>
                                  </Table.Tr>
                                  <Table.Tr>
                                    <Table.Td><Text fw={500}>Tên</Text></Table.Td>
                                    <Table.Td>{item.thongSoGroup.ten}</Table.Td>
                                  </Table.Tr>
                                  <Table.Tr>
                                    <Table.Td><Text fw={500}>Mô tả</Text></Table.Td>
                                    <Table.Td>{item.thongSoGroup.moTa}</Table.Td>
                                  </Table.Tr>
                                </Table.Tbody>
                              </Table>
                            </Box>
                          </Stack>
                        </Box>
                      </Collapse>
                    </Table.Td>
                  </Table.Tr>
                </>
              ))}
            </Table.Tbody>
          </Table>

          <Group justify="space-between" mt="xl">
            <Group>
              <Text>Hiển thị</Text>
              <Select
                value={searchValue}
                data={["5", "10", "15", "20"]}
                onChange={(value) => {
                  const newPageSize = value || "5";
                  setSearchValue(newPageSize);
                  if (totalElements && (activePage - 1) * parseInt(newPageSize) >= totalElements) {
                    setPage(1);
                  }
                }}
                style={{ width: 80 }}
              />
              <Text>Trên tổng số {totalElements}</Text>
            </Group>
            <Pagination
              value={activePage}
              onChange={setPage}
              total={items?.result?.totalPages || 1}
              radius="md"
            />
          </Group>
        </Card>
      </Box >
    </>
  );
}