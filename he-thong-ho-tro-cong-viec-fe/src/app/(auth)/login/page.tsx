"use client";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Box,
} from "@mantine/core";
import { Grid } from "@mantine/core";
import Image from "next/image";
import logoLogin from "../../../../public/imgLogin.png";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { FullScreenLoader } from "@/component/FullScreenLoader/FullScreenLoader";

export default function AuthenticationTitle() {
  const router = useRouter();
  const [checkSubmit, setCheckSubmit] = useState<Boolean | any>(false);
  useEffect(() => {
    setCheckSubmit(false);
  }, []);
  const [loading , setLoading] = useState<Boolean | any>(false);
  useEffect(() => {
    let authorizedData = null;
    try {
      authorizedData = Object.fromEntries(new URLSearchParams(location.search));
    } catch (err) {
      console.log("[LOG_DEBUG][err]", err);
    }
    if (authorizedData?.access_token) {
      setLoading(true);
      signIn("credentials", {
        authorizedData: JSON.stringify({ payload: authorizedData }),
        redirect: false,
      })
        .then((res) => {
          console.log("[LOG_DEBUG][signIn]", res);
          router.replace("/system");
        })
        .catch((e) => {
          console.log("[LOG_DEBUG][signIn]err", e);
        })
        .finally(() => {
          setLoading(false); 
        });
    }
  }, []);

  const form = useForm({
    validateInputOnBlur: true,
    mode: "uncontrolled",
    initialValues: {
      email: "",
      matKhau: "",
    },
    validate: {
      email: isEmail("Email không hợp lệ"),
      matKhau: isNotEmpty("Mật khẩu không được để trống"),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    setCheckSubmit(true);
    if (values) {
      router.push("/system");
    }
    form.reset();
  };
  return (
    <>
     <FullScreenLoader visible={loading} />
      <Paper>
        <Container size={1200} my={40}>
          <Title ta="center" className="p-3">
            SỰ THAM GIA CHO DOANH NGHIỆP
          </Title>
          <Grid>
            <Grid.Col
              span={{ base: 12, md: 6, lg: 6 }}
              className="flex justify-center items-center"
            >
              <Image src={logoLogin} alt={""} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <Paper withBorder shadow="md" p={40} mt={30} radius="md">
                <Title ta="center" className={` mb-2`} order={4}>
                  Đăng nhập
                </Title>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                  <TextInput
                    label="Email"
                    placeholder="you@mantine.dev"
                    required
                    key={form.key("email")}
                    {...form.getInputProps("email")}
                  />
                  <PasswordInput
                    label="Mật khẩu"
                    placeholder="Mật khẩu của bạn"
                    required
                    key={form.key("matKhau")}
                    {...form.getInputProps("matKhau")}
                    mt="md"
                  />
                  <Group justify="space-between" mt="lg">
                    <Checkbox label="Nhớ tài khoản" />
                    <Link href="/forgotpass">
                      <Anchor component="button" size="sm">
                        Quên mật khẩu?
                      </Anchor>
                    </Link>
                  </Group>
                  <Text c="dimmed" size="sm" mt={5}>
                    Bạn chưa có tài khoản?{" "}
                    <Link href="/resgister">
                      <Anchor size="sm" component="button">
                        Tạo tài khoản
                      </Anchor>
                    </Link>
                  </Text>

                  <Group justify="end" align="center" className="mt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        router.push(
                          `https://demodichvucong.soctrang.gov.vn/auth/dang-nhap-old?loginCallbackUrl=${process.env.BASE_URL}/login`
                        );
                      }}
                    >
                      Đăng nhập với Dịch vụ công
                    </Button>

                    <Button
                      type="submit"
                      loading={checkSubmit}
                      loaderProps={{ type: "dots" }}
                    >
                      Đăng Nhập
                    </Button>
                  </Group>
                </form>
              </Paper>
            </Grid.Col>
          </Grid>
        </Container>
      </Paper>
    </>
  );
}
