import Link from "next/link";
 
 export default function landing() {
    return (
        <div className='flex flex-col absolute top-1/4 right-1/2 left-8 gap-4'>
            <h1>Analyze your fruits and vegetables</h1>
            <h3>Supports apples, bananas, cucumbers, okras, oranges, potatoes, and tomatoes</h3>
            <Link href={'/analysis'} className="btn text-2xl">
                Start Analysis
            </Link>
        </div>
    );
 }
 