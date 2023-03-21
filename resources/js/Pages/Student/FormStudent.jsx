import ContentHeader from "@/Components/ContentHeader";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SuccessButton from "@/Components/SuccessButton";
import TextInput from "@/Components/TextInput";
import MainLayout from "@/Layouts/MainLayout";
import Content from "@/Widgets/Content";
import { Link, router, useForm } from "@inertiajs/react";
import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";

const FormStudent = ({ page_title, classroom, student = null }) => {
    const { data, setData, errors, clearErrors, reset, processing, post, put } = useForm({
        id: "",
        name: "",
        nis: "",
        phone: "",
        classroom_id: ""
    });
    const handleChange = (event) => {
        setData(event.target.name, event.target.value);
        clearErrors(event.target.name);
    };
    const submit = (event) => {
        event.preventDefault();
        if(data.id) {
            put(route('students.update', data.id), {
                onSuccess: () => {
                    toast.success('Siswa berhasil diedit!');
                    router.visit(`/students?classroom=${classroom}`)
                    reset();
                },
                onError: (err) => {
                    toast.error(err.message);
                }
            })
        } else {
            post(route('students.store'), {
                onSuccess: () => {
                    toast.success('Siswa berhasil ditambahkan!');
                    router.visit(`/students?classroom=${classroom}`)
                    reset();
                },
                onError: (err) => {
                    toast.error(err.message);
                }
            })
        }
    }
    useEffect(() => {
        if(student) {
            const { name, nis, phone, id } = student;
            setData({
                classroom_id: classroom,
                name: name,
                nis: nis,
                phone: phone,
                id: id,
            });
        } else {
            setData("classroom_id", classroom);
        }
    }, [])
    return (
        <>
            <ContentHeader title="Form Siswa" />
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
                                        <InputLabel required>Nis</InputLabel>
                                        <TextInput
                                            id="nis"
                                            name="nis"
                                            type="text"
                                            onChange={handleChange}
                                            value={data.nis}
                                            isInvalid={errors.nis}
                                        />
                                        <InputError message={errors.nis} className="my-1"/>
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
                                        <InputError message={errors.name} className="my-1"/>
                                    </div>
                                    <div className="mb-2">
                                        <InputLabel required>Telepon</InputLabel>
                                        <TextInput
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            onChange={handleChange}
                                            value={data.phone}
                                            isInvalid={errors.phone}
                                        />
                                        <InputError message={errors.phone} className="my-1"/>
                                    </div>
                                </Card.Body>
                                <Card.Footer>
                                    <Link
                                        className="btn btn-secondary btn-sm mr-1"
                                        href={`/students?classroom=${classroom}`}
                                    >
                                        Batal
                                    </Link>
                                    <SuccessButton
                                        size="sm"
                                        proccessing={processing}
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

FormStudent.layout = (page) => (
    <MainLayout
        children={page}
        title={page.props.page_title}
        auth={page.props.auth}
    />
);

export default FormStudent;
