"use client";
import {
  Text,
  Tabs,
  rem,
  Box,
  Input,
  Button,
  Group,
  Collapse,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
function Profile() {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <Box className="m-3">
        <Text size="xl" className="">
          Thông tin cá nhân:
        </Text>
      </Box>
      <Box className="flex justify-between mb-10">
        <label className="ml-3" htmlFor="">
          Họ và tên
        </label>
        <Input.Wrapper
          label=""
          description=""
          error=""
          className="mr-3"
          style={{ width: rem(350) }}
        >
          <Input
            readOnly
            variant="filled"
            placeholder=""
            value="Kim Thanh Loi"
          />
        </Input.Wrapper>
      </Box>
      <Box className="flex justify-between mb-10">
        <label className="ml-3" htmlFor="">
          Tên người dùng
        </label>
        <Input.Wrapper
          label=""
          description=""
          error=""
          className="mr-3"
          style={{ width: rem(350) }}
        >
          <Input
            readOnly
            variant="filled"
            placeholder=""
            value="Kim Thanh Loi"
          />
        </Input.Wrapper>
      </Box>
      <Box className="flex justify-between mb-10">
        <label className="ml-3" htmlFor="">
          Danh xưng
        </label>
        <Input.Wrapper
          label=""
          description=""
          error=""
          className="mr-3"
          style={{ width: rem(350) }}
        >
          <Input readOnly variant="filled" placeholder="" value="MR" />
        </Input.Wrapper>
      </Box>
      <Box className="flex justify-between mb-10">
        <label className="ml-3" htmlFor="">
          Số điện thoại
        </label>
        <Input.Wrapper
          label=""
          description=""
          error=""
          className="mr-3"
          style={{ width: rem(350) }}
        >
          <Input readOnly variant="filled" placeholder="" value="0923423444" />
        </Input.Wrapper>
      </Box>
      <Box className="flex justify-between mb-10">
        <label className="ml-3" htmlFor="">
          Giới tính
        </label>
        <Input.Wrapper
          label=""
          description=""
          error=""
          className="mr-3"
          style={{ width: rem(350) }}
        >
          <Input readOnly variant="filled" placeholder="" value="Nam" />
        </Input.Wrapper>
      </Box>
      <Box className="flex justify-between mb-10">
        <label className="ml-3" htmlFor="">
          Email
        </label>
        <Input.Wrapper
          label=""
          description=""
          error=""
          className="mr-3"
          style={{ width: rem(350) }}
        >
          <Input
            readOnly
            variant="filled"
            placeholder=""
            value="loiktpc@fpt.edu.vn"
          />
        </Input.Wrapper>
      </Box>
      <Box className="flex justify-between mb-10">
        <label className="ml-3" htmlFor="">
          Địa chỉ
        </label>
        <Input.Wrapper
          label=""
          description=""
          error=""
          className="mr-3"
          style={{ width: rem(350) }}
        >
          <Input
            readOnly
            variant="filled"
            placeholder=""
            value="Thành phố sóc trăng"
          />
        </Input.Wrapper>
      </Box>
      <Box className="flex justify-between mb-10">
        <label className="ml-3" htmlFor="">
          Fax
        </label>
        <Input.Wrapper
          label=""
          description=""
          error=""
          className="mr-3"
          style={{ width: rem(350) }}
        >
          <Input
            readOnly
            variant="filled"
            placeholder=""
            value="091231231312312"
          />
        </Input.Wrapper>
      </Box>
      <Box className="">
        <Group justify="center" mb={5}>
          <Button onClick={toggle}>Click để xem chi tiết mô tả bản thân</Button>
        </Group>
        <Collapse in={opened}>
          <Text className="ml-3">
            I love playing badminton in my spare time. I spend a lot of my free
            time playing badminton after finishing my homework. I was so
            interested in playing badminton from my childhood and started
            learning to play when I was 7 years old. When I was 8 years old, my
            dad told my teacher about my hobby of badminton. My teacher told my
            dad that there was a facility for playing sports daily in school so
            he could admit his child. Now, I enjoy playing badminton and I
            participate in inter-school competitions.
          </Text>
        </Collapse>
      </Box>
    </>
  );
}

export default Profile;
