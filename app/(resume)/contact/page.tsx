import { Button } from "@/components/ui/button"

export const metadata = {
    title: "Contact",
}

function Contact() {
    return (
        <>
            <h1 className="font-extrabold">Contact Glenn Hartong</h1>
            <section>
                <p className="leading-relaxed">Whether you&apos;re a recruiter looking for a seasoned engineer, a team in need of a reliable collaborator, or just curious about my work — I&apos;d love to connect.</p>
                <p>You can find me on{' '}
                    <a
                        href="https://www.linkedin.com/in/glennhartong"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                    >
                        LinkedIn
                    </a>{' '}
                    for professional updates, explore my projects on{' '}
                    <a
                        href="https://github.com/ghartong"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                    >
                        GitHub
                    </a>
                    , or check out my resume below for a full overview of my experience.</p>
                <p>I&apos;m currently open to new opportunities and always happy to chat about how I can help bring great ideas to life.</p>
                <Button asChild variant="secondary" className="mt-5">
                    <a
                        href="/assets/Glenn_Hartong_Resume_2025.pdf"
                        download
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors duration-300"
                        aria-label="Download Glenn Hartong's resume in PDF format" 
                        title="Click to download a PDF of my full professional resume"
                    >
                            View My Resume
                    </a>
                </Button>
            </section>
        </>
)}

export default Contact;