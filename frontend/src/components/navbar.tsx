"use client"
import { useState, useEffect } from "react";
import Link from "next/link";

export default function NavBar() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        function onScroll() {
            setVisible(window.scrollY < 5);
        }
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    },[]);

    return (
        <nav className='fixed h-16 ml-8 mt-8'>
            <Link 
                href='/' 
                className={`font-semibold text-xl `}>
                Food Quality Analyzer
            </Link>
        </nav>
    );
}