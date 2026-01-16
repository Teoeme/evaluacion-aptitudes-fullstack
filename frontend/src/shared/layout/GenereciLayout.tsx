import { Outlet, useNavigate } from "react-router";
import AuthWrapper from "../components/AuthWrapper";
import { Spinner } from "prometeo-design-system";
import PyrionLayout, { type PyrionLayoutProps } from "prometeo-design-system/PyrionLayout";
import { links } from "./LayoutLinks";
import { useUser } from "../../features/users/hooks/useUser";
import { useMemo } from "react";

type AppMetadata={}
type NotificationsMetadata={}

const GenereciLayout = () => {
  const navigate = useNavigate();

  const {usuario} = useUser()

  const state:PyrionLayoutProps<AppMetadata, NotificationsMetadata>['state']=useMemo(
    ()=>{
      return {
        company:{name:"Selene Soluciones"},
        enabled_systems:[{_id:"evaluacion-aptitudes",name:"Evaluacion Aptitudes",url:"/",thumbnail:'https://s3.altelabs.com/api/v1/buckets/alte-dev-public/objects/download?preview=true&prefix=logologistica.png&version_id=null',
          coverImage:'https://s3.altelabs.com/api/v1/buckets/alte-dev-public/objects/download?preview=true&prefix=logologistica.png&version_id=null'
        }],
        user:{_id:usuario?.id!,name:usuario?.nombreCompleto!},
      }
    },
    [usuario]
  )

  return (
    <AuthWrapper fallbackFunction={() => navigate("/")} fallbackComponent={<Spinner />}>
          <div className='bg-neutral-strong-default w-screen prometeo-fonts-body-medium h-dvh max-h-dvh overflow-hidden'>
            <PyrionLayout<AppMetadata, NotificationsMetadata>
            currentSystemId="evaluacion-aptitudes"
            state={state}
            links={links}
            options={{
              userCardOptions:{
                secondarySlot: 'company.name'
              }
            }}
            >
              <Outlet />
            </PyrionLayout>
          </div>
    </AuthWrapper>
  );
};

export default GenereciLayout;
