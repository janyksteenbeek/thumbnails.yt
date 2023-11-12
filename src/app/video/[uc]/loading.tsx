import Spinner from "~/app/_components/spinner";

export const runtime = 'edge';

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-6xl font-bold text-white">
                <Spinner/>
            </h1>
        </div>
    );
}