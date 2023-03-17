import ContentHeader from "@/Components/ContentHeader";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SuccessButton from "@/Components/SuccessButton";
import TextInput from "@/Components/TextInput";
import MainLayout from "@/Layouts/MainLayout";
import Content from "@/Widgets/Content";
import { Link, useForm, router } from "@inertiajs/react";
import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";

const FormClassroom = ({ page_title, classrooms = null }) => {
    const { data, setData, errors, clearErrors, reset, processing, post, put } =
        useForm({
            id: "",
            name: "",
            major: "",
        });
    const handleChange = (event) => {
        setData(event.target.name, event.target.value);
        clearErrors(event.target.name);
    };
    const submit = (event) => {
        event.preventDefault();

        if (data.id) {
            put(`/classrooms/${data.id}`, {
                onSuccess: () => {
                    reset();
                    router.visit(route("classrooms.index"));
                },
                onError: (err) => {
                    toast.error(err.message);
                },
            });
        } else {
            post("/classrooms", {
                onSuccess: () => {
                    reset();
                    router.visit(route("classrooms.index"));
                },
                onError: (err) => {
                    toast.error(err.message);
                },
            });
        }
    };
    useEffect(() => {
        if(classrooms) {
            const { id, name, major } = classrooms;
            setData({ id, name, major });
        }
    }, [])
    return (
        <>
            <ContentHeader title="Form Kelas" />
            <Content>
                <div className="row">
                    <div className="col-md-6 col-12">
                        <form onSubmit={submit}>
                            <Card>
                                <Card.Header>
                                    <h3 className="card-title">{page_title}</h3>
                                </Card.Header>
                                <Card.Body>
                                    <InputLabel required>Nama Kelas</InputLabel>
                                    <TextInput
                                        id="name"
                                        name="name"
                                        type="text"
                                        onChange={handleChange}
                                        value={data.name}
                                    />
                                    <InputError message={errors.name} />
                                    <InputLabel required className="mt-2">
                                        Kompetensi Keahlian
                                    </InputLabel>
                                    <TextInput
                                        id="major"
                                        name="major"
                                        type="text"
                                        onChange={handleChange}
                                        value={data.major}
                                    />
                                    <InputError message={errors.major} />
                                </Card.Body>
                                <Card.Footer>
                                    <Link
                                        className="btn btn-secondary btn-sm mr-1"
                                        href={route("classrooms.index")}
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

FormClassroom.layout = (page) => (
    <MainLayout
        children={page}
        title={page.props.page_title}
        auth={page.props.auth}
    />
);

export default FormClassroom;
