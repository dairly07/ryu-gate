import Checkbox from "@/Components/Checkbox";
import ContentHeader from "@/Components/ContentHeader";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SuccessButton from "@/Components/SuccessButton";
import TextInput from "@/Components/TextInput";
import MainLayout from "@/Layouts/MainLayout";
import Content from "@/Widgets/Content";
import { Link, router, useForm } from "@inertiajs/react";
import React from "react";
import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";

const FormOfficer = ({ page_title, officer = null }) => {
    const { data, setData, errors, clearErrors, reset, processing, post, put } =
        useForm({
            id: "",
            name: "",
            code: "",
            role: "petugas",
            password: "",
        });
    const handleChange = (event) => {
        setData(event.target.name, event.target.value);
        clearErrors(event.target.name);
    };
    const submit = (event) => {
        event.preventDefault();
        if(data.id) {
            put(`/officers/${data.id}`, {
                onSuccess: () => {
                    toast.success('Petugas berhasil diedit!');
                    router.visit('/officers');
                    reset()
                },
                onError: (err) => {
                    toast.error(err.message);
                }
            })
        } else {
            post('/officers', {
                onSuccess: () => {
                    toast.success('Petugas berhasil ditambahkan!');
                    router.visit('/officers');
                    reset();
                },
                onError: (err) => {
                    toast.error(err.message);
                }
            })
        }
    }
    useEffect(() => {
        if (officer) {
            const { id, name, code, role } = officer;
            setData({
                ...data,
                id,
                name,
                code,
                role,
            });
        }
    }, []);
    return (
        <>
            <ContentHeader title="Form Petugas" />
            <Content>
                <div className="row">
                    <div className="col-md-6 col-12">
                        <form onSubmit={submit}>
                            <Card>
                                <Card.Header>
                                    <h3 className="card-title">{page_title}</h3>
                                </Card.Header>
                                <Card.Body>
                                    <div className="mb-2">
                                        <InputLabel required>Code</InputLabel>
                                        <TextInput
                                            id="code"
                                            name="code"
                                            type="text"
                                            onChange={handleChange}
                                            value={data.code}
                                            isInvalid={errors.code}
                                        />
                                        <InputError
                                            message={errors.code}
                                            className="my-1"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <InputLabel required>Nama</InputLabel>
                                        <TextInput
                                            id="name"
                                            name="name"
                                            type="text"
                                            onChange={handleChange}
                                            value={data.name}
                                            isInvalid={errors.name}
                                        />
                                        <InputError
                                            message={errors.name}
                                            className="my-1"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <InputLabel required>
                                            {officer ? 'Ganti Password Akun' : 'Password Akun'}
                                        </InputLabel>
                                        <TextInput
                                            id="password"
                                            name="password"
                                            type="password"
                                            onChange={handleChange}
                                            value={data.password}
                                            isInvalid={errors.password}
                                        />
                                        <InputError
                                            message={errors.password}
                                            className="my-1"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <div className="form-check">
                                            <Checkbox
                                                checked={
                                                    data.role === "admin"
                                                        ? true
                                                        : false
                                                }
                                                onChange={(event) =>
                                                    event.target.checked
                                                        ? setData(
                                                            "role",
                                                            "admin"
                                                        )
                                                        : setData(
                                                            "role",
                                                            "petugas"
                                                        )
                                                }
                                            />
                                            <InputLabel>
                                                admin?
                                            </InputLabel>
                                        </div>
                                        <InputError
                                            message={errors.role}
                                            className="my-1"
                                        />
                                    </div>
                                </Card.Body>
                                <Card.Footer>
                                    <Link
                                        className="btn btn-secondary btn-sm mr-1"
                                        href={`/officers`}
                                    >
                                        Batal
                                    </Link>
                                    <SuccessButton
                                        size="sm"
                                        proccessing={processing}
                                        type="submit"
                                    >
                                        Simpan
                                    </SuccessButton>
                                </Card.Footer>
                            </Card>
                        </form>
                    </div>
                </div>
            </Content>
        </>
    );
};

FormOfficer.layout = (page) => (
    <MainLayout
        children={page}
        title={page.props.page_title}
        auth={page.props.auth}
    />
);

export default FormOfficer;
