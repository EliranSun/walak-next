import '@/app/[locale]/globals.css';
import React from "react";
import {getPost} from "@/utils/posts";


export default function RootLayout({
   children,
   params,
}: {
   children: React.ReactNode,
   params: { postId: string, postName: string },
}) {
   return children;
}
