"use client"
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Analysis() {
    const [file, setFile] = useState<File | null>(null);
    const [previewURL, setPreviewURL] = useState<string | null>(null);
    const [result, setResult] = useState<string | null> (null);
    const [stage, setStage] = useState<"select" | "loading" | "done">("select");
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const selectedFile = e.target.files?.[0] ?? null;
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewURL(URL.createObjectURL(selectedFile));
        }
    }

    function triggerFileInput() {
        fileInputRef.current?.click();
    }

    // revoke URL when component umounts or file changes
    useEffect(() => {
        return () => {
            if (previewURL) {
                URL.revokeObjectURL(previewURL);
            }
        }
    }, [previewURL]);

    const handleAnalyze = async () => {
        if (!file) return alert("Please select a file");

        const formData = new FormData();
        formData.append("file", file);

        setStage("loading");
        const res = await fetch("http://localhost:8000/predict", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        setResult(`${data.result.freshness} ${data.result.item}`);
        setStage("done");
    }

    const resetForNewPicture = () => {
        setFile(null);
        setPreviewURL(null);
        setResult(null);
        setStage("select");
    }

    return (
        <div className="flex flex-col pt-24 ml-8 mr-8 min-h-screen ">
            <h2>Upload a picture of your fruit or vegetable</h2>
            {/* preview */}
            <div className="flex flex-1 items-center justify-center p-4">
                {previewURL && (
                    <div className="flex flex-col gap-4 items-center justify-center">
                        <Image
                            src={previewURL}
                            alt="preview"
                            width={300}
                            height={300}
                            className="rounded shadow"
                        />
                        {stage === "loading" && <p className="text-lg">Analyzing...</p>}
                        {stage === "done" && <p className="text-lg font-semibold">It&apos;s a {result}!</p>}
                    </div>
                )}
            </div>

            {/* bottom button */}
            <div className="flex pb-8 gap-4">
                {stage === "select" && (
                    <>
                        <button onClick={triggerFileInput} className={`btn text-2xl `}>{`${file ? 'Change picture' : 'Upload a picture'}`}</button>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        {file && (
                            <button 
                                onClick={handleAnalyze}
                                className="btn text-2xl"
                            >
                                Analyze picture
                            </button>
                        )}
                    </>
                )}

                {stage === "loading" && null}

                {stage === "done" && (
                    <>
                        <button
                            onClick={resetForNewPicture}
                            className="btn text-2xl"
                        >
                            Analyze another picture
                        </button>
                        <Link href="/" className="btn text-2xl">Home</Link>
                    </>
                )}
            </div>
        </div>
    );
}