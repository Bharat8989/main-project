"use client"
import { useState } from "react";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useForm } from 'react-hook-form';
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

const Register = () => {

 

    const { handleSignUp } = useAuth();
    const { register, reset, handleSubmit, formState: { errors } } = useForm({ trim: true });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isAccountCreated, setIsAccountCreated] = useState(false);
    const [accAlreadyExist, setAccAlreadyExists] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);

        if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match.");
            return reset();
        }

        try {
            await handleSignUp({
                email: data.email,
                password: data.password,
                name: data.name
            });
            setIsAccountCreated(true);
            toast.success("Registered successfully.");
        } catch (error) {
            if (error.message === "A user with the same id, email, or phone already exists in this project.") {
                setAccAlreadyExists(true);
            }
            toast.error(error.message);
        }
        finally {
            setLoading(false);
            reset();
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            {/* <Meta title="Sign Up | Alumni NITP" /> */}
            {
                accAlreadyExist &&
                <div className="flex items-center justify-center flex-col max-w-lg text-center">
                    <div className="flex items-center justify-center">
                        <img src="/images/logo.svg" alt="logo" className="h-14 mt-1 w-auto" height={40} width={150} />
                    </div>

                    <p className="text-white text-lg pt-6">
                        A user with the provided email id already exists.
                    </p>

                    <p className="py-5">
                        Create account with new <Link onClick={() => {
                            resetForm();
                            setAccAlreadyExists(false);
                        }} href="/signup">
                            <span className="text-sky-500">
                                Email Id
                            </span>.
                        </Link>
                    </p>

                    <Link href="/forgot-password">
                        <p className="text-sky-500">
                            Forgot Password ?
                        </p>
                    </Link>
                </div>
            }

            {isAccountCreated ?
                <div className="flex items-center justify-center flex-col max-w-lg">
                    <img src="/images/logo.svg" alt="logo" className="h-14 mt-1 w-auto" height={40} width={150} />
                    <h3 className="text-xl font-semibold pt-5">Alumni Website NITP</h3>
                    <h1 className="text-3xl font-bold px-3 text-sky-500 pt-10">Account Created!</h1>
                    <p className="text-center mt-1">
                        Verification link has been sent to your email.
                        <br />Please verify your email to login.
                    </p>

                    <p className="text-center mt-1">
                        If you don't receive the email within a few minutes, <br />please check your spam folder.
                    </p>

                    <p className="text-center mt-4">
                        If already verified, click on the button below to login.
                    </p>

                    <Link href="/signin" className="mt-5">
                        <button className="text-white bg-sky-500 hover:bg-sky-600 focus:bg-gray-600 rounded-xl py-2.5 px-12">
                            Login
                        </button>
                    </Link>
                </div>
                :
                !accAlreadyExist && <div className="lg:w-[28rem] md:w-[28rem] sm:w-[90%] w-[95%] border-gray-700 border py-8 lg:px-8 md:px-7 px-4 rounded-3xl bg-[#0c0c0c]">
                    <h1 className="text-3xl font-bold mb-3 px-3">Sign Up</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 px-3">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email">Email</label>
                            <input
                                autoComplete="email"
                                autoFocus={true}
                                type="email"
                                id="email"
                                className="py-2 px-5 rounded-xl bg-[#1b1b1b] text-gray-200"
                                placeholder="abc@tesla.co.in"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                            />
                            {errors.email && <p className="text-rose-500">{errors.email.message}</p>}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="name">Name</label>
                            <input
                                autoComplete="name"
                                type="text"
                                id="name"
                                className="py-2 px-5 rounded-xl bg-[#1b1b1b] text-gray-200"
                                placeholder="John Doe"
                                {
                                ...register("name", {
                                    required: "Name is required",
                                    minLength: {
                                        value: 3,
                                        message: "Name should be at least 3 characters"
                                    },
                                })
                                }
                            />
                            {
                                errors.name && <p className="text-rose-500">{errors.name.message}</p>
                            }
                        </div>

                        <div className="flex relative flex-col gap-1">
                            <label htmlFor="password">Password</label>
                            <input
                                autoComplete="password"
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="py-2 px-5 rounded-xl bg-[#1b1b1b] text-gray-200"
                                placeholder="Enter Password"
                                {
                                ...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password should be at least 8 characters"
                                    },
                                    maxLength: {
                                        value: 32,
                                        message: "Password should not be greater than 32 characters"
                                    }
                                })
                                }
                            />
                            {
                                errors.password && <p className="text-rose-500">{errors.password.message}</p>
                            }
                            <div className="absolute top-10 right-4">
                                {showPassword ? (
                                    <FaEye
                                        size={22}
                                        className="text-gray-400 cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    />
                                ) : (
                                    <FaEyeSlash
                                        size={22}
                                        className="text-gray-400 cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="flex relative flex-col gap-1">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                autoComplete="password"
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                className="py-2 px-5 rounded-xl bg-[#1b1b1b] text-gray-200"
                                placeholder="Confirm Password"
                                {
                                ...register("confirmPassword", {
                                    required: "Confirm Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password should be at least 8 characters"
                                    },
                                    maxLength: {
                                        value: 32,
                                        message: "Password should not be greater than 32 characters"
                                    }
                                })
                                }
                            />
                            {
                                errors.confirmPassword && <p className="text-rose-500">{errors.confirmPassword.message}</p>
                            }
                            <div className="absolute top-10 right-4">
                                {showConfirmPassword ? (
                                    <FaEye
                                        size={22}
                                        className="text-gray-400 cursor-pointer"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    />
                                ) : (
                                    <FaEyeSlash
                                        size={22}
                                        className="text-gray-400 cursor-pointer"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    />
                                )}
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            className="py-2.5 mt-3 px-5 rounded-xl bg-sky-500 hover:bg-sky-600 focus:bg-gray-600 disabled:bg-gray-600 text-white font-semibold"
                            type="submit"
                        >
                            {loading ? "Creating Account..." : "Sign Up"}
                        </button>

                        <p className="text-center mt-5">
                            Already have an account?{" "}
                            <Link href="/signin" style={{ textDecoration: "none", color: "skyblue" }} className="text-sky-500">
                                Login
                            </Link>
                        </p>

                        <Link href="/" className="flex items-center justify-center -mt-3">
                            <button className="text-rose-500">
                                Skip for now
                            </button>
                        </Link>
                    </form>
                </div>}
        </div>
    );
};

export default Register;




// "use client";

// import React, { useEffect, useState } from "react";

// import Link from "next/link";
// import { signIn, useSession } from "next-auth/react";
// import { Button, buttonVariants } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";
// import { useRouter } from "next/navigation";

// const RegisterForm = () => {
//   const [email, setemail] = useState();
//   const [password, setpassword] = useState();
//   const [creatingUser, setcreatingUser] = useState(false);
//   const [error, seterror] = useState("");
//   const {data:session,status:sessionStatus}=useSession();
//   const router=useRouter();
// useEffect(()=>{
// if(sessionStatus==='authenticated'){
//   router.replace("/")
// }
// },[sessionStatus,router])
//   const isValidEmail = (email) => {
//     const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!isValidEmail(email)) {
//       seterror("Email is invalid");
//       return;
//     }
//     if (!password || password.length < 4) {
//       seterror("Password must be at least 5 characters ");
//       return;
//     }
  
//     try {
//       setcreatingUser(true)
//       const response = await fetch("/api/register", {
//         method: "POST",
//         body: JSON.stringify({ email, password }),
//         headers: { "Content-Type": "application/json" },
//       });
//       if (response.status === 400) {
//         setcreatingUser(false);
//         seterror("This email is already registered");
//       }
//       if (response.status === 200) {
//         seterror("");
//         setemail("");
//         setpassword("");
//         setcreatingUser(false);
//         router.push("/login");
//       }

     
//     } catch (error) {
//       seterror("Error, try again");
//       setcreatingUser(false);
//       console.log(error);
//     }
//   };


//   return (
//     <>
//       <div>
//         <div className="right-3 ">
//           <Link href={"/"} className=" mt-2 relative ">
//             <Button
//               className={cn(
//                 buttonVariants({ variant: "outline" }),
//                 "absolute left-4 top-4 md:left-8 md:top-8 text-slate-500"
//               )}
//             >
//               Back
//             </Button>
//           </Link>
//         </div>
//       </div>
//       <div className="container flex h-screen w-screen flex-col items-center justify-center ">
//         <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
//           <div className="flex flex-col space-y-2 text-center">
//             hellow
//             <h1 className="text-2xl font-semibold tracking-tight">
//               Welcome Man
//             </h1>
//             {error ? (
//               <div className="text-red-900">Error hai bhai: {error}</div>
//             ) : (
//               <p className="text-sm text-muted-foreground">
//                 Enter your email to register
//               </p>
//             )}
//           </div>
//           <div className="grid gap-6">
//             <form onSubmit={handleSubmit}>
//               <div className="grid gap-2">
//                 <div className="grid gap-1">
//                   <Label htmlFor="email" className="mt-2  mb-2">
//                     Email
//                   </Label>
//                   <Input
//                     id="email"
//                     placeholder="name@example.com"
//                     type="email"
//                     autoCapitalize="none"
//                     autoComplete="email"
//                     autoCorrect="off"
//                     value={email}
//                     onChange={(e) => setemail(e.target.value)}
//                   />
//                   <Label htmlFor="email" className="mt-2  mb-2">
//                     Password
//                   </Label>
//                   <Input
//                     id="password"
//                     placeholder="password"
//                     type="password"
//                     value={password}
//                     onChange={(e) => setpassword(e.target.value)}
//                   />
//                 </div>
//                 <Button disabled={creatingUser} type="submit" className="mt-2">
//                   Register
//                 </Button>
//               </div>
//             </form>
//             <div className="relative">
//               <div className="absolute inset-0 flex items-center">
//                 <span className="w-full border-t" />
//               </div>
//               <div className="relative flex justify-center text-xs uppercase">
//                 <span className="bg-background px-2 text-muted-foreground">
//                   Or continue with
//                 </span>
//               </div>
//             </div>
//             <Button
//               onClick={() => signIn("google", { callbackUrl: "/" })}
//               type="button"
//             >
//               Google
//             </Button>
//           </div>
//           <Link
//             href="/login"
//             className="hover:text-brand underline underline-offset-4"
//           >
//             <p className="px-8 text-center text-sm text-muted-foreground">
//               have an account? Login
//             </p>
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// };

// export default RegisterForm;