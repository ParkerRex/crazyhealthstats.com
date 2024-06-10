"use client"
import { ModeToggle } from "./ToggleTheme"
import Image from "next/image"


export default function NavBar() {
	return (
		<nav className="w-full p-2 pb-2 flex justify-between border-b items-center">
			<Image alt="logo" src="/logo.png" width={100} height={100} className="size-8" />
			<h1 className="text-xl font-semibold">The Health Clock</h1>
			<ModeToggle />
		</nav>

	)
}
