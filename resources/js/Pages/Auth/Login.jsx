import React from "react";
import { useEffect } from "react";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";

const Login = ({ status, canResetPassword }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        code: "",
        password: "",
        remember: "",
    });
    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };
    return (
        <div className="hold-transition login-page">
            <Head title="Login"/>
            <div className="login-box">
                <div className="login-logo">
                    <a href="../../index2.html">
                        <b>Ryu</b>Gate
                    </a>
                </div>
                {/* /.login-logo */}
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Login</p>
                        <form onSubmit={submit}>
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
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <InputError
                                message={errors.code}
                                className="mt-2"
                            />
                            <div className="input-group mb-3">
                                <TextInput
                                    id="password"
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    value={data.password}
                                    autoComplete="current-password"
                                    onChange={handleOnChange}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                            <div className="row">
                                <div className="col-8">
                                    <div className="icheck-primary">
                                        <input
                                            type="checkbox"
                                            id="remember"
                                            name="remember"
                                            value={data.remember}
                                            onChange={handleOnChange}
                                        />
                                        <label htmlFor="remember">
                                            Remember Me
                                        </label>
                                    </div>
                                </div>
                                {/* /.col */}
                                <div className="col-4">
                                    <PrimaryButton
                                        className="mb-4 btn-block"
                                        disabled={processing}
                                    >
                                        Masuk
                                    </PrimaryButton>
                                </div>
                                {/* /.col */}
                            </div>
                        </form>
                        <p className="mb-1">
                            <Link href={route("password.request")}>
                                I forgot my password
                            </Link>
                        </p>
                    </div>
                    {/* /.login-card-body */}
                </div>
            </div>
        </div>
    );
};

export default Login;
