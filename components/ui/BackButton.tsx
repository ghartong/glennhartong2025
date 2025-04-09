"use client"

import { useRouter } from "next/navigation"
import { ButtonHTMLAttributes } from "react"

type Props = {
    title: string,
    className?: string,
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined,
} & ButtonHTMLAttributes<HTMLButtonElement>

export function BackButton(
    { title, variant, className, ...props }: Props
) {
        const router = useRouter()

        return (
            <button
                className={className}
                type="button" 
                onClick={() => router.back()}
                title={title}
            >
                {title}
            </button>
        )
}