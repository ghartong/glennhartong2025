"use client";

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"

function ContactForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [submitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = formRef.current;
        if (form) {
            const win = window.open("", "formWindow", "width=600,height=600");
            form.target = "formWindow";
            form.submit();
            setTimeout(() => {
                win?.close();
                form.reset();
                setIsSubmitted(true);
            }, 100);
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
                ref={formRef}
                action="https://docs.google.com/forms/d/177HsbZ5bkxXnNXwbeBTfTZaHAEEp2QDp6llPsoIjmeU/formResponse"
                method="post"
                onSubmit={handleSubmit}>
                <section  className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="name">
                        Your Name
                    </label>
                    <input 
                        type="text" 
                        id="name" 
                        name="entry.1475316596" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        required />
                </section>

                <section  className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="email">
                        Your Email
                    </label>
                    <input 
                        type="email" 
                        id="email" 
                        name="entry.628867105" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="yourName@domain.com"
                    />
                </section>

                <section  className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="ph-number">
                        Your Phone
                    </label>
                    <input 
                        type="number" 
                        id="ph-number" 
                        name="entry.1176879341" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="123-456-7890"
                    />
                </section>

                <section  className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="message">
                        How may I help you?
                    </label>
                    <textarea 
                        id="message" 
                        name="entry.439243581" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required></textarea>
                </section>
                <p 
                    id="helper-text-explanation" 
                    className="italic text-xs text-gray-500 dark:text-gray-400 pt-0"
                >
                    I'll never share your details. By entering your information and submitting this form, you agree to let me contact you regarding your inquiry. SMS and phone calls may be used for this purpose. Message and data rates may apply. You can opt out at any time by replying STOP to any message you receive from me.  
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