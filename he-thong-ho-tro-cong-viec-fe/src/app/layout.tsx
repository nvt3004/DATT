import { MantineProvider } from "@mantine/core";

import "./globals.css";
import { PropsWithChildren, ReactNode } from "react";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { Provider } from "./providers";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Hệ thống hỗ trợ công việc",
  description: "Hệ thống hỗ trợ công việc",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <MantineProvider defaultColorScheme="light">
            <Auth>{children}</Auth>
          </MantineProvider>
        </Provider>
      </body>
    </html>
  );
}

const Auth = ({ children }: PropsWithChildren) => {
  return <AuthProvider>{children}</AuthProvider>;
};
