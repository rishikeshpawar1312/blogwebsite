import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(login(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="mx-auto w-full max-w-md p-8 sm:p-10 bg-white shadow-lg rounded-lg">
                <div className="mb-6 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Sign up to create account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-blue-600 hover:text-blue-500"
                    >
                        Sign In
                    </Link>
                </p>
                {error && (
                    <p className="text-red-600 mt-4 text-center">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit(create)} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <Input
                                label="Full Name:"
                                placeholder="Enter your full name"
                                className="relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                {...register("name", {
                                    required: true,
                                })}
                            />
                        </div>
                        <div className="mt-6">
                            <Input
                                label="Email:"
                                placeholder="Enter your email"
                                type="email"
                                className="relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPattern: (value) =>
                                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Email address must be a valid address",
                                    },
                                })}
                            />
                        </div>
                        <div className="mt-6">
                            <Input
                                label="Password:"
                                type="password"
                                placeholder="Enter your password"
                                className="relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                {...register("password", {
                                    required: true,
                                })}
                            />
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
                        >
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
