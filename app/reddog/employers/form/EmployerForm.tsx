"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { insertEmployerSchema, type insertEmployerSchemaType, type selectEmployerSchemaType } from "@/zod-schemas/employer"
import { useAction } from 'next-safe-action/hooks'
import { saveEmployerAction } from "@/app/actions/saveEmployerAction"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { InputWithLabel } from "@/components/inputs/InputWithLabel"
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel"
import { CheckboxWithLabel } from "@/components/inputs/CheckboxWithLable"
import { LoaderCircle } from "lucide-react"
import { DisplayServerActionResponse } from "@/components/DisplayServerActionResponse"

type Props = {
    employer?: selectEmployerSchemaType,
}

export default function EmployerForm({ employer }: Props) {
    const { getPermission, isLoading } = useKindeBrowserClient()
    const isManager = !isLoading && getPermission('admin')?.isGranted

    const defaultValues: insertEmployerSchemaType = {
        id: employer?.id ?? 0,
        name: employer?.name ?? '',
        title: employer?.title ?? '',
        location: employer?.location ?? '',
        isActive: employer?.isActive ?? false,
        duties: employer?.duties ?? '',
        notes: employer?.notes ?? '',
        startedAt: employer?.startedAt ?? null,
        endedAt: employer?.endedAt ?? null,
    }

    const form = useForm<insertEmployerSchemaType>({
        mode: 'onBlur',
        resolver: zodResolver(insertEmployerSchema),
        defaultValues,
    })

    const {
        execute: executeSave,
        result: saveResult,
        isPending: isSaving,
        reset: resetSaveAction,
    } = useAction(saveEmployerAction, {
        onSuccess({ data }) {
            if (data?.message) {
                toast.success(`Success! ${data.message}`)
            }
        }, 
        onError({ error }) {
            toast.error('Error: Save failed')
        }
    })

    async function submitForm(data: insertEmployerSchemaType) {
        executeSave(data)
    }

    return (
        <div className="flex flex-col gap-1 sm:px-8">
            <DisplayServerActionResponse result={saveResult} />
            <div>
                <h2 className="text-2xl font-bold">
                    {employer?.id ? "Edit" : "New"} Employer {employer?.id ? `#${employer.id}` : 'Form'}
                </h2>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(submitForm)}
                    className="flex flex-col md:flex-row gap-4 md:gap-8"
                >
                    <div className="flex flex-col gap-4 w-full max-w-xs">
                        <InputWithLabel<insertEmployerSchemaType>
                            fieldTitle="Name"
                            nameInSchema="name"
                            className=""
                        />
                        <InputWithLabel<insertEmployerSchemaType>
                            fieldTitle="Title"
                            nameInSchema="title"
                            className=""
                        />
                        <InputWithLabel<insertEmployerSchemaType>
                            fieldTitle="Location"
                            nameInSchema="location"
                            className=""
                        />
                        <TextAreaWithLabel<insertEmployerSchemaType>
                            fieldTitle="Duties"
                            nameInSchema="duties"
                            className="h-40"
                        />
                    </div>
                    <div className="flex flex-col gap-4 w-full max-w-xs">
                        <InputWithLabel<insertEmployerSchemaType>
                            fieldTitle="Started At"
                            nameInSchema="startedAt"
                            className=""
                            type="date"
                        />
                        <InputWithLabel<insertEmployerSchemaType>
                            fieldTitle="Ended At"
                            nameInSchema="endedAt"
                            className=""
                            type="date"
                        />
                        <TextAreaWithLabel<insertEmployerSchemaType>
                            fieldTitle="Notes"
                            nameInSchema="notes"
                            className="h-40"
                        />

                        {isLoading ? <p>Loading...</p> : isManager ? (
                            <CheckboxWithLabel<insertEmployerSchemaType>
                                fieldTitle="Active"
                                nameInSchema="isActive"
                                message="Yes"
                                className=""
                            />
                        ) : null}

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