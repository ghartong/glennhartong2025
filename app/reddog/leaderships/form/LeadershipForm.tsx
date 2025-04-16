"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { insertLeadershipSchema, type insertLeadershipSchemaType, type selectLeadershipSchemaType } from "@/zod-schemas/leadership"
import { useAction } from 'next-safe-action/hooks'
import { saveLeadershipAction } from "@/app/actions/saveLeadershipAction"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { InputWithLabel } from "@/components/inputs/InputWithLabel"
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel"
import { LoaderCircle } from "lucide-react"
import { DisplayServerActionResponse } from "@/components/DisplayServerActionResponse"

type Props = {
    leadership?: selectLeadershipSchemaType,
}

export default function LeadershipForm({ leadership }: Props) {
    const defaultValues: insertLeadershipSchemaType = {
        id: leadership?.id ?? 0,
        organization: leadership?.organization ?? '',
        title: leadership?.title ?? '',
        notes: leadership?.notes ?? '',
        displayOrder: leadership?.displayOrder ?? 0,
    }

    const form = useForm<insertLeadershipSchemaType>({
        mode: 'onBlur',
        resolver: zodResolver(insertLeadershipSchema),
        defaultValues,
    })

    const {
        execute: executeSave,
        result: saveResult,
        isPending: isSaving,
        reset: resetSaveAction,
    } = useAction(saveLeadershipAction, {
        onSuccess({ data }) {
            if (data?.message) {
                toast.success(`Success! ${data.message}`)
            }
        }, 
        onError() {
            toast.error('Error: Save failed')
        }
    })

    async function submitForm(data: insertLeadershipSchemaType) {
        executeSave(data)
    }

    return (
        <div className="flex flex-col gap-1 sm:px-8">
            <DisplayServerActionResponse result={saveResult} />
            <div>
                <h2 className="text-2xl font-bold">
                    {leadership?.id ? "Edit" : "New"} Leadership {leadership?.id ? `#${leadership.id}` : 'Form'}
                </h2>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(submitForm)}
                    className="flex flex-col md:flex-row gap-4 md:gap-8"
                >
                    <div className="flex flex-col gap-4 w-full max-w-xs">
                        <InputWithLabel<insertLeadershipSchemaType>
                            fieldTitle="Organization"
                            nameInSchema="organization"
                            className=""
                        />
                        <InputWithLabel<insertLeadershipSchemaType>
                            fieldTitle="Title"
                            nameInSchema="title"
                            className=""
                        />
                    </div>
                    <div className="flex flex-col gap-4 w-full max-w-xs">
                        <InputWithLabel<insertLeadershipSchemaType>
                            fieldTitle="Display Order"
                            nameInSchema="displayOrder"
                            className=""
                        />
                        <TextAreaWithLabel<insertLeadershipSchemaType>
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