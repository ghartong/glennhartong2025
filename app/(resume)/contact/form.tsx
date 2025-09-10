"use client";

import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"

import { Button } from "@/components/ui/button"

interface UserInput {
    name: string;
    email?: string;
    phone?: string;
    message: string;
}

const googleFormNameMap = {
    name: "entry.1475316596",
    email: "entry.628867105",
    phone: "entry.1176879341",
    message: "entry.439243581"
}

const formActionURL = "https://docs.google.com/forms/d/177HsbZ5bkxXnNXwbeBTfTZaHAEEp2QDp6llPsoIjmeU/formResponse"
const labelCSS = "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
const inputCSS = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
const errorColor = "text-red-600 dark:text-red-500"
const errorInputCSS = "bg-gray-50 border rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 border-red-600 dark:border-red-500 placeholder-red-700" + errorColor
const errorMsgCSS = "pt-0 pl-5 text-sm " + errorColor

function ContactForm() {
    const [submitted, setIsSubmitted] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<UserInput>()

    const onSubmit: SubmitHandler<UserInput> = async (data) => {
        const formData = new FormData();
        formData.append(googleFormNameMap.name, data.name);
        formData.append(googleFormNameMap.email, data.email || '');
        formData.append(googleFormNameMap.phone, data.phone || '');
        formData.append(googleFormNameMap.message, data.message);

        try {
        await fetch(formActionURL, {
            method: 'POST',
            body: formData,
            mode: 'no-cors',
        });
            console.log('data', data);
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error submitting form', error);
            alert('An error occurred. The Internet is probably down.');
        }
    };

    if (submitted) {
        return (
            <section className="my-9 bg-gray-800 p-6 text-center">
                <h2 className="text-xl font-bold text-white mb-2">Thank you!</h2>
                <p className="text-gray-300">Your message has been sent. I appreciate your interest and will get back to you soon.</p>
            </section>
        );
    }

    return (
        <section className="my-9 bg-gray-800 p-6">
            <form 
                className="max-w-sm mx-auto"
                onSubmit={handleSubmit(onSubmit)}
            >
                <section  className="mb-5">
                    <label className={labelCSS + (errors.name ? errorColor : '')} htmlFor="name">
                        Your Name
                    </label>
                    <input 
                        {...register("name", { required: "Name is required" })}
                        type="text" 
                        id="name" 
                        className={errors.name?.message ? errorInputCSS : inputCSS} 
                        placeholder="Clark Kent"
                    />
                    {errors.name && <span className={errorMsgCSS}>{errors.name.message}</span>}
                </section>

                <section  className="mb-5">
                    <label className={labelCSS} htmlFor="email">
                        Your Email
                    </label>
                    <input 
                        {...register("email")}
                        type="email" 
                        id="email" 
                        className={inputCSS} 
                        placeholder="yourName@domain.com"
                    />
                </section>

                <section  className="mb-5">
                    <label className={labelCSS} htmlFor="ph-number">
                        Your Phone
                    </label>
                    <input 
                        {...register("phone")}
                        type="tel" 
                        id="phone" 
                        className={inputCSS} 
                        placeholder="123-456-7890"
                    />
                </section>

                <section  className="mb-3">
                    <label className={labelCSS + (errors.name ? errorColor : '')} htmlFor="message">
                        How may I help you?
                    </label>
                    <textarea 
                        {...register("message", { required: "Message is required" })}
                        id="message" 
                        className={errors.message?.message ? errorInputCSS : inputCSS} 
                    ></textarea>
                    {errors.message && <span className={errorMsgCSS}>{errors.message.message}</span>}
                </section>
                <p 
                    id="helper-text-explanation" 
                    className="italic text-xs text-gray-500 dark:text-gray-400 pt-0 text-justify"
                >
                    I will never share your details. By entering your information and submitting this form, you agree to let me contact you regarding your inquiry. SMS and phone calls may be used for this purpose. Message and data rates may apply. You can opt out at any time by replying STOP to any message you receive from me.  
                </p>

                <Button
                    variant="secondary" 
                    className="mt-5 bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
                    type="submit"
                    aria-label="Submit contact form">
                    Submit your information
                </Button>

            </form>
        </section>
)}

export default ContactForm;