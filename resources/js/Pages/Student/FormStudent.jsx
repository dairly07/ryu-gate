import ContentHeader from "@/Components/ContentHeader";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SuccessButton from "@/Components/SuccessButton";
import TextInput from "@/Components/TextInput";
import MainLayout from "@/Layouts/MainLayout";
import Content from "@/Widgets/Content";
import { Link, useForm } from "@inertiajs/react";
import React, { useEffect } from "react";
import { Card } from "react-bootstrap";

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
    useEffect(() => {
        if(student) {
            const { name, nis, phone, id } = student;
            setData({
                classroom_id: classroom.id,
                name: name,
                nis: nis,
                phone: phone,
                id: id,
            });
        } else {
            setData("classroom_id", classroom.id);
        }
    }, [])
    return (
        <>
            <ContentHeader title="Form Siswa" />
            <Content>
                <div className="row">
                    <div className="col-md-6 col-12">
                        <form action="">
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
