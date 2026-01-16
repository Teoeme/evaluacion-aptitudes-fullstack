import { Button, Input } from 'prometeo-design-system'
import { UserDeleteSchema, type UserDeleteSchemaType } from '../schemas/validateUserDelete'

type UserDeleteFormProps = {
    handleSubmit: (values: UserDeleteSchemaType) => void
    initialValues: UserDeleteSchemaType
}

const UserDeleteForm = ({handleSubmit,initialValues}:UserDeleteFormProps) => {
  return (
    <Formik<UserDeleteSchemaType> 
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={UserDeleteSchema}
        >
    {
        (props)=> (
            <Form className='flex flex-col gap-4 bg-neutral-default-default w-[640px]'>
                <div className='flex flex-col gap-2'>
                    <p className=' prometeo-fonts-body-large'>
                        Estas a punto de eliminar el usuario <span className='font-bold bg-neutral-default-hover px-2 py-1 rounded-md'>
                            {initialValues.fullName}
                        </span>
                    </p>

                    <p className=' prometeo-fonts-body-small'>
                        Esta acción es irreversible, para confirmar escribe "eliminar" en el campo de abajo.
                    </p>

                </div>
                <Input
                name="confirm" 
                label="Confirmar" 
                helperComponent={<p className='prometeo-fonts-body-xsmall'>Escribe "eliminar" para confirmar</p>}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                        props.handleSubmit()
                    }
                }}
                onChange={(value: string) => props.setFieldValue('confirm', value.toLowerCase())}
                />
                <div className='flex justify-end'>  
                    <Button
                    className=''
                    type="submit"
                    label="Eliminar"
                    isLoading={props.isSubmitting}
                    disabled={!props.dirty || !props.isValid}
                    />                  
                </div>

            </Form>
        )
    }    
    </Formik>
  )
}

export default UserDeleteForm