"use client";

import Link from "next/link";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {OctagonAlertIcon} from "lucide-react"

import {useRouter} from "next/navigation";
import {Input} from "@/components/ui/input";
import {authClient} from "@/src/lib/auth-client";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Card,CardContent } from "@/components/ui/card";
import {Alert,AlertTitle} from "@/components/ui/alert";
import { useState } from "react";
import { on } from "node:stream";
import { SignUpView } from "./sign-up-view";
const formSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(4, "Password must be at least 4 characters long"),
});


export const SignInView = () => {
    const router=useRouter();
    const[error,setError]=useState<string | null>(null);
    const[pending,setPending]=useState(false);

    const form=useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit=(data: z.infer<typeof formSchema>)=>{
        setError(null); 
        setPending(true);
         authClient.signIn.email({
            email: data.email,
            password: data.password,
        },
    {
        onSuccess: () => { 
            setPending(false); 
            router.push("/");
        },
        onError: ({error}) => {
            setPending(false);
            setError(error.message);
        }
    });
    }   
  return (
    <div className="flex flex-col gap-6 items-center justify-center">
        <Card className="overflow-hidden p-0 ">
            <CardContent className="grid p-0 md:grid-cols-2">
                
                
                <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Welcome back</h1>
                                <p className="text-muted-foreground text-balance">Log in to your account</p>
                            </div>
                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field})=>(
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="t@gmail.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                
                            </div>

                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field})=>(
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="******" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                
                            </div>
                            {!!error && (
                                <Alert className="bg-destructive/10 border-none">
                                    <OctagonAlertIcon className="h-4 w-4 !item-destructive"  />
                                    <AlertTitle>{error}</AlertTitle>
                                </Alert>
                                )}
                            <Button disabled={pending} type="submit" className="w-full">Sign In</Button>
                            <div className="after:border-border relative text-center text-sm after:absolute 
                            after:insert-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                <span className="bg-card text-muted-foreground relative z-10 px-2">
                                    or continue with
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Button variant="outline" type="button" 
                                className="w-full" disabled={pending}>Google</Button>
                                <Button variant="outline" type="button" 
                                className="w-full" disabled={pending}>Github</Button>
                            </div>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                 <Link href="/auth/sign-up" className="underline underline-offset-4">Sign up</Link>
                            </div>
                            

                        </div>
                     </form>
                </Form>

                 <div className="bg-radial from-emerald-700 via-teal-800 to-slate-900 hidden md:flex flex-col
                 gap-y-4 items-center justify-center">
                    <img src="/logo.svg" alt="logo" className="h-[110px] w-[110px] mt-7 mr-3" />
                    <p className="text-4xl font-bold text-white tracking-tight">Meetric</p>
                 </div>
            </CardContent>
        </Card>
        <div className="text-muted-foregorund *:[a]:hover:text-primary text-center text-xs text-balance
         *:[a]:underline *:[a]:underline-offset--4 ">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>.
         </div>
    </div>
    );
}