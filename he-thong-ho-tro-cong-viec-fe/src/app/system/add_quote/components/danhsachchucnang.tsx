"use client";
import React from "react";
import {
  Checkbox,
  Table,
  Box,
  Text,
  Select,
  Group,
  Button,
  Input,
} from "@mantine/core";
import { useState, useEffect } from "react";

// Dữ liệu mẫu của các chức năng và nhóm chức năng
const elements = [
  {
    errorCode: 200,
    message: "Data fetched successfully",
    data: {
      phanMemId: 1,
      phanMemName: "Văn phòng điện tử",
      hangMucs: [
        {
          hangMucId: 1,
          hangMucName: "Hệ thống văn phòng điện tử",
          nhomChucNangs: [
            {
              nhomChucNangId: 1,
              nhomChucNangName: "Mặc định",
              chucNangs: [
                {
                  chucNangId: 1,
                  chucNangName: "Tiếp nhận văn bản",
                  useCases: [
                    {
                      useCaseId: 1,
                      useCaseName: "Tiếp nhận văn bản đến trực tiếp",
                      useCasePrice: 4000000.0,
                    },
                  ],
                },
                {
                  chucNangId: 2,
                  chucNangName: "Danh sách văn bản",
                  useCases: [
                    {
                      useCaseId: 2,
                      useCaseName:
                        "Đánh dấu trạng thái xử lý văn bản cá nhân bằng màu sắc(Chưa xử lý trể hạn, chưa xử lý còn hạn, chưa xử lý không thời hạn, đã xử lý)",
                      useCasePrice: 5000000.0,
                    },
                    {
                      useCaseId: 3,
                      useCaseName:
                        "Tìm kiếm văn bản đến(Theo quy định nghị định 30)",
                      useCasePrice: 5000000.0,
                    },
                    {
                      useCaseId: 4,
                      useCaseName: "Đánh dấu văn bản quan trọng",
                      useCasePrice: 5000000.0,
                    },
                    {
                      useCaseId: 5,
                      useCaseName: "Đánh dấu văn bản chưa xem",
                      useCasePrice: 5000000.0,
                    },
                    {
                      useCaseId: 6,
                      useCaseName:
                        "Lọc trạng thái văn bản(Tất cả, chưa xử lý, đã chuyển, Hoàn thành) của đơn vị",
                      useCasePrice: 5000000.0,
                    },
                  ],
                },
                {
                  chucNangId: 3,
                  chucNangName: "Bút phê văn bản",
                  useCases: [
                    {
                      useCaseId: 7,
                      useCaseName: "Bút phê văn bản đến",
                      useCasePrice: 5000000.0,
                    },
                    {
                      useCaseId: 8,
                      useCaseName: "Vừa xem file đính kèm vừa bút phê văn bản",
                      useCasePrice: 5000000.0,
                    },
                  ],
                },
                {
                  chucNangId: 4,
                  chucNangName: "Chi tiết văn bản",
                  useCases: [
                    {
                      useCaseId: 9,
                      useCaseName: "Xem chi tiết thông tin văn bản",
                      useCasePrice: 5000000.0,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          hangMucId: 2,
          hangMucName:
            "Nâng cấp phần mềm Quản lý thông tin sinh viên cho Hệ thống đào tạo trường X",
          nhomChucNangs: [
            {
              nhomChucNangId: 1,
              nhomChucNangName: "Mặc định",
              chucNangs: [
                {
                  chucNangId: 1,
                  chucNangName: "Tiếp nhận văn bản 2",
                  useCases: [
                    {
                      useCaseId: 1,
                      useCaseName: "Tiếp nhận văn bản đến trực tiếp",
                      useCasePrice: 4000000.0,
                    },
                  ],
                },
                {
                  chucNangId: 2,
                  chucNangName: "Danh sách văn bản",
                  useCases: [
                    {
                      useCaseId: 2,
                      useCaseName:
                        "Đánh dấu trạng thái xử lý văn bản cá nhân bằng màu sắc(Chưa xử lý trể hạn, chưa xử lý còn hạn, chưa xử lý không thời hạn, đã xử lý)",
                      useCasePrice: 5000000.0,
                    },
                    {
                      useCaseId: 3,
                      useCaseName:
                        "Tìm kiếm văn bản đến(Theo quy định nghị định 30)",
                      useCasePrice: 5000000.0,
                    },
                    {
                      useCaseId: 4,
                      useCaseName: "Đánh dấu văn bản quan trọng",
                      useCasePrice: 5000000.0,
                    },
                    {
                      useCaseId: 5,
                      useCaseName: "Đánh dấu văn bản chưa xem",
                      useCasePrice: 5000000.0,
                    },
                    {
                      useCaseId: 6,
                      useCaseName:
                        "Lọc trạng thái văn bản(Tất cả, chưa xử lý, đã chuyển, Hoàn thành) của đơn vị",
                      useCasePrice: 5000000.0,
                    },
                  ],
                },
                {
                  chucNangId: 3,
                  chucNangName: "Bút phê văn bản",
                  useCases: [
                    {
                      useCaseId: 7,
                      useCaseName: "Bút phê văn bản đến",
                      useCasePrice: 5000000.0,
                    },
                    {
                      useCaseId: 8,
                      useCaseName: "Vừa xem file đính kèm vừa bút phê văn bản",
                      useCasePrice: 5000000.0,
                    },
                  ],
                },
                {
                  chucNangId: 4,
                  chucNangName: "Chi tiết văn bản",
                  useCases: [
                    {
                      useCaseId: 9,
                      useCaseName: "Xem chi tiết thông tin văn bản",
                      useCasePrice: 5000000.0,
                    },
                  ],
                },
              ],
            },
            {
              nhomChucNangId: 2,
              nhomChucNangName: "Mặc định 2",
              chucNangs: [
                {
                  chucNangId: 1,
                  chucNangName: "Tiếp nhận văn bản 2",
                  useCases: [
                    {
                      useCaseId: 1,
                      useCaseName: "Tiếp nhận văn bản đến trực tiếp",
                      useCasePrice: 4000000.0,
                    },
                  ],
                },
                {
                  chucNangId: 2,
                  chucNangName: "Danh sách văn bản",
                  useCases: [
                    {
                      useCaseId: 2,
                      useCaseName:
                        "Đánh dấu trạng thái xử lý văn bản cá nhân bằng màu sắc(Chưa xử lý trể hạn, chưa xử lý còn hạn, chưa xử lý không thời hạn, đã xử lý)",
                      useCasePrice: 5000000.0,
                    },
                    {
                      useCaseId: 3,
                      useCaseName:
                        "Tìm kiếm văn bản đến(Theo quy định nghị định 30)",
                      useCasePrice: 5000000.0,
                    },
                    {
                      useCaseId: 4,
                      useCaseName: "Đánh dấu văn bản quan trọng",
                      useCasePrice: 5000000.0,
                    },
                    {
                      useCaseId: 5,
                      useCaseName: "Đánh dấu văn bản chưa xem",
                      useCasePrice: 5000000.0,
                    },
                    {
                      useCaseId: 6,
                      useCaseName:
                        "Lọc trạng thái văn bản(Tất cả, chưa xử lý, đã chuyển, Hoàn thành) của đơn vị",
                      useCasePrice: 5000000.0,
                    },
                  ],
                },
                {
                  chucNangId: 3,
                  chucNangName: "Bút phê văn bản",
                  useCases: [
                    {
                      useCaseId: 7,
                      useCaseName: "Bút phê văn bản đến",
                      useCasePrice: 5000000.0,
                    },
                    {
                      useCaseId: 8,
                      useCaseName: "Vừa xem file đính kèm vừa bút phê văn bản",
                      useCasePrice: 5000000.0,
                    },
                  ],
                },
                {
                  chucNangId: 4,
                  chucNangName: "Chi tiết văn bản",
                  useCases: [
                    {
                      useCaseId: 9,
                      useCaseName: "Xem chi tiết thông tin văn bản",
                      useCasePrice: 5000000.0,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
];

interface UseCase {
  useCaseId: number;
  useCaseName: string;
  useCasePrice: number;
}

interface ChucNang {
  nhomChucNangId: number;
  chucNangName: string;
  usecase: UseCase[];
}

interface NhomChucNang {
  Nhomchucnang: string;
  Chucnang: ChucNang[];
}

function DanhSachChucNang() {
  const [selectedPhanMem, setSelectedPhanMem] = useState<any>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [selectedHangMuc, setSelectedHangMuc] = useState<any | null>(null);
  const [selectedNhomChucNang, setSelectedNhomChucNang] = useState<
    string | null
  >(null);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  // Cập nhật danh sách nhóm chức năng khi người dùng chọn hạn mục
  const nhomChucNangOptions =
    elements
      .flatMap((phanMem) => phanMem.data?.hangMucs || [])
      .find((hm) => hm.hangMucName === selectedHangMuc)?.nhomChucNangs || [];

  useEffect(() => {
    if (selectedPhanMem) {
      // Khi chọn phần mềm, reset Hạn mục và Nhóm chức năng
      setSelectedHangMuc(null);
      setSelectedNhomChucNang(null);
      setFilteredData([]);
    }
  }, [selectedPhanMem]);

  // Xử lý thay đổi của Hạn mục
  useEffect(() => {
    if (selectedHangMuc) {
      setSelectedNhomChucNang(null);
      setFilteredData([]);
    }
  }, [selectedHangMuc]);

  // Xử lý thay đổi của Nhóm chức năng
  useEffect(() => {
    if (selectedNhomChucNang) {
      const filtered = nhomChucNangOptions
        .filter((nhom) => nhom.nhomChucNangName === selectedNhomChucNang)
        .flatMap((nhom) => nhom.chucNangs)
        .map((chucNang) => ({
          chucNangName: chucNang.chucNangName,
          useCases: chucNang.useCases.map((useCase) => ({
            useCaseName: useCase.useCaseName,
            useCasePrice: useCase.useCasePrice,
          })),
        }));
      setFilteredData(filtered);
    }
  }, [selectedNhomChucNang]);

  const handleUseCaseSelect = (
    useCases: any[],
    chucNang: any,
    nhomChucNang: any,
    checked: boolean
  ) => {
    setSelectedItems((prevSelectedItems) => {
      let newSelectedItems = [...prevSelectedItems];
      const nhomIndex = newSelectedItems.findIndex(
        (item) =>
          item.Nhomchucnang === nhomChucNang.nhomChucNangName &&
          item.HanMuc === selectedHangMuc // Đảm bảo tìm theo cả Hạn mục
      );

      if (nhomIndex > -1) {
        const chucNangIndex = newSelectedItems[nhomIndex].Chucnang.findIndex(
          (cn: any) => cn.chucNangName === chucNang.chucNangName
        );

        if (chucNangIndex > -1) {
          if (checked) {
            useCases.forEach((useCase) => {
              const existingUseCase = newSelectedItems[nhomIndex].Chucnang[
                chucNangIndex
              ].usecase.find((uc: any) => uc.useCaseId === useCase.useCaseId);
              if (!existingUseCase) {
                newSelectedItems[nhomIndex].Chucnang[
                  chucNangIndex
                ].usecase.push({
                  useCaseId: useCase.useCaseId,
                  useCaseName: useCase.useCaseName,
                  useCasePrice: useCase.useCasePrice,
                });
              }
            });
          } else {
            newSelectedItems[nhomIndex].Chucnang[chucNangIndex].usecase =
              newSelectedItems[nhomIndex].Chucnang[
                chucNangIndex
              ].usecase.filter(
                (uc: any) =>
                  !useCases.some(
                    (useCase) => useCase.useCaseId === uc.useCaseId
                  )
              );

            if (
              newSelectedItems[nhomIndex].Chucnang[chucNangIndex].usecase
                .length === 0
            ) {
              newSelectedItems[nhomIndex].Chucnang.splice(chucNangIndex, 1);
              if (newSelectedItems[nhomIndex].Chucnang.length === 0) {
                newSelectedItems.splice(nhomIndex, 1);
              }
            }
          }
        } else if (checked) {
          newSelectedItems[nhomIndex].Chucnang.push({
            nhomChucNangId: chucNang.chucNangId,
            chucNangName: chucNang.chucNangName,
            usecase: useCases.map((useCase) => ({
              useCaseId: useCase.useCaseId,
              useCaseName: useCase.useCaseName,
              useCasePrice: useCase.useCasePrice,
            })),
          });
        }
      } else if (checked) {
        newSelectedItems.push({
          Nhomchucnang: nhomChucNang.nhomChucNangName,
          HanMuc: selectedHangMuc, // Thêm Hạn mục vào đây
          Chucnang: [
            {
              nhomChucNangId: chucNang.chucNangId,
              chucNangName: chucNang.chucNangName,
              usecase: useCases.map((useCase) => ({
                useCaseId: useCase.useCaseId,
                useCaseName: useCase.useCaseName,
                useCasePrice: useCase.useCasePrice,
              })),
            },
          ],
        });
      }
      return newSelectedItems;
    });
  };

  const handleNhomChucNangSelect = (nhomChucNang: any, checked: boolean) => {
    setSelectedItems((prevSelectedItems) => {
      let newSelectedItems = [...prevSelectedItems];
      const nhomIndex = newSelectedItems.findIndex(
        (item) =>
          item.Nhomchucnang === nhomChucNang.nhomChucNangName &&
          item.HanMuc === selectedHangMuc // Đảm bảo tìm theo cả Hạn mục
      );

      if (nhomIndex > -1) {
        if (checked) {
          const allUseCases = nhomChucNang.chucNangs.flatMap((chucNang: any) =>
            chucNang.useCases.map((useCase: any) => ({
              ...useCase,
              chucNangName: chucNang.chucNangName,
              nhomChucNangName: nhomChucNang.nhomChucNangName,
              useCasePrice: useCase.useCasePrice,
            }))
          );

          allUseCases.forEach((useCase: any) => {
            const chucNangIndex = newSelectedItems[
              nhomIndex
            ].Chucnang.findIndex(
              (cn: any) => cn.chucNangName === useCase.chucNangName
            );

            if (chucNangIndex > -1) {
              newSelectedItems[nhomIndex].Chucnang[chucNangIndex].usecase.push({
                useCaseId: useCase.useCaseId,
                useCaseName: useCase.useCaseName,
                useCasePrice: useCase.useCasePrice,
              });
            } else {
              newSelectedItems[nhomIndex].Chucnang.push({
                nhomChucNangId: useCase.chucNangId,
                chucNangName: useCase.chucNangName,
                usecase: [
                  {
                    useCaseId: useCase.useCaseId,
                    useCaseName: useCase.useCaseName,
                    useCasePrice: useCase.useCasePrice,
                  },
                ],
              });
            }
          });
        } else {
          newSelectedItems.splice(nhomIndex, 1);
        }
      } else if (checked) {
        newSelectedItems.push({
          Nhomchucnang: nhomChucNang.nhomChucNangName,
          HanMuc: selectedHangMuc, // Thêm Hạn mục vào đây
          Chucnang: nhomChucNang.chucNangs.map((chucNang: any) => ({
            nhomChucNangId: chucNang.chucNangId,
            chucNangName: chucNang.chucNangName,
            usecase: chucNang.useCases.map((useCase: any) => ({
              useCaseId: useCase.useCaseId,
              useCaseName: useCase.useCaseName,
              useCasePrice: useCase.useCasePrice,
            })),
          })),
        });
      }
      return newSelectedItems;
    });
  };

  const rows = selectedHangMuc ? (
    elements.flatMap((phanMem) => {
      const matchedHangMucs = phanMem.data.hangMucs.filter(
        (hangMuc) => hangMuc.hangMucName === selectedHangMuc
      );

      if (matchedHangMucs.length === 0) {
        return [];
      }

      return matchedHangMucs.flatMap((hangMuc) => {
        const renderNhomChucNangs = hangMuc.nhomChucNangs.filter(
          (nhomChucNang) =>
            selectedNhomChucNang === nhomChucNang.nhomChucNangName
        );

        const headerRow = (
          <Table.Tr key={`header-${hangMuc.hangMucId}`}>
            <Table.Td
              colSpan={4}
              style={{ fontWeight: "bold", backgroundColor: "#c7c7c7" }}
            >
              {/* Hạn mục: {hangMuc.hangMucName} */}
              <Input.Label size="17">
                Hạn mục: {hangMuc.hangMucName}
              </Input.Label>
            </Table.Td>
          </Table.Tr>
        );

        if (renderNhomChucNangs.length === 0) {
          return null;
        }

        return [
          headerRow,
          ...renderNhomChucNangs.flatMap((nhomChucNang) => (
            <React.Fragment key={`nhomChucNang-${nhomChucNang.nhomChucNangId}`}>
              <Table.Tr>
                <Table.Td
                  style={{
                    fontWeight: "bold",
                    backgroundColor: "#409cff",
                    padding: 20,
                    width: "100%",
                  }}
                >
                  <Checkbox
                    checked={nhomChucNang.chucNangs.every((chucNang) =>
                      selectedItems.some(
                        (item) =>
                          item.Nhomchucnang === nhomChucNang.nhomChucNangName &&
                          item.Chucnang.some(
                            (cn: any) =>
                              cn.chucNangName === chucNang.chucNangName
                          )
                      )
                    )}
                    onChange={(event) => {
                      handleNhomChucNangSelect(
                        nhomChucNang,
                        event.currentTarget.checked
                      );
                      setSelectedNhomChucNang(
                        event.currentTarget.checked
                          ? nhomChucNang.nhomChucNangName
                          : null
                      );
                    }}
                    label={nhomChucNang.nhomChucNangName}
                  />
                </Table.Td>
                <Table.Td
                  style={{
                    fontWeight: "bold",
                    backgroundColor: "#409cff",
                    padding: 20,
                  }}
                >
                  <Text>Giá</Text>
                </Table.Td>
              </Table.Tr>

              {nhomChucNang.chucNangs.map((chucNang) => (
                <React.Fragment key={`chucNang-${chucNang.chucNangId}`}>
                  <Table.Tr>
                    <Table.Td
                      colSpan={4}
                      style={{
                        paddingLeft: "40px",
                        backgroundColor: "#e3e3e3",
                      }}
                    >
                      <Checkbox
                        checked={selectedItems.some(
                          (item) =>
                            item.Nhomchucnang ===
                              nhomChucNang.nhomChucNangName &&
                            item.Chucnang.some(
                              (cn: any) =>
                                cn.chucNangName === chucNang.chucNangName &&
                                cn.usecase.every((u: any) =>
                                  chucNang.useCases?.some(
                                    (uc) => uc.useCaseId === u.useCaseId
                                  )
                                )
                            )
                        )}
                        onChange={(event) =>
                          handleUseCaseSelect(
                            chucNang.useCases || [],
                            chucNang,
                            nhomChucNang,
                            event.currentTarget.checked
                          )
                        }
                        label={chucNang.chucNangName}
                      />
                    </Table.Td>
                  </Table.Tr>

                  {Array.isArray(chucNang.useCases) &&
                    chucNang.useCases.map((useCase) => (
                      <Table.Tr key={`useCase-${useCase.useCaseId}`}>
                        <Table.Td
                          style={{ paddingLeft: "60px", width: "100%" }}
                        >
                          <Checkbox
                            checked={selectedItems.some(
                              (item) =>
                                item.Nhomchucnang ===
                                  nhomChucNang.nhomChucNangName &&
                                item.Chucnang.some(
                                  (cn: any) =>
                                    cn.chucNangName === chucNang.chucNangName &&
                                    cn.usecase.some(
                                      (u: any) =>
                                        u.useCaseId === useCase.useCaseId
                                    )
                                )
                            )}
                            onChange={(event) =>
                              handleUseCaseSelect(
                                [useCase],
                                chucNang,
                                nhomChucNang,
                                event.currentTarget.checked
                              )
                            }
                            label={`${useCase.useCaseName}`}
                          />
                        </Table.Td>
                        <Table.Td>
                          {useCase.useCasePrice.toLocaleString()} VND
                        </Table.Td>
                      </Table.Tr>
                    ))}
                </React.Fragment>
              ))}
            </React.Fragment>
          )),
        ];
      });
    })
  ) : (
    <></>
  );

  // Hàm để loại bỏ một mục khỏi danh sách
  const handleRemoveItem = (nhomChucNangId: number, useCaseId: number) => {
    const updatedItems = selectedItems
      .map((item) => ({
        ...item,
        Chucnang: item.Chucnang.map((chucNang: any) => ({
          ...chucNang,
          usecase: chucNang.usecase.filter(
            (usecase: any) => usecase.useCaseId !== useCaseId
          ),
        })).filter((chucNang: any) => chucNang.usecase.length > 0),
      }))
      .filter((item) => item.Chucnang.length > 0);

    setSelectedItems(updatedItems);
  };

  return (
    <>
      <Box className=" bg-[#eceef0] p-4 rounded mb-3 flex md:flex-nowrap flex-wrap">
        <Select
          label="Chọn Phần mềm"
          data={elements.map((phanMem) => ({
            value: phanMem.data.phanMemId.toString(),
            label: phanMem.data.phanMemName,
          }))}
          value={selectedPhanMem?.toString()}
          onChange={(value) => {
            setSelectedPhanMem(value);
            setSelectedHangMuc(null);
            setSelectedNhomChucNang(null);
          }}
          style={{ width: "100%" }}
          className="mr-4"
        />

        <Select
          label="Chọn Hạn mục"
          data={
            elements
              .find(
                (phanMem) =>
                  phanMem.data.phanMemId.toString() === selectedPhanMem
              )
              ?.data.hangMucs.map((hangMuc) => ({
                value: hangMuc.hangMucName.toString(),
                label: hangMuc.hangMucName,
              })) || []
          }
          value={selectedHangMuc?.toString()}
          onChange={setSelectedHangMuc}
          disabled={!selectedPhanMem}
          style={{ width: "100%" }}
          className="mr-4"
        />

        <Select
          label="Chọn Nhóm chức năng"
          data={nhomChucNangOptions.map((nhom) => ({
            value: nhom.nhomChucNangName,
            label: nhom.nhomChucNangName,
          }))}
          value={selectedNhomChucNang}
          onChange={setSelectedNhomChucNang}
          disabled={!selectedHangMuc}
          style={{ width: "100%" }}
          className="mr-4"
        />
      </Box>

      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>

      {/* <h3>Selected Items:</h3>
      <pre>{JSON.stringify(selectedItems, null, 2)}</pre> */}
      <div className=" bg-[#eceef0] p-4 rounded mt-3">
        <Input.Label size="17">Thông tin báo giá</Input.Label>

        <Table
          striped
          highlightOnHover
          withTableBorder
          withColumnBorders
          style={{ marginTop: "20px" }}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th className="text-center">Hạn mục</Table.Th>
              <Table.Th className="text-center">Nhóm chức năng</Table.Th>
              <Table.Th className="text-center">Chức năng</Table.Th>
              <Table.Th className="text-center">Use case</Table.Th>
              <Table.Th className="text-center">Giá (VND)</Table.Th>
              <Table.Th className="text-center">Thao tác</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {selectedItems.map((item, index) => (
              <React.Fragment key={index}>
                {item.Chucnang.map((chucNang: any) =>
                  chucNang.usecase.map(
                    (usecase: string | number | any, index: number) => (
                      <Table.Tr key={index}>
                        <Table.Td>{item.HanMuc}</Table.Td>
                        <Table.Td>{item.Nhomchucnang}</Table.Td>
                        <Table.Td>{chucNang.chucNangName}</Table.Td>
                        <Table.Td>{usecase.useCaseName}</Table.Td>
                        <Table.Td>
                          {usecase.useCasePrice.toLocaleString()} VND
                        </Table.Td>
                        <Table.Td>
                          <Group>
                            <Button
                              color="red"
                              onClick={() =>
                                handleRemoveItem(
                                  chucNang.nhomChucNangId,
                                  usecase.useCaseId
                                )
                              }
                            >
                              Xóa
                            </Button>
                          </Group>
                        </Table.Td>
                      </Table.Tr>
                    )
                  )
                )}
              </React.Fragment>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </>
  );
}

export default DanhSachChucNang;
