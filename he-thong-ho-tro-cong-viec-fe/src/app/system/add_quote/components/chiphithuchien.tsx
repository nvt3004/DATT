import {
  Button,
  CloseButton,
  Input,
  Table,
  Modal,
  TextInput,
  Select,
  NumberInput,
  Loader,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { isNotEmpty, useField, useForm } from "@mantine/form";
const elementsChucnang = [
  { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
  { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
  {
    position: 12312312321,
    mass: 88.906,
    symbol: "Yasdasdasdasd",
    name: "Yttrium",
  },
  {
    position: 123123123123,
    mass: 137.33,
    symbol: "Basadasdasdasd",
    name: "Barium",
  },
  { position: 58, mass: 140.12, symbol: "Ceasdasdasdasdasd", name: "Cerium" },
];

function ChiPhiThucHien() {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    validateInputOnBlur: true,
    mode: "uncontrolled",
    initialValues: {
      hangmuccv: "",
      tongtien: "",
      soluong: "",
      donvitinh: "",
    },
    validate: {
      hangmuccv: isNotEmpty("Hạng mục công việc không được để trống"),
      tongtien: isNotEmpty("Tổng tiền không được để trống"),
      soluong: isNotEmpty("Số lượng không được để trống"),
      donvitinh: isNotEmpty("Đơn vị tính không được để trống"),
    },
  });
  const submitAddCongviec = (values: typeof form.values) => {
    form.reset();
  };
  const rows2 = elementsChucnang.map((element, index: number) => (
    <Table.Tr key={element.name}>
      <Table.Td className="text-center">{index + 1}</Table.Td>
      <Table.Td width={"60%"}>{element.name}</Table.Td>
      <Table.Td className="text-center">{element.position}</Table.Td>
      <Table.Td className="text-center">{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
      <Table.Td>
        <div className="flex items-center justify-center">
          <CloseButton size="lg" />
        </div>
      </Table.Td>
    </Table.Tr>
  ));
  const tfooteer = (
    <Table.Tr>
      <Table.Th></Table.Th>
      <Table.Th>Tổng cộng</Table.Th>
      <Table.Th></Table.Th>
      <Table.Th></Table.Th>
      <Table.Th className="text-center">1.000.000.000đ</Table.Th>
      <Table.Th></Table.Th>
    </Table.Tr>
  );

  return (
    <>
      <div className=" bg-[#eceef0] p-4 rounded mt-3">
        <Input.Label required>Chi phí thực hiện</Input.Label>
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th className="text-center">STT</Table.Th>
              <Table.Th className="text-center">Hạng mục công việc</Table.Th>
              <Table.Th className="text-center">Đơn vị tính</Table.Th>
              <Table.Th className="text-center">Số lượng</Table.Th>
              <Table.Th className="text-center">
                Tổng giá trị thực hiện(đồng)
              </Table.Th>
              <Table.Th className="text-center">#</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows2}</Table.Tbody>
          <Table.Tfoot className="bg-orange-300 ">{tfooteer}</Table.Tfoot>
        </Table>

        <Modal opened={opened} onClose={close} title="THÊM HẠN MỤC CÔNG VIỆC">
          <form onSubmit={form.onSubmit(submitAddCongviec)}>
            <TextInput
              withAsterisk
              label="Tên hạng mục công việc"
              placeholder="Nhập hạng mục công việc"
              key={form.key("hangmuccv")}
              {...form.getInputProps("hangmuccv")}
            />
            <Select
              label="Đơn vị tính"
              placeholder="Chọn ..."
              withAsterisk
              data={["Cơ bản", "Tiêu chuẩn"]}
              key={form.key("donvitinh")}
              {...form.getInputProps("donvitinh")}
              style={{ width: "100%" }}
              className="mr-4 mt-2"
            />
            <NumberInput
              label="Số lượng"
              withAsterisk
              placeholder="Nhập số lượng"
              key={form.key("soluong")}
              {...form.getInputProps("soluong")}
              style={{ width: "100%" }}
              className="mr-4 mt-2"
            />
            <NumberInput
              label="Tổng giá tiền giá trị thực hiện (đồng)"
              withAsterisk
              placeholder="Nhập giá trị ..."
              key={form.key("tongtien")}
              {...form.getInputProps("tongtien")}
              style={{ width: "100%" }}
              className="mr-4 mt-2"
            />
            <Button
              variant="filled"
              color="cyan"
              type="submit"
              className="mt-3"
            >
              Xác nhận
            </Button>
          </form>
        </Modal>

        <Button
          variant="outline"
         
          className="mt-3"
          size="sm"
          onClick={open}
        >
          <IconPlus stroke={2} />
          Thêm HẠN MỤC CÔNG VIỆC
        </Button>
      </div>
    </>
  );
}

export default ChiPhiThucHien;
