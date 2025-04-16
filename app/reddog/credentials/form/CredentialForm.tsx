"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { insertCredentialSchema, type insertCredentialSchemaType, type selectCredentialSchemaType } from "@/zod-schemas/credential"
import { useAction } from 'next-safe-action/hooks'
import { saveCredentialAction } from "@/app/actions/saveCredentialAction"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { InputWithLabel } from "@/components/inputs/InputWithLabel"
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel"
import { LoaderCircle } from "lucide-react"
import { DisplayServerActionResponse } from "@/components/DisplayServerActionResponse"

type Props = {
    credential?: selectCredentialSchemaType,
}

export default function CredentialForm({ credential }: Props) {
    const { getPermission, isLoading } = useKindeBrowserClient()
    const isManager = !isLoading && getPermission('admin')?.isGranted

    const defaultValues: insertCredentialSchemaType = {
        id: credential?.id ?? 0,
        name: credential?.name ?? '',
        organization: credential?.organization ?? '',
        notes: credential?.notes ?? '',
        acquiredAt: credential?.acquiredAt ?? null,
    }

    const form = useForm<insertCredentialSchemaType>({
        mode: 'onBlur',
        resolver: zodResolver(insertCredentialSchema),
        defaultValues,
    })

    const {
        execute: executeSave,
        result: saveResult,
        isPending: isSaving,
        reset: resetSaveAction,
    } = useAction(saveCredentialAction, {
        onSuccess({ data }) {
            if (data?.message) {
                toast.success(`Success! ${data.message}`)
            }
        }, 
        onError({ error }) {
            toast.error('Error: Save failed')
        }
    })

    async function submitForm(data: insertCredentialSchemaType) {
        executeSave(data)
    }

    return (
        <div className="flex flex-col gap-1 sm:px-8">
            <DisplayServerActionResponse result={saveResult} />
            <div>
                <h2 className="text-2xl font-bold">
                    {credential?.id ? "Edit" : "New"} Credential {credential?.id ? `#${credential.id}` : 'Form'}
                </h2>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(submitForm)}
                    className="flex flex-col md:flex-row gap-4 md:gap-8"
                >
                    <div className="flex flex-col gap-4 w-full max-w-xs">
                        <InputWithLabel<insertCredentialSchemaType>
                            fieldTitle="Name"
                            nameInSchema="name"
                            className=""
                        />
                        <InputWithLabel<insertCredentialSchemaType>
                            fieldTitle="Organization"
                            nameInSchema="organization"
                            className=""
                        />
                    </div>
                    <div className="flex flex-col gap-4 w-full max-w-xs">
                        <InputWithLabel<insertCredentialSchemaType>
                            fieldTitle="Acquired At"
                            nameInSchema="acquiredAt"
                            className=""
                            type="date"
                        />
                        <TextAreaWithLabel<insertCredentialSchemaType>
                            fieldTitle="Notes"
                            nameInSchema="notes"
                            className="h-40"
                        />

                        <div className="flex gap-2">
                            <Button
                                type="submit"
                                className="w-3/4"
                                variant="default"
                                title="Save"
                                disabled={isSaving}
                            >
                                {isSaving ? (
                                    <><LoaderCircle className="animate-spin" /> Saving</>
                                ) : (
                                    "Save"
                                )}
                            </Button>
                            <Button
                                type="button"
                                variant="destructive"
                                title="Reset"
                                onClick={() => {
                                    form.reset(defaultValues)
                                    resetSaveAction()
                                }}
                            >
                                Reset
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}