import { getCredential } from "@/lib/queries/getCredential";
import { BackButton } from "../../../../components/ui/BackButton";
import CredentialForm from "./CredentialForm";

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const { credentialId } = await searchParams

    if (!credentialId) return { title: "New Credential" }

    return { title: `Edit Credential #${credentialId}`}
}

export default async function CredentialFormPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    try {
        const { credentialId } = await searchParams

        // Edit form
        if (credentialId) {
            const credential = await getCredential(parseInt(credentialId))

            if (!credential) {
                return (
                    <>
                        <h2>Credential ID #{credentialId} not found</h2>
                        <BackButton title="Go Back" />
                    </>
                )
            }
            return <CredentialForm credential={credential} />
        } else {
            return <CredentialForm />
        }
    } catch (e) {
        if (e instanceof Error) {
            throw e
        }
    }
}