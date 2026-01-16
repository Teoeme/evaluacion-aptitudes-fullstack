import {
    Button,
    Input,
    Select,
} from "prometeo-design-system";
import { Roles } from "../../../entities/roles/Role";
import { useUser } from "../hooks/useUser";

type UpdateUserFormProps = {
  initialValues: UpdateUserSchemaType;
  handleSubmit: (values: UpdateUserSchemaType) => void;
};

const UpdateUserForm = ({
  initialValues,
  handleSubmit,
}: UpdateUserFormProps) => {
  const { esAlMenos: isAtLeast } = useUser();
  return (
    <Formik<UpdateUserSchemaType>
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={UpdateUserSchema}
    >
      {(props) =>{
        console.log(props.errors,'errors update form')
        return(
        <Form className="flex flex-col gap-4 bg-neutral-default-default w-[320px]">
          <InputFormik
            name="name"
            label="Nombre"
            disabled={true}
          />
          <InputFormik
            name="surname"
            label="Apellido"
            disabled={true}
          />
          <InputFormik
            name="email"
            label="Email"
            disabled={true}
          />
          <InputFormik
            name="username"
            label="Username"
            disabled={true}
          />
          <InputFormik
            name="phone"
            label="Teléfono"
            disabled={true}
          />

          <SelectFormik
            label="Rol"
            options={Roles.map((role) => ({ label: role, value: role,id:role }))}
            className=" bg-neutral-default-default"
            containerClassName=""
            disabled={false}
            name="role"
          />

          <InputFormik name="area" label="Area" />

          {isAtLeast("SuperAdmin") && (
            <div className="flex items-center gap-2">
              <span className="prometeo-fonts-body-large">
                Estado: 
                <span className={`font-bold bg-neutral-default-hover px-2 py-1 rounded-md ml-2 
                    ${props.values.isActive ? "bg-success-dark" : "bg-error-dark"}`}>    
                    {props.values.isActive ? "Activo" : "Inactivo"}{" "}
                </span>
              </span>
              <Button
                disabled={props.values.isActive}
                type="button"
                label="Reactivar"
                className="p-0 min-h-0 h-min"
                variant='text'
                onClick={() => props.setFieldValue("isActive", true)}
                animate={false}
              />
            </div>
          )}

          <div className="flex justify-end">
            <Button
              className=""
              type="submit"
              label="Guardar"
              isLoading={props.isSubmitting}
              disabled={!props.dirty || !props.isValid}
            />
          </div>
        </Form>
      )}}
    </Formik>
  );
};

export default UpdateUserForm;
