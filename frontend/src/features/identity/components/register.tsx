import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigation, useSubmit } from "react-router-dom";
import { useForm } from "react-hook-form";
import {httpService} from "../../../core/http-service"
import { useNavigate } from "react-router-dom";


type FormData = {
    username: string;
    password: string;
    confirmPassword: string;
};

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const navigate = useNavigate()
    
    const onSubmit = (data: FormData) => {
        const {confirmPassword, ...userData} = data
        submitForm(userData, {method: 'post'})
        navigate('/login')
    };

    const submitForm = useSubmit()

    const navigation = useNavigation()
    const isSubmitting = navigation.state !== 'idle'
    return (
        <>
            <h2>Register</h2>
            <p>
                Already registered? <Link to="/login">Login</Link>
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

                <Input 
                    {...register('confirmPassword', {
                        required: 'Confirm password is required',
                        validate: value => {
                            if (watch('password') !== value) {
                                return 'The entered passwords do not match';
                            }
                        },
                    })} 
                    className={`${errors.confirmPassword && 'is-invalid'}`} 
                    type="password" 
                    placeholder="password confirmation" 
                />
                {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}

                <Button disabled={isSubmitting} type="submit">{isSubmitting ? 'Processing...' : 'Register'}</Button>
            </form>
        </>
    );
};

export default Register;

export async function registerAction({ request }: { request: Request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData)
    console.log(data)
    const response = await httpService.post('/register/', data)
    return response.status === 200
}
