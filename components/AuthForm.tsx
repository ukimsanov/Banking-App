'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { AlertCircle, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.actions'
import PlaidLink from './PlaidLink'


const AuthForm = ({type}: {type: string}) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);
 
    const formSchema = authFormSchema(type);

    // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof 
    formSchema>) => {

    setIsLoading(true);
    setAuthError(null);
    console.log('AuthForm submit handler, type:', type, 'data:', data);
    
    try{
        // Sign up with Appwrite & create plain link token
        
        if(type === 'sign-up'){
            // Convert MM/DD/YYYY to YYYY-MM-DD
            const [m, d, y] = data.dateOfBirth!.split('/');
            const formattedDob = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;

            const userData = {
                firstName: data.firstName!,
                lastName: data.lastName!,
                address1: data.address1!,
                city: data.city!,
                state: data.state!,
                postalCode: data.postalCode!,
                dateOfBirth: formattedDob,
                ssn: data.ssn!,
                email: data.email,
                password: data.password,
            }

            const response = await signUp(userData);
            
            if (response?.error) {
                setAuthError(response.message);
                return;
            }
            
            setUser(response);
        }

        if(type === 'sign-in'){
             const response = await signIn({
                 email: data.email,
                 password: data.password,
             });
             console.log('sign-in response', response);
             
             if (response?.error) {
                 setAuthError(response.message);
                 return;
             }

             if (response) {
                router.push('/');
             } else {
                setAuthError('Authentication failed. Please check your credentials.');
             }
        }
    } catch (error) {
        console.log(error);
        setAuthError("An unexpected error occurred. Please try again.");
    } finally {
        setIsLoading(false);
    }
  }

  return (
<section className='auth-form'>
    <header className='flex flex-col gap-5 md:gap-8'>
        <Link href="/" 
         className="
            cursor-pointer 
            items-center 
            gap-1 flex">
            <Image 
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt='Horizon logo'
            />
            <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
        </Link>
        <div className='flex flex-col gap-1 md:gap-3'>
            <h1 className='text-24 lg:text-36 
            font-semibold text-gray-900'>
                {user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}
                <p className='text-16 font-normal text-gray-600'>
                    {user ? "Link your account to get started" : "Please enter your details"}
                </p>
            </h1>
        </div>
    </header>
    {user ? (
        <div className='flex flex-col gap-4'>
            <PlaidLink user={user} variant="primary" />
        </div>
    ): (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {type === 'sign-up' && (
                        <>
                        <div className='flex gap-4'>
                            <CustomInput control={form.control}
                            name="firstName" label='First Name'
                            placeholder='Enter your first name'
                            required />
                            <CustomInput control={form.control}
                            name="lastName" label='Last Name'
                            placeholder='Enter your last name'
                            required />
                        </div>
                            <CustomInput control={form.control}
                            name="address1" label='Address'
                            placeholder='Enter your specific address'
                            required />
                            <CustomInput control={form.control}
                            name="city" label='City'
                            placeholder='Enter your city'
                            required />
                            <div className='flex gap-4'>
                            <CustomInput control={form.control}
                            name="state" label='State'
                            placeholder='Example: NY'
                            required />
                            <CustomInput control={form.control}
                            name="postalCode" label='Postal Code'
                            placeholder='Example: 11101'
                            required />
                            </div>
                            <div className='flex gap-4'>
                            <CustomInput control={form.control}
                            name="dateOfBirth" label='Date of Birth'
                            placeholder='MM/DD/YYYY'
                            required />
                            <CustomInput control={form.control}
                            name="ssn" label='SSN'
                            placeholder='Last 4 digits'
                            required />
                            </div>
                        </>
                    )}

                    <CustomInput
                    control={form.control}
                    name='email'
                    label="Email"
                    placeholder="Enter your email address"
                    required
                    />
                    <CustomInput
                    control={form.control}
                    name='password'
                    label="Password"
                    placeholder="Enter your password"
                    required
                    />
                    {type === 'sign-up' && (
                      <CustomInput
                        control={form.control}
                        name='confirmPassword'
                        label="Confirm Password"
                        placeholder="Re-enter your password"
                        required
                      />
                    )}
                    {authError && (
                      <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-3 flex items-center">
                        <AlertCircle size={18} className="mr-2 text-red-500" />
                        <span>{authError}</span>
                      </div>
                    )}
                    <div className='flex flex-col gap-4'>
                    <Button type="submit" disabled={isLoading} className="form-btn">
                    {isLoading ? (
                        <>
                        <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                        </>
                    ) : (
                        type === 'sign-in' ? 'Sign In' : 'Sign Up'
                    )}
                    </Button>

                    </div>
                </form>
            </Form>
            <footer className='flex justify-center gap-1'>
              <p className='text-14 font-normal text-gray-600'>
                {type === 'sign-in' 
                ? "Don't have an account?"
                : "Already have an account?"}
              </p>
              <Link href={type === 'sign-in' ? '/sign-up' 
              : 'sign-in'} className='form-link'>
                {type === 'sign-in' ? 'Sign-up' 
              : 'Sign-in'}
              </Link>
            </footer>
        </>
    )}
</section>
  )
}

export default AuthForm
