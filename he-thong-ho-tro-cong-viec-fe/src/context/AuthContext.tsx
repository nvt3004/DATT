"use client";

import { __findCurrentUser } from "@/api/account";
import { setAccessToken } from "@/config/RestClient";
import { useSession } from "next-auth/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { nprogress, NavigationProgress } from '@mantine/nprogress';

// redux
import { Provider as ReduxProvider } from "react-redux";
import store from "@/store/store";
import { AclGuard as G2BAclGuard } from "@cusc-g2b/react-ui";

export type CaNhanType = {
  id?: number;
  accountId?: number;
  ten: string;
  cccd: string;
  maso: string;
  cmnd: string;
  diaChi: string;
  gioiTinh: string;
  sdt: string;
  thanhPhoId: string;
  huyenId: string;
  phuongId: string;
  ngaySinh: any;
  email?: string;
  qtMa?: string;
  dtMa?: string;
};

export type ToChucType = {
  ten: string;
  loaiHinh: string;
  maDinhDanh: string;
  diaChi: string;
  thanhPhoId: string;
  huyenId: string;
  phuongId: string;
  chucVuNguoiDaiDien: string;
  sdt: string;
};

export type OrgType = "DONVI" | "PHONGBAN";
export interface UserDataType {
  id?: number;
  role?: string;
  email: string;
  type: number;
  fullName?: string;
  username?: string;
  password?: string;
  avatar?: string | null;
  guid?: string;
  organizations: OrgDataType[];
  requireUpdate?: boolean;
  caNhan: CaNhanType;
  toChuc: ToChucType;
  vnconnectSub?: string | null;
}
export interface OrgDataType {
  guid: string;
  id: number;
  slug: string;
  name: string;
  code: string;
  localCode?: string | null;
  level: number;
  parentId: number;
  type: OrgType;
  primary: boolean;
  treepath: string;
  staticOrganizationGuid?: string | null;
  children?: OrgDataType[] | null;
  roles?: string | null;
}

export interface AuthValuesType {
  user: UserDataType | null;
  setUser: (user: UserDataType) => void;
  org: OrgDataType | null;
  setOrg: (org: OrgDataType) => void;
}

