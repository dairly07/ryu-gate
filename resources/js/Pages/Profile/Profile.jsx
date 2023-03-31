import ContentHeader from '@/Components/ContentHeader';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SuccessButton from '@/Components/SuccessButton';
import TextInput from '@/Components/TextInput';
import MainLayout from '@/Layouts/MainLayout';
import Content from '@/Widgets/Content';
import { router, useForm, usePage } from '@inertiajs/react';
import React from 'react'
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Profile = () => {
    const user = usePage().props.auth.user;

    const { data, setData, put, errors, reset, clearErrors, processing } = useForm({
        name: user.name,
        current_password: '',
        password: '',
        password_confirmation: '',
    });
    const handleChange = (event) => {
        setData(event.target.name, event.target.value);
        clearErrors(event.target.name);
    };

    const submit = (event) => {
        event.preventDefault();

        put(route('profile.update'), {
            onSuccess: () => {
                toast.success("Profile berhasil diubah");
                reset();
                router.visit('/profile');
            },
            onError: (err) => {
                toast.error(err.message);
            }
        });
    }

    return (
        <>
            <ContentHeader title="Profile"/>
            <Content>
                <div className="row">
                    <div className="col-md-6 col-12">
                        <form onSubmit={submit}>
                            <Card>
                                <Card.Header>
                                    <h3 className='card-title'>Update Profile</h3>
                                </Card.Header>
                                <Card.Body>
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
                                        <InputError message={errors.name} className="my-2"/>
                                    </div>
                                    <div className="mb-2">
                                        <InputLabel required={data.current_password || data.password || data.password_confirmation ? true : false}>Password Lama</InputLabel>
                                        <TextInput
                                            id="current_password"
                                            name="current_password"
                                            type="password"
                                            onChange={handleChange}
                                            value={data.current_password}
                                            isInvalid={errors.current_password}
                                            required={data.current_password || data.password || data.password_confirmation ? true : false}
                                        />
                                        <InputError message={errors.current_password} className="my-2"/>
                                    </div>
                                    <div className="mb-2">
                                        <InputLabel required={data.current_password || data.password || data.password_confirmation ? true : false}>Password Baru</InputLabel>
                                        <TextInput
                                            id="password"
                                            name="password"
                                            type="password"
                                            onChange={handleChange}
                                            value={data.password}
                                            isInvalid={errors.password}
                                            required={data.current_password || data.password || data.password_confirmation ? true : false}
                                        />
                                        <InputError message={errors.password} className="my-2"/>
                                    </div>
                                    <div className="mb-2">
                                        <InputLabel required={data.current_password || data.password || data.password_confirmation ? true : false}>Password Konfirmasi</InputLabel>
                                        <TextInput
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            type="password"
                                            onChange={handleChange}
                                            value={data.password_confirmation}
                                            isInvalid={errors.password_confirmation}
                                            required={data.current_password || data.password || data.password_confirmation ? true : false}
                                        />
                                        <InputError message={errors.password_confirmation} className="my-2"/>
                                    </div>
                                </Card.Body>
                                <Card.Footer>
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
    )
}

Profile.layout = (page) => (
    <MainLayout children={page} title="Profile" auth={page.props.auth} />
);

export default Profile
