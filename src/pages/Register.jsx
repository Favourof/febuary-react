import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { userContext } from '../context/userContext';
import styles from './Register.module.css';
import { publicIntance } from '../api/api';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const { setName } = useContext(userContext);
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState('');
    const [serverSuccess, setServerSuccess] = useState('');
    const navigate = useNavigate()
    // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const registerSchema = z
        .object({
            name: z
                .string()
                .trim()
                .min(2, 'Please enter at least 2 characters.')
                .max(60, 'Please keep it under 60 characters.'),
            email: z.email().nonempty('Email is required.'),
            password: z
                .string()
                .min(8, 'Use at least 8 characters.')
                .regex(/[A-Z]/, 'Add at least one uppercase letter.')
                .regex(/[0-9]/, 'Add at least one number.'),
            terms: z.boolean().refine((value) => value === true, {
                message: 'You must accept the terms to continue.',
            }),
            // confirmPassword: z.string().min(1, 'Please confirm your password.'),
            // terms: z.boolean().refine((value) => value === true, {
            //     message: 'You must accept the terms to continue.',
            // }),
        })
    // .refine((data) => data.password === data.confirmPassword, {
    //     path: ['confirmPassword'],
    //     message: 'Passwords do not match.',
    // });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(registerSchema),
        mode: 'onTouched',
    });

    const onSubmit = async (data) => {
        setServerError('');
        setServerSuccess('');

        try {
            const res = await publicIntance.post("/auth/register", data)
            if (res) {
                setName(data.name);
                setServerSuccess('Account created successfully.');
                console.log(res, 'user .....');
                navigate("/login")

            }

        } catch (error) {
            const message =
                error?.response?.data?.message ||
                'Registration failed.';
            setServerError(message);
            console.log(error.response.data.message);

        }

    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <section className={styles.hero}>
                    <p className={styles.badge}>Welcome to February</p>
                    <h1 className={styles.title}>Create your account</h1>
                    <p className={styles.subtitle}>
                        Join the community and keep all your product ideas, tasks, and notes in one calm space.
                    </p>
                    <ul className={styles.highlights}>
                        <li>Track updates with simple checklists</li>
                        <li>Access your dashboard on any device</li>
                        <li>Get weekly insights delivered to you</li>
                    </ul>
                </section>

                <section className={styles.formWrapper}>
                    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.formHeader}>
                            <h2>Sign up</h2>
                            <p>It only takes a minute. No credit card required.</p>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="name">Full name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Jane Doe"
                                autoComplete="name"
                                aria-invalid={Boolean(errors.name)}
                                {...register('name')}
                            />
                            {errors.name && <span className={styles.error}>{errors.name.message}</span>}
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="email">Email address</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="jane@company.com"
                                autoComplete="email"
                                aria-invalid={Boolean(errors.email)}
                                {...register('email')}
                            />
                            {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="password">Password</label>
                            <div className={styles.inputRow}>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Create a strong password"
                                    autoComplete="new-password"
                                    aria-invalid={Boolean(errors.password)}
                                    {...register('password')}
                                />
                                <button
                                    className={styles.toggle}
                                    type="button"
                                    onClick={() => setShowPassword((value) => !value)}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                            <span className={styles.helper}>Use 8+ characters with a number and uppercase letter.</span>
                            {errors.password && <span className={styles.error}>{errors.password.message}</span>}
                        </div>

                        {/* <div className={styles.field}>
                            <label htmlFor="confirmPassword">Confirm password</label>
                            <div className={styles.inputRow}>
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Re-enter your password"
                                    autoComplete="new-password"
                                    aria-invalid={Boolean(errors.confirmPassword)}
                                    {...register('confirmPassword')}
                                />
                                <button
                                    className={styles.toggle}
                                    type="button"
                                    onClick={() => setShowConfirmPassword((value) => !value)}
                                >
                                    {showConfirmPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <span className={styles.error}>{errors.confirmPassword.message}</span>
                            )}
                        </div> */}

                        <div className={styles.checkboxRow}>
                            <input id="terms" type="checkbox" {...register('terms')} />
                            <label htmlFor="terms">
                                I agree to the terms and the privacy policy.
                            </label>
                        </div>
                        {errors.terms && <span className={styles.error}>{errors.terms.message}</span>}

                        {serverError && <div className={styles.serverError}>{serverError}</div>}
                        {serverSuccess && <div className={styles.serverSuccess}>{serverSuccess}</div>}

                        <button
                            className={styles.submit}
                            type="submit"
                        // disabled={isSubmitting || (isSubmitted)}
                        >
                            {isSubmitting ? 'Creating account...' : 'Create account'}
                        </button>

                        <p className={styles.footerText}>
                            Already have an account? <span className={styles.link}>Sign in</span>
                        </p>
                    </form>
                </section>
            </div>
        </div>
    );
};
