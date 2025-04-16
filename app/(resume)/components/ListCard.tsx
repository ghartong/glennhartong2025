import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

type Props = {
    children: React.ReactNode,
    description: React.ReactElement,
    name: string,
    footer?: React.ReactElement,
}

function ListCard({ name, children, description, footer }: Props) {
    return (
        <Card className="p-2 md:p-4 w-full">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                {footer && footer}
            </CardFooter>
        </Card>
    );
}

export default ListCard;