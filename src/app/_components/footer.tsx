import Link from "next/link";

export default function Footer() {
    return (
        <footer className="my-8">
            <p className="text-center text-xs leading-5 text-gray-400">
                A project by <Link href="https://x.com/janyksteenbeek" target="_blank">Janyk Steenbeek</Link>, not
                affiliated with Google &middot; <Link href="https://github.com/sponsors/janyksteenbeek"
                                                      className="underline">Support the
                project</Link>
            </p>
        </footer>
    )
}
