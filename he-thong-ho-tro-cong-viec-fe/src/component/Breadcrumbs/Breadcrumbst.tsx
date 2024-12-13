import { Breadcrumbs, Anchor } from "@mantine/core";

export default function Breadcrumbst({ ArrBreadcrumb }: any | []) {
    const items = ArrBreadcrumb.map((item: string | any, index: number) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));
    return (
        <>
            <Breadcrumbs>{items}</Breadcrumbs>
        </>
    );
}
