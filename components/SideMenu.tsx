"use client"
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";

export default function SideMenu() {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();
	return (
		<>
			<header
				className={`h-screen fixed lg:sticky top-0 flex flex-col items-center gap-14 p-5 bg-secondary text-white
				transform transition-transform duration-300
				 w-72 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
				<Link href={"/"} className="flex flex-col items-center">
					<Image src={"/logo.png"} alt="Logo" width={100} height={100}/>
					<h1 className="text-2xl font-bold">StockBuster</h1>
				</Link>
				<nav className="flex-grow flex flex-col gap-4 w-full font-bold">
					<Link href={"/"} className={`flex items-center gap-4 p-4  rounded-xl hover:bg-tertiaryDark
                ${pathname === "/" ? "bg-primary" : ""}`}>
						<svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M5.5 28.875V12.375L16.5 4.125L27.5 12.375V28.875H19.25V19.25H13.75V28.875H5.5Z"
								  fill="white"/>
						</svg>
						Home
					</Link>
					<Link href={"/products"} className={`flex items-center gap-4 p-4  rounded-xl hover:bg-tertiaryDark
                ${pathname === "/products" ? "bg-primary" : ""}`}>
						<svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M24.75 7.875L13.5 2.25L2.25 7.875V19.125L13.5 24.75L24.75 19.125V7.875Z"
								  stroke="white"
								  strokeWidth="4" strokeLinejoin="round"/>
							<path
								d="M2.25 7.875L13.5 13.5M13.5 13.5V24.75M13.5 13.5L24.75 7.875M19.125 5.0625L7.875 10.6875"
								stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
						Products
					</Link>
					<Link href={"/company"} className={`flex items-center gap-4 p-4  rounded-xl hover:bg-tertiaryDark
                ${pathname === "/company" ? "bg-primary" : ""}`}>
						<svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M16.5 5.5C17.9587 5.5 19.3576 6.07946 20.3891 7.11091C21.4205 8.14236 22 9.54131 22 11C22 12.4587 21.4205 13.8576 20.3891 14.8891C19.3576 15.9205 17.9587 16.5 16.5 16.5C15.0413 16.5 13.6424 15.9205 12.6109 14.8891C11.5795 13.8576 11 12.4587 11 11C11 9.54131 11.5795 8.14236 12.6109 7.11091C13.6424 6.07946 15.0413 5.5 16.5 5.5ZM16.5 19.25C22.5775 19.25 27.5 21.7113 27.5 24.75V27.5H5.5V24.75C5.5 21.7113 10.4225 19.25 16.5 19.25Z"
								fill="white"/>
						</svg>
						Entreprises
					</Link>
				</nav>
				<div className="flex flex-col gap-4">
					<button className="flex gap-2 hover:text-tertiaryDark">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M19.5 12C19.5 11.77 19.49 11.55 19.47 11.32L21.33 9.91C21.73 9.61 21.84 9.05 21.59 8.61L19.72 5.38C19.6001 5.16818 19.4061 5.00814 19.1754 4.93062C18.9447 4.8531 18.6934 4.86356 18.47 4.96L16.32 5.87C15.95 5.61 15.56 5.38 15.15 5.19L14.86 2.88C14.8 2.38 14.37 2 13.87 2H10.14C9.62997 2 9.19997 2.38 9.13997 2.88L8.84997 5.19C8.43997 5.38 8.04997 5.61 7.67997 5.87L5.52997 4.96C5.06997 4.76 4.52997 4.94 4.27997 5.38L2.40997 8.62C2.15997 9.06 2.26997 9.61 2.66997 9.92L4.52997 11.33C4.48827 11.779 4.48827 12.231 4.52997 12.68L2.66997 14.09C2.26997 14.39 2.15997 14.95 2.40997 15.39L4.27997 18.62C4.52997 19.06 5.06997 19.24 5.52997 19.04L7.67997 18.13C8.04997 18.39 8.43997 18.62 8.84997 18.81L9.13997 21.12C9.19997 21.62 9.62997 22 10.13 22H13.86C14.36 22 14.79 21.62 14.85 21.12L15.14 18.81C15.55 18.62 15.94 18.39 16.31 18.13L18.46 19.04C18.92 19.24 19.46 19.06 19.71 18.62L21.58 15.39C21.83 14.95 21.72 14.4 21.32 14.09L19.46 12.68C19.49 12.45 19.5 12.23 19.5 12ZM12.04 15.5C10.11 15.5 8.53997 13.93 8.53997 12C8.53997 10.07 10.11 8.5 12.04 8.5C13.97 8.5 15.54 10.07 15.54 12C15.54 13.93 13.97 15.5 12.04 15.5Z"
								fill="white"/>
						</svg>
						Paramètres
					</button>
					<button className="flex gap-2 hover:text-tertiaryDark">
						<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M10.5 1.75C8.87558 1.75 7.31766 2.39531 6.169 3.54397C5.02034 4.69263 4.37503 6.25055 4.37503 7.875V10.962C4.37516 11.0977 4.3437 11.2316 4.28316 11.3531L2.78078 14.357C2.70739 14.5038 2.67274 14.6668 2.68011 14.8307C2.68748 14.9947 2.73664 15.154 2.82291 15.2935C2.90918 15.4331 3.02969 15.5483 3.17301 15.6282C3.31633 15.7081 3.4777 15.75 3.64178 15.75H17.3583C17.5224 15.75 17.6837 15.7081 17.8271 15.6282C17.9704 15.5483 18.0909 15.4331 18.1772 15.2935C18.2634 15.154 18.3126 14.9947 18.32 14.8307C18.3273 14.6668 18.2927 14.5038 18.2193 14.357L16.7178 11.3531C16.6569 11.2317 16.6252 11.0978 16.625 10.962V7.875C16.625 6.25055 15.9797 4.69263 14.8311 3.54397C13.6824 2.39531 12.1245 1.75 10.5 1.75ZM10.5 18.375C9.95696 18.3753 9.42717 18.2071 8.98367 17.8937C8.54017 17.5803 8.2048 17.137 8.02378 16.625H12.9763C12.7953 17.137 12.4599 17.5803 12.0164 17.8937C11.5729 18.2071 11.0431 18.3753 10.5 18.375Z"
								fill="white"/>
						</svg>
						Notifications
					</button>
				</div>
			</header>
			<div className={`bg-secondary text-white fixed flex justify-end
			transition-margin duration-300
			 p-2 rounded-br lg:hidden ${open ? "ml-60" : "ml-0"}
	
			`}>

				{
					!open?
						(
							<button onClick={() => setOpen(!open)}>
								<svg width="30" height="30" viewBox="0 0 30 30" fill="none"
									 xmlns="http://www.w3.org/2000/svg">
									<path
										d="M4.5 7.5H25.5M4.5 15H25.5M4.5 22.5H25.5"
										stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
								</svg>
							</button>
						)
						:
						(
							<button onClick={() => setOpen(!open)}>
								<svg width="30" height="30" viewBox="0 0 30 30" fill="none"
									 xmlns="http://www.w3.org/2000/svg">
									<path
										d="M7.5 7.5L22.5 22.5M7.5 22.5L22.5 7.5"
										stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
								</svg>
							</button>
						)
				}
			</div>
		</>
	)
}