import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, redirect, useSubmit } from "react-router-dom";
import { useForm } from "react-hook-form";
import { httpService } from "@/core/http-service";

type FormData = {
    username: string;
    password: string;
    confirmPassword: string;
};

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    
    const submitForm = useSubmit()

    const onSubmit = (data: FormData) => {
        submitForm(data, {method: 'post'})
    };

  return (
    <>
      <h2>Login</h2>
      <p>
        Not registered yet? <Link to="/register">register</Link>
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4 p-4 border-2">
                <Input 
                    {...register('username', {
                        required: 'Username is required',
                        minLength: { value: 5, message: 'Username must be at least 5 characters' },
                        maxLength: { value: 20, message: 'Username cannot exceed 20 characters' },
                    })} 
                    className={`${errors.username && 'is-invalid'}`} 
                    type="text" 
                    placeholder="username" 
                />
                {errors.username && <p className="text-red-500">{errors.username?.message}</p>}

                <Input 
                    {...register('password', {
                        required: 'Password is required',
                        minLength: { value: 8, message: 'Password must be at least 8 characters' },
                    })} 
                    className={`${errors.password && 'is-invalid'}`} 
                    type="password" 
                    placeholder="password" 
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        <Button>Login</Button>
      </form>
    </>
  );
};

export default Login;

export async function loginAction({ request }: { request: Request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await httpService.post('/login/', data);

  if (response.status === 200) {
    localStorage.setItem('token', response?.data.token.trim());
  }

  return redirect('/');
}
