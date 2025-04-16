import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

type Props = {
    site: {
        name: string,
        demoLink?: string,
        externalLink?: string,
        externalLinkText?: string,
        shortDesc: string,
        longDesc: string,
        tech: string[]
    }
}

function SiteCard({ site }: Props) {
    return (
        <Card className="p-2 md:p-4 w-full">
            <CardHeader>
                <CardTitle>{site.name}</CardTitle>
                <CardDescription>{site.shortDesc}</CardDescription>
            </CardHeader>
            <CardContent>
                {site.longDesc}
                <section className="flex flex-wrap justify-center gap-2 mt-4">
                {site?.demoLink && (
                    <Button asChild variant="secondary">
                        <Link href={site.demoLink}>
                            View demo
                        </Link>
                    </Button>
                )}
                {site?.externalLink && (
                    <Button asChild variant="secondary">
                        <Link
                            href={site.externalLink}
                            target="_blank"
                        >
                            {site?.externalLinkText ? site.externalLinkText : 'View site'}
                        </Link>
                    </Button>
                )}
                </section>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Dialog>
                    <DialogTrigger>View Stack</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{site.name}</DialogTitle>
                            <DialogDescription>
                                Some of the stack used in this application
                            </DialogDescription>
                        </DialogHeader>
                        <ul>
                            {site.tech.map(t => (
                                <li key={t}>{t}</li>
                            ))}
                        </ul>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    );
}

export default SiteCard;