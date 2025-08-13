"use client"
import Link from "next/link";

export default function NavBar() {
    return (
        <nav className='fixed h-16 ml-8 mt-8'>
            <Link 
                href='/' 
            >
                Food Quality Analyzer
            </Link>
        </nav>
    );
}