import React from 'react'
import { useEffect } from 'react';
import TextInput from '@/Components/TextInput'
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton'
import { Head, Link, useForm } from '@inertiajs/react'

const Login = ({ status, canResetPassword }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        code: '',
        password: '',
        remember: '',
    });
    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };
    return (
        <div className="auth-wrapper">
            <Head title='Log in'/>
            <div className="auth-content">
                <div className="auth-bg">
                    <span className="r" />
                    <span className="r s" />
                    <span className="r s" />
                    <span className="r" />
                </div>
                <form onSubmit={submit}>
                    <div className="card">
                        <div className="card-body text-center">
                            <div className="mb-4">
                                <i className="feather icon-unlock auth-icon" />
                            </div>
                            <h3 className="mb-4">Login</h3>
                            <div className="input-group mb-3">
                                <TextInput
                                    id="code"
                                    type="text"
                                    name="code"
                                    placeholder="Code"
                                    value={data.code}
                                    autoComplete="code"
                                    isFocused={true}
                                    onChange={handleOnChange}
                                />
                                <InputError message={errors.code} className="mt-2" />
                            </div>
                            <div className="input-group mb-4">
                                <TextInput
                                    id="password"
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    value={data.password}
                                    autoComplete="current-password"
                                    onChange={handleOnChange}
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                            <div className="form-group text-left">
                                <div className="checkbox checkbox-fill d-inline">
                                    <input type="checkbox" name="remember" id="checkbox-fill-a1" value={data.remember} onChange={handleOnChange} />
                                    <label htmlFor="checkbox-fill-a1" className="cr"> Remember me</label>
                                </div>
                            </div>
                            <PrimaryButton className='mb-4' disabled={processing}>Login</PrimaryButton>
                            <p className="mb-2 text-muted">Forgot password? {canResetPassword && (
                                <Link href={route('password.request')}>
                                    Reset
                                </Link>
                            )}</p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