const defaultProvider: AuthValuesType = {
  user: null,
  setUser: () => null,
  org: null,
  setOrg: () => null,
};

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user);
  const [org, setOrg] = useState<OrgDataType | null>(defaultProvider.org);

  const fetchUser = () => {
    __findCurrentUser()
      .then((res) => {
        const userData = res.data.payload;

        // get org info from user
        const orgList = userData.organizations;

        // const currentOrgSlug = router.query?.org_slug
        //   ? `/${router.query?.org_slug}`
        //   : window.localStorage.getItem("org_slug");

        let primaryOrg;
        if (orgList && orgList.length > 0) {
          // if (currentOrgSlug) {
          //   primaryOrg = orgList.find(
          //     (org: OrgDataType) => org["slug"] === currentOrgSlug
          //   );
          // }
          if (!primaryOrg) {
            primaryOrg = orgList.find(
              (org: OrgDataType) => org["primary"] === true
            );
          }
          if (!primaryOrg) {
            primaryOrg = orgList.find(
              (org: OrgDataType) => org["type"] === "DONVI"
            );
          }
          if (!primaryOrg) {
            primaryOrg = orgList[0];
          }
        }

        if (primaryOrg) {
          setOrg(primaryOrg);
        }

        setUser(userData);

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        router.replace("/login");
      });
  };


  function useGetRawPath() {
    const splittedRoute = pathname.split("/");

    if (typeof params === "object" && params !== null) {
      let reconstructedPath = "";

      for (let i = 1; i < splittedRoute.length; i++) {
        const segment = splittedRoute[i];

        // Check if the segment matches any value in the params object
        const matchingKey = Object.keys(params).find(
          (key) => params[key] === segment
        );

        if (matchingKey) {
          // Replace the segment with the dynamic segment
          reconstructedPath += `/[${matchingKey}]`;
        } else {
          // Keep the original segment
          reconstructedPath += `/${segment}`;
        }
      }

      return reconstructedPath;
    } else {
      // Params object is not present
      return pathname;
    }
  }

  useEffect(() => {
    if (status == "authenticated") {
      // add loading 
      nprogress.start();
      // set token cho RestClient để có thể gọi api
      setAccessToken(session.accessToken);

      // lấy thông tin user và set vào context để dùng về sau
      fetchUser();
    } else if (status == "unauthenticated") {
      setLoading(false);
      router.replace("/login");
    }
  }, [status]);

  const values = {
    user,
    setUser,
    org,
    setOrg,
  };

  return (
    <AuthContext.Provider value={values}>
      {loading ? (
        <div>
          <NavigationProgress />
        </div>
      ) : (
        <ReduxProvider store={store}>
          <G2BAclGuard
            // NoPermissionComponent={<></>}
            currentPath={useGetRawPath()}
            profile={'guest'}
            pagePermissions={{
              GUEST: {
                code: "GUEST",
                permissions: {
                  VIEW: "VIEW",
                  MANEGE: "MANAGE",
                  CREATE: "CREATE"
                },
                pages: ["/", "/login", "/system", "/manage", "/manage/warranty_terms", "/manage/warranty_method", "/system/list_quote/add_quote", "/manage/software_specifications", "/manage/server_software", "/manage/content_type", "/manage/content_new", "/manage/guarantee_new",  "/manage/warranty_service" , "/system/add_quote"  , "/resgister" , "/forgotpass", "/cofirmforgot", "/cofirmforgot/resetpass", "/system/list_quote/add_quote/engineeringTechnology", "/manage/quote/[slug]"],
              },
              TIEP_NHAN_HO_SO: {
                code: "TIEP_NHAN_HO_SO",
                permissions: {
                  VIEW: "VIEW",
                },
                pages: ["/[org_slug]/ho-so/tiep-nhan"],
              },
              USERS: {
                code: "USERS",
                permissions: {
                  VIEW: 'VIEW',
                  MANAGE: 'MANAGE'
                },
                pages: ["/manage/users"]
              },
              MANAGE_CATEGORYS: {
                code: "MANAGE_CATEGORYS",
                permissions: {
                  VIEW: 'VIEW',
                  MANAGE: 'MANAGE',
                  CREATE: "CREATE",
                  DELETE: "DELETE"
                },
                pages: ["/manage/categorys"]
              },
              MANAGE_PARAMERTER_GROUP: {
                code: "MANAGE_PARAMERTER_GROUP",
                permissions: {
                  VIEW: 'VIEW',
                  MANAGE: 'MANAGE',
                  CREATE: "CREATE",
                  DELETE: "DELETE"
                },
                pages: ["/manage/parameter_group"]
              },
              MANAGE_PARAMERTER: {
                code: "MANAGE_PARAMERTER",
                permissions: {
                  VIEW: 'VIEW',
                  MANAGE: 'MANAGE',
                  CREATE: "CREATE",
                  DELETE: "DELETE"
                },
                pages: ["/manage/parameter"]
              },
              MANAGE_FUNCTIONAL_GROUP: {
                code: "MANAGE_FUNCTIONAL_GROUP",
                permissions: {
                  VIEW: 'VIEW',
                  MANAGE: 'MANAGE',
                  CREATE: "CREATE",
                  DELETE: "DELETE"
                },
                pages: ["/manage/functional_group"]
              },
              MANAGE_FUNCTION: {
                code: "MANAGE_FUNCTION",
                permissions: {
                  VIEW: 'VIEW',
                  MANAGE: 'MANAGE',
                  CREATE: "CREATE",
                  DELETE: "DELETE"
                },
                pages: ["/manage/function"]
              },
              MANAGE_AGENT_USED: {
                code: "MANAGE_AGENT_USED",
                permissions: {
                  VIEW: 'VIEW',
                  MANAGE: 'MANAGE',
                  CREATE: "CREATE",
                  DELETE: "DELETE"
                },
                pages: ["/manage/agent_used"]
              },
              MANAGE_ADVISE: {
                code: "MANAGE_ADVISE",
                permissions: {
                  VIEW: 'VIEW',
                  MANAGE: 'MANAGE',
                  CREATE: "CREATE",
                  DELETE: "DELETE"
                },
                pages: ["/manage/advise"]
              },
              MANAGE_PAY: {
                code: "MANAGE_PAY",
                permissions: {
                  VIEW: 'VIEW',
                  MANAGE: 'MANAGE',
                  CREATE: "CREATE",
                  DELETE: "DELETE"
                },
                pages: ["/manage/pay"]
              },
              MANAGE_UNIT_OF_MEASUREMENT: {
                code: "MANAGE_UNIT_OF_MEASUREMENT",
                permissions: {
                  VIEW: 'VIEW',
                  MANAGE: 'MANAGE',
                  CREATE: "CREATE",
                  DELETE: "DELETE"
                },
                pages: ["/manage/unit_of_measurement"]
              },
              MANAGE_SERVER: {
                code: "MANAGE_SERVER",
                permissions: {
                  VIEW: 'VIEW',
                  MANAGE: 'MANAGE',
                  CREATE: "CREATE",
                  DELETE: "DELETE"
                },
                pages: ["/manage/server"]
              },
              MANAGE_SOFTWARE_SERVER: {
                code: "MANAGE_SOFTWARE_SERVER",
                permissions: {
                  VIEW: 'VIEW',
                  MANAGE: 'MANAGE',
                  CREATE: "CREATE",
                  DELETE: "DELETE"
                },
                pages: ["/manage/softwaresever"]
              },
              MANAGE_SOFTWARE_SERVER_ADD: {
                code: "MANAGE_SOFTWARE_SERVER_ADD",
                permissions: {
                  VIEW: 'VIEW',
                  MANAGE: 'MANAGE',
                  CREATE: "CREATE",
                  DELETE: "DELETE"
                },
                pages: ["/manage/softwaresever/addsoftwaresever"]
              },
              MANAGE_SOFTWARE_SERVER_EDIT: {
                code: "MANAGE_SOFTWARE_SERVER_EDIT",
                permissions: {
                  VIEW: 'VIEW',
                  MANAGE: 'MANAGE',
                  CREATE: "CREATE",
                  DELETE: "DELETE"
                },
                pages: ["/manage/softwaresever/[slug]"]
              },
              MANAGE_PRODUCT_CATEGORYS: {
                code: "MANAGE_PRODUCT_CATEGORYS",
                permissions: {
                  VIEW: 'VIEW',
                  MANAGE: 'MANAGE',
                  CREATE: "CREATE",
                  DELETE: "DELETE"
                },
                pages: ["/manage/productcategorys"]
              },
              MANAGE_PRODUCT_CATEGORYS_ADD: {
                code: "MANAGE_PRODUCT_CATEGORYS",
                permissions: {
                  VIEW: 'VIEW',
                  MANAGE: 'MANAGE',
                  CREATE: "CREATE",
                  DELETE: "DELETE"
                },
                pages: ["/manage/productcategorys/addproductcategorys"]
              },
              MANAGE_PRODUCT_CATEGORYS_EDIT: {
                code: "MANAGE_PRODUCT_CATEGORYS_EDIT",
                permissions: {
                  VIEW: 'VIEW',
                  MANAGE: 'MANAGE',
                  CREATE: "CREATE",
                  DELETE: "DELETE"
                },
                pages: ["/manage/productcategorys/[slug]"]
              },
              MANAGE_PRODUCTS: {
                code: "MANAGE_PRODUCTS",
                permissions: {
                  VIEW: 'VIEW',
                  MANAGE: 'MANAGE',
                  CREATE: "CREATE",
                  DELETE: "DELETE"
                },
                pages: ["/manage/products"]
              },
             
              SYSTEM_REPORT: {
                code: "SYSTEM_REPORT",
                permissions: {
                  VIEW: 'VIEW',
                  MANAGE: 'MANAGE',
                  CREATE: "CREATE",
                  DELETE: "DELETE"
                },
                pages: ["/system/report"]
              },
              SYSTEM_REPORT_ADD: {
                code: "SYSTEM_REPORT_ADD",
                permissions: {
                  VIEW: 'VIEW',
                  MANAGE: 'MANAGE',
                  CREATE: "CREATE",
                },
                pages: ["/system/report/add"]
              },
              SYSTEM_REPORT_DETAIL: {
                code: "SYSTEM_REPORT_DETAIL",
                permissions: {
                  VIEW: 'VIEW',
                  MANAGE: 'MANAGE',
                  DELETE: "DELETE",
                  UPDATE: "UPDATE"
                },
                pages: ["/system/report/detail/[id]"]
              },
              SYSTEM_ACOUNT : {
                code: "SYSTEM_ACOUNT",
                permissions: {
                  VIEW: 'VIEW',
                },
                pages: ["/system/acount"]
              },
              
              MANAGE_PRODUCT_PACKAGE: {
                code: "MANAGE_PRODUCT_PACKAGE",
                permissions: {
                  VIEW: 'VIEW',
                  MANAGE: 'MANAGE',
                  DELETE: "DELETE",
                  UPDATE: "UPDATE"
                },
                pages: ["/manage/product_package"]
              },
              MANAGE_QUOTE: {
                code: "MANAGE_QUOTE",
                permissions: {
                  VIEW: 'VIEW',
                  MANAGE: 'MANAGE',
                },
                pages: ["/manage/quote"]
              },
              QUOTE_LIST_DETAIL: {
                code: "QUOTE_LIST_DETAIL",
                permissions: {
                  VIEW: 'VIEW',
                  MANAGE: 'MANAGE',
                  DELETE: "DELETE",
                  UPDATE: "UPDATE"
                },
                pages: ["/system/list_quote/add_quote/[slug]"]
              },
              QUOTE_LIST: {
                code: "QUOTE_LIST",
                permissions: {
                  VIEW: 'VIEW',
                  MANAGE: 'MANAGE',
                },
                pages: ["/system/list_quote"]
              },
              QUOTE_ADD: {
                code: "QUOTE",
                permissions: {
                  VIEW: 'VIEW',
                  MANAGE: 'MANAGE',
                  UPDATE: "UPDATE"
                },
                pages: ["/system/list_quote/add_quote"]
              },
              QUOTE_DETAIL: {
                code: "QUOTE_DETAIL",
                permissions: {
                  VIEW: 'VIEW',
                  MANAGE: 'MANAGE',
                },
                pages: ["/system/list_quote/[slug]"]
              },
              MANAGE_SOFTWARE: {
                code: "MANAGE_SOFTWARE",
                permissions: {
                  VIEW: 'VIEW',
                  MANAGE: 'MANAGE',
                  DELETE: "DELETE",
                  UPDATE: "UPDATE"
                },
                pages: ["/manage/software"]
              },
              MANAGE_CUSTOMER: {
                code: "MANAGE_CUSTOMER",
                permissions: {
                  VIEW: 'VIEW',
                  MANAGE: 'MANAGE',
                  CREATE: "CREATE",
                  DELETE: "DELETE"
                },
                pages: ["/manage/client"]
              },

              FUNCTION_CATEGORY: {
                code: "FUNCTION_CATEGORY",
                permissions: {
                  VIEW: 'VIEW',
                  MANAGE: 'MANAGE',
                  CREATE: "CREATE",
                  DELETE: "DELETE"
                },
                pages: ["/system/list_quote/add_quote/categoryFunction"]
              },
            
              // QUOTE_LIST_DETAIL_MANAGE: {
              //   code: "QUOTE_LIST_DETAIL_MANAGE",
              //   permissions: {
              //     VIEW: 'VIEW',
              //     MANAGE: 'MANAGE',
              //     DELETE: "DELETE",
              //     UPDATE: "UPDATE"
              //   },
              //   pages: ["/manage/list_quote/[slug]"]
              // },

              TECHNOLOGY_ENGINEERING_GROUP: {
                code: "TECHNOLOGY_ENGINEERING_GROUP",
                permissions: {
                  VIEW: 'VIEW',
                  MANAGE: 'MANAGE',
                  CREATE: "CREATE",
                  DELETE: "DELETE"
                },
                pages: ["/manage/cate"]
              },



            }}
            userPermissions={[
              {
                dmcnId: 1,
                dmcnCode: "DASHBOARD",
                dmcnName: "Trang Dashboard",
                dmcnDescription: "Trang Dashboard",
                dmcnSlug: "/dashboard",
                dmcnParams: null,
                guid: "241cff9d-0a67-4036-96a8-d95422986f24",
                listPermission: [
                  {
                    psId: 1164,
                    psName: "VIEW",
                    psDescription: "Xem - Chức năng Trang Dashboard",
                    guid: "ff4c0924-be3a-4c4c-aff1-9dd58d6d2d7a",
                    dmcnId: 1,
                    byRole: true,
                    direct: false,
                    denied: false,
                    allowed: true,
                  },
                ],
              },
            ]}
            configACL={{
              guest: {
                TIEP_NHAN_HO_SO: ['VIEW'],
                USERS: ['VIEW'],
                SYSTEM_REPORT: ['VIEW', 'MANAGE', 'CREATE', 'DELETE'],
                SYSTEM_REPORT_ADD: ['VIEW', 'MANAGE', 'CREATE'],
                SYSTEM_REPORT_DETAIL: ['VIEW', 'MANAGE', 'DELETE', 'UPDATE'],
                QUOTE_LIST_DETAIL: ['VIEW', 'MANAGE', 'DELETE', 'UPDATE'],
                QUOTE_LIST: ['VIEW', 'MANAGE'],
                QUOTE_ADD: ['VIEW', 'MANAGE', 'UPDATE'],
                QUOTE_DETAIL:['VIEW','MANAGE'],
                SYSTEM_ACOUNT:['VIEW','MANAGE'],
                MANAGE_PRODUCT_PACKAGE: ['VIEW', 'MANAGE', 'DELETE', 'UPDATE'],
                MANAGE_QUOTE: ['VIEW', 'MANAGE'],
                MANAGE_SOFTWARE: ['VIEW', 'MANAGE', 'DELETE', 'UPDATE'],
                MANAGE_CUSTOMER: ['VIEW', 'MANAGE', 'DELETE', 'UPDATE'],
                MANAGE_CATEGORYS: ['VIEW', 'MANAGE', 'DELETE', 'UPDATE'],
                MANAGE_PARAMERTER_GROUP: ['VIEW', 'MANAGE', 'DELETE', 'UPDATE'],
                MANAGE_PARAMERTER: ['VIEW', 'MANAGE', 'DELETE', 'UPDATE'],
                MANAGE_FUNCTIONAL_GROUP: ['VIEW', 'MANAGE', 'DELETE', 'UPDATE'],
                MANAGE_FUNCTION: ['VIEW', 'MANAGE', 'DELETE', 'UPDATE'],
                MANAGE_UNIT_OF_MEASUREMENT: ['VIEW', 'MANAGE', 'DELETE', 'UPDATE'],
                MANAGE_SERVER: ['VIEW', 'MANAGE', 'DELETE', 'UPDATE'],
                FUNCTION_CATEGORY: ['VIEW', 'MANAGE', 'DELETE', 'UPDATE'],
                MANAGE_AGENT_USED: ['VIEW', 'MANAGE', 'DELETE', 'UPDATE'],
                MANAGE_ADVISE:['VIEW', 'MANAGE', 'DELETE', 'UPDATE'],
                MANAGE_PAY: ['VIEW', 'MANAGE', 'DELETE', 'UPDATE'],
                MANAGE_SOFTWARE_SERVER: ['VIEW', 'MANAGE', 'DELETE', 'UPDATE'],
                MANAGE_SOFTWARE_SERVER_ADD : ['VIEW', 'MANAGE', 'DELETE', 'UPDATE'], 
                MANAGE_SOFTWARE_SERVER_EDIT : ['VIEW', 'MANAGE', 'DELETE', 'UPDATE'], 
                MANAGE_PRODUCT_CATEGORYS : ['VIEW', 'MANAGE', 'DELETE', 'UPDATE'], 
                MANAGE_PRODUCT_CATEGORYS_ADD : ['VIEW', 'MANAGE', 'DELETE', 'UPDATE'], 
                MANAGE_PRODUCTS : ['VIEW', 'MANAGE', 'DELETE', 'UPDATE'], 
                MANAGE_PRODUCT_CATEGORYS_EDIT :['VIEW', 'MANAGE', 'DELETE', 'UPDATE'], 
                // QUOTE_LIST_DETAIL_MANAGE: ['VIEW', 'MANAGE', 'DELETE', 'UPDATE'],
                TECHNOLOGY_ENGINEERING_GROUP: ['VIEW', 'MANAGE', 'DELETE', 'UPDATE'],

              },
              test: {
                TIEP_NHAN: ['MANAGE']
              },
            }}>
            {children}
          </G2BAclGuard>
        </ReduxProvider>
      )}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
