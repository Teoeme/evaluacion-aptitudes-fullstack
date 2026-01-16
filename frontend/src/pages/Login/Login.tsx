import LoginForm from "../../features/auth/components/LoginForm"

const Login = () => {
    return (
        <article className="flex w-screen h-screen">
            <section className="w-1/2 h-full bg-[url('/src/assets/R.jpg')] bg-cover bg-center"></section>
            <section className="w-1/2 h-full bg-neutral-default-default ">
                <div className="flex flex-col items-center justify-center h-full gap-2 w-full">
                    <h1 className="text-5xl font-bold text-neutral-strong-default ">Bienvenido</h1>
                    <p className=" text-gray-500 text-left text-lg mb-4">Inicia sesión para continuar</p>
                    <LoginForm />
                </div>
            </section>
        </article>
    )
}

export default Login